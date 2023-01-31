import { TextField, InputAdornment } from '@mui/material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const AddAmount = ({ amount, setAmount }) => {
  return (
    <TextField
      label='Add Amount'
      value={amount}
      type='number'
      fullWidth
      onChange={e => setAmount(parseInt(e.target.value))}
      InputProps={{
        startAdornment: 
          <InputAdornment position='start'>
            <AttachMoneyIcon /> 
          </InputAdornment>
      }}
    />
  )
}

export default AddAmount