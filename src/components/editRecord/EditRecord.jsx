import { Typography, Button, Stack } from "@mui/material"
import { useNavigate, useLocation } from 'react-router-dom'
import PickDate from '../add-income-expenses/components/PickDate'
import SelectMainCategory from '../add-income-expenses/components/SelectMainCategory'
import DisplaySubCategory from '../add-income-expenses/components/DisplaySubCategory'
import AddTitle from '../add-income-expenses/components/AddTitle'
import AddAmount from '../add-income-expenses/components/AddAmount'
import { useState } from "react"
import { updateRecord } from "../../services/dbServices"
import { updateIncomeRecords, updateExpensesRecord } from '../../features/records/transactionsSlice'
import { useDispatch } from "react-redux"

const EditRecord = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const [selectedDate, setSelectedDate] = useState(null)
  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [title, setTitle] = useState(state.title)
  const [amount, setAmount] = useState(state.amount)

  const [displaySubCategory, setDisplaySubCategory] = useState(false) 

  const handleUpdate = async (e) => {
    e.preventDefault()

    if (!category || !subCategory || !amount || !title) {
      alert('Please select all options')
      return
    }

    const updatedRec = {
      ...state,
      dateAdded: selectedDate ? {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate()
      } : state.dateAdded,
      category,
      subCategory: subCategory.toLowerCase(),
      title,
      amount,
    }

    try {
      const savedRecord = await updateRecord(updatedRec)
      if (savedRecord.category.toLowerCase() === 'income') {
        dispatch(updateIncomeRecords(savedRecord))
      } else {
        dispatch(updateExpensesRecord(savedRecord))
      }
      navigate('/summary')
    } catch (e) {
      console.log(e)
      alert('Error updating the record')
      return
    }

  }

  return (
    <Stack spacing={2} sx={{padding: '0 32px 32px'}}>
      <Typography variant="h6" color='secondary.dark'>
        Editing your record
      </Typography>
      <form onSubmit={handleUpdate}>
        <Stack spacing={4}>
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
          color='secondary'
        >
          Update Record
        </Button>
        </Stack>
      </form>

    </Stack>
    
  )
}

export default EditRecord