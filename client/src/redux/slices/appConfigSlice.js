import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../utils/axiosClient";
// user/getMyInfo is the name of the async thunk,
// body-> pass any data inside body
// thunkAPI-> with the help of thunk API ,we can dispatch other actions through one dispatcher,so
// basically through one action we can dispatch other actions , by using thunkAPI
export const getMyInfo = createAsyncThunk(
  "/users/getMyInfo",
  async (body, thunkAPI) => {
    try {
      // dispatching the setLoading action
      thunkAPI.dispatch(setLoading(true));
      console.log("asyncthunk");
      const responseAsyncThunk = await axiosClient.get("/users/getMyInfo");
      console.log(
        `api called from getInfo configSlice`,
        responseAsyncThunk.data.result
      );
      // return statement goes to the extraReducers build addCase getInfo fulfilled in the
      //  action.payload
      // returning  the action.payload
      return responseAsyncThunk.data.result;
    } catch (err) {
      // if data does not come we can throw the error
      console.log(err);
      return Promise.reject(err);
    } finally {
      // dispatching another action from here
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
export const updateMyProfile = createAsyncThunk(
  "user/updateMyProfile",
  async (body, thunkAPI) => {}
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
      console.log(state.isLoading);
      console.log(action.payload);
    },
  },
  // you need to pass or add extraReducer , when we introduce  asyncthunk in it
  // pending or rejected state can also be handled
  extraReducers: (builder) => {
    // when builder.addcase is getting fulfilled then  we want whatever data we get ,it should be saved
    // in the profile
    builder.addCase(getMyInfo.fulfilled, (state, action) => {
      console.log(action.payload.user);
      // after getting from the above and it comes inside the action.payload , we update the
      // myProfile state
      state.myProfile = action.payload.user;
    });
  },
});

export default appConfigSlice.reducer;
export const { setLoading } = appConfigSlice.actions;
