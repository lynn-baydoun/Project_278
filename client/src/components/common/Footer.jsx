import { Paper, Stack, Button, Box } from '@mui/material';
import React from 'react';
import Container from './Container';
import Logo from './Logo';
import menuConfigs from "../../configs/menu.configs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container>
      <Paper square={true} sx={{ backgroundImage: "unset", padding: "2rem" }}>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction={{ xs: "column", md: "row " }}
          sx={{ height: "max-content" }}
        >
          <Logo />
          <Box>
            {menuConfigs.main.map((item, index) => (
              <Button
                key={index}
                sx={{ color: "inherit" }}
                component={Link}
                to={item.path}
              >
                {item.display}
              </Button>
            ))}
            <Button
                key={4}
                sx={{ color: "inherit" }}
                component={Link}
                to={"https://www.imdb.com/pressroom/?ref_=ft_pr"}
              >
                {"Pressroom"}
            </Button>
            <Button
                key={5}
                sx={{ color: "inherit" }}
                component={Link}
                to={"https://www.imdb.com/conditions?ref_=ft_cou"}
              >
                {"Conditions of Use"}
            </Button>
            <Button
                key={6}
                sx={{ color: "inherit" }}
                component={Link}
                to={"https://www.imdb.com/privacy?ref_=ft_pvc"}
              >
                {"Privacy Policy"}
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Footer;