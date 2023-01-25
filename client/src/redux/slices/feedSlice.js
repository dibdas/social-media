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

export const followAndUnfollow = createAsyncThunk(
  "user/followAndUnfollow",
  async (body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const followUnfollowResponse = await axiosClient.post(
        "user/follow",
        body
      );
      console.log("follow slice", followUnfollowResponse);
      console.log("body", body);
      return followUnfollowResponse.user;
    } catch (err) {
      // console.log(err);
      return Promise.reject(err);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

const feedSlice = createSlice({
  name: "feedSlice",
  initialState: {
    feedData: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedData.fulfilled, (state, action) => {
        state.feedData = action.payload;
        console.log(state.feedData);
      })
      .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
        const post = action.payload.post;
        // console.log(state?.feedData?.fullModifiedPostsOfFollowings.length);
        console.log("post", post);
        const index = state?.feedData?.fullModifiedPostsOfFollowings?.findIndex(
          (item) => item._id === post._id
        );
        console.log(`feed slice`, index);
        if (index !== undefined && index !== -1) {
          state.feedData.fullModifiedPostsOfFollowings[index] = post;
        }
      })

      .addCase(followAndUnfollow.fulfilled, (state, action) => {
        const user = action.payload;

        console.log(user._id);

        const indexInsideFollowings = state?.feedData?.followings?.findIndex(
          (item) => item._id === user._id
        );
        console.log("indexInsideFollowings", indexInsideFollowings);
        const indexInsideSuggesstion =
          state?.feedData?.suggestionUsers?.findIndex(
            (item) => item._id === user._id
          );
        console.log("indexInsideSuggestion", indexInsideSuggesstion);

        // if index is not -1 then the user is present in the following list , so need to unfollow
        if (indexInsideFollowings === -1) {
          // when the user is not present in the followings
          console.log("doing follow operation");
          state?.feedData?.followings?.push(user);
          state?.feedData?.suggestionUsers?.splice(indexInsideSuggesstion, 1);
        } else {
          // when user present in the following unfollow it
          console.log("doing unfollow operation");
          state?.feedData?.followings?.splice(indexInsideFollowings, 1);
          state?.feedData?.suggestionUsers?.push(user);
        }
      });
  },
});

export default feedSlice.reducer;
