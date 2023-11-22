import { createTheme} from "@mui/material/styles"; 
import {colors} from "@mui/material";

export const themeModes = {
    dark : "dark",
    light : "light"
}

const getCustomPallete = (mode) =>{
    let customPallete = {}
    if(mode === themeModes.dark) {
        return customPallete = {
            primary : {
                main :"#ff0000",
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
    return customPallete = {
        primary : {
            main :"#ff0000",
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