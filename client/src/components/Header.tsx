import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, UserPlus, Users, LogOut, Lock } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  onNewParticipant?: () => void;
  onExport?: () => void;
  participantCount?: number;
}

export default function Header({ onNewParticipant, onExport, participantCount = 0 }: HeaderProps) {
  const { isAdmin, loginAdmin, logout } = useAuth();
  const { toast } = useToast();
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [password, setPassword] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      toast({
        title: 'Acesso Administrativo Ativado',
        description: 'Você agora tem acesso completo ao sistema.',
      });
      setShowAdminLogin(false);
      setPassword('');
    } else {
      toast({
        title: 'Senha Incorreta',
        description: 'A senha de administrador está incorreta.',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: 'Modo Público Ativado',
      description: 'Você está agora em modo de visualização.',
    });
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              <div>
                <h1 
                  className={`font-display font-semibold text-lg leading-tight ${!isAdmin ? 'cursor-pointer hover-elevate' : ''}`}
                  onClick={() => !isAdmin && setShowAdminLogin(true)}
                  data-testid="text-title"
                >
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
            {!isAdmin && (
              <Button
                variant="outline"
                size="default"
                onClick={() => setShowAdminLogin(true)}
                data-testid="button-admin-access"
                className="hover-elevate active-elevate-2"
              >
                <Lock className="h-4 w-4 mr-2" />
                Acesso Admin
              </Button>
            )}
            {isAdmin && (
              <>
                <Button
                  onClick={onNewParticipant}
                  data-testid="button-new-participant"
                  className="bg-orange hover:bg-orange/90"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Novo Cadastro
                </Button>
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
              </>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      <Dialog open={showAdminLogin} onOpenChange={setShowAdminLogin}>
        <DialogContent data-testid="modal-admin-login">
          <DialogHeader>
            <DialogTitle>Acesso Administrativo</DialogTitle>
            <DialogDescription>
              Digite a senha para acessar o modo de administração
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-password">Senha de Administrador</Label>
              <Input
                id="admin-password"
                type="password"
                placeholder="Digite a senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="input-admin-password"
                required
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowAdminLogin(false);
                  setPassword('');
                }}
                data-testid="button-cancel-admin"
              >
                Cancelar
              </Button>
              <Button type="submit" data-testid="button-submit-admin">
                Entrar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
