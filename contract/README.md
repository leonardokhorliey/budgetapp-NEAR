budgetApp Smart Contract
==================

A [smart contract] written in [AssemblyScript] for an app initialized with [create-near-app]


Quick Start
===========

Before you compile this code, you will need to install [Node.js] ≥ 12


Exploring The Code
==================

1. The main smart contract code lives in `assembly/index.ts`. 
2. Tests: You can run smart contract tests with the `./test` script. This runs
   standard AssemblyScript tests using [as-pect].

Running the Contract Locally
==================

You can run various aspects of the contract by via a bash terminal by running `./scripts/[FILE_PATH]` where `FILE_PATH` is the name of the script for the particular function you want to run as in the table below


| Function | FilePath |
| -------- | -------- |
| Deploy Contract | `deploy.sh` |
| Create A New Expense | `create.sh` |
| Get All Expenses | `getexpenses.sh` |
| Update Expense Amount | `update-amount.sh` |
| Clear An Expense | `clear-expense.sh` |
| Drop An Expense | `drop-expense.sh` |
| Delete An Expense | `delete-expense.sh` |



## Note
You can edit the scripts file should you need to deploy the contract at another address.


  
