import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const incomeListUrl = 'http://localhost:3001/api/incomeList'
const expensesListUrl = 'http://localhost:3001/api/expensesList'
const incomeRecordsUrl = 'http://localhost:3001/api/incomeRecords'
const expensesRecordUrl = 'http://localhost:3001/api/expensesRecords'

export const getInitialData = async () => {
  const incomeRecords = await axios.get(incomeRecordsUrl)
  const expensesRecords = await axios.get(expensesRecordUrl)
  const incomeList = await axios.get(incomeListUrl)
  const expensesList = await axios.get(expensesListUrl)

  const newIncomeList = incomeList.data.map(eachIncome => eachIncome.name)
  const newExpensesList = expensesList.data.map(eachExpense => eachExpense.name)

  return {
    incomeRecords: incomeRecords.data,
    expensesRecords: expensesRecords.data,
    incomeList: newIncomeList,
    expensesList: newExpensesList
  }
}

export const saveIncome = async (newIncome) => {
  const savedIncome = await axios.post(incomeRecordsUrl, newIncome)
  return savedIncome.data
}

export const saveExpenses = async (newExpenses) => {
  const savedExpenses = await axios.post(expensesRecordUrl, newExpenses)
  return savedExpenses.data
}

export const addNewIncome = async (newIncome) => {
  const savedNewIncome = await axios.post(incomeListUrl, {name: newIncome, id: uuidv4()})
  return savedNewIncome.data.name
}

export const addNewExpenses = async (newExpenses) => {
  const savedNewExpenses = await axios.post(expensesListUrl, {name: newExpenses, id: uuidv4()})
  return savedNewExpenses.data.name
}

export const updateRecord = async (updatedRecord) => {
  const newUrl = updatedRecord.category.toLowerCase() === 'income'
    ? `${incomeRecordsUrl}/${updatedRecord.id}`
    : `${expensesRecordUrl}/${updatedRecord.id}`
  const returnedRecord = await axios.patch(newUrl, updatedRecord)

  return returnedRecord.data
}

export const deleteRecord = async (id, category) => {
  const newUrl = category.toLowerCase() === 'income'
    ? `${incomeRecordsUrl}/${id}`
    : `${expensesRecordUrl}/${id}`

  await axios.delete(newUrl)
}