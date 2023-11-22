import {createSlice} from "@reduxjs/toolkit";
import { pureFinalPropsSelectorFactory } from "react-redux/es/connect/selectorFactory";

export const appStateSlice = createSlice({
    name: "AppState",
    initialState: {
        appState : ""
    },
    reducers: {
        setAppState: (state, action) => {
            state.appState = action.payload;
        }
    }
});

export const {
    setAppState,
} = appStateSlice.actions;

export default appStateSlice.reducer;

