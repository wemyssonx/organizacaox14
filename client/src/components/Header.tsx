import { Button } from '@/components/ui/button';
import { Download, UserPlus, Users, LogOut } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';

interface HeaderProps {
  onNewParticipant?: () => void;
  onExport?: () => void;
  participantCount?: number;
}

export default function Header({ onNewParticipant, onExport, participantCount = 0 }: HeaderProps) {
  const { isAdmin, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            <div>
              <h1 className="font-display font-semibold text-lg leading-tight">
                14º Aniversário Filosofia X
              </h1>
              <p className="text-xs text-muted-foreground">
                {participantCount} participante{participantCount !== 1 ? 's' : ''} {isAdmin && '• Administrador'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="default"
            onClick={onExport}
            data-testid="button-export"
            className="hover-elevate active-elevate-2"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          {isAdmin && (
            <Button
              onClick={onNewParticipant}
              data-testid="button-new-participant"
              className="bg-orange hover:bg-orange/90"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Novo Cadastro
            </Button>
          )}
          <Button
            variant="outline"
            size="default"
            onClick={handleLogout}
            data-testid="button-logout"
            className="hover-elevate active-elevate-2"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
