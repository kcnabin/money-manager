import { useState } from 'react'
import { Button, Stack } from '@mui/material'

import Title from './components/Title'
import SelectMainCategory from './components/SelectMainCategory'
import DisplaySubCategory from './components/DisplaySubCategory'
import AddNewCategory from './components/AddNewCategory';
import AddAmount from './components/AddAmount'
import PickDate from './components/PickDate'
import DisplayMessage from './components/DisplayMessage'

import { useDispatch } from 'react-redux'
import { addIncomeRecords, addExpensesRecords } from '../../features/records/transactionsSlice'
import AddTitle from './components/AddTitle'
import { v4 as uuidv4 } from 'uuid'
import { saveIncome, saveExpenses } from '../../services/dbServices'

const AddIncomeExpenses = () => {
  const dispatch = useDispatch()

  const [selectedDate, setSelectedDate] = useState(null)
  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [msg, setMsg] = useState(null)

  const [displaySubCategory, setDisplaySubCategory] = useState(false) 
  const [showAddCategory, setShowAddCategory] = useState(false)

  const resetSelection = () => {
    setSelectedDate(null)
    setCategory('')
    setSubCategory('')
    setTitle('')
    setAmount('')
    setDisplaySubCategory(false)
  }
  const displayMsg = msg => {
    setMsg(msg)
    setTimeout(() => setMsg(null), 10000)
  }
  const displayInfo = info => {
    displayMsg({
      text: info,
      bagcolor: 'success.light'
    })
  }
  const displayError = error => {
    displayMsg({
      text: error,
      bagcolor: 'error.light'
    })
  }

  const addRecord = async (e) => {
    e.preventDefault()

    if (!category || !subCategory || !amount || !selectedDate || !title) {
      displayError('Please select all options')
      return
    }

    const newRecord = {
      dateAdded: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate()
      },
      category,
      subCategory: subCategory.toLowerCase(),
      title,
      amount,
      id: uuidv4()
    }

    if (category === 'income') {
      try {
        const savedRecord = await saveIncome(newRecord)
        dispatch(addIncomeRecords(savedRecord))
      } catch (e) {
        console.log(e)
        displayError('Error saving new income!')
        return
      }
    } else if (category === 'expenses') {
      try {
        const savedRecord = await saveExpenses(newRecord)
        dispatch(addExpensesRecords(savedRecord))
      } catch (e) {
        console.log(e)
        displayError('Error saving new expenses!')
        return
      }
    } else {
      displayError('Error adding new record')
      return
    }

    displayInfo(`New record for '${subCategory}' added...`)
    resetSelection()
  }

  return (
    <Stack>
      <DisplayMessage msg={msg} />
      <Stack spacing={2} sx={{
          
          padding: '0 32px 32px'
        }} 
      >
        <Title />
        <form onSubmit={addRecord}>
          <Stack spacing={{
            xs: 2,
            sm: 4
          }}>
          <PickDate setSelectedDate={setSelectedDate} selectedDate={selectedDate} />

          <SelectMainCategory 
            category={category} 
            setCategory={setCategory} 
            setDisplaySubCategory={setDisplaySubCategory}
          />

          {
            displaySubCategory
              ? <DisplaySubCategory
                  mainCategory={category}
                  subCategory={subCategory}
                  setSubCategory={setSubCategory}
                />
              : ""
          }

          <AddTitle title={title} setTitle={setTitle} />

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
          displayMsg={displayMsg}
        />
      </Stack>
    </Stack>
  )
}

export default AddIncomeExpenses