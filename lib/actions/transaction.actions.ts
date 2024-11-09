"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { parseStringify } from "../utils";
import { Client, Databases, Models } from "node-appwrite";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_TRANSACTION_COLLECTION_ID: TRANSACTION_COLLECTION_ID,
} = process.env;

async function createTransactionCollection(database: Databases) {
  try {
    await database.createCollection(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      'Transactions'
    );

    // Create necessary attributes
    await database.createStringAttribute(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      'name',
      255,
      true
    );

    await database.createStringAttribute(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      'email',
      255,
      true
    );

    await database.createFloatAttribute(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      'amount',
      true
    );

    await database.createStringAttribute(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      'senderId',
      255,
      true
    );

    await database.createStringAttribute(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      'senderBankId',
      255,
      true
    );

    await database.createStringAttribute(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      'receiverId',
      255,
      true
    );

    await database.createStringAttribute(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      'receiverBankId',
      255,
      true
    );

    await database.createStringAttribute(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      'channel',
      255,
      true
    );

    await database.createStringAttribute(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      'category',
      255,
      true
    );

  } catch (error: any) {
    // Ignore if collection already exists
    if (error.code !== 409) {
      console.error('Error creating transaction collection:', error);
      throw error;
    }
  }
}

export const createTransaction = async (transaction: CreateTransactionProps) => {
  try {
    const { database } = await createAdminClient();

    // Ensure collection exists
    await createTransactionCollection(database);

    const newTransaction = await database.createDocument(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      ID.unique(),
      {
        channel: 'online',
        category: 'Transfer',
        ...transaction
      }
    );

    return parseStringify(newTransaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
}

export const getTransactionsByBankId = async ({bankId}: getTransactionsByBankIdProps) => {
  try {
    const { database } = await createAdminClient();

    // Ensure collection exists
    await createTransactionCollection(database);

    const senderTransactions = await database.listDocuments(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      [Query.equal('senderBankId', bankId)]
    );

    const receiverTransactions = await database.listDocuments(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      [Query.equal('receiverBankId', bankId)]
    );

    return {
      total: (senderTransactions?.total || 0) + (receiverTransactions?.total || 0),
      documents: [
        ...(senderTransactions?.documents || []), 
        ...(receiverTransactions?.documents || [])
      ]
    };
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return { documents: [] };
  }
}