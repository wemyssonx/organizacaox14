import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ParticipantCard from './ParticipantCard';
import type { Participant } from '@/lib/types';
import { DEPARTAMENTOS, type DepartamentoKey } from '@/lib/types';

interface DepartmentColumnProps {
  departmentKey: DepartamentoKey;
  participants: Participant[];
  onParticipantClick?: (participant: Participant) => void;
}

export default function DepartmentColumn({ 
  departmentKey, 
  participants,
  onParticipantClick 
}: DepartmentColumnProps) {
  const departamento = DEPARTAMENTOS[departmentKey];

  return (
    <div className="flex-shrink-0 w-80" data-testid={`column-${departmentKey}`}>
      <Card className="h-full flex flex-col">
        <div className={`bg-gradient-to-r ${departamento.cor} p-4 rounded-t-lg`}>
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-lg text-white">
              {departamento.nome}
            </h2>
            <Badge 
              variant="secondary" 
              className="bg-white/20 text-white border-0 hover:bg-white/30"
              data-testid={`badge-count-${departmentKey}`}
            >
              {participants.length}
            </Badge>
          </div>
        </div>
        
        <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[calc(100vh-16rem)]">
          {participants.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-sm">Nenhum participante</p>
            </div>
          ) : (
            participants.map(participant => (
              <ParticipantCard
                key={participant.id}
                participant={participant}
                onClick={() => onParticipantClick?.(participant)}
              />
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
