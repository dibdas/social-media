import { configureStore } from "@reduxjs/toolkit";
import appConfigSlice from "./slices/appConfigSlice";

export default configureStore({
  reducer: {
    appConfigReducer: appConfigSlice,
  },
});

// export default store;
