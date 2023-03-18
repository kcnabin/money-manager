import { Typography, Stack, Link } from "@mui/material";

const Footer = () => {
  return (
    <Stack className="footer">
      <Typography 
        variant="body1"
        sx={{
          backgroundColor: 'black', 
          color: 'white', 
          padding: '8px',
          display: 'flex',
          justifyContent: 'center',
          fontWeight: 'bold'
        }}
      >
        Designed by <Link 
          href="https://github.com/kcnabin"
          target="_blank"
          rel="noopener"
          underline="none"
          sx={{paddingLeft: '6px', '&:hover': {color: '#f04d29'}}}
          >Nabin</Link>
          
      </Typography>
    </Stack>
  )
}

export default Footer