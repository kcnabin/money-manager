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
import { addNewIncome, addNewExpenses } from '../../../services/dbServices'

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
  const dispatch = useDispatch()
  
  const [newCategory, setNewCategory ] = useState('')
  const [newCategoryType, setNewCategoryType] = useState('')

  const handleChange = e => {
    setNewCategoryType(e.target.value)
  }

  const addNewCategory = async (e) => {
    e.preventDefault()
    if (newCategory === '' || newCategoryType === '') {
      displayError('Must select both main category and subcategory')
      return
    }

    if (newCategoryType === 'income') {
      try {
        const newCat = await addNewIncome(newCategory)
        dispatch(addToIncomeList(newCat))
        displayInfo('New income subcategory added.')
      } catch (e) {
        console.log(e)
        displayError(`Failed to add new income subcategory!`)
        return
      }

    } else if (newCategoryType === 'expenses') {
      try {
        const newCat = await addNewExpenses(newCategory)
        dispatch(addToExpensesList(newCat))
        displayInfo('New expenses subcategory added.')
      } catch (e) {
        console.log(e)
        displayError(`Failed to add new expenses subcategory!`)
      }
    } else {
      displayInfo('Failed to save...')
      return
    }
    
    displayInfo(`New subcategory '${newCategory}' added!`)

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