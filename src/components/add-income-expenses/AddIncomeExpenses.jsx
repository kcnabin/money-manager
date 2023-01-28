import { useState } from 'react'
import { Stack } from '@mui/material'

import Title from './components/Title'
import SelectMainCategory from './components/SelectMainCategory'
import DisplaySubCategory from './components/DisplaySubCategory'
import AddNewCategory from './components/AddNewCategory';

const AddIncomeExpenses = () => {
  const [category, setCategory] = useState('')
  const [expenses, setExpenses] = useState('')
  const [income, setIncome] = useState('')
  
  const [showAddCategory, setShowAddCategory] = useState(false)

  const arrayOfExpensesList = ['Rent', 'Food', 'Travel', 'Medicine', 'Emergency', 'Vehicle', 'Insurance', 'Installment']
  const arrayOfIncomeList = ['Salary', 'Interest', 'Daily Allowances', 'Others']

  const [expensesList, setExpensesList] = useState(arrayOfExpensesList)
  const [incomeList, setIncomeList] = useState(arrayOfIncomeList)

  const renderSubCategory = () => {
    if (category === 'expenses') {
      return (
        <DisplaySubCategory 
          mainCategory={expenses} 
          subCategories={expensesList} 
          categoryHandler={setExpenses}
        />)
    } else if (category === 'income') {
      return (
        <DisplaySubCategory 
          mainCategory={income} 
          subCategories={incomeList} 
          categoryHandler={setIncome}
        />)
    }
    return
  }

  return (
      <Stack spacing={2}>
        <Title />
        <SelectMainCategory category={category} setCategory={setCategory} />
        {
          renderSubCategory()
        }
        <AddNewCategory 
          showAddCategory={showAddCategory} 
          setShowAddCategory={setShowAddCategory} 
          expensesList={expensesList}
          setExpensesList={setExpensesList}
          incomeList={incomeList}
          setIncomeList={setIncomeList}
        />
      </Stack>
  )
}

export default AddIncomeExpenses