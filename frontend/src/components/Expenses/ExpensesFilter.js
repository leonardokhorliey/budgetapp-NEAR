import React from 'react';

import './ExpensesFilter.css';

const ExpensesFilter = (props) => {
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  const filterYears = Array(props.maxFilterYear - props.minFilterYear + 1).fill().map((_, idx) => props.minFilterYear + idx);

  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <label>Filter by Expected Completion year</label>
        <select value={props.selected} onChange={dropdownChangeHandler}>
          {filterYears.map((year, idx) => {
            return (
              <option key={idx} value= {year.toString()}>{year}</option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
