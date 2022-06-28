import React, { useEffect, useState } from 'react';
import { Wallet, Contract } from './utils/nearconfig';

import Home from './components/home';
import NewExpense from './components/NewExpense/NewExpense';
import Expenses from './components/Expenses/Expenses';

const storage = window.localStorage;


const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accountId, setAccountId] = useState('');
  const [wallet, setWallet] = useState();

  const loadPage = <main>
    <h2>Loading...</h2>
  </main>

  const addExpenseHandler = async (title, description, amount, completeDate) => {
    let expense = {title, description, amount, completeDate, createdAt: new Date().toISOString()};
    
    await Contract(wallet.account()).createNewExpense(expense);
    
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  const getExpenses = async (wallet) => {
    let expenses_ = await Contract(wallet.account()).getAllExpenses();
    
    setExpenses(expenses_);
  }

  const handleSignIn = () => {
    setLoading(true);
    setLoggedIn(true);

    setTimeout(() => {
      
      Wallet().then((tx) => {

        if (tx.isSignedIn()) {
          setLoading(false);
          setAccountId(tx.getAccountId());
          return;
        }

        tx.requestSignIn(
          process.env.REACT_APP_CONTRACT_ADDRESS || 'expenses.leonard0.testnet', // contract requesting access
          "Budget App"
        );
         
      }).catch((e) => {
        console.log(e.message)
      });
      
    }, 1000)  

  }

  const handleSignOut = async () => {
    wallet.signOut();
    storage.removeItem('budGittApp');
    setLoggedIn(false);
  }

  const handleUpdateExpense = async (expenseId, newAmount, newCompleteDate) => {
    if (!newAmount) {await Contract(wallet.account()).updateExpenseCompletionDate({expenseId, newCompleteDate}); return;}
    if (!newCompleteDate) {await Contract(wallet.account()).updateExpenseAmount({expenseId, newAmount}); return;}
    await Contract(wallet.account()).updateExpenseCompletionDate({expenseId, newCompleteDate});
    await Contract(wallet.account()).updateExpenseAmount({expenseId, newAmount});
    await getExpenses(wallet);
    alert("Expense updated Successfully");
  }

  const handleClearExpense = async (expenseId) => {
    await Contract(wallet.account()).clearExpense({expenseId});
    await getExpenses(wallet);
    alert("Expense cleared Successfully");
  }

  const handleRemoveExpense = async (expenseId) => {
    await Contract(wallet.account()).removeExpense({expenseId});
    await getExpenses(wallet);
    alert("Expense dropped Successfully");
  }

  const handleDeleteExpense = async (expenseId) => {
    let check_ = window.confirm("Are you sure? \n A delete action can not be undone");
    if (!check_) return;
    await Contract(wallet.account()).deleteExpense({expenseId});
    await getExpenses(wallet);
    alert("Expense deleted Successfully");
  }

  useEffect(() => {
    
    setLoading(true);
    setLoggedIn(true);

    Wallet().then((tx) => {
      if (!tx.isSignedIn()) {
        setLoggedIn(false);
        return;
      }

      setWallet(tx);
      setAccountId(tx.getAccountId());
      getExpenses(tx).then(() => setLoading(false)).catch((e)=> console.log(e.message));   
    }).catch((e) => {
      console.log(e.message)
      setLoggedIn(false);
    });
  }, [])



  

  return (<>
    {!loggedIn && <Home signIn= {handleSignIn}/>}
    {loggedIn && (loading ? loadPage : <>
    <header>
        <h1>Bud<span>Gitt</span></h1>
        <div>
          <div>
            <p>{accountId}</p>
          </div>

          <button onClick= {handleSignOut}>
            Sign Out
          </button>
        </div>
        
    </header>
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} updateExpense= {handleUpdateExpense} clearExpense={handleClearExpense} removeExpense={handleRemoveExpense} deleteExpense= {handleDeleteExpense} />
    </div></>)}</>
  );
};

export default App;
