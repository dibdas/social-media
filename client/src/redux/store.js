import { configureStore } from "@reduxjs/toolkit";
import appConfigSlice from "./slices/appConfigSlice";
import postsReducer from "./slices/postSlice";

export default configureStore({
  reducer: {
    appConfigReducer: appConfigSlice,
    postsReducer,
  },
});

// export default store;
