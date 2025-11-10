import { useTranslations } from '@/lib/i18n';
import { useDashboard, useUpcomingRepaymentsChart } from '@/hooks/use-dashboard';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@/hooks/use-user';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  TrendingUp,
  Wallet,
  Clock,
  ArrowRight,
  Plus,
  Send
} from 'lucide-react';
import { Link } from 'wouter';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

function DashboardSkeleton() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <Skeleton className="h-32 w-full" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
      <Skeleton className="h-96 w-full" />
    </div>
  );
}

// Mock trend data - months will be translated via recharts formatter
const mockTrendData = [
  { month: 1, value: 45000 },
  { month: 2, value: 48000 },
  { month: 3, value: 47500 },
  { month: 4, value: 50000 },
  { month: 5, value: 52000 },
  { month: 6, value: 51000 },
];

// Mock cashflow data - using month names directly from translations
const getMockCashflowData = (t: ReturnType<typeof useTranslations>) => [
  { month: t.dashboard.monthJan, income: 55000, expenses: 42000 },
  { month: t.dashboard.monthFeb, income: 58000, expenses: 45000 },
  { month: t.dashboard.monthMar, income: 52000, expenses: 43000 },
  { month: t.dashboard.monthApr, income: 60000, expenses: 48000 },
  { month: t.dashboard.monthMay, income: 62000, expenses: 50000 },
  { month: t.dashboard.monthJun, income: 61000, expenses: 49000 },
];

export default function Dashboard() {
  const t = useTranslations();
  const { data: dashboardData, isLoading: isDashboardLoading } = useDashboard();
  const { data: repaymentsData, isLoading: isRepaymentsLoading } = useUpcomingRepaymentsChart();
  const { data: user } = useUser();
  
  const mockCashflowData = getMockCashflowData(t);
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    let greeting = t.dashboard.goodMorning;
    if (hour < 12) greeting = t.dashboard.goodMorning;
    else if (hour < 18) greeting = t.dashboard.goodAfternoon;
    else greeting = t.dashboard.goodEvening;
    
    if (user) {
      const firstName = user.fullName.split(' ')[0];
      return `${greeting}, ${firstName}`;
    }
    return greeting;
  };

  if (isDashboardLoading) {
    return <DashboardSkeleton />;
  }

  if (!dashboardData) {
    return (
      <div className="p-6 md:p-8">
        <p className="text-destructive">{t.dashboard.dataLoadError}</p>
      </div>
    );
  }

  const creditUtilization = dashboardData.borrowingCapacity.maxCapacity > 0
    ? ((dashboardData.borrowingCapacity.maxCapacity - dashboardData.borrowingCapacity.currentCapacity) / dashboardData.borrowingCapacity.maxCapacity) * 100
    : 0;

  const pieData = [
    { name: t.dashboard.used, value: creditUtilization },
    { name: t.dashboard.available, value: 100 - creditUtilization },
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--muted))'];

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto">
        {/* Hero Band - Wealth Overview */}
        <div className="space-y-2">
          <h1 className="text-xl font-medium text-foreground">
            {getGreeting()}
          </h1>
        </div>

        {/* Balance Hero Card */}
        <Card className="p-6 md:p-8 border-card-border bg-gradient-to-br from-primary/5 via-card to-card">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">{t.dashboard.totalBalance}</p>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground" data-testid="text-total-balance">
                  {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(dashboardData.balance.currentBalance)}
                </h2>
              </div>

              <div className="flex flex-wrap gap-6" data-testid="section-balance-kpis">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{t.dashboard.availableCredit}</p>
                  <p className="text-lg font-semibold text-foreground" data-testid="text-available-credit">
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(dashboardData.balance.availableCredit)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{t.dashboard.activeLoans}</p>
                  <p className="text-lg font-semibold text-foreground" data-testid="text-active-loans-count">
                    {dashboardData.balance.activeLoansCount}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{t.dashboard.totalBorrowed}</p>
                  <p className="text-lg font-semibold text-foreground" data-testid="text-total-borrowed">
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(dashboardData.balance.totalBorrowed)}
                  </p>
                </div>
              </div>
            </div>

            {/* Sparkline Trend */}
            <div className="h-24 w-full md:w-80" data-testid="chart-balance-trend">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockTrendData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    fill="url(#colorValue)" 
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Link href="/transfer/new">
            <Button className="gap-2" data-testid="button-new-transfer">
              <Send className="w-4 h-4" />
              {t.dashboard.newTransfer}
            </Button>
          </Link>
          <Link href="/loan-request">
            <Button variant="outline" className="gap-2" data-testid="button-request-loan">
              <Plus className="w-4 h-4" />
              {t.dashboard.requestLoan}
            </Button>
          </Link>
          <Link href="/accounts">
            <Button variant="outline" className="gap-2" data-testid="button-manage-accounts">
              <Wallet className="w-4 h-4" />
              {t.dashboard.manageAccounts}
            </Button>
          </Link>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cashflow Chart */}
          <Card className="p-6 col-span-1 md:col-span-2">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-1">{t.dashboard.cashflow}</h3>
              <p className="text-sm text-muted-foreground">{t.dashboard.incomeExpensesSixMonths}</p>
            </div>
            <div className="h-64" data-testid="chart-cashflow">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockCashflowData}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value)}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="income" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    fill="url(#colorIncome)" 
                    name={t.dashboard.income}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="expenses" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    fill="url(#colorExpenses)" 
                    name={t.dashboard.expenses}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Credit Utilization */}
          <Card className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-1">{t.dashboard.creditUtilization}</h3>
              <p className="text-sm text-muted-foreground">{t.dashboard.borrowingCapacity}</p>
            </div>
            <div className="flex flex-col items-center justify-center" data-testid="section-credit-utilization">
              <div className="relative w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-3xl font-bold text-foreground">{creditUtilization.toFixed(0)}%</p>
                  <p className="text-xs text-muted-foreground">{t.dashboard.used}</p>
                </div>
              </div>
              <div className="mt-6 w-full space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t.dashboard.used}</span>
                  <span className="font-semibold text-foreground">
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(dashboardData.borrowingCapacity.maxCapacity - dashboardData.borrowingCapacity.currentCapacity)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t.dashboard.available}</span>
                  <span className="font-semibold text-accent">
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(dashboardData.borrowingCapacity.currentCapacity)}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Activity Feed - Transactions & Loans */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{t.dashboard.recentActivity}</h3>
                <p className="text-sm text-muted-foreground">{t.dashboard.latestTransactions}</p>
              </div>
              <Link href="/history">
                <Button variant="ghost" size="sm" className="gap-1" data-testid="link-view-all-history">
                  {t.dashboard.viewAll}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {dashboardData.transfers.slice(0, 5).map((transfer) => (
                <div 
                  key={transfer.id} 
                  className="flex items-center justify-between p-3 rounded-lg hover-elevate bg-muted/30"
                  data-testid={`transfer-item-${transfer.id}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{transfer.recipient}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(transfer.updatedAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      -{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(Number(transfer.amount))}
                    </p>
                    <Badge variant={
                      transfer.status === 'approved' || transfer.status === 'completed' ? 'default' : 
                      transfer.status === 'pending' || transfer.status === 'in-progress' ? 'secondary' : 
                      'destructive'
                    } className="text-xs">
                      {transfer.status === 'approved' || transfer.status === 'completed' ? t.dashboard.completed : 
                       transfer.status === 'pending' ? t.dashboard.pending : 
                       transfer.status === 'in-progress' ? t.dashboard.inProgress :
                       t.dashboard.rejected}
                    </Badge>
                  </div>
                </div>
              ))}

              {dashboardData.transfers.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">{t.dashboard.noRecentTransactions}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Active Loans */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{t.dashboard.yourActiveLoans}</h3>
                <p className="text-sm text-muted-foreground">{t.loan.activeLoansDescription || 'Vos emprunts en cours'}</p>
              </div>
              <Link href="/loans">
                <Button variant="ghost" size="sm" className="gap-1" data-testid="link-view-all-loans">
                  {t.dashboard.viewAll}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {dashboardData.loans.slice(0, 5).map((loan) => {
                const progress = loan.totalRepaid ? (Number(loan.totalRepaid) / Number(loan.amount)) * 100 : 0;
                
                return (
                  <div 
                    key={loan.id} 
                    className="p-4 rounded-lg hover-elevate bg-muted/30"
                    data-testid={`loan-item-${loan.id}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">
                            {t.dashboard.activeLoan}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {loan.interestRate}% APR
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground text-sm">
                          {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(Number(loan.amount))}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{t.dashboard.repaid}</span>
                        <span>{progress.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div 
                          className="bg-accent h-1.5 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

              {dashboardData.loans.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">{t.dashboard.noActiveLoans}</p>
                  <Link href="/loan-request">
                    <Button variant="outline" size="sm" className="mt-4" data-testid="button-request-first-loan">
                      {t.dashboard.requestLoan}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Upcoming Payments */}
        {repaymentsData && repaymentsData.length > 0 && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{t.dashboard.upcomingRepayments}</h3>
                <p className="text-sm text-muted-foreground">{t.dashboard.upcomingDueDates}</p>
              </div>
              <Clock className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={repaymentsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value)}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                    name={t.dashboard.amount}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
