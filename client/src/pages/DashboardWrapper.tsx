import { useIsMobile } from '@/hooks/use-mobile';
import Dashboard from './Dashboard';
import DashboardMobile from './DashboardMobile';

export default function DashboardWrapper() {
  const isMobile = useIsMobile();
  
  return isMobile ? <DashboardMobile /> : <Dashboard />;
}
