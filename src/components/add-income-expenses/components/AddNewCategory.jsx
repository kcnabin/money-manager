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

const AddNewCategory = ({ 
  showAddCategory, 
  setShowAddCategory, 
  expensesList,
  setExpensesList,
  incomeList,
  setIncomeList
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
            expensesList={expensesList}
            setExpensesList={setExpensesList} 
            incomeList={incomeList}
            setIncomeList={setIncomeList}
            fullWidth
          /> 
        : ''
    }
    </>
  )
}

const AddCategory = ({ 
  setShowAddCategory,
  expensesList,
  setExpensesList,
  incomeList,
  setIncomeList
}) => {
  
  const [newCategory, setNewCategory ] = useState('')
  const [newCategoryType, setNewCategoryType] = useState('')

  const handleChange = e => {
    setNewCategoryType(e.target.value)
  }

  const addNewCategory = (e) => {
    e.preventDefault()
    if (newCategory === '' || newCategoryType === '') {
      alert('Must select both main category and subcategory')
      return
    }

    if (newCategoryType === 'income') {
      setIncomeList(incomeList.concat(newCategory))
    } else {
      setExpensesList(expensesList.concat(newCategory))
    }
    
    alert(`${newCategory} added!`)

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
          label='Add Sub-Category'
          value={newCategory}
          sx={{fullWidth: '500px'}}
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
      </Stack>

    </form>
  )
}

export default AddNewCategory