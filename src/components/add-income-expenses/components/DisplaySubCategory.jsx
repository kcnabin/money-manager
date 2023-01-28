import { Box, ButtonGroup, Button } from '@mui/material'

const DisplaySubCategory = ({ expenses, setExpenses, expensesList }) => {
  return (
    <>
    <Box>
      <ButtonGroup
        sx={{flexWrap: 'wrap'}}
        onClick={e => setExpenses(e.target.value)}
        className='all-sub-cat'
      >
        {
          expensesList.map((expense, i) => {
            return (
              <Button 
                key={i} 
                value={expense} 
                variant={expense === expenses ? 'contained' : 'outlined'}
              >
                {expense}
              </Button>)
          })
        }
      </ButtonGroup>
    </Box>
    </>
  )
}

export default DisplaySubCategory