import { Typography, TextField, Stack } from "@mui/material"
import { useSelector } from 'react-redux'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useState } from 'react'

const Summary = () => {
    const checkForDateMatch = (dateAdded, displayDate) => {
        if ( (dateAdded.getFullYear() === displayDate.getFullYear())
            && (dateAdded.getMonth() === displayDate.getMonth()) ) {
                return true
            }
        else return false
    }

    const [displayDate, setDisplayDate] = useState(new Date())
    console.info('Selected date' , displayDate.getFullYear(), displayDate.getMonth() + 1)

    const matchedMonthlyIncomes = useSelector(state => state.transactions.incomeRecords)
        .filter(eachIncome => checkForDateMatch(eachIncome.dateAdded, displayDate))
    console.info('All incomes for selected months', matchedMonthlyIncomes)
    
    const allIncomeAmount = matchedMonthlyIncomes.map(eachIncome => eachIncome.amount)
    const totalIncome = allIncomeAmount
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0)



    const matchedMonthlyExpenses = useSelector(state => state.transactions.expensesRecords)
        .filter(eachExpense => checkForDateMatch(eachExpense.dateAdded, displayDate))
    console.info('All incomes for selected months', matchedMonthlyExpenses)

    const allExpensesAmount = matchedMonthlyExpenses.map(eachExpense => eachExpense.amount)
    const totalExpenses = allExpensesAmount
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0)

    return (
        <Stack spacing={2.5} sx={{padding: {
            xs: '0 32px',
            sm: '0 38px'
        }}}>
            <Typography variant="h6">Monthly Summary</Typography>
            <DatePicker
                label='Select Month & Year'
                views={['month', 'year']}
                value={displayDate}
                onChange={newValue => setDisplayDate(newValue)}
                renderInput={params => <TextField {...params} /> }
            />

            <Typography variant="body1">
                <Stack>
                    Total Income: $ {totalIncome}
                </Stack>
                <Stack>
                    Total Expenses: $ {totalExpenses}
                </Stack>  
            </Typography>

            <Typography variant="body1">
                
            </Typography>

            


        </Stack>
    )
}

export default Summary