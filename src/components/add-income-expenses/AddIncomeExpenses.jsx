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

const AddIncomeExpenses = () => {
  const dispatch = useDispatch()

  const [selectedDate, setSelectedDate] = useState(null)
  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [msg, setMsg] = useState(null)

  const [displaySubCategory, setDisplaySubCategory] = useState(false) 
  const [showAddCategory, setShowAddCategory] = useState(false)

  const resetSelection = () => {
    setSelectedDate(null)
    setCategory('')
    setSubCategory('')
    setAmount('')
  }

  const addRecord = e => {
    e.preventDefault()

    if (!category || !subCategory || !amount || !selectedDate) {
      displayMsg({
        text: 'Please select all options',
        bagcolor: 'error.light'
      })
      return
    }

    const newRecord = {
      dateAdded: selectedDate,
      category,
      subCategory,
      amount
    }

    if (category === 'income') {
      dispatch(addIncomeRecords(newRecord))
    } else if (category === 'expenses') {
      dispatch(addExpensesRecords(newRecord))
    } else {
      displayMsg({
        text: 'Error adding new record',
        bagcolor: 'error.light'
      })
      return
    }

    displayMsg({
      text: `New record for '${subCategory}' added...`,
      bagcolor: 'success.light'
    })
    resetSelection()
  }

  const displayMsg = msg => {
    setMsg(msg)
    setTimeout(() => setMsg(null), 3000)
  }

  return (
    <>
      <DisplayMessage msg={msg} />
      <Stack spacing={2} sx={{maxWidth: '300px'}} >
      <Title />
      <form onSubmit={addRecord}>
        <Stack spacing={2}>
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
    </>
    
  )
}

export default AddIncomeExpenses