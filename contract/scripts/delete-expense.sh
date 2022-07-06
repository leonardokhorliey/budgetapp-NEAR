#!/bin/bash



read -p "Signing Wallet Address: " wallet



echo $wallet "deleting Expense"


near call expenses.leonard0.testnet deleteExpense '{"expenseId": 0}' --accountId $wallet