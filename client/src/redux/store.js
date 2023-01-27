import { configureStore } from "@reduxjs/toolkit";
import appConfigSlice from "./slices/appConfigSlice";
import postsReducer from "./slices/postSlice";
import feedReducer from "./slices/feedSlice";

export default configureStore({
  reducer: {
    appConfigReducer: appConfigSlice,
    postsReducer,
    feedReducer,
  },
});

// export default store;
