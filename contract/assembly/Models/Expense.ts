
import { ExpenseStatus } from '../utils/enums';

@nearBindgen
export class Expense {
    id: u32;
    title: String;
    status: ExpenseStatus;
    amount: String;
    description: String;
    expectedCompleteDate: String;
    createdAt: String;

    constructor(id: u32, title: String, description: String, amount: String, expectedCompleteDate: String, createdAt: String) {
        this.id = id;
        this.title = title;
        this.status = ExpenseStatus.PENDING;
        this.description = description;
        this.amount = amount;
        this.expectedCompleteDate = expectedCompleteDate;
        this.createdAt = createdAt;
    }


    updateAmount(newAmount: String) : void {
        this.amount = newAmount;

    }

    updateCompleteDate(newDate: String) : void {
        this.expectedCompleteDate = newDate;
    }

    updateStatus(newStatus: ExpenseStatus) : void {
        this.status = newStatus;
    }
}
