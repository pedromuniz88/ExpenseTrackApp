import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    { id: 'e1', description: 'A pair of shoes', amount: 59.99, date: new Date('2025-12-19') },
    { id: 'e2', description: 'A pair of trousers', amount: 89.29, date: new Date('2025-12-17') },
    { id: 'e3', description: 'Some bananas', amount: 5.99, date: new Date('2025-12-16') },
    { id: 'e4', description: 'A book', amount: 14.99, date: new Date('2025-12-15') },
    { id: 'e5', description: 'Another book', amount: 18.59, date: new Date('2025-12-14') },
    { id: 'e6', description: 'A pair of socks', amount: 4.99, date: new Date('2025-12-13') },
    { id: 'e7', description: 'A computer', amount: 599.99, date: new Date('2025-11-25') },
    { id: 'e8', description: 'Headphones', amount: 199.99, date: new Date('2025-11-20') },
    { id: 'e9', description: 'Keyboard', amount: 49.99, date: new Date('2025-12-02') },
    { id: 'e10', description: 'Mouse', amount: 25.99, date: new Date('2025-12-01') },
];

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, amount, date }) => { },
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id: id }, ...state];
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}

function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData });
    }

    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id });
    }

    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    };

    return <ExpensesContext.Provider value={value}>
        {children}
    </ExpensesContext.Provider>;
}

export default ExpensesContextProvider;  