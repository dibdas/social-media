import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../utils/axiosClient";
// user/getMyInfo is the name of the async thunk,
// body-> pass any data inside body
// thunkAPI-> with the help of thunk API ,we can dispatch other actions through one dispatcher,so
// basically through one action we can dispatch other actions , by using thunkAPI
export const getMyInfo = createAsyncThunk(
  "/users/getMyInfo",
  // async (body, thunkAPI) => {
  // as body is declared but not used so writing underscrore in place of that "_"
  async (_, thunkAPI) => {
    try {
      // dispatching the setLoading action
      thunkAPI.dispatch(setLoading(true));
      console.log("asyncthunkgetMyInfo");
      const responseAsyncThunk = await axiosClient.get("/users/getMyInfo");

      console.log(`api called from getInfo configSlice`, responseAsyncThunk);
      // return statement goes to the extraReducers build addCase getInfo fulfilled in the
      //  action.payload
      // returning  the action.payload
      return responseAsyncThunk;
    } catch (err) {
      // if data does not come we can throw the error
      // console.log(err);
      return Promise.reject(err);
    } finally {
      // dispatching another action from here
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
export const updateMyProfile = createAsyncThunk(
  "user/updatemyprofile",
  async (body, thunkAPI) => {
    try {
      console.log(`asynsthunupdate myInfo`);
      thunkAPI.dispatch(setLoading(true));
      const responseUpdateProfileThunk = await axiosClient.put(
        "user/updatemyprofile",
        // inside the body we pass name bio and userImage
        body
      );
      console.log(responseUpdateProfileThunk);
      //getting the updated profile containes updated data
      // when we get the response of the updated profile data we update my profile with action.payload

      return responseUpdateProfileThunk.result;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

const appConfigSlice = createSlice({
  name: "appConfigSlice",
  // initialState can accessed anywhre inside the app a
  initialState: {
    isLoading: false,
    myProfile: {},
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      // console.log(state.isLoading);
      // console.log(action.payload);
    },
  },
  // you need to pass or add extraReducer , when we introduce  asyncthunk in it
  // pending or rejected state can also be handled
  extraReducers: (builder) => {
    // when builder.addcase is getting fulfilled then  we want whatever data we get ,it should be saved
    // in the profile
    builder
      .addCase(getMyInfo.fulfilled, (state, action) => {
        console.log(action.payload);
        // after getting from the above and it comes inside the action.payload , we update the
        // myProfile state
        state.myProfile = action.payload;
      })
      .addCase(updateMyProfile.fulfilled, (state, action) => {
        state.myProfile = action.payload.user;
      });
  },
});

export default appConfigSlice.reducer;
export const { setLoading } = appConfigSlice.actions;
