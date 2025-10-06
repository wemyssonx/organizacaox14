import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Phone, MessageCircle, Copy } from 'lucide-react';
import type { Participant } from '@/lib/types';
import { DEPARTAMENTOS } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface ParticipantCardProps {
  participant: Participant;
  onClick?: () => void;
}

export default function ParticipantCard({ participant, onClick }: ParticipantCardProps) {
  const { toast } = useToast();
  
  const initials = participant.nome
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleWhatsApp = (e: React.MouseEvent, phone: string) => {
    e.stopPropagation();
    const cleanPhone = phone.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}`, '_blank');
  };

  const handleCopyEmail = (e: React.MouseEvent, email: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    toast({
      title: "Email copiado!",
      description: "O email foi copiado para a área de transferência.",
    });
  };

  return (
    <Card 
      className="p-4 hover-elevate active-elevate-2 cursor-pointer transition-all h-full flex flex-col"
      onClick={onClick}
      data-testid={`card-participant-${participant.id}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-base font-semibold text-primary">{initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base text-foreground" data-testid={`text-name-${participant.id}`}>
            {participant.nome}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {participant.assignments.length} {participant.assignments.length === 1 ? 'departamento' : 'departamentos'}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {participant.assignments.map((assignment, idx) => {
          const dept = DEPARTAMENTOS[assignment.departamento];
          return (
            <Badge 
              key={idx}
              className={`text-xs ${dept.bgColor} border-0`}
              data-testid={`badge-assignment-${participant.id}-${idx}`}
            >
              {dept.nome}
            </Badge>
          );
        })}
      </div>
      
      <div className="space-y-1.5 text-sm mt-auto">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="truncate" data-testid={`text-phone-${participant.id}`}>{participant.telefone}</span>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 ml-auto"
            onClick={(e) => handleWhatsApp(e, participant.telefone)}
            data-testid={`button-whatsapp-${participant.id}`}
          >
            <MessageCircle className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="truncate" data-testid={`text-email-${participant.id}`}>{participant.email}</span>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 ml-auto"
            onClick={(e) => handleCopyEmail(e, participant.email)}
            data-testid={`button-copy-email-${participant.id}`}
          >
            <Copy className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="truncate" data-testid={`text-location-${participant.id}`}>{participant.cidadeEstado}</span>
        </div>
      </div>
    </Card>
  );
}
