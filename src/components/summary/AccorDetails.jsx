import { AccordionDetails, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

const AccorDetails = ({ summary }) => {
  const navigate = useNavigate()
  
  return (
    <>
    {summary.map((category, i) => {
      return (
        <AccordionDetails key={i} 
          sx={{display: 'flex', justifyContent: 'space-between'}}
        >
          <Typography variant='body1' >
            {category.subCategory}

            <Button
              sx={{paddingLeft: '16px', textTransform: 'none'}}
              onClick={() => navigate('/categorySummary', { state: category}) }
            >
              View More
            </Button>
          </Typography>

          <Typography variant='body1'>
            {category.totalCatAmount}
          </Typography>
        </AccordionDetails>
      )
    })}
    </>
  )
}

export default AccorDetails