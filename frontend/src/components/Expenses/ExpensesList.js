import React from 'react';

import ExpenseItem from './ExpenseItem';
import './ExpensesList.css';

const ExpensesList = (props) => {
  if (props.items.length === 0) {
    return <h2 className='expenses-list__fallback'>Found no expenses.</h2>;
  }

  return (
    <ul className='expenses-list'>
      {props.items.map((expense) => (
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.expectedCompleteDate}
          updateExpense= {(amt, date_)=> props.updateExpense(expense.id, amt, date_)}
          clearExpense= {()=> props.clearExpense(expense.id)}
          removeExpense= {()=> props.updateExpense(expense.id)}
          deleteExpense= {()=> props.deleteExpense(expense.id)}
          selectedView = {props.selectedView}
        />
      ))}
    </ul>
  );
};

export default ExpensesList;
