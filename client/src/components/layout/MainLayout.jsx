import React from "react";
import {Outlet} from "react-router-dom"
import {Box} from "@mui/material";
import GlobalLoading from "../common/GlobalLoading";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";
import AuthModal from "../common/AuthModal";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import userApi from "../../api/modules/user.api";
import favoriteApi from "../../api/modules/favorite.api";

import { setListFavorites,setUser } from "../../redux/Slices/userSlice";

const MainLayout = () => {
    const dispatch = useDispatch();
    const {user} = useSelector( (state) => state.user); 
    
    useEffect( () =>{
        const authUser = async () =>{
            const {response , err} = await userApi.getInfo();
            console.log(response);
            if(response) dispatch(setUser(response)); 
            if(err) dispatch(setUser(null));
        }

        authUser();

    },[dispatch])

    // useEffect( () =>{
    //     const getFavco
    // },[user,dispatch])
    return (
        <>
            {/* Global Loading*/}
            <GlobalLoading />
            {/* Global Loading*/}
            
            {/* login modal */}
            <AuthModal/>
            {/* login modal */}

            <Box display="flex" minHeight="100vh">
                {/* header*/}
                <TopBar />
                {/* header */}

                <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">

                <Outlet/>

                </Box>
            </Box>

            {/* footer*/}
            <Footer />
            {/* footer*/}
        </>
    )
};

export default MainLayout;