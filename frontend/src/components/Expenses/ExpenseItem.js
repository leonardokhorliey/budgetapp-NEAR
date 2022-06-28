import React, { useState } from 'react';

import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';
import './ExpenseItem.css';

const ExpenseItem = (props) => {
  const [updateView, setUpdateView] = useState(false)
  const [minDate, setMinDate] = useState()
  const [newCompleteDate, setNewCompleteDate] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const handleStartUpdate = () => {
    let date = new Date();
    let month = (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1)
    let day = (date.getDate() < 10 ? "0" : "") + date.getDate()
    setMinDate(date.getFullYear() + "-" + month + "-" + day)

    setUpdateView(true)
  }


  const handleSubmitChanges = (e) => {
    e.preventDefault();
    if (!newAmount && !newCompleteDate) {alert('Enter values for new date or amount'); return;}
    props.updateExpense(newAmount, newCompleteDate);
    setNewAmount('')
    setNewCompleteDate('')
    setUpdateView(false)
  }

  
  return (
    <li>
      <Card className='expense-item'>
        
        
        <div className='expense-item__description'>
        <ExpenseDate date={props.date} />
          <h2>{props.title}</h2>
          {props.selectedView === 0 && <button className="update-button" onClick= {handleStartUpdate}>Update</button>}
          <button className="update-button" onClick= {props.selectedView === 0 ? props.clearExpense : props.deleteExpense}>
            {props.selectedView === 0 ? "Clear": "Delete"}
          </button>
          <div className='expense-item__price'>${props.amount}</div>
        </div>

        {updateView && <div style={{margin: "30px 0px"}}>
          <div>
            <button className="update-button" onClick= {props.removeExpense}>Remove Expense</button>
          </div>

          <form onSubmit={handleSubmitChanges}>
            <div className='new-expense__controls'>
              <div className='new-expense__control'>
                <label>New Amount</label>
                <input
                  type='number'
                  min='0.01'
                  step='0.01'
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                />
              </div>
              <div className='new-expense__control'>
                <label>Date</label>
                <input
                  type='date'
                  min={minDate}
                  max='2024-12-31'
                  value={newCompleteDate}
                  onChange={(e) => setNewCompleteDate(e.target.value)}
                />
              </div>
            </div>
            <div className='new-expense__actions'>
              <button className="update-button" type="button" onClick={() => setUpdateView(false)}>Cancel</button>
              <button className="update-button" type='submit'>Update</button>
            </div>
          </form>
        </div>}
      </Card>
    </li>
  );
};

export default ExpenseItem;
