import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLoanSchema, insertTransferSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const DEMO_USER_ID = "demo-user-001";

  app.get("/api/dashboard", async (req, res) => {
    try {
      const data = await storage.getDashboardData(DEMO_USER_ID);
      
      const formatDate = (date: Date | null) => {
        if (!date) return null;
        return new Date(date).toLocaleDateString('fr-FR', { 
          day: 'numeric', 
          month: 'short', 
          year: 'numeric' 
        });
      };

      const getTimeAgo = (date: Date) => {
        const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
        if (seconds < 60) return 'Il y a quelques secondes';
        if (seconds < 3600) return `Il y a ${Math.floor(seconds / 60)} minutes`;
        if (seconds < 86400) return `Il y a ${Math.floor(seconds / 3600)} heures`;
        return `Il y a ${Math.floor(seconds / 86400)} jours`;
      };

      const response = {
        balance: {
          currentBalance: data.balance,
          activeLoansCount: data.loans.filter(l => l.status === 'active').length,
          totalBorrowed: data.loans.reduce((sum, loan) => sum + parseFloat(loan.amount), 0),
          availableCredit: 500000 - data.balance,
          lastUpdated: 'Il y a 5 minutes',
        },
        loans: data.loans.map(loan => ({
          id: loan.id,
          amount: parseFloat(loan.amount),
          interestRate: parseFloat(loan.interestRate),
          nextPaymentDate: formatDate(loan.nextPaymentDate),
          totalRepaid: parseFloat(loan.totalRepaid),
          status: loan.status,
        })),
        transfers: data.transfers.map(transfer => ({
          id: transfer.id,
          amount: parseFloat(transfer.amount),
          recipient: transfer.recipient,
          status: transfer.status,
          currentStep: transfer.currentStep,
          updatedAt: getTimeAgo(transfer.updatedAt),
        })),
        fees: data.fees.map(fee => ({
          id: fee.id,
          feeType: fee.feeType,
          reason: fee.reason,
          amount: parseFloat(fee.amount),
          createdAt: formatDate(fee.createdAt),
          category: fee.feeType.toLowerCase().includes('prêt') || fee.feeType.toLowerCase().includes('loan') || fee.feeType.toLowerCase().includes('dossier') || fee.feeType.toLowerCase().includes('garantie')
            ? 'loan'
            : fee.feeType.toLowerCase().includes('transfer')
            ? 'transfer'
            : 'account',
        })),
        borrowingCapacity: {
          maxCapacity: 500000,
          currentCapacity: 500000 - data.balance,
        },
      };

      res.json(response);
    } catch (error) {
      console.error('Dashboard error:', error);
      res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
  });

  app.get("/api/loans", async (req, res) => {
    try {
      const loans = await storage.getUserLoans(DEMO_USER_ID);
      res.json(loans);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch loans' });
    }
  });

  app.post("/api/loans", async (req, res) => {
    try {
      const validated = insertLoanSchema.parse({
        ...req.body,
        userId: DEMO_USER_ID,
      });
      const loan = await storage.createLoan(validated);
      res.status(201).json(loan);
    } catch (error) {
      res.status(400).json({ error: 'Invalid loan data' });
    }
  });

  app.get("/api/transfers", async (req, res) => {
    try {
      const transfers = await storage.getUserTransfers(DEMO_USER_ID);
      res.json(transfers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch transfers' });
    }
  });

  app.post("/api/transfers", async (req, res) => {
    try {
      const validated = insertTransferSchema.parse({
        ...req.body,
        userId: DEMO_USER_ID,
      });
      const transfer = await storage.createTransfer(validated);
      
      await storage.createFee({
        userId: DEMO_USER_ID,
        feeType: 'Frais de transfert',
        reason: `Transfert vers ${validated.recipient}`,
        amount: '25',
      });

      res.status(201).json(transfer);
    } catch (error) {
      res.status(400).json({ error: 'Invalid transfer data' });
    }
  });

  app.get("/api/fees", async (req, res) => {
    try {
      const fees = await storage.getUserFees(DEMO_USER_ID);
      res.json(fees);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch fees' });
    }
  });

  app.get("/api/transactions", async (req, res) => {
    try {
      const transactions = await storage.getUserTransactions(DEMO_USER_ID);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch transactions' });
    }
  });

  app.get("/api/charts/available-funds", async (req, res) => {
    try {
      const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
      const data = months.map((month, index) => ({
        month,
        available: 300000 + (index * 7000),
        committed: 150000 - (index * 5000),
        reserved: 50000 - (index * 1500),
      }));
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch chart data' });
    }
  });

  app.get("/api/charts/upcoming-repayments", async (req, res) => {
    try {
      const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
      const data = months.map((month) => ({
        month,
        loan1: 8000,
        loan2: 6000,
        loan3: 4000,
      }));
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch chart data' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
