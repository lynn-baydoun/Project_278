import axiosClient from '../axios/axios.client.js';

const secondPartyLogin = {
    singinWithGoogle : ({googleAccessToken}) => {
        axiosClient.getWithAuthentication("https://www.googleapis.com/oauth2/v3/userinfo", googleAccessToken);
    }
}

export default secondPartyLogin;