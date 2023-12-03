import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { notifyError, notifySuccess } from "../utils/notification";

import MediaItem from "../components/common/MediaItem";
import Container from "../components/common/Container";

import uiConfigs from "../configs/ui.configs";
import topPickApi from "../api/modules/topPick.api";

import { setGlobalLoading } from "../redux/Slices/globalLoadingSlice";
import { removeTopPick } from "../redux/Slices/userSlice";

const TopPickItem = ({ media, onRemoved }) => {
  const dispatch = useDispatch();
  const {themeMode} = useSelector( (state) => state.themeMode); 
  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);
    const { response, err } = await topPickApi.remove({ topPickId: media.id });
    setOnRequest(false);

    if (err) notifyError(err.message);
    if (response) {
      notifySuccess("Item removed from top Picks", themeMode);
      dispatch(removeTopPick({ mediaId: media.mediaId }));
      onRemoved(media.id);
    }
  };

  return (<>
    <MediaItem media={media} mediaType={media.mediaType} />
    <LoadingButton
      fullWidth
      variant="contained"
      sx={{ marginTop: 2 }}
      startIcon={<DeleteIcon />}
      loadingPosition="start"
      loading={onRequest}
      onClick={onRemove}
    >
      remove
    </LoadingButton>
  </>);
};

const TopPicksList = () => {
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  const skip = 8;

  useEffect(() => {
    const getTopPicks = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await topPickApi.getList();
      dispatch(setGlobalLoading(false));

      if (err) notifyError(err.message);
      if (response) {
        setCount(response.length);
        setMedias([...response]);
        setFilteredMedias([...response].splice(0, skip));
      }
    };

    getTopPicks();
  }, [dispatch]);

  const onLoadMore = () => {
    setFilteredMedias([...filteredMedias, ...[...medias].splice(page * skip, skip)]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    const newMedias = [...medias].filter(e => e.id !== id);
    setMedias(newMedias);
    setFilteredMedias([...newMedias].splice(0, page * skip));
    setCount(count - 1);
  };

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`Your Top Picks (${count})`}>
        <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
          {filteredMedias.map((media, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <TopPickItem media={media} onRemoved={onRemoved} />
            </Grid>
          ))}
        </Grid>
        {filteredMedias.length < medias.length && (
          <Button onClick={onLoadMore}>load more</Button>
        )}
      </Container>
    </Box>
  );
};

export default TopPicksList;