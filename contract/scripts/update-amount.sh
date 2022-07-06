#!/bin/bash



read -p "Signing Wallet Address: " wallet



echo $wallet "updating Expense amount"


near call expenses.leonard0.testnet updateExpenseAmount '{"expenseId": 0, "newAmount":"200000"}' --accountId $wallet