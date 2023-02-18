import { configureStore } from "@reduxjs/toolkit"
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REHYDRATE,
	persistReducer,
	persistStore
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { appApi } from "../api/api"
import { rootReducer } from "./root-reducer"

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
}
const persistsReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistsReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE]
    }
  })
  .concat(appApi.middleware)
})

export const persistore = persistStore(store)
export type TypeRootState = ReturnType<typeof rootReducer>