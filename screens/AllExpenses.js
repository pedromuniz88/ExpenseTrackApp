import { Text } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { use, useContext } from 'react';


function AllExpenses() {
    const expensesCtx = useContext(ExpensesContext);
    return <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Total" />;
}

export default AllExpenses;