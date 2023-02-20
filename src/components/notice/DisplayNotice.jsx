import { Typography } from "@mui/material"

const DisplayNotice = ({ text }) => {
  if (text === '') {
    return
  }
  return (
    <Typography variant='h6' sx={{backgroundColor: 'info.light', color: 'white', padding: '8px 16px'}}>
      {text}
    </Typography>
  )
}

export default DisplayNotice