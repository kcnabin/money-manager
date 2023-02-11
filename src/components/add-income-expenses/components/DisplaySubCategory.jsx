import { Stack, ButtonGroup, Button, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

const DisplaySubCategory = ({ mainCategory, subCategory, setSubCategory }) => {
  const incomeList = useSelector(state => state.transactions.incomeList)
  const expensesList = useSelector(state => state.transactions.expensesList)
  let subCategories = mainCategory === 'income' ? incomeList : (mainCategory ==='expenses' ? expensesList : [])

  return (
    <Stack spacing={1}>
      <Typography variant='body1'>Select Sub-Category</Typography>
      <ButtonGroup
        sx={{flexWrap: 'wrap'}}
        onClick={e => {
          setSubCategory(e.target.value)
        }}
        className='all-sub-cat'
      >
        {
          subCategories.map((eachCategory, i) => {
            return (
              <Button 
                key={i} 
                value={eachCategory} 
                variant={eachCategory === subCategory ? 'contained' : 'outlined'}
              >
                {eachCategory}
              </Button>)
          })
        }
      </ButtonGroup>
    </Stack>
  )
}

export default DisplaySubCategory