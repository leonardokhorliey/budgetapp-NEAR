import { PersistentDeque, PersistentMap } from "near-sdk-core";
import { ExpenseManager } from "../Models/ExpenseManager";


export const USERS = new PersistentDeque<String>("j");
export const USER_EXPENSES = new PersistentMap<String, ExpenseManager>("j")
