#!/bin/bash

read -p "Contract Address: " contract
echo
read -p "Signing Wallet Address: " wallet

near call $contract getAllExpenses {} --accountId $wallet
