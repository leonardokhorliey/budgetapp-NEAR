#!/bin/bash

yarn build

read -p "Enter your testnet wallet address: " wallet
echo
read -p "Enter your choice contract address: " contract
echo
read -p "How many NEAR tokens to be transferred: " balance
echo
echo "Attempting to create contract account $contract on wallet address $wallet with initial balance $balance"

near create-account $contract --masterAccount $wallet --initialBalance $balance

near deploy $2 --wasmFile=./build/release/expense-contract.wasm