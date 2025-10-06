import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, MapPin, Phone, GripVertical, User } from 'lucide-react';
import type { Participant } from '@/lib/types';
import { DEPARTAMENTOS, type DepartamentoKey } from '@/lib/types';

interface ParticipantCardProps {
  participant: Participant;
  onClick?: () => void;
}

export default function ParticipantCard({ participant, onClick }: ParticipantCardProps) {
  const departamento = DEPARTAMENTOS[participant.departamento as DepartamentoKey];
  const initials = participant.nome
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card 
      className="p-4 hover-elevate active-elevate-2 cursor-pointer transition-all"
      onClick={onClick}
      data-testid={`card-participant-${participant.id}`}
    >
      <div className="flex items-start gap-3">
        <GripVertical className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3 mb-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">{initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base text-foreground truncate" data-testid={`text-name-${participant.id}`}>
                {participant.nome}
              </h3>
              <Badge 
                className={`mt-1 text-xs ${departamento.bgColor} border-0`}
                data-testid={`badge-function-${participant.id}`}
              >
                {participant.funcao}
              </Badge>
            </div>
          </div>
          
          <div className="space-y-1.5 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="truncate" data-testid={`text-phone-${participant.id}`}>{participant.telefone}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="truncate" data-testid={`text-email-${participant.id}`}>{participant.email}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="truncate" data-testid={`text-location-${participant.id}`}>{participant.cidadeEstado}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
