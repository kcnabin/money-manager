import { 
  Button, 
  FormControl, 
  FormLabel, 
  FormControlLabel, 
  TextField, 
  RadioGroup, 
  Radio, 
  InputAdornment, 
  IconButton,
  Box
} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react'

const AddNewCategory = ({ 
  showAddCategory, 
  setShowAddCategory, 
  setExpensesList, 
  expensesList }) => {
  return (
    <>
    <Box width='150px'>
      <Button 
        variant='contained' 
        color='secondary'
        fullWidth
        onClick={() => setShowAddCategory(!showAddCategory)}
      > {showAddCategory ? `Hide 'Add Category'` : 'Add Category'}
      </Button>
    </Box>

    {
      showAddCategory
        ? <AddCategory 
            setShowAddCategory={setShowAddCategory} 
            setExpensesList={setExpensesList} 
            expensesList={expensesList} 
          /> 
        : ''
    }
    </>
  )
}

const AddCategory = ({ setShowAddCategory, setExpensesList, expensesList }) => {
  // console.log(expensesList)
  const [newCategory, setNewCategory ] = useState('')
  const [newCategoryType, setNewCategoryType] = useState('')

  const handleChange = e => {
    setNewCategoryType(e.target.value)
  }

  const addNewCategory = (e) => {
    e.preventDefault()
    if (newCategory === '' || newCategoryType === '') {
      alert('Name can not be empty')
      return
    }
    setExpensesList(expensesList.concat(newCategory))
    alert(`${newCategory} added!`)

    setShowAddCategory(false)
    setNewCategory('')
    setNewCategoryType('')
  }

  return (
    <div>
      <form onSubmit={addNewCategory}>
        <FormControl>
          <FormLabel>Adding new category</FormLabel>
          <RadioGroup 
            value={newCategoryType} 
            onChange={handleChange} 
            name='new category' 
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
            label='Add new category'
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment 
                  position="end">
                  <IconButton type="submit">
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
            }}
          />
        </FormControl>
      </form>
    </div>
  )
}

export default AddNewCategory