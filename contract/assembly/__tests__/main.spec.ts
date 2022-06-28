import { ExpenseManagementContract } from '..'
import { storage, Context, VMContext } from 'near-sdk-as'
import { Expense } from '../Models/Expense';
import { USER_EXPENSES } from '../utils/database';
import { ExpenseManager } from '../Models/ExpenseManager';
import { ExpenseStatus } from '../utils/enums';

const contract = new ExpenseManagementContract();
const signer = 'leonard0.testnet';

// describe('Greeting ', () => {
//   it('should be set and read', () => {
//     setGreeting('hello world')
//     storage.get<string>(Context.sender)
//   })
// })


describe('Expenses', () => {
  beforeEach(() => {
    VMContext.setSigner_account_id(signer);
    contract.createNewExpense('Rice', '20kg bag of rice', "200.5", "2022-01-25", "2022-01-20");
  })

  it('should add new expense', () => {
    contract.createNewExpense('Rice', '20kg bag of rice', "200.5", "2022-01-25", "2022-01-20");

    let expenseManager = USER_EXPENSES.getSome(signer);
    expect(expenseManager.expenses.length).toStrictEqual(2);
    expect(expenseManager.expenses[0].title).toStrictEqual('Rice');
  })

  it('should retrieve all expenses', () => {
    let expenses = contract.getAllExpenses();
    expect(expenses.length).toStrictEqual(1);
  })

  it('should clear expense', () => {
    let res = contract.clearExpense(0);
    let expenses = contract.getAllExpenses();
    expect(res).toBeTruthy("You supplied an expense id that does not exist");
    expect(expenses[0].status).toStrictEqual(ExpenseStatus.CLEARED);
  })

  it('should update completion date', () => {
    let newDate = "2022-05-23"
    let res = contract.updateExpenseCompletionDate(0, newDate);
    let expenses = contract.getAllExpenses();
    expect(res).toBeTruthy("You supplied an expense id that does not exist");
    expect(expenses[0].expectedCompleteDate).toBe(newDate);
  })

  it('should update expense amount', () => {
    let res = contract.updateExpenseAmount(0, "18000");
    let expenses = contract.getAllExpenses();
    expect(res).toBeTruthy("You supplied an expense id that does not exist");
    expect(expenses[0].amount).toStrictEqual("18000");
  })

  it('should remove expense', () => {
    let res = contract.removeExpense(0);
    let expenses = contract.getAllExpenses();
    expect(res).toBeTruthy("You supplied an expense id that does not exist");
    expect(expenses[0].status).toStrictEqual(ExpenseStatus.REMOVED);
  })

  it('should delete expense', () => {
    let res = contract.deleteExpense(0);
    let expenses = contract.getAllExpenses();
    expect(res).toBeTruthy("You supplied an expense id that does not exist");
    expect(expenses.length).toStrictEqual(0);
  })
})
