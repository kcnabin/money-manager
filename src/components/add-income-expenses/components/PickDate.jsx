import { TextField, Stack } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'


const PickDate = ({ selectedDate, setSelectedDate }) => {
  return (
    <Stack spacing={4}>
      <DatePicker
        label='Select Date'
        value={selectedDate}
        onChange={(newValue) => setSelectedDate(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />
    </Stack>
  )
}

export default PickDate