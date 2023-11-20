import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import themeConfigs from "./configs/theme.configs";
const App = () => {
  const {themeMode} = useSelector((state) => state.themeMode);
  return (
    <ThemeProvider theme = {themeConfigs.custom({mode : themeMode})}> 
    {/* config toastify*/}
    <ToastContainer>
      position = "bottom-left";
      autoClose = {5000}
      hideProgressBar = {false}
      newestOnTop = {false}
      closeOnClick
      pauseOnFocusLoss
      pauseOnHover
      theme={themeMode}
    </ToastContainer>
    </ThemeProvider>
  );
}

export default App;
