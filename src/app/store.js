import { configureStore } from '@reduxjs/toolkit'
import transactionsReducer from '../features/records/transactionsSlice'

const store = configureStore({
  reducer: {
    transactions: transactionsReducer
  }
})

export default store