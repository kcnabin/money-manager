import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  incomeList: ['Salary', 'Interest', 'Allowances'],
  expensesList: ['Rent', 'Food', 'Fuel'],
  incomeRecords: [],
  expensesRecords: []
}

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
  }
})

export default transactionsSlice.reducer
export const { addToIncomeList, addToExpensesList, addIncomeRecords, addExpensesRecords } = transactionsSlice.actions