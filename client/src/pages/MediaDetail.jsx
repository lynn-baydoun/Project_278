import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { LoadingButton } from "@mui/lab";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import CircularRate from "../components/common/CircularRate";
import ImageHeader from "../components/common/ImageHeader";

import uiConfigs from "../configs/ui.configs";
import tmdbConfigs from "../api/configs/tmdb.configs";
import mediaApi from "../api/modules/media.api";
import favoriteApi from "../api/modules/favorite.api";
import topPickApi from "../api/modules/topPick.api";

import { setGlobalLoading } from "../redux/Slices/globalLoadingSlice";
import { setAuthModalOpen } from "../redux/Slices/authModalSlice";
import { addFavorite, removeFavorite, addTopPick, removeTopPick } from "../redux/Slices/userSlice";

import CastSlide from "../components/common/CastSlide";
import MediaVideosSlide from "../components/common/MediaVideosSlide";
import BackdropSlide from "../components/common/BackdropSlide";
import PosterSlide from "../components/common/PosterSlide";
import RecommendSlide from "../components/common/RecommendSlide";
import MediaSlide from "../components/common/MediaSlide";
import MediaReview from "../components/common/MediaReview";
import Container from "../components/common/Container";


import { notifySuccess , notifyError} from "../utils/notification";

const MediaDetail = () => {
  const { mediaType, mediaId } = useParams();

  const { user, listFavorites, listTopPicks } = useSelector((state) => state.user);
  const {themeMode}  = useSelector((state) => state.themeMode);

  const [media, setMedia] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isTopPick, setIsTopPick] = useState(false);
  const [onRequest, setOnRequest] = useState(false);
  const [genres, setGenres] = useState([]);

  const dispatch = useDispatch();

  const videoRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getMedia = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await mediaApi.getDetail({ mediaType, mediaId });

      if (response) {
        setMedia(response);
        setIsFavorite(response.isFavorite);
        setIsTopPick(response.isTopPick);
        setGenres(response.genres.splice(0, 2));
      }

      dispatch(setGlobalLoading(false));

      if (err) notifyError(err.message, themeMode);
    };

    getMedia();
  }, [mediaType, mediaId, dispatch]);

  const onFavoriteClick = async () => {
    if (!user) return dispatch(setAuthModalOpen(true));

    //Prevent adding and removing at the same time
    if (onRequest) return;

    if (isFavorite) {
      onRemoveFavorite();
      return;
    }

    setOnRequest(true);

    const body = {
      mediaId: media.id,
      mediaTitle: media.title || media.name,
      mediaType: mediaType,
      mediaPoster: media.poster_path,
      mediaRate: media.vote_average
    };

    const { response, err } = await favoriteApi.add(body);
    setOnRequest(false);

    if (err) notifyError(err.message, themeMode);
    if (response) {
      dispatch(addFavorite(response));
      setIsFavorite(true);
      notifySuccess("Item added to Watchlist", themeMode);
    }
  };

  const onTopPickClick = async () => {
    if (!user) return dispatch(setAuthModalOpen(true));

    //Prevent adding and removing at the same time
    if (onRequest) return;

    if (isTopPick) {
      onRemoveTopPick();
      return;
    }

    setOnRequest(true);

    const body = {
      mediaId: media.id,
      mediaTitle: media.title || media.name,
      mediaType: mediaType,
      mediaPoster: media.poster_path,
      mediaRate: media.vote_average
    };

    const { response, err } = await topPickApi.add(body);
    setOnRequest(false);

    if (err) notifyError(err.message, themeMode);
    if (response) {
      dispatch(addTopPick(response));
      setIsTopPick(true);
      notifySuccess("Item added to Top Picks", themeMode);
    }
  };

  const onRemoveFavorite = async () => {
    if (onRequest) return;
    setOnRequest(true);

    const favorite = listFavorites.find(e => e.mediaId.toString() === media.id.toString());

    const { response, err } = await favoriteApi.remove({ favoriteId: favorite.id });

    setOnRequest(false);

    if (err) notifyError(err.message, themeMode);
    if (response) {
      dispatch(removeFavorite(favorite));
      setIsFavorite(false);
      notifySuccess("Item removed from Watchlist", themeMode);
    }
  };

  const onRemoveTopPick = async () => {
    if (onRequest) return;
    setOnRequest(true);

    const topPick = listTopPicks.find(e => e.mediaId.toString() === media.id.toString());

    const { response, err } = await topPickApi.remove({ topPickId: topPick.id });

    setOnRequest(false);

    if (err) notifyError(err.message, themeMode);
    if (response) {
      dispatch(removeTopPick(topPick));
      setIsTopPick(false);
      notifySuccess("Item removed from TopPicks", themeMode);
    }
  };

  return (
    media ? (
      <>
        <ImageHeader imgPath={tmdbConfigs.backdropPath(media.backdrop_path || media.poster_path)} />
        <Box sx={{
          color: "primary.contrastText",
          ...uiConfigs.style.mainContent
        }}>
          {/* media content */}
          <Box sx={{
            marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" }
          }}>
            <Box sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" }
            }}>
              {/* poster */}
              <Box sx={{
                width: { xs: "70%", sm: "50%", md: "40%" },
                margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" }
              }}>
                <Box sx={{
                  paddingTop: "140%",
                  ...uiConfigs.style.backgroundImage(tmdbConfigs.posterPath(media.poster_path || media.backdrop_path))
                }} />
              </Box>
              {/* poster */}

              {/* media info */}
              <Box sx={{
                width: { xs: "100%", md: "60%" },
                color: "text.primary"
              }}>
                <Stack spacing={5}>
                  {/* title */}
                  <Typography
                    variant="h4"
                    fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                    fontWeight="700"
                    sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                  >
                    {`${media.title || media.name} ${mediaType === tmdbConfigs.mediaType.movie ? media.release_date.split("-")[0] : media.first_air_date.split("-")[0]}`}
                  </Typography>
                  {/* title */}

                  {/* rate and genres */}
                  <Stack direction="row" spacing={1} alignItems="center">
                    {/* rate */}
                    <CircularRate value={media.vote_average} />
                    {/* rate */}
                    <Divider orientation="vertical" />
                    {/* genres */}
                    {genres.map((genre, index) => (
                      <Chip
                        label={genre.name}
                        variant="filled"
                        color="primary"
                        key={index}
                      />
                    ))}
                    {/* genres */}
                  </Stack>
                  {/* rate and genres */}

                  {/* overview */}
                  <Typography
                    variant="body1"
                    sx={{ ...uiConfigs.style.typoLines(5) }}
                  >
                    {media.overview}
                  </Typography>
                  {/* overview */}

                  {/* buttons */}
                  <Stack direction="row" spacing={1}>
                    <LoadingButton
                      variant="text"
                      sx={{
                        width: "max-content",
                        "& .MuiButon-starIcon": { marginRight: "0" }
                      }}
                      size="large"
                      startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
                      loadingPosition="start"
                      loading={onRequest}
                      onClick={onFavoriteClick}
                    />
                    <LoadingButton
                      variant="text"
                      sx={{
                        width: "max-content",
                        "& .MuiButon-starIcon": { marginRight: "0" }
                      }}
                      size="large"
                      startIcon={isTopPick ? <StarIcon /> : <StarBorderOutlinedIcon />}
                      loadingPosition="start"
                      loading={onRequest}
                      onClick={onTopPickClick}
                    />
                    <Button
                      variant="contained"
                      sx={{ width: "max-content" }}
                      size="large"
                      startIcon={<PlayArrowIcon />}
                      onClick={() => videoRef.current.scrollIntoView()}
                    >
                      watch now
                    </Button>
                  </Stack>
                  {/* buttons */}

                   {/* cast */}
                   <Container header="Cast">
                    <CastSlide casts={media.credits.cast} />
                  </Container>
                  {/* cast */}

                </Stack>
              </Box>
              {/* media info */}
            </Box>
          </Box>
          {/* media content */}

           {/* media videos */}
           <div ref={videoRef} style={{ paddingTop: "2rem" }}>
            <Container header="Videos">
              <MediaVideosSlide videos={[...media.videos.results].splice(0, 5)} />
            </Container>
          </div>
          {/* media videos */}

          {/* media backdrop */}
          {media.images.backdrops.length > 0 && (
            <Container header="backdrops">
              <BackdropSlide backdrops={media.images.backdrops} />
            </Container>
          )}
          {/* media backdrop */}

          {/* media posters */}
          {media.images.posters.length > 0 && (
            <Container header="posters">
              <PosterSlide posters={media.images.posters} />
            </Container>
          )}
          {/* media posters */}

          {/* media reviews */}
          <MediaReview reviews={media.reviews} media={media} mediaType={mediaType} />
          {/* media reviews */}

          {/* media recommendation */}
          <Container header="you may also like">
            {media.recommend.length > 0 && (
              <RecommendSlide medias={media.recommend} mediaType={mediaType} />
            )}
            {media.recommend.length === 0 && (
              <MediaSlide
                mediaType={mediaType}
                mediaCategory={tmdbConfigs.mediaCategory.top_rated}
              />
            )}
          </Container>
          {/* media recommendation */}


        </Box>
      </>
    ) : null
  );
};

export default MediaDetail;