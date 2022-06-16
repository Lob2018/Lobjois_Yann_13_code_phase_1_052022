import loadingReducer from '../features/loading'
import userReducer from '../features/user'

import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    loading: loadingReducer,
    user: userReducer,
  },
})
