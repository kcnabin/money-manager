import { AccordionSummary, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AccorSummary = ({ title }) => {
  return (
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" color={'secondary.dark'}>
          {title}
        </Typography>
      </AccordionSummary>
  )
}

export default AccorSummary