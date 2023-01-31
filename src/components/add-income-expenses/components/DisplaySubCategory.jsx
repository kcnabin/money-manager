import { Stack, ButtonGroup, Button, Typography } from '@mui/material'

const DisplaySubCategory = ({ mainCategory, subCategories, categoryHandler }) => {
  return (
    <Stack spacing={1}>
      <Typography variant='body1'>Select Sub-Category</Typography>
      <ButtonGroup
        sx={{flexWrap: 'wrap'}}
        onClick={e => categoryHandler(e.target.value)}
        className='all-sub-cat'
      >
        {
          subCategories.map((eachCategory, i) => {
            return (
              <Button 
                key={i} 
                value={eachCategory} 
                variant={eachCategory === mainCategory ? 'contained' : 'outlined'}
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