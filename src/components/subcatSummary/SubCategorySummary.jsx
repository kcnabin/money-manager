import { useLocation, useNavigate } from "react-router-dom"
import { Button, Stack, Typography, Card, CardContent, CardActions, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { displayDate } from "../../helper/dateHelper";


const SubCategorySummary = () => {
  const navigate = useNavigate()
  const { state } = useLocation();

  console.log(state)

  return (
    <Stack spacing={2} sx={{padding: '0 32px 16px '}}>
      <Stack>
        <Typography variant='h6' sx={{textDecoration: 'underline'}}>
          Summary for {state.subCategory}  
        </Typography>
        <Typography variant='h6'>
          Total Amount: {state.totalCatAmount}
        </Typography>
      </Stack>

      <Stack sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '12px'}}>
        {
          state.allCatRecords.map((eachRecord, i) => {
            return (
              <Card key={i} sx={{border: '1px solid grey', flexWrap: 'wrap'}}>
                <CardContent sx={{padding: '16px 16px 0', width: '300px'}}>
                  <Typography variant="h6" gutterBottom>
                    {eachRecord.title}
                  </Typography>

                  <Typography variant='body1' color='text.secondary'>
                    Category: {eachRecord.subCategory.toUpperCase()} in '{eachRecord.category}'
                  </Typography>
                    
                  <Typography variant='body1' color='text.secondary'>
                    Amount: $ {eachRecord.amount.toLocaleString()}
                  </Typography>

                  <Typography variant='body1' color='text.secondary'>
                    Date: {displayDate(eachRecord.dateAdded)}
                  </Typography>
                </CardContent>

                <CardActions sx={{justifyContent: 'flex-end'}}>
                  <IconButton color='secondary'>
                    <EditIcon />
                  </IconButton>
                  <IconButton color='error'>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            )
          })
        }

      </Stack>

      <Button
          variant='contained'
          sx={{width: '120px'}}
          onClick={() => navigate(-1)}
        >
          Go Back
      </Button>
    </Stack>
  )
}

export default SubCategorySummary