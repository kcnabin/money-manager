import { TextField, MenuItem } from '@mui/material'

const SelectMainCategory = ({ category, setCategory }) => {
  return (
    <TextField
      label='Select Category'
      select
      value={category}
      onChange={e => setCategory(e.target.value)}
      fullWidth
    >
      <MenuItem value='income'>Income</MenuItem>
      <MenuItem value='expenses'>Expenses</MenuItem>
    </TextField>
  )
}

export default SelectMainCategory