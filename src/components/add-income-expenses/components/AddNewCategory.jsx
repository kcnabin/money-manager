import { 
  Button,
  FormLabel, 
  FormControlLabel, 
  TextField, 
  RadioGroup, 
  Radio, 
  InputAdornment, 
  IconButton, 
  Stack
} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react'

import { useDispatch } from 'react-redux'
import { addToIncomeList } from "../../../features/records/transactionsSlice";
import { addToExpensesList } from "../../../features/records/transactionsSlice";
import axios from 'axios'

const AddNewCategory = ({ 
  showAddCategory,
  setShowAddCategory,
  displayMsg
 }) => {
  return (
    <>
      <Button 
        variant='contained' 
        color='secondary'
        fullWidth
        onClick={() => setShowAddCategory(!showAddCategory)}
      > {showAddCategory ? `Hide 'Add new category'` : 'Add new category'}
      </Button>
    {
      showAddCategory
        ? <AddCategory 
            setShowAddCategory={setShowAddCategory}
            displayMsg={displayMsg}
            fullWidth
          /> 
        : ''
    }
    </>
  )
}

const AddCategory = ({ setShowAddCategory, displayMsg }) => {
  const dispatch = useDispatch()
  
  const [newCategory, setNewCategory ] = useState('')
  const [newCategoryType, setNewCategoryType] = useState('')

  const handleChange = e => {
    setNewCategoryType(e.target.value)
  }

  const addNewCategory = async (e) => {
    e.preventDefault()
    if (newCategory === '' || newCategoryType === '') {
      displayMsg({
        text: 'Must select both main category and subcategory',
        bagcolor: 'warning.light'
      })
      return
    }

    if (newCategoryType === 'income') {
      const incomeListUrl = 'http://localhost:3001/incomeList'
      try {
        const savedIncomeCat = await axios.post(incomeListUrl, {name: newCategory})
        dispatch(addToIncomeList(savedIncomeCat.data.name))
      } catch (e) {
        console.log('Failed to save', e)
        return
      }

      // dispatch(addToIncomeList(newCategory))
    } else if (newCategoryType === 'expenses')  {
      dispatch(addToExpensesList(newCategory))
    } else {
      console.log('Can not save')
    }
    
    displayMsg({
      text: `${newCategory} added!`,
      bagcolor: 'success.light'
    })

    setShowAddCategory(false)
    setNewCategory('')
    setNewCategoryType('')
  }

  return (
    <form onSubmit={addNewCategory}>

      <Stack spacing={1}>
        <FormLabel>Adding new category</FormLabel>
        <RadioGroup 
          value={newCategoryType} 
          onChange={handleChange} 
          name='new-category' 
          row
        >
          <FormControlLabel 
            control={<Radio />} 
            label='Income' 
            value='income' 
          />
          <FormControlLabel 
            control={<Radio />} 
            label='Expenses' 
            value='expenses' 
          />
        </RadioGroup>

        <TextField
          label='Add Sub-Category'
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment 
                position="end">
                <IconButton type="submit">
                  <AddIcon />
                </IconButton>
              </InputAdornment>
          }}
        />
      </Stack>

    </form>
  )
}

export default AddNewCategory