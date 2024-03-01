import { addTransaction, 
    getTransactionById, 
    getAllTransactions, 
    deleteTransaction, 
    transactionbyuserid, 
    transactionbyprogramid } from "../controllers/transaction.controller";
    import { verifyjwt } from "../middlewares/userauth.middleware.js";
import {Router}  from "express";


const transactionrouter= Router();


transactionrouter.route("/addtransaction").post(verifyjwt, addTransaction)
transactionrouter.route("/gettransactionbyid").get(verifyjwt, getTransactionById)
transactionrouter.route("/alltransactions").get(verifyjwt, getAllTransactions)
transactionrouter.route("/deletetransaction").post(verifyjwt, deleteTransaction)
transactionrouter.route("/transactionbyuserid").get(verifyjwt, transactionbyuserid)
transactionrouter.route("/transactionbyprogramid").get(verifyjwt, transactionbyprogramid)

export default transactionrouter;