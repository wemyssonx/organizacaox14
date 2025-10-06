import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, MapPin, Phone, Edit, Trash2 } from 'lucide-react';
import type { Participant } from '@/lib/types';
import { DEPARTAMENTOS, type DepartamentoKey } from '@/lib/types';

interface ParticipantDetailsModalProps {
  participant: Participant | null;
  open: boolean;
  onClose: () => void;
  onEdit?: (participant: Participant) => void;
  onDelete?: (participant: Participant) => void;
}

export default function ParticipantDetailsModal({ 
  participant, 
  open, 
  onClose,
  onEdit,
  onDelete 
}: ParticipantDetailsModalProps) {
  if (!participant) return null;

  const departamento = DEPARTAMENTOS[participant.departamento as DepartamentoKey];
  const initials = participant.nome
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg" data-testid="modal-participant-details">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Detalhes do Participante</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xl font-semibold text-primary">{initials}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-xl" data-testid="text-participant-name">
                {participant.nome}
              </h3>
              <Badge className={`mt-1 ${departamento.bgColor} border-0`}>
                {departamento.nome}
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Função</Label>
              <p className="text-sm" data-testid="text-participant-function">{participant.funcao}</p>
            </div>

            <div className="space-y-2">
              <Label>Contato</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span data-testid="text-participant-phone">{participant.telefone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span data-testid="text-participant-email">{participant.email}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Localização</Label>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span data-testid="text-participant-location">{participant.cidadeEstado}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => {
                onEdit?.(participant);
                onClose();
              }}
              data-testid="button-edit-participant"
            >
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onDelete?.(participant);
                onClose();
              }}
              data-testid="button-delete-participant"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-medium text-muted-foreground">{children}</p>;
}
