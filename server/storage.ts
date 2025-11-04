import { 
  type User, 
  type InsertUser,
  type Loan,
  type InsertLoan,
  type Transfer,
  type InsertTransfer,
  type Fee,
  type InsertFee,
  type Transaction,
  type InsertTransaction
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getUserLoans(userId: string): Promise<Loan[]>;
  getLoan(id: string): Promise<Loan | undefined>;
  createLoan(loan: InsertLoan): Promise<Loan>;
  updateLoan(id: string, loan: Partial<Loan>): Promise<Loan | undefined>;
  
  getUserTransfers(userId: string): Promise<Transfer[]>;
  getTransfer(id: string): Promise<Transfer | undefined>;
  createTransfer(transfer: InsertTransfer): Promise<Transfer>;
  updateTransfer(id: string, transfer: Partial<Transfer>): Promise<Transfer | undefined>;
  
  getUserFees(userId: string): Promise<Fee[]>;
  createFee(fee: InsertFee): Promise<Fee>;
  
  getUserTransactions(userId: string): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  
  getDashboardData(userId: string): Promise<{
    user: User;
    balance: number;
    loans: Loan[];
    transfers: Transfer[];
    fees: Fee[];
    transactions: Transaction[];
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private loans: Map<string, Loan>;
  private transfers: Map<string, Transfer>;
  private fees: Map<string, Fee>;
  private transactions: Map<string, Transaction>;

  constructor() {
    this.users = new Map();
    this.loans = new Map();
    this.transfers = new Map();
    this.fees = new Map();
    this.transactions = new Map();
    this.seedData();
  }

  private seedData() {
    const demoUserId = "demo-user-001";
    const demoUser: User = {
      id: demoUserId,
      username: "jean.dupont",
      password: "hashed_password",
      email: "jean.dupont@entreprise.fr",
      fullName: "Jean Dupont",
      accountType: "business",
    };
    this.users.set(demoUserId, demoUser);

    const loan1: Loan = {
      id: "loan-001",
      userId: demoUserId,
      amount: "200000",
      interestRate: "3.5",
      duration: 60,
      status: "active",
      nextPaymentDate: new Date("2025-12-15"),
      totalRepaid: "75000",
      createdAt: new Date("2023-01-15"),
    };
    this.loans.set(loan1.id, loan1);

    const loan2: Loan = {
      id: "loan-002",
      userId: demoUserId,
      amount: "150000",
      interestRate: "4.2",
      duration: 48,
      status: "active",
      nextPaymentDate: new Date("2025-12-20"),
      totalRepaid: "50000",
      createdAt: new Date("2023-06-10"),
    };
    this.loans.set(loan2.id, loan2);

    const loan3: Loan = {
      id: "loan-003",
      userId: demoUserId,
      amount: "100000",
      interestRate: "3.8",
      duration: 36,
      status: "active",
      nextPaymentDate: new Date("2025-12-28"),
      totalRepaid: "30000",
      createdAt: new Date("2024-02-20"),
    };
    this.loans.set(loan3.id, loan3);

    const transfer1: Transfer = {
      id: "transfer-001",
      userId: demoUserId,
      amount: "50000",
      recipient: "Fournisseur ABC SARL",
      status: "in-progress",
      currentStep: 3,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    };
    this.transfers.set(transfer1.id, transfer1);

    const transfer2: Transfer = {
      id: "transfer-002",
      userId: demoUserId,
      amount: "25000",
      recipient: "Partenaire XYZ Inc.",
      status: "pending",
      currentStep: 1,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    };
    this.transfers.set(transfer2.id, transfer2);

    const fees = [
      {
        id: "fee-001",
        userId: demoUserId,
        feeType: "Frais de dossier",
        reason: "Traitement de la demande de prêt #12345",
        amount: "150",
        createdAt: new Date("2025-11-01"),
      },
      {
        id: "fee-002",
        userId: demoUserId,
        feeType: "Frais de transfert international",
        reason: "Transfert vers compte étranger",
        amount: "25",
        createdAt: new Date("2025-11-05"),
      },
      {
        id: "fee-003",
        userId: demoUserId,
        feeType: "Frais de gestion mensuel",
        reason: "Gestion de compte professionnel",
        amount: "15",
        createdAt: new Date("2025-11-01"),
      },
      {
        id: "fee-004",
        userId: demoUserId,
        feeType: "Frais de garantie",
        reason: "Assurance sur prêt #12346",
        amount: "200",
        createdAt: new Date("2025-11-10"),
      },
    ];
    fees.forEach((fee) => this.fees.set(fee.id, fee));

    const transactions = [
      {
        id: "tx-001",
        userId: demoUserId,
        type: "loan_disbursement",
        amount: "200000",
        description: "Décaissement prêt #12345",
        createdAt: new Date("2023-01-15"),
      },
      {
        id: "tx-002",
        userId: demoUserId,
        type: "loan_payment",
        amount: "-8000",
        description: "Remboursement mensuel prêt #12345",
        createdAt: new Date("2025-11-15"),
      },
      {
        id: "tx-003",
        userId: demoUserId,
        type: "loan_disbursement",
        amount: "150000",
        description: "Décaissement prêt #12346",
        createdAt: new Date("2023-06-10"),
      },
      {
        id: "tx-004",
        userId: demoUserId,
        type: "transfer_out",
        amount: "-50000",
        description: "Transfert vers Fournisseur ABC SARL",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
    ];
    transactions.forEach((tx) => this.transactions.set(tx.id, tx));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      accountType: insertUser.accountType || 'business'
    };
    this.users.set(id, user);
    return user;
  }

  async getUserLoans(userId: string): Promise<Loan[]> {
    return Array.from(this.loans.values()).filter(
      (loan) => loan.userId === userId
    );
  }

  async getLoan(id: string): Promise<Loan | undefined> {
    return this.loans.get(id);
  }

  async createLoan(insertLoan: InsertLoan): Promise<Loan> {
    const id = randomUUID();
    const loan: Loan = {
      ...insertLoan,
      id,
      status: insertLoan.status || 'pending',
      totalRepaid: insertLoan.totalRepaid || '0',
      nextPaymentDate: insertLoan.nextPaymentDate || null,
      createdAt: new Date(),
    };
    this.loans.set(id, loan);
    return loan;
  }

  async updateLoan(id: string, updates: Partial<Loan>): Promise<Loan | undefined> {
    const loan = this.loans.get(id);
    if (!loan) return undefined;
    const updated = { ...loan, ...updates };
    this.loans.set(id, updated);
    return updated;
  }

  async getUserTransfers(userId: string): Promise<Transfer[]> {
    return Array.from(this.transfers.values()).filter(
      (transfer) => transfer.userId === userId
    );
  }

  async getTransfer(id: string): Promise<Transfer | undefined> {
    return this.transfers.get(id);
  }

  async createTransfer(insertTransfer: InsertTransfer): Promise<Transfer> {
    const id = randomUUID();
    const now = new Date();
    const transfer: Transfer = {
      ...insertTransfer,
      id,
      status: insertTransfer.status || 'pending',
      currentStep: insertTransfer.currentStep || 1,
      createdAt: now,
      updatedAt: now,
    };
    this.transfers.set(id, transfer);
    return transfer;
  }

  async updateTransfer(id: string, updates: Partial<Transfer>): Promise<Transfer | undefined> {
    const transfer = this.transfers.get(id);
    if (!transfer) return undefined;
    const updated = { ...transfer, ...updates, updatedAt: new Date() };
    this.transfers.set(id, updated);
    return updated;
  }

  async getUserFees(userId: string): Promise<Fee[]> {
    return Array.from(this.fees.values()).filter(
      (fee) => fee.userId === userId
    );
  }

  async createFee(insertFee: InsertFee): Promise<Fee> {
    const id = randomUUID();
    const fee: Fee = {
      ...insertFee,
      id,
      createdAt: new Date(),
    };
    this.fees.set(id, fee);
    return fee;
  }

  async getUserTransactions(userId: string): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .filter((tx) => tx.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = randomUUID();
    const transaction: Transaction = {
      ...insertTransaction,
      id,
      createdAt: new Date(),
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async getDashboardData(userId: string) {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const loans = await this.getUserLoans(userId);
    const transfers = await this.getUserTransfers(userId);
    const fees = await this.getUserFees(userId);
    const transactions = await this.getUserTransactions(userId);

    const totalBorrowed = loans.reduce((sum, loan) => sum + parseFloat(loan.amount), 0);
    const totalRepaid = loans.reduce((sum, loan) => sum + parseFloat(loan.totalRepaid), 0);
    const balance = totalBorrowed - totalRepaid;

    return {
      user,
      balance,
      loans,
      transfers,
      fees,
      transactions,
    };
  }
}

export const storage = new MemStorage();
