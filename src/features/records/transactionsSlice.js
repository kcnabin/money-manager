import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getInitialData } from '../../services/dbServices'

const initialState = {
  incomeList: [],
  expensesList: [],
  incomeRecords: [],
  expensesRecords: [],
  loading: false,
  error: ''
}

export const fetchInitialData = createAsyncThunk('transactions/fetchInitialData', async () => {
  try {
    const fetchedData = await getInitialData()
    if (fetchedData) {
      return fetchedData
    }
  } catch (e) {
    console.log('Error fetching initial data')
    console.log(e)
  }
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
      // default income & expenses list when database is not connected
      state.incomeList = ['Salary', 'Interest', 'Allowances']
      state.expensesList = ['Rent', 'Food', 'Vehicle']
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