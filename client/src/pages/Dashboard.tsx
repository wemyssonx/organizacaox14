import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import FilterChips from '@/components/FilterChips';
import ParticipantCard from '@/components/ParticipantCard';
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
      assignments: [
        { departamento: 'marketing', funcao: 'Mídias Sociais (Postagens e ADS)' },
        { departamento: 'licenciamento', funcao: 'Documentação e Protocolos' }
      ]
    },
    {
      id: '2',
      nome: 'Carlos Eduardo Lima',
      telefone: '(91) 98765-1234',
      email: 'carlos.lima@email.com',
      cidadeEstado: 'Ananindeua, PA',
      assignments: [
        { departamento: 'marketing', funcao: 'Comunicação em Campo (Carro/Bike/Moto de Som)' }
      ]
    },
    {
      id: '3',
      nome: 'Fernanda Souza',
      telefone: '(91) 98765-5678',
      email: 'fernanda.souza@email.com',
      cidadeEstado: 'Belém, PA',
      assignments: [
        { departamento: 'seguranca', funcao: 'Organização da equipe de segurança' },
        { departamento: 'mutiroes', funcao: 'Coordenação de Equipes de Voluntários' }
      ]
    },
    {
      id: '4',
      nome: 'Roberto Santos',
      telefone: '(91) 98765-9012',
      email: 'roberto.santos@email.com',
      cidadeEstado: 'Marituba, PA',
      assignments: [
        { departamento: 'financeiro', funcao: 'Gestão de Orçamento e Planejamento' }
      ]
    },
    {
      id: '5',
      nome: 'Juliana Alves',
      telefone: '(91) 98765-3456',
      email: 'juliana.alves@email.com',
      cidadeEstado: 'Castanhal, PA',
      assignments: [
        { departamento: 'transporte', funcao: 'Organização dos Pontos de Encontro' },
        { departamento: 'acomodacoes', funcao: 'Coordenação de Reservas' }
      ]
    },
    {
      id: '6',
      nome: 'Pedro Henrique',
      telefone: '(91) 98765-7890',
      email: 'pedro.h@email.com',
      cidadeEstado: 'Belém, PA',
      assignments: [
        { departamento: 'esporteLazer', funcao: 'Gestão de Logística de Jogos' }
      ]
    },
    {
      id: '7',
      nome: 'Mariana Costa',
      telefone: '(91) 98765-2345',
      email: 'mariana.costa@email.com',
      cidadeEstado: 'Ananindeua, PA',
      assignments: [
        { departamento: 'restaurante', funcao: 'Pesquisa e Seleção de Restaurantes' }
      ]
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
        p.assignments.some(a => selectedDepartments.includes(a.departamento));

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
        description: `${data.nome} foi adicionado com ${data.assignments.length} ${data.assignments.length === 1 ? 'departamento' : 'departamentos'}.`,
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
      ['Nome', 'Telefone', 'Email', 'Cidade/Estado', 'Departamentos', 'Funções'].join(','),
      ...participants.map(p => {
        const departamentos = p.assignments.map(a => DEPARTAMENTOS[a.departamento].nome).join('; ');
        const funcoes = p.assignments.map(a => a.funcao).join('; ');
        return [p.nome, p.telefone, p.email, p.cidadeEstado, departamentos, funcoes].join(',');
      })
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

  const departmentStats = useMemo(() => {
    const stats: Record<DepartamentoKey, number> = {} as any;
    Object.keys(DEPARTAMENTOS).forEach(key => {
      stats[key as DepartamentoKey] = 0;
    });
    
    participants.forEach(p => {
      p.assignments.forEach(a => {
        stats[a.departamento]++;
      });
    });
    
    return stats;
  }, [participants]);

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

      <div className="container max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col gap-4 mb-6">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterChips
            selectedDepartments={selectedDepartments}
            onToggle={handleToggleDepartment}
            onClear={() => setSelectedDepartments([])}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredParticipants.map(participant => (
            <ParticipantCard
              key={participant.id}
              participant={participant}
              onClick={() => {
                setSelectedParticipant(participant);
                setIsDetailsOpen(true);
              }}
            />
          ))}
        </div>

        {filteredParticipants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nenhum participante encontrado
            </p>
          </div>
        )}
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
