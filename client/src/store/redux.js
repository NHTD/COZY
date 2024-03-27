import {configureStore} from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import courseSlice from './course/courseSlice'
import scheduleSlice from './schedule/scheduleSlice';
import userSlice from './user/userSlice';

const commonConfig = {
    key: 'cozy/user',
    storage
}
  
const userConfig = {
    ...commonConfig,
    whitelist: ['isLoggedIn', 'token']
}

export const store = configureStore({
    reducer:{
        course: courseSlice,
        schedule: scheduleSlice,
        user: persistReducer(userConfig, userSlice)
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)