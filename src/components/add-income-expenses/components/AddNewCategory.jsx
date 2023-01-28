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
  expensesList,
  setExpensesList,
  incomeList,
  setIncomeList
 }) => {
  return (
    <>
    <Box width='250px'>
      <Button 
        variant='contained' 
        color='secondary'
        fullWidth
        onClick={() => setShowAddCategory(!showAddCategory)}
      > {showAddCategory ? `Hide 'Add new category'` : 'Add new category'}
      </Button>
    </Box>

    {
      showAddCategory
        ? <AddCategory 
            setShowAddCategory={setShowAddCategory}
            expensesList={expensesList}
            setExpensesList={setExpensesList} 
            incomeList={incomeList}
            setIncomeList={setIncomeList}
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
  // console.log(expensesList)
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
            label='Add Sub-Category Name'
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