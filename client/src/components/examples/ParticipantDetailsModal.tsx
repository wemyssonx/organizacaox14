import { useState } from 'react';
import ParticipantDetailsModal from '../ParticipantDetailsModal';
import { Button } from '@/components/ui/button';

export default function ParticipantDetailsModalExample() {
  const [open, setOpen] = useState(false);

  const mockParticipant = {
    id: '1',
    nome: 'Maria Silva Santos',
    telefone: '(91) 98765-4321',
    email: 'maria.silva@email.com',
    cidadeEstado: 'Belém, PA',
    assignments: [
      { departamento: 'marketing' as const, funcao: 'Mídias Sociais (Postagens e ADS)' },
      { departamento: 'seguranca' as const, funcao: 'Organização da equipe de segurança' }
    ]
  };

  return (
    <div className="p-8 bg-background">
      <Button onClick={() => setOpen(true)}>
        Ver Detalhes
      </Button>
      <ParticipantDetailsModal
        participant={mockParticipant}
        open={open}
        onClose={() => setOpen(false)}
        onEdit={(p) => console.log('Edit:', p)}
        onDelete={(p) => console.log('Delete:', p)}
      />
    </div>
  );
}
