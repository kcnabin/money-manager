import { Box, Typography } from '@mui/material'

const DisplayMessage = ({ msg }) => {
  if (msg) {
    return (
      <Box sx={{
        backgroundColor: 'black',
        color: 'white',
        fontWeight: 'bold',
        padding: '8px 12px',
        marginBottom: '12px'
      }}>
        <Typography variant="body1">
          {msg}
        </Typography>
      </Box>
    )
  }
  return
}

export default DisplayMessage