import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import transaction from "../models/transaction.model.js";

const addTransaction = asyncHandler(async (req, res, next) => {
    const { amount, description, transaction_id,program_id} = req.body;

    if ([amount, description, transaction_id, program_id, user_id].some((field) => field?.trim() === "")) {
        throw new ApiError(401, "Amount and Transaction ID are required");
    }

    const existedTransaction = await transaction.findOne({ transactionID });

    if (!existedTransaction) {
        throw new ApiError(401, "Transaction already exists");
    }

    const newTransaction = await transaction.create({
        amount,
        description,
        transaction_id,
        ProgramPaid: program_id,
        userPaid: req.user?._id, // Assuming user ID is stored in req.user
    });

    return res.status(200).json(new ApiResponse(200, newTransaction, "Transaction created successfully"));
});

const getTransactionById = asyncHandler(async (req, res, next) => {
    const { transactionId } = req.body;

    if (!transactionId) {
        throw new ApiError(401, "Transaction ID is required");
    }

    const transaction = await transaction.findById(transactionId);

    if (!transaction) {
        throw new ApiError(404, "Transaction not found");
    }

    return res.status(200).json(new ApiResponse(200, transaction, "Transaction fetched successfully"));
});

const getAllTransactions = asyncHandler(async (req, res, next) => {
    const transactions = await transaction.find();

    return res.status(200).json(new ApiResponse(200, transactions, "Transactions fetched successfully"));
});

const deleteTransaction = asyncHandler(async (req, res, next) => {
    const { transactionId } = req.body;

    if (!transactionId) {
        throw new ApiError(401, "Transaction ID is required");
    }

    const result = await transaction.deleteOne({ _id: transactionId });

    if (result.deletedCount === 0) {
        throw new ApiError(404, "Transaction not found");
    }
    return res.status(200).json(new ApiResponse(200, {}, "Transaction deleted successfully"));
});

const transactionbyuserid= asyncHandler(async(req, res, next) => {
    
    const transaction= await transaction.find({userPaid: req.user?._id});

    if(!transaction){
        throw new ApiError(404, "Transaction not found");
    }

    return res 
    .status(200)
    .json(new ApiResponse(200, transaction, "Transaction fetched successfully"));
})

const transactionbyprogramid= asyncHandler(async(req, res, next) => {
    
    const program_id=req.body;
    const transaction= await transaction.find({ProgramPaid: program_id});

    if(!transaction){
        throw new ApiError(404, "Transaction not found");
    }

    return res 
    .status(200)
    .json(new ApiResponse(200, transaction, "Transaction fetched successfully"));
})

export {
    addTransaction,
    getTransactionById,
    getAllTransactions,
    deleteTransaction,
    transactionbyuserid,
    transactionbyprogramid
}
