import ThemeToggle from '../ThemeToggle';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function ThemeToggleExample() {
  return (
    <ThemeProvider>
      <div className="p-8 flex items-center justify-center bg-background">
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}
