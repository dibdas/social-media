import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../utils/axiosClient";
import { setLoading } from "./appConfigSlice";

export const getUserProfile = createAsyncThunk(
  "user/profile",
  async (body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      console.log(`get user profile`);
      const getUserProfileResponse = await axiosClient.post(
        "user/profile",
        body
      );
      console.log(`getUserProfileResponse`, getUserProfileResponse);
      return getUserProfileResponse;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const likeAndUnlikePost = createAsyncThunk(
  "post/likeUnlike",
  async (body, thunkAPI) => {
    try {
      const likeUnlikeResponse = await axiosClient.post("post/like", body);
      console.log(`likeunlike`, likeUnlikeResponse);
      return likeUnlikeResponse;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

const postSlice = createSlice({
  name: "postSlice",
  initialState: {
    userProfile: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        console.log(action.payload);
        state.userProfile = action.payload;
      })
      // in order to like the post in the runtime , so here we will check whether the post is there
      // in the userProfile , and then like the post , therefore update the likes array
      .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
        // we get the post inside the action payload
        const post = action.payload.post;
        console.log(post._id);
        // checking whether the post present inside the userProfile modifiedPost or not
        // where isLiked and likesCount is present
        // thats why finding the index
        const index = state.userProfile.modifiedPosts.findIndex(
          (item) => item._id === post._id
        );
        console.log(`like slice ${index}`);
        // it means post is found so checking whether the index ids -1 or not
        // if index is -1 post not found
        if (index !== -1) {
          // updating that index post means that particular post with this new value of post such
          // that likeCount and isLiked is getting updated
          state.userProfile.modifiedPosts[index] = post;
        }
      });
  },
});

export default postSlice.reducer;
