import { configureStore } from "@reduxjs/toolkit";
import { addToCart, totalCost } from "./reducers/cartAction";
import { addToFavCart } from "./reducers/favCartAction";
import { searchToggle } from "./reducers/searchTriggered";
import { themeToggle } from "./reducers/themeToggle";
import { orderData } from "./reducers/orderAction";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { screenSize } from "./reducers/responsive";
import { combineReducers } from "redux";

import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  addToCart,
  addToFavCart,
  totalCost,
  searchToggle,
  themeToggle,
  orderData,
  screenSize
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
