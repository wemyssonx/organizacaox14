import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import FilterChips from '@/components/FilterChips';
import DepartmentColumn from '@/components/DepartmentColumn';
import ParticipantFormModal from '@/components/ParticipantFormModal';
import ParticipantDetailsModal from '@/components/ParticipantDetailsModal';
import FloatingActionButton from '@/components/FloatingActionButton';
import { DEPARTAMENTOS, type DepartamentoKey, type Participant } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function Dashboard() {
  const { toast } = useToast();
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: '1',
      nome: 'Ana Paula Costa',
      telefone: '(91) 98765-4321',
      email: 'ana.costa@email.com',
      cidadeEstado: 'Belém, PA',
      departamento: 'marketing',
      funcao: 'Mídias Sociais (Postagens e ADS)'
    },
    {
      id: '2',
      nome: 'Carlos Eduardo Lima',
      telefone: '(91) 98765-1234',
      email: 'carlos.lima@email.com',
      cidadeEstado: 'Ananindeua, PA',
      departamento: 'marketing',
      funcao: 'Comunicação em Campo (Carro/Bike/Moto de Som)'
    },
    {
      id: '3',
      nome: 'Fernanda Souza',
      telefone: '(91) 98765-5678',
      email: 'fernanda.souza@email.com',
      cidadeEstado: 'Belém, PA',
      departamento: 'seguranca',
      funcao: 'Organização da equipe de segurança'
    },
    {
      id: '4',
      nome: 'Roberto Santos',
      telefone: '(91) 98765-9012',
      email: 'roberto.santos@email.com',
      cidadeEstado: 'Marituba, PA',
      departamento: 'financeiro',
      funcao: 'Gestão de Orçamento e Planejamento'
    },
    {
      id: '5',
      nome: 'Juliana Alves',
      telefone: '(91) 98765-3456',
      email: 'juliana.alves@email.com',
      cidadeEstado: 'Castanhal, PA',
      departamento: 'transporte',
      funcao: 'Organização dos Pontos de Encontro'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<DepartamentoKey[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState<Participant | undefined>();

  const filteredParticipants = useMemo(() => {
    return participants.filter(p => {
      const matchesSearch = searchQuery === '' || 
        p.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.telefone.includes(searchQuery);
      
      const matchesDepartment = selectedDepartments.length === 0 ||
        selectedDepartments.includes(p.departamento as DepartamentoKey);

      return matchesSearch && matchesDepartment;
    });
  }, [participants, searchQuery, selectedDepartments]);

  const handleToggleDepartment = (dept: DepartamentoKey) => {
    setSelectedDepartments(prev =>
      prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept]
    );
  };

  const handleNewParticipant = (data: Omit<Participant, 'id'>) => {
    if (editingParticipant) {
      setParticipants(prev =>
        prev.map(p => p.id === editingParticipant.id ? { ...data, id: p.id } : p)
      );
      toast({
        title: 'Participante atualizado!',
        description: `${data.nome} foi atualizado com sucesso.`,
      });
    } else {
      const newParticipant = {
        ...data,
        id: Math.random().toString(36).substr(2, 9)
      };
      setParticipants(prev => [...prev, newParticipant]);
      toast({
        title: 'Participante cadastrado!',
        description: `${data.nome} foi adicionado ao departamento de ${DEPARTAMENTOS[data.departamento as DepartamentoKey].nome}.`,
      });
    }
    setIsFormOpen(false);
    setEditingParticipant(undefined);
  };

  const handleDeleteParticipant = (participant: Participant) => {
    setParticipants(prev => prev.filter(p => p.id !== participant.id));
    toast({
      title: 'Participante removido',
      description: `${participant.nome} foi removido do evento.`,
      variant: 'destructive'
    });
  };

  const handleExport = () => {
    const csv = [
      ['Nome', 'Telefone', 'Email', 'Cidade/Estado', 'Departamento', 'Função'].join(','),
      ...participants.map(p => 
        [p.nome, p.telefone, p.email, p.cidadeEstado, 
         DEPARTAMENTOS[p.departamento as DepartamentoKey].nome, p.funcao].join(',')
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `participantes-filosofia-x-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();

    toast({
      title: 'Exportação concluída!',
      description: 'Os dados foram exportados para CSV.',
    });
  };

  const departmentKeys = Object.keys(DEPARTAMENTOS) as DepartamentoKey[];

  return (
    <div className="min-h-screen bg-background">
      <Header
        participantCount={participants.length}
        onNewParticipant={() => {
          setEditingParticipant(undefined);
          setIsFormOpen(true);
        }}
        onExport={handleExport}
      />

      <div className="container px-4 py-6">
        <div className="flex flex-col gap-4 mb-6">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterChips
            selectedDepartments={selectedDepartments}
            onToggle={handleToggleDepartment}
            onClear={() => setSelectedDepartments([])}
          />
        </div>

        <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory">
          {departmentKeys.map(deptKey => {
            const deptParticipants = filteredParticipants.filter(
              p => p.departamento === deptKey
            );

            return (
              <DepartmentColumn
                key={deptKey}
                departmentKey={deptKey}
                participants={deptParticipants}
                onParticipantClick={(p) => {
                  setSelectedParticipant(p);
                  setIsDetailsOpen(true);
                }}
              />
            );
          })}
        </div>
      </div>

      <ParticipantFormModal
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingParticipant(undefined);
        }}
        onSubmit={handleNewParticipant}
        initialData={editingParticipant}
      />

      <ParticipantDetailsModal
        participant={selectedParticipant}
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onEdit={(p) => {
          setEditingParticipant(p);
          setIsFormOpen(true);
        }}
        onDelete={handleDeleteParticipant}
      />

      <FloatingActionButton onClick={() => {
        setEditingParticipant(undefined);
        setIsFormOpen(true);
      }} />
    </div>
  );
}
