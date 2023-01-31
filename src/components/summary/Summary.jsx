import { Typography } from "@mui/material"

const Summary = ({ addedRecords }) => {
    const allIncomeAmount = addedRecords
        .map(eachRecord => eachRecord.category === 'income' ? eachRecord.amount : 0 )
    const totalIncome = allIncomeAmount
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0)

    const allExpensesAmount = addedRecords
        .map(eachRecord => eachRecord.category === 'expenses' ? eachRecord.amount : 0 )
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