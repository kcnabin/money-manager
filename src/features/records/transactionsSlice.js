import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  incomeList: [],
  expensesList: [],
  incomeRecords: [],
  expensesRecords: [],
  loading: false,
  error: ''
}

export const fetchInitialData = createAsyncThunk('transactions/fetchInitialData', async () => {
  const incomeListUrl = 'http://localhost:3001/incomeList'
  const expensesListUrl = 'http://localhost:3001/expensesList'
  const incomeRecordsUrl = 'http://localhost:3001/incomeRecords'
  const expensesRecordUrl = 'http://localhost:3001/expensesRecords'

  try {
    const incomeRecords = await axios.get(incomeRecordsUrl)
    const expensesRecords = await axios.get(expensesRecordUrl)
    const incomeList = await axios.get(incomeListUrl)
    const newIncomeList = incomeList.data.map(eachIncome => eachIncome.name)
    const expensesList = await axios.get(expensesListUrl)
    return {
      incomeRecords: incomeRecords.data,
      expensesRecords: expensesRecords.data,
      incomeList: newIncomeList,
      expensesList: expensesList.data
    }
  } catch (e) {
    console.log(e)
  }
  

  // try {
  //   const res = await axios.get(baseUrl)
  //   console.log(res.data)
  //   return res.data
  // } catch (e) {
  //   console.log(e)
  // }

})

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addToIncomeList: (state, action) => {
      state.incomeList.push(action.payload)
    },
    addToExpensesList: (state, action) => {
      state.expensesList.push(action.payload)
    },
    addIncomeRecords: (state, action) => {
      state.incomeRecords.push(action.payload)
    },
    addExpensesRecords: (state, action) => {
      state.expensesRecords.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialData.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchInitialData.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
    builder.addCase(fetchInitialData.fulfilled, (state, action) => {
      state.loading = false
      state.error = ''
      state.incomeList = action.payload.incomeList
      state.expensesList = action.payload.expensesList
      state.incomeRecords = action.payload.incomeRecords
      state.expensesRecords = action.payload.expensesRecords
    })
  }
})

export default transactionsSlice.reducer
export const { addToIncomeList, addToExpensesList, addIncomeRecords, addExpensesRecords } = transactionsSlice.actions