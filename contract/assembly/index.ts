/*
 * This is an example of an AssemblyScript smart contract with two simple,
 * symmetric functions:
 *
 * 1. setGreeting: accepts a greeting, such as "howdy", and records it for the
 *    user (account_id) who sent the request
 * 2. getGreeting: accepts an account_id and returns the greeting saved for it,
 *    defaulting to "Hello"
 *
 * Learn more about writing NEAR smart contracts with AssemblyScript:
 * https://docs.near.org/docs/develop/contracts/as/intro
 *
 */

import { Context, logging, storage } from 'near-sdk-as'
import { Expense } from './Models/Expense'
import { ExpenseManager } from './Models/ExpenseManager'
import { USER_EXPENSES } from './utils/database'

// const DEFAULT_MESSAGE = 'Hello'

// // Exported functions will be part of the public interface for your smart contract.
// // Feel free to extract behavior to non-exported functions!
// export function getGreeting(accountId: string): string | null {
//   // This uses raw `storage.get`, a low-level way to interact with on-chain
//   // storage for simple contracts.
//   // If you have something more complex, check out persistent collections:
//   // https://docs.near.org/docs/concepts/data-storage#assemblyscript-collection-types
//   return storage.get<string>(accountId, DEFAULT_MESSAGE)
// }

// export function setGreeting(message: string): void {
//   const accountId = Context.sender
//   // Use logging.log to record logs permanently to the blockchain!
//   logging.log(`Saving greeting "${message}" for account "${accountId}"`)
//   storage.set(accountId, message)
//   console.log(accountId)
// }

@nearBindgen
export class ExpenseManagementContract {

  private getSignerDetails(signer: String) : ExpenseManager {

    if (!USER_EXPENSES.contains(signer)) return new ExpenseManager();
    const manager = USER_EXPENSES.getSome(signer);

    return manager;
  }

  createNewExpense(title: String, description: String, amount: String, completeDate: String, createdAt: String) : void {
    const transactionSigner = Context.sender;
    const signerExpenseManager = this.getSignerDetails(transactionSigner)

    // if (signerExpenseManager?.expenses.length === 0) {
    //   signerExpenseManager?.addExpense(title, description, completeDate, amount)
    //   USER_EXPENSES.set(transactionSigner, signerExpenseManager)
    // }

    signerExpenseManager.addExpense(title, description, amount, completeDate, createdAt);
    USER_EXPENSES.set(transactionSigner, signerExpenseManager)
  }

  getAllExpenses(): Expense[] {
    const transactionSigner = Context.sender;
    const signerExpenseManager = this.getSignerDetails(transactionSigner)

    return signerExpenseManager.expenses;
  }

  clearExpense(expenseId: u32): bool {
    const transactionSigner = Context.sender;
    const signerExpenseManager = this.getSignerDetails(transactionSigner)
    const set = signerExpenseManager.clearExpense(expenseId);
    USER_EXPENSES.set(transactionSigner, signerExpenseManager);

    return set;

  }

  removeExpense(expenseId: u32): bool {
    const transactionSigner = Context.sender;
    const signerExpenseManager = this.getSignerDetails(transactionSigner);
    const set = signerExpenseManager.removeExpense(expenseId);
    USER_EXPENSES.set(transactionSigner, signerExpenseManager);

    return set;

  }

  updateExpenseCompletionDate(expenseId: u32, newDate: String): bool {
    const transactionSigner = Context.sender;
    const signerExpenseManager = this.getSignerDetails(transactionSigner);
    const set = signerExpenseManager.updateCompleteDate(expenseId, newDate);
    USER_EXPENSES.set(transactionSigner, signerExpenseManager);

    return set;

  }

  updateExpenseAmount(expenseId: u32, newAmount: String): bool {
    const transactionSigner = Context.sender;
    const signerExpenseManager = this.getSignerDetails(transactionSigner);
    const set = signerExpenseManager.updateAmount(expenseId, newAmount);
    USER_EXPENSES.set(transactionSigner, signerExpenseManager);

    return set;

  }

  deleteExpense(expenseId: u32): bool {
    const transactionSigner = Context.sender;
    const signerExpenseManager = this.getSignerDetails(transactionSigner);
    const set = signerExpenseManager.deleteExpense(expenseId);
    USER_EXPENSES.set(transactionSigner, signerExpenseManager);

    return set;

  }

}
