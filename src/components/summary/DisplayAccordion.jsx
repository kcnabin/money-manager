import { Accordion } from "@mui/material"
import AccorDetails from "./AccorDetails"
import AccorSummary from "./AccorSummary"


const DisplayAccordion = ({ mainCategory, summary }) => {
  
  return (
    <Accordion 
      sx={{
        width: {
        xs: '100%',
        sm: '50%'},
        border: '1px solid grey'
      }}
      disableGutters
      defaultExpanded={true}
    >
      <AccorSummary title={mainCategory} />
      <AccorDetails summary={summary} />
    </Accordion>
  )
}

export default DisplayAccordion