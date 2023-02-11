import { TextField, Stack } from "@mui/material"


const AddTitle = ({ title, setTitle }) => {
  return (
    <Stack>
      <TextField
        label='Title'
        value={title}
        onChange={e => setTitle(e.target.value) }
      />
    </Stack>
  )
}

export default AddTitle