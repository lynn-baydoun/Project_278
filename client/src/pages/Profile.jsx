import { LoadingButton } from "@mui/lab";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import {Typography, TextField} from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

import EditIcon from '@mui/icons-material/Edit';

import { notifyError, notifySuccess } from "../utils/notification";
import userApi from "../api/modules/user.api";

import Container from "../components/common/Container";
import uiConfigs from "../configs/ui.configs";
import "./style.css";

const Profile = () => {
  const {user} = useSelector ((state) => state.user); 
  const {themeMode} = useSelector ( (state)=>  state.themeMode);
  const [editMode, setEditMode] = useState(false)
  const [onRequest, setOnRequest] = useState(false);

  const [content, setContent] = useState({
    displayName : user.displayName,
    country : user.country,
    dateOfBirth: user.dateOfBirth.toString().substring(0,10),
    gender : user.gender
  })

  const onAddReview = async () => {
    if (onRequest) return;
    setOnRequest(true);
    const { response, err } = await userApi.updateUserDetail(content); 
    setOnRequest(false);

    if (err) notifyError(err.message);
    if (response) {
      notifySuccess("Post review success", themeMode);
    }
  };


  return (
    
    <Box sx={{ ...uiConfigs.style.mainContent }}>

      <Button
              //variant="contained"
              startIcon={<EditIcon />}
              sx={{
                //display: { xs: "none", md: "flex" },
                position: "absolute",
                top: "150px",
                left: "20x",
              }}
              onClick ={ () =>{
                  setEditMode(!editMode )
                }
              }
      >Edit</Button>

      <Container header={`Profile Pic `}>
      </Container>

      <Container header={`Display Name `}>
        {!editMode && <Typography fontWeight="700" variant="h5">
          {user.displayName}
        </Typography>}
        {editMode && 
        <TextField
            value= {content.displayName}
            onChange= { (e) => {
                setContent({
                  ...content, 
                  displayName: e.target.value
                });
              }
            }
            multiline
            rows={4}
            placeholder="edit user name"
            variant="outlined"
        />
      }
      </Container>
      
      <Container header={`Country `}>
        {!editMode && <Typography fontWeight="700" variant="h5">
          {user.country}
        </Typography>}
        {editMode && 
        <TextField
            value= {content.country}
            onChange= { (e) => {
                setContent({
                  ...content, 
                  country: e.target.value
                });
              }
            }
            multiline
            rows={4}
            placeholder="edit user name"
            variant="outlined"
        />
      } 
      </Container>
      <Container header={`Date of birth `}>
        { !editMode && <Typography fontWeight="700" variant="h5">
          {user.dateOfBirth.toString().substring(0,10)}
        </Typography>}
        {editMode && 
        <TextField
            type ="date"
            value= {content.dateOfBirth}
            onChange= { (e) => {
                setContent({
                  ...content, 
                  dateOfBirth: e.target.value
                });
              }
            }
            placeholder="edit date of birth"
            variant="outlined"
        />
        
      } 
      {editMode && <LoadingButton
          variant="contained"
          size="large"
            sx={{ width: "max-content" }}
            startIcon={<SendOutlinedIcon />}
            loadingPosition="start"
            loading={onRequest}
            onClick={onAddReview}
      >post</LoadingButton>}

      </Container>
      <Container header={`Gender `}>
        <Typography fontWeight="700" variant="h5">
          {user.gender}
        </Typography>
      </Container>
      <Container header={`Joined at `}>
        <Typography fontWeight="700" variant="h5">
          {user.createdAt.toString().substring(0,10)}
        </Typography>
      </Container>

    </Box>
  );
};

export default Profile;

