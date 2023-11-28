import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userEndpoints = {
    singing : "/user/signin",
    signup :  "/user/signup",
    getInfo : "/user/info",
    passwordUpdate: "/user/update-password", 
    updateUserDetails : "/user/updateUserDetails", 
}

const userApi = {
    signin : async ({username,password}) =>{
        try{
            const response = await publicClient.post(
                userEndpoints.singing,
                {username,password}
            );
            return {response}; 
        }catch(err) {return {err}};
    },
    signinGoogle : async ({googleAccessToken}) =>{
        try{
            const response = await publicClient.post(
                userEndpoints.singing,
                {googleAccessToken : googleAccessToken}
            );
            return {response}; 
        }catch(err) {return {err}};
    },
    signup : async ({username,password, confirmPassword, displayName ,gender, country, dateOfBirth}) =>{
        try{
            const response = await publicClient.post(
                userEndpoints.signup,
                {username,password, confirmPassword, displayName,gender, country, dateOfBirth}
            );
            return {response};
        }catch(err) {return {err}};
    },
    signupGoogle : async ({googleAccessToken}) =>{
        try{
            const response = await publicClient.post(
                userEndpoints.signup,
                {googleAccessToken : googleAccessToken}
            );
            return {response};
        }catch(err) {return {err}};
    },
    getInfo :async () =>{
        try{
            const response = await privateClient.get(userEndpoints.getInfo);
            return {response};
        }catch(err) {return {err}};
    },
    passwordUpdate :async ({password, newPassword, confirmNewPassword}) =>{
        try{
            const response = await privateClient.put(
                userEndpoints.passwordUpdate,
                {password, newPassword, confirmNewPassword}
            );
            return {response};
        }catch(err) {return {err}};
    },
    updateUserDetail : async ({displayName, country, dateOfBirth, gender}) => {
        try{
            const response = await privateClient.put(
                userEndpoints.updateUserDetails,
                {displayName, country, dateOfBirth, gender}
            )
            return {response};
        } catch(err) {return {err}};
    }
};

export default userApi;