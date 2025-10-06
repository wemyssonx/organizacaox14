import Dashboard from '../Dashboard';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function DashboardExample() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}
