import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalOpen } from "../../redux/Slices/authModalSlice";

import Logo from "./Logo";
import SigninForm from "./SigninForm";
import SignupForm from "./SingupForm";

// Possible states : either the user is signed in or signed out 
// used to determine whether to show the sign in botton or other components

const actionState = {
  signin: "signin",
  signup: "signup"
};

const AuthModal = () => {
  const { authModalOpen } = useSelector((state) => state.authModal);

  const dispatch = useDispatch();

  const [action, setAction] = useState(actionState.signup);

  useEffect(() => {
    if (authModalOpen) setAction(actionState.signin);
  }, [authModalOpen]);

  const handleClose = () => dispatch(setAuthModalOpen(false));

  const switchAuthState = (state) => setAction(state);

  return (
    <Modal open={authModalOpen} onClose={handleClose}>
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        maxWidth: "600px",
        padding: 4,
        outline: "none"
      }}>
        <Box sx={{ padding: 4, boxShadow: 24, backgroundColor: "background.paper" }}>
          
          <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
            <Logo />
          </Box>

          {/* Sign in Component */}

          {
            action === actionState.signin && 
            <SigninForm switchAuthState= { 
                ()=>{
                  switchAuthState(actionState.signup)
                }
            }/>
          }

          {/* Sign in Component */}

          {/* Sign out Component */}

          {
            action === actionState.signup &&
            <SignupForm switchAuthState={
              () => switchAuthState(actionState.signin)
            }/> 
          }
          {/* Sign in Component */}

        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;