import { Typography, TextField, Stack} from "@mui/material"
import { useSelector } from 'react-redux'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useState } from 'react'
import DisplayAccordion from "./DisplayAccordion"

const Summary = () => {
    const checkForMonthMatch = (dateAdded, displayDate) => {
        if ((dateAdded.year === displayDate.getFullYear()) &&
             (dateAdded.month === (displayDate.getMonth() + 1))       
        ) {
            return true
        }
        else return false
    }

    const [displayDate, setDisplayDate] = useState(new Date())
    const handleDateChange = newValue => setDisplayDate(newValue)
    let monthlyIncomeSummary = []
    let monthlyExpensesSummary = []

    const selectedIncomes = useSelector(state => state.transactions.incomeRecords.filter(
        income => checkForMonthMatch(income.dateAdded, displayDate)
    ))
    const incomeList = useSelector(state => state.transactions.incomeList)

    incomeList.forEach(subCategory => {
        const onlySubcategory = selectedIncomes
            .filter(income => income.subCategory.toLowerCase() === subCategory.toLowerCase())
        const totalCatAmount = onlySubcategory
            .map(income => income.amount)
            .reduce((pre, cur) => pre + cur, 0)
        const subCategoryAndAmount = {
            subCategory,
            totalCatAmount,
            allCatRecords: onlySubcategory
        }
        monthlyIncomeSummary.push(subCategoryAndAmount)
    })

    const selectedExpenses = useSelector(state => state.transactions.expensesRecords.filter(
        expense => checkForMonthMatch(expense.dateAdded, displayDate)
    ))

    const expensesList = useSelector(state => state.transactions.expensesList)

    expensesList.forEach(subCategory => {
        const onlySubcategory = selectedExpenses
            .filter(expense => expense.subCategory.toLowerCase() === subCategory.toLowerCase())
        
        const totalCatAmount = onlySubcategory
            .map(expense => expense.amount)
            .reduce((pre, cur) => pre + cur, 0)
        const subCategoryAndAmount = {
            subCategory,
            totalCatAmount,
            allCatRecords: onlySubcategory
        }
        monthlyExpensesSummary.push(subCategoryAndAmount)
    })
    // console.log('monthlyIncomeSummary', monthlyIncomeSummary)
    // console.log('monthlyExpensesSummary', monthlyExpensesSummary)
    
    return (
        <Stack sx={{padding: '0 16px'}} spacing={2}>
            <Stack spacing={2} >
                <Typography variant="h6">Monthly Summary</Typography>

                <DatePicker
                    label='Select Year & Month'
                    views={['year', 'month']}
                    value={displayDate}
                    onChange={handleDateChange}
                    renderInput={params => <TextField {...params} /> }
                />
            </Stack>

            <Stack
                sx={{ flexDirection: {xs: 'column', sm: 'row'}, gap: '32px' }}
            >
                <DisplayAccordion mainCategory='Income' summary={monthlyIncomeSummary} />
                <DisplayAccordion mainCategory='Expenses' summary={monthlyExpensesSummary} />
            </Stack>
        
        </Stack>
    )
}

export default Summary