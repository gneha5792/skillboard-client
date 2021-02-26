import { configureStore } from "@reduxjs/toolkit";

// We'll use redux-logger just as an example of adding another middleware
import logger from "redux-logger";

// And use redux-batch as an example of adding enhancers
import { reduxBatch } from "@manaflair/redux-batch";

import rootReducer from "./reducer";

const preloadedState = {};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
  enhancers: [reduxBatch],
});

export default store;
