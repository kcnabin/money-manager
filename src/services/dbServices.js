import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const incomeListUrl = 'http://localhost:3001/api/incomeList'
const expensesListUrl = 'http://localhost:3001/api/expensesList'
const incomeRecordsUrl = 'http://localhost:3001/api/incomeRecords'
const expensesRecordsUrl = 'http://localhost:3001/api/expensesRecords'

export const getInitialData = async (id) => {
  const incomeRecords = await axios.get(`${incomeRecordsUrl}/${id}`)
  const expensesRecords = await axios.get(`${expensesRecordsUrl}/${id}`)
  const incomeList = await axios.get(incomeListUrl)
  const expensesList = await axios.get(expensesListUrl)

  const newIncomeList = incomeList.data.map(eachIncome => eachIncome.name)
  const newExpensesList = expensesList.data.map(eachExpense => eachExpense.name)

  const dataFromDB = {
    incomeList: newIncomeList,
    expensesList: newExpensesList,
    incomeRecords: incomeRecords.data,
    expensesRecords: expensesRecords.data
  }
  console.log('db services', dataFromDB)
  return dataFromDB
}

const getConfig = (token) => {
  console.log('Token: ', token)
  return {
    headers: {Authorization: token}
  }
}

export const saveIncome = async (newIncome, token) => {
  const savedIncome = await axios.post(incomeRecordsUrl, newIncome, getConfig(token))
  return savedIncome.data
}

export const saveExpenses = async (newExpenses, token) => {
  const savedExpenses = await axios.post(expensesRecordsUrl, newExpenses, getConfig(token))
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
    : `${expensesRecordsUrl}/${updatedRecord.id}`
  const returnedRecord = await axios.patch(newUrl, updatedRecord)

  return returnedRecord.data
}

export const deleteRecord = async (id, category, token) => {
  const newUrl = category.toLowerCase() === 'income'
    ? `${incomeRecordsUrl}/${id}`
    : `${expensesRecordsUrl}/${id}`

  await axios.delete(newUrl)
}