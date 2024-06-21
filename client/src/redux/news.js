import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    query: "",
};

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.query = action.payload;
        },
        clearSearch: (state) => {
            state.query = "";
        }
    }
})

export const {setSearch, clearSearch} = searchSlice.actions;
export const selectSearchQuery = (state) => state.search.query;

export default searchSlice.reducer;