import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import userApi from "../../api/modules/user.api";
import { setAuthModalOpen } from "../../redux/Slices/authModalSlice";
import { setUser } from "../../redux/Slices/userSlice";
import { useSelector } from 'react-redux';

import { notifySuccess } from '../../utils/notification';


const SignupForm = ({ switchAuthState }) => {

  const { themeMode } = useSelector((state) => state.themeMode); 
  
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signupForm = useFormik({
    initialValues: {
      username: "",
      displayName :"",
      country : "",
      dateOfBirth : "",
      gender :"",
      password: "",
      confirmPassword : ""
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "username minimum 8 characters")
        .required("username is required"),
      password: Yup.string()
        .min(8, "password minimum 8 characters")
        .required("password is required"),
      confirmPassword : Yup.string()
        .oneOf([Yup.ref("password")], "passwords do not match")
        .required("passwords do not match"),
      displayName: Yup.string()
        .min(8, "displayName minimum 8 characters")
        .required("displayName is required"),
      country :   Yup.string()
        .min(2, "displayName minimum 2 characters")
        .required("displayName is required"),
      dateOfBirth : Yup.date()
        .nullable()
        .transform((originalValue, originalObject) => {
          // Transform empty strings to null (if needed)
        return originalValue === '' ? null : originalValue;
        })
        .typeError('Invalid date format')
        .required('Date of birth is required'),
      gender : Yup.string()
        .oneOf(['male', 'female'], 'Gender must be either "male" or "female"')
        .required('Gender is required'),
    }),
    onSubmit: async values => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      console.log(values);
      const { response, err } = await userApi.signup(values);
      setIsLoginRequest(false);

      if (response) {
        signupForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        
        notifySuccess("Sign up successful",themeMode);
      }

      if (err) setErrorMessage(err.message);
    }
  });

  return (
    
    <Box component="form" onSubmit={signupForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="username"
          name="username"
          fullWidth
          value={signupForm.values.username}
          onChange={signupForm.handleChange}
          color="success"
          error={signupForm.touched.username && signupForm.errors.username !== undefined}
          helperText={signupForm.touched.username && signupForm.errors.username}
        />
        <TextField
          type="text"
          placeholder="display name"
          name="displayName"
          fullWidth
          value={signupForm.values.displayName}
          onChange={signupForm.handleChange}
          color="success"
          error={signupForm.touched.displayName && signupForm.errors.displayName !== undefined}
          helperText={signupForm.touched.displayName && signupForm.errors.displayName}
        />
        <TextField
          type="text"
          placeholder="country"
          name="country"
          fullWidth
          value={signupForm.values.country}
          onChange={signupForm.handleChange}
          color="success"
          error={signupForm.touched.country && signupForm.errors.country !== undefined}
          helperText={signupForm.touched.country && signupForm.errors.country}
        />
        <TextField
          type="text"
          placeholder="gender"
          name="gender"
          fullWidth
          value={signupForm.values.gender}
          onChange={signupForm.handleChange}
          color="success"
          error={signupForm.touched.gender && signupForm.errors.gender !== undefined}
          helperText={signupForm.touched.gender && signupForm.errors.gender}
        />
        <TextField
          type="date"
          placeholder="date of birth"
          name="dateOfBirth"
          fullWidth
          value={signupForm.values.dateOfBirth}
          onChange={signupForm.handleChange}
          color="success"
          error={signupForm.touched.dateOfBirth && signupForm.errors.dateOfBirth !== undefined}
          helperText={signupForm.touched.dateOfBirth && signupForm.errors.dateOfBirth}
        />
        <TextField
          type="password"
          placeholder="password"
          name="password"
          fullWidth
          value={signupForm.values.password}
          onChange={signupForm.handleChange}
          color="success"
          error={signupForm.touched.password && signupForm.errors.password !== undefined}
          helperText={signupForm.touched.password && signupForm.errors.password}
        />
        <TextField
          type="password"
          placeholder="confirm password"
          name="confirmPassword"
          fullWidth
          value={signupForm.values.confirmPassword}
          onChange={signupForm.handleChange}
          color="success"
          error={signupForm.touched.confirmPassword && signupForm.errors.confirmPassword !== undefined}
          helperText={signupForm.touched.confirmPassword && signupForm.errors.confirmPassword}
        />
      </Stack>

      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}
      >
        sign up
      </LoadingButton>

      <Button
        fullWidth
        sx={{ marginTop: 1 }}
        onClick={() => switchAuthState()}
      >
        sign in
      </Button>
{/* Same as */}

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined" >{errorMessage}</Alert>
        </Box>
      )}
    </Box>
    
  );
};

export default SignupForm;