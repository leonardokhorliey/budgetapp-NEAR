import { ExpenseStatus } from "../utils/enums";
import { Expense } from "./Expense";

@nearBindgen
export class ExpenseManager {

    expenses: Expense[] = [];

    addExpense(title: String, description: String, amount: String, completeDate: String, createdAt: String) : void {

        const lastExpenseId = this.expenses.length > 0 ? this.expenses[this.expenses.length - 1].id : 0;
        this.expenses.push(new Expense(lastExpenseId, title, description, amount, completeDate, createdAt));
    }

    getAllExpense(): Expense[] {
        return this.expenses;
    }

    clearExpense(expenseId: i32): bool {
        if (expenseId < this.expenses.length) {
            this.expenses[expenseId].status = ExpenseStatus.CLEARED;
            return true;
        } 
        return false;
    }

    removeExpense(expenseId: i32) : bool {
        if (expenseId < this.expenses.length) {
            this.expenses[expenseId].status = ExpenseStatus.REMOVED;
            return true;
        } 
        return false;
    }

    updateAmount(expenseId: i32, newAmount: String) : bool {
        if (expenseId < this.expenses.length) {
            this.expenses[expenseId].updateAmount(newAmount);
            return true;
        }
        return false;
    }

    updateCompleteDate(expenseId: i32, newDate: String) : bool {
        if (expenseId < this.expenses.length) {
            this.expenses[expenseId].updateCompleteDate(newDate);
            return true;
        }
        return false;
    }

    deleteExpense(expenseId: i32) : bool {
        if (expenseId >= this.expenses.length) return false;
        const newExpenses: Expense[] = [];

        for (let i= 0; i < this.expenses.length; i++) {
            if (i !== expenseId) {
                newExpenses.push(this.expenses[i])
            }
        }
        this.expenses = newExpenses;
        return true;
    }
}