import { useState } from 'react'
import { Button, Stack } from '@mui/material'

import Title from './components/Title'
import SelectMainCategory from './components/SelectMainCategory'
import DisplaySubCategory from './components/DisplaySubCategory'
import AddNewCategory from './components/AddNewCategory';
import AddAmount from './components/AddAmount'
import PickDate from './components/PickDate'

const AddIncomeExpenses = ({ addedRecords, setAddedRecords }) => {
  const [category, setCategory] = useState('')
  const [expenses, setExpenses] = useState('')
  const [income, setIncome] = useState('')
  const [amount, setAmount] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)
  
  const [showAddCategory, setShowAddCategory] = useState(false)

  const arrayOfExpensesList = ['Rent', 'Food', 'Travel', 'Medicine', 'Emergency', 'Vehicle', 'Insurance', 'Installment']
  const arrayOfIncomeList = ['Salary', 'Interest', 'Daily Allowances', 'Others']

  const [expensesList, setExpensesList] = useState(arrayOfExpensesList)
  const [incomeList, setIncomeList] = useState(arrayOfIncomeList)

  const addRecord = e => {
    e.preventDefault()

    if ( (!category || !amount || !selectedDate ) || 
         ((category === 'income' && income === '') || (category === 'expenses' && expenses === ''))
    ){
      alert('Please add all options')
      return
    }

    setAddedRecords(addedRecords.concat({
      category,
      subCategory: category === 'income' ? income : expenses,
      amount,
      date: selectedDate
    }))

    alert('Record Added')
    console.log(addedRecords)
    setCategory('')
    setAmount('')
    setSelectedDate(null)

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
      <Stack spacing={2} sx={{maxWidth: '300px'}} >
        <Title />
        <form onSubmit={addRecord}>
          <Stack spacing={2}>
          <PickDate setSelectedDate={setSelectedDate} selectedDate={selectedDate} />

          <SelectMainCategory category={category} setCategory={setCategory} />
          {
            renderSubCategory()
          }

          <AddAmount amount={amount} setAmount={setAmount} />
          
          <Button
            type='submit'
            variant='contained'
            color='primary'
          >
            Add Record
          </Button>
          </Stack>
        </form>

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