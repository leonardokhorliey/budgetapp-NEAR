#!/bin/bash



read -p "Signing Wallet Address: " wallet



echo $wallet "removing Expense"


near call expenses.leonard0.testnet removeExpense '{"expenseId": 0}' --accountId $wallet