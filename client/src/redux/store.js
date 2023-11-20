import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
import themeModeSlice from "./Slices/themeModeSlice";
import appStateSlice from "./Slices/appStateSlice";
import authModalSlice from "./Slices/authModalSlice";
import globalLoadingSlice from "./Slices/globalLoadingSlice";


const store = configureStore({
    reducer: {
        user: userSlice,
        themeMode: themeModeSlice,
        appState: appStateSlice,
        globalLoading : globalLoadingSlice,
        authModal : authModalSlice
    }
}); 

 export default store;
