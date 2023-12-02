import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "User",
    initialState: {
        user: null,
        listFavorites : [],
        listTopPicks : []
    },
    reducers: {
        setUser: (state, action) => {
            if(action.payload === null) 
                localStorage.removeItem("actkn")
            else if(action.payload.token) 
                localStorage.setItem("actkn",action.payload.token)
            state.user = action.payload;
        },
        setListFavorites: (state, action) => {
            state.listFavorites = action.payload;
        },
        removeFavorite: (state, action) => {
            const {mediaId} = action.payload;
            state.listFavorites =  [...state.listFavorites].filter(f => f.mediaId.toString() !== mediaId.toString());
        },
        addFavorite: (state, action) => {
            state.listFavorites = [action.payload, ...state.listFavorites]
        },
        setListTopPicks: (state, action) => {
            state.listTopPicks = action.payload;
        },
        removeTopPick: (state, action) => {
            const {mediaId} = action.payload;
            state.listTopPicks =  [...state.listTopPicks].filter(f => f.mediaId.toString() !== mediaId.toString());
        },
        addTopPick: (state, action) => {
            state.listTopPicks = [action.payload, ...state.listTopPicks]
        }
    }
})

export const {
    setUser,
    setListFavorites,
    removeFavorite,
    addFavorite,
    setListTopPicks,
    removeTopPick,
    addTopPick
} = userSlice.actions;

export default userSlice.reducer;