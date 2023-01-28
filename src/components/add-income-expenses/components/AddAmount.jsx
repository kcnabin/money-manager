import { Box, TextField, InputAdornment } from '@mui/material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const AddAmount = ({ amount, setAmount }) => {
  return (
    <>
    <Box>
      <TextField
        label='Add Amount'
        value={amount}
        type='number'
        onChange={e => setAmount(parseInt(e.target.value))}
        InputProps={{
          startAdornment: 
            <InputAdornment position='start'>
              <AttachMoneyIcon /> 
            </InputAdornment>
        }}
      />
    </Box>
    </>
  )
}

export default AddAmount