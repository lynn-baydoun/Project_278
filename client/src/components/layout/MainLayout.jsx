import React from "react";
import {Outlet} from "react-router-dom"
import {Box} from "@mui/material";
import GlobalLoading from "../common/GlobalLoading";
import Footer from "../common/Footer";
import TopBar from "../common/UserMenu";

const MainLayout = () => {
    return (
        <>
            {/* Global Loading*/}
            <GlobalLoading />
            {/* Global Loading*/}

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