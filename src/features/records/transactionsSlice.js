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


export const fetchInitialData = createAsyncThunk('transactions/fetchInitialData', async (id) => {
    const fetchedData = await getInitialData(id)
    console.log('fetchedData', fetchedData)
    return fetchedData
})

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addToIncomeList: (state, action) => {
      return {...state, incomeList: [...state.incomeList, action.payload] }
    },
    addToExpensesList: (state, action) => {
      return {...state, expensesList: [...state.expensesList, action.payload]}
    },
    addIncomeRecords: (state, action) => {
      return {...state, incomeRecords: [...state.incomeRecords, action.payload]}
    },
    addExpensesRecords: (state, action) => {
      return {...state, expensesRecords: [...state.expensesRecords, action.payload]}
    },
    deleteIncomeRecord: (state, action) => {
      return {...state, incomeRecords : state.incomeRecords.filter(eachRecord => eachRecord.id !== action.payload)}
    },
    deleteExpensesRecord: (state, action) => {
      return {...state, expensesRecords: state.expensesRecords.filter(eachRecord => eachRecord.id !== action.payload) }
    },
    updateIncomeRecords: (state, action) => {
      return {
        ...state, incomeRecords: state.incomeRecords.map(eachRecord => eachRecord.id !== action.payload.id ? eachRecord : action.payload)
      }
    },
    updateExpensesRecord: (state, action) => {
      return {
        ...state, expensesRecords: state.expensesRecords.map(eachRecord => eachRecord.id !== action.payload.id ? eachRecord : action.payload)
      }
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
      state.incomeList = ['Salary', 'Interest', 'Allowances']
      state.expensesList = ['Rent', 'Food', 'Vehicle']
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
export const {updateIncomeRecords, updateExpensesRecord, addToIncomeList, addToExpensesList, addIncomeRecords, addExpensesRecords, deleteExpensesRecord, deleteIncomeRecord } = transactionsSlice.actions