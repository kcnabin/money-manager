import { Typography } from "@mui/material"
import { useSelector } from 'react-redux'

const Summary = () => {
    const allIncomeAmount = useSelector(state => state.transactions.incomeRecords)
        .map(eachIncome => eachIncome.amount)

    const totalIncome = allIncomeAmount
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0)

    const allExpensesAmount = useSelector(state => state.transactions.expensesRecords)
        .map(eachExpenses => eachExpenses.amount)
    
    const totalExpenses = allExpensesAmount
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0)

    return (
        <div>
            <Typography variant="h6">
                Total Income: $ {totalIncome}
            </Typography>

            <Typography variant="h6">
                Total Expenses: $ {totalExpenses}
            </Typography>
        </div>
    )
}

export default Summary