import Header from '../Header';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function HeaderExample() {
  return (
    <ThemeProvider>
      <div className="bg-background min-h-screen">
        <Header
          participantCount={42}
          onNewParticipant={() => console.log('New participant')}
          onExport={() => console.log('Export')}
        />
      </div>
    </ThemeProvider>
  );
}
