import { createTheme} from "@mui/material/styles"; 
import {colors} from "@mui/material";

export const themeModes = {
    dark : "dark",
    light : "light"
}

const getCustomPallete = (mode) =>{
    if(mode === themeModes.dark) {
        return {
            primary : {
                main :"#F5C518",
                contrastText: "#ffffff"
            },
            secondary :{
                main :"#f44336",
                contrastText: "#ffffff"
            },
            background : {
                default : "#000000",
                paper: "#131313",
            }
        }
    }
    return {
        primary : {
            main :"#F5C518",
        },
        secondary :{
            main :"#f44336",
        },
        background : {
            default : colors.grey["100"]
        }
    }
}

const themeConfigs = {
    custom : ({mode}) =>{
        return createTheme({
            palette : {
                mode, 
                ...getCustomPallete(mode)
            },
            components : {
                MuiButton : {
                    defaultProps : {disableElevation : true}
                }
            }
        })
    }
}

export default themeConfigs;