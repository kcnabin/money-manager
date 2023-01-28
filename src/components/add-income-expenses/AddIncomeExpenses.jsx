import { useState } from 'react'
import { Stack } from '@mui/material'

import Title from './components/Title'
import SelectMainCategory from './components/SelectMainCategory'
import DisplaySubCategory from './components/DisplaySubCategory'
import AddNewCategory from './components/AddNewCategory';

const AddIncomeExpenses = () => {
  const [category, setCategory] = useState('')
  const [expenses, setExpenses] = useState('')
  
  const [showAddCategory, setShowAddCategory] = useState(false)

  const arrayOfExpensesList = ['Rent', 'Food', 'Travel', 'Medicine', 'Emergency', 'Vehicle', 'Insurance', 'Installment']
  // const arrayOfIncomeList = ['Salary', 'Interest', 'Daily Allowances', 'Others']

  const [expensesList, setExpensesList] = useState(arrayOfExpensesList)
  // const [incomeList, setIncomeList] = useState(arrayOfIncomeList)

  return (
      <Stack spacing={2}>
        <Title />
        <SelectMainCategory category={category} setCategory={setCategory} />
        <DisplaySubCategory 
          expenses={expenses} 
          setExpenses={setExpenses} 
          expensesList={expensesList} 
        />
        <AddNewCategory 
          showAddCategory={showAddCategory} 
          setShowAddCategory={setShowAddCategory} 
          setExpensesList={setExpensesList} 
          expensesList={expensesList} 
        />
      </Stack>
  )
}

export default AddIncomeExpenses