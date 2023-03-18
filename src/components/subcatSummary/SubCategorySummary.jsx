import { useLocation, useNavigate } from "react-router-dom"
import { Button, Stack, Typography, Card, CardContent, CardActions, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { displayDate } from "../../helper/dateHelper";
import { deleteRecord } from "../../services/dbServices";
import { deleteExpensesRecord, deleteIncomeRecord } from "../../features/records/transactionsSlice";
import { useDispatch } from "react-redux";

const SubCategorySummary = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { state } = useLocation();
  const token = localStorage.getItem('token')

  console.log(state)

  const handleDelete = async (id, category) => {
    if (!window.confirm('Want to delete record?')) {
      return
    }

    try {
      await deleteRecord(id, category, token)
      if (category.toLowerCase() === 'income') {
        dispatch(deleteIncomeRecord(id))
      } else {
        dispatch(deleteExpensesRecord(id))
      }
      alert('Record deleted successfully!')
      navigate(-1)
    } catch (e) {
      alert('Error deleting record')
      console.log(e)
    }
  }

  const handleEdit = (record) => {
    navigate('/editRecord', { state: record})
  }

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
                  <IconButton color='secondary' onClick={() => handleEdit(eachRecord)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color='error' onClick={() => handleDelete(eachRecord.id, eachRecord.category)}>
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