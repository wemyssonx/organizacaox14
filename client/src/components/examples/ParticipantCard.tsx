import ParticipantCard from '../ParticipantCard';

export default function ParticipantCardExample() {
  const mockParticipant = {
    id: '1',
    nome: 'Maria Silva Santos',
    telefone: '(91) 98765-4321',
    email: 'maria.silva@email.com',
    cidadeEstado: 'Belém, PA',
    assignments: [
      { departamento: 'marketing' as const, funcao: 'Mídias Sociais (Postagens e ADS)' },
      { departamento: 'licenciamento' as const, funcao: 'Documentação e Protocolos' }
    ]
  };

  return (
    <div className="p-8 bg-background">
      <div className="max-w-sm">
        <ParticipantCard 
          participant={mockParticipant} 
          onClick={() => console.log('Card clicked')}
        />
      </div>
    </div>
  );
}
