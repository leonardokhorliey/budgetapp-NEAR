#!/bin/bash



read -p "Signing Wallet Address: " wallet



echo $wallet "creating New Expense"


near call expenses.leonard0.testnet createNewExpense '{"title":"House","description":"New Home for the family","amount":"200000","completeDate":"2023-02-03","createdAt":"2022-07-23"}' --accountId $wallet