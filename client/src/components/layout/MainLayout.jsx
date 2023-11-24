import React from "react";
import {Outlet} from "react-router-dom"
import {Box} from "@mui/material";
import GlobalLoading from "../common/GlobalLoading";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";
import AuthModal from "../common/AuthModal";

const MainLayout = () => {
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