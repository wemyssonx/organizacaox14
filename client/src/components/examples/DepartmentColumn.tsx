import DepartmentColumn from '../DepartmentColumn';

export default function DepartmentColumnExample() {
  const mockParticipants = [
    {
      id: '1',
      nome: 'João Silva',
      telefone: '(91) 98765-4321',
      email: 'joao@email.com',
      cidadeEstado: 'Belém, PA',
      departamento: 'marketing',
      funcao: 'Mídias Sociais (Postagens e ADS)'
    },
    {
      id: '2',
      nome: 'Maria Santos',
      telefone: '(91) 98765-1234',
      email: 'maria@email.com',
      cidadeEstado: 'Ananindeua, PA',
      departamento: 'marketing',
      funcao: 'Comunicação em Campo (Carro/Bike/Moto de Som)'
    }
  ];

  return (
    <div className="p-8 bg-background">
      <DepartmentColumn 
        departmentKey="marketing"
        participants={mockParticipants}
        onParticipantClick={(p) => console.log('Clicked:', p.nome)}
      />
    </div>
  );
}
