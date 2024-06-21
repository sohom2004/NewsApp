import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedArticle: {
        title: '', image: '', content: '',
    }
};

const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        setArticle(state, action) {
            state.selectedArticle = action.payload;
        },
    },
});

export const { setArticle } = articleSlice.actions;
export default articleSlice.reducer;
