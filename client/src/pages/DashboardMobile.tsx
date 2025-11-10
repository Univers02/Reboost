import { useUser } from '@/hooks/use-user';
import { useDashboard } from '@/hooks/use-dashboard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  Car, 
  ArrowUpCircle, 
  GraduationCap, 
  Building, 
  Heart, 
  Plane
} from 'lucide-react';

export default function DashboardMobile() {
  const { data: user } = useUser();
  const { data: dashboardData } = useDashboard();

  const firstName = user?.fullName?.split(' ')[0] || 'User';
  const totalBalance = dashboardData?.balance?.currentBalance ?? 437500.69;
  const monthlyGoalProgress = 51;

  const recentSavings = [
    {
      icon: Car,
      title: 'Car',
      subtitle: 'Savings for 2024',
      detail: 'AMG GLE 63s Coupe',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Building,
      title: 'Apartment',
      subtitle: 'Savings for 2 BR',
      detail: 'in Lekki Phase 2',
      color: 'bg-blue-100 text-blue-600',
    },
  ];

  const savingsPlans = [
    {
      icon: GraduationCap,
      iconColor: 'bg-blue-500',
      title: 'College Fund',
      description: "Save for child's education",
      goal: 'Savings Goal: 46% college costs',
    },
    {
      icon: Building,
      iconColor: 'bg-green-500',
      title: 'Apartment Fund',
      description: 'Down payment for a home',
      goal: 'Savings Goal: 19% of home price',
    },
    {
      icon: Heart,
      iconColor: 'bg-red-500',
      title: 'Health Fund',
      description: 'Save for medical expenses',
      goal: 'Savings Goal: Annual IRS limit',
    },
    {
      icon: Plane,
      iconColor: 'bg-purple-500',
      title: 'Vacation Fund',
      description: 'End of the year vacation',
      goal: 'Savings Goal: 31% progress',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12" data-testid="avatar-user">
              <AvatarImage src={user?.profilePhoto ?? undefined} />
              <AvatarFallback>{firstName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-muted-foreground" data-testid="text-welcome">Welcome</p>
              <p className="font-semibold text-foreground" data-testid="text-username">{firstName}</p>
            </div>
          </div>
          <Button size="icon" variant="ghost" data-testid="button-notifications">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Total Balance Card with Gradient */}
        <div 
          className="relative overflow-hidden rounded-3xl p-6 text-white shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #0070F3 0%, #0051CC 100%)',
          }}
          data-testid="card-balance"
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-6 -mb-6" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-1 mb-2">
              <p className="text-sm opacity-90">Total Balance</p>
              <div className="w-1 h-1 rounded-full bg-white/60" />
            </div>
            <p className="text-4xl font-bold mb-6" data-testid="text-total-balance">
              <span className="text-xl">€</span>
              {totalBalance.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <Button 
              className="w-full bg-white text-blue-600 hover:bg-gray-100 rounded-xl font-semibold"
              data-testid="button-top-up"
            >
              <ArrowUpCircle className="mr-2 h-5 w-5" />
              Top Up
            </Button>
          </div>
        </div>

        {/* Recent Savings */}
        <div>
          <h3 className="text-sm text-muted-foreground mb-3" data-testid="text-recent-savings">Recent savings</h3>
          <div className="grid grid-cols-2 gap-3">
            {recentSavings.map((saving, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm"
                data-testid={`card-saving-${index}`}
              >
                <div className={`${saving.color} w-12 h-12 rounded-xl flex items-center justify-center mb-3`}>
                  <saving.icon className="h-6 w-6" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">{saving.title}</h4>
                <p className="text-xs text-muted-foreground">{saving.subtitle}</p>
                <p className="text-xs text-muted-foreground">{saving.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Savings Goal */}
        <div 
          className="relative overflow-hidden rounded-3xl p-6 text-white shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #0070F3 0%, #0051CC 100%)',
          }}
          data-testid="card-monthly-goal"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Monthly Savings</h3>
              <p className="text-lg font-semibold">Goal</p>
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/20 p-0 h-auto mt-2 text-sm underline"
                data-testid="button-top-up-goal"
              >
                Top Up
              </Button>
            </div>
            <div className="relative w-24 h-24">
              {/* Progress Circle */}
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="36"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="36"
                  stroke="white"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - monthlyGoalProgress / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{monthlyGoalProgress}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Savings Plan */}
        <div>
          <h3 className="text-sm text-muted-foreground mb-3" data-testid="text-savings-plan">Savings Plan</h3>
          <div className="space-y-3">
            {savingsPlans.map((plan, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm flex items-center justify-between hover-elevate"
                data-testid={`card-plan-${index}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`${plan.iconColor} w-12 h-12 rounded-xl flex items-center justify-center text-white`}>
                    <plan.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{plan.title}</h4>
                    <p className="text-xs text-muted-foreground">{plan.description}</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-1">{plan.goal}</p>
                  </div>
                </div>
                <div className="text-muted-foreground">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
