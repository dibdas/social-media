import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../utils/axiosClient";
import { setLoading } from "./appConfigSlice";
import { likeAndUnlikePost } from "./postSlice";

export const getFeedData = createAsyncThunk("get/feed", async (_, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true));
    console.log("getFedd data ");
    const getFeedResponse = await axiosClient.get("user/getfeed");
    console.log(getFeedResponse);
    return getFeedResponse;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  } finally {
    thunkAPI.dispatch(setLoading(false));
  }
});
const feedSlice = createSlice({
  name: "feedSlice",
  initialState: {
    feedData: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedData.fulfilled, (state, action) => {
        state.feedData = action.payload;
      })
      .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
        const post = action.payload;
      });
  },
});

export default feedSlice.reducer;
