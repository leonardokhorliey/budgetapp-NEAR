#!/bin/bash



read -p "Signing Wallet Address: " wallet



echo $wallet "clearing Expense"


near call expenses.leonard0.testnet clearExpense '{"expenseId": 0}' --accountId $wallet