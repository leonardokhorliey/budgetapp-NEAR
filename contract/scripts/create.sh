#!/bin/bash


read -p "Contract Address: " contract
echo
read -p "Signing Wallet Address: " wallet
echo
read -p "Enter your expense title: " title
echo
read -p "Enter description of expense: " description
echo
read -p "Expected completion Date in YYYY-MM-DD: " date
echo
read -p "Budget ampunt for Expense: " amount

echo $wallet "creating New Expense"


near call $contract createNewExpense '{'"title":$title','"description":${description}','"amount":${amount}','"completeDate":${date}','"createdAt":$(date "+%Y-%m-%dT%H:%M:%S")'}' --accountId $wallet