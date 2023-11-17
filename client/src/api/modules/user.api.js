import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userEndpoints = {
    singing : "user/signin",
    signup :  "user/singup",
    getInfo : "user/info",
    passwordUpdate: "user/update-password", 
}

const userApi = {
    singin : async ({username,password}) =>{
        try{
            const response = await publicClient.post(
                userEndpoints.singing,
                {username,password}
            );
            return {response}; 
        }catch(err) {return {err}};
    },
    signup :async ({username,password, confirmPassword, displayName}) =>{
        try{
            const response = await publicClient.post(
                userEndpoints.signup,
                {username,password, confirmPassword, displayName}
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
    }   
};

export default userApi;