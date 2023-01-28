import { useState } from 'react'
import { Button, Stack, Box } from '@mui/material'

import Title from './components/Title'
import SelectMainCategory from './components/SelectMainCategory'
import DisplaySubCategory from './components/DisplaySubCategory'
import AddNewCategory from './components/AddNewCategory';
import AddAmount from './components/AddAmount'

const AddIncomeExpenses = () => {
  const [category, setCategory] = useState('')
  const [expenses, setExpenses] = useState('')
  const [income, setIncome] = useState('')
  const [amount, setAmount] = useState('')
  const [addedRecords, setAddedRecords] = useState([])
  
  const [showAddCategory, setShowAddCategory] = useState(false)

  const arrayOfExpensesList = ['Rent', 'Food', 'Travel', 'Medicine', 'Emergency', 'Vehicle', 'Insurance', 'Installment']
  const arrayOfIncomeList = ['Salary', 'Interest', 'Daily Allowances', 'Others']

  const [expensesList, setExpensesList] = useState(arrayOfExpensesList)
  const [incomeList, setIncomeList] = useState(arrayOfIncomeList)

  const addRecord = e => {
    e.preventDefault()

    if (
      (!category || !amount) ||
      (category === 'income') && (income === '') ||
      (category === 'expenses') && (expenses === '')
    ){
      alert('Please add all options')
      return
    }

    setAddedRecords(addedRecords.concat({
      category,
      subCategory: category === 'income' ? income : expenses,
      amount,
      // saved date will be added in backend
      date: new Date()
    }))

    alert('Record Added')
    console.log(addedRecords)
    setCategory('')
    setAmount('')

  }

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

        <AddAmount amount={amount} setAmount={setAmount} />
        
        <Box width='150px'>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            onClick={addRecord}
            fullWidth
          >
            Add Record
          </Button>
          
        </Box>

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