import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { formsApi } from "./services/forms";
import { authApi } from "./services/auth";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [formsApi.reducerPath]: formsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(formsApi.middleware, authApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
