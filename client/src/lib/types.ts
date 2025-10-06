export interface ParticipantAssignment {
  departamento: DepartamentoKey;
  funcao: string;
}

export interface Participant {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  cidadeEstado: string;
  assignments: ParticipantAssignment[];
}

export const DEPARTAMENTOS = {
  marketing: {
    nome: 'Marketing',
    cor: 'from-blue-500 to-blue-600',
    borderColor: 'border-blue-500',
    bgColor: 'bg-blue-500/10',
    funcoes: [
      'Mídias Sociais (Postagens e ADS)',
      'Comunicação em Campo (Carro/Bike/Moto de Som)',
      'Diagramação e Produção de Manuais',
      'Planejamento e Cronograma de Posts',
      'Canais de Contato e Atendimento',
      'Inovação e Experiências Criativas',
      'Outro'
    ]
  },
  licenciamento: {
    nome: 'Licenciamento com Órgãos',
    cor: 'from-purple-500 to-purple-600',
    borderColor: 'border-purple-500',
    bgColor: 'bg-purple-500/10',
    funcoes: [
      'Contato com Órgãos Públicos',
      'Autorização para Carro de Som (se houver)',
      'Documentação e Protocolos',
      'Outro'
    ]
  },
  restaurante: {
    nome: 'Logística de Restaurante',
    cor: 'from-green-500 to-green-600',
    borderColor: 'border-green-500',
    bgColor: 'bg-green-500/10',
    funcoes: [
      'Pesquisa e Seleção de Restaurantes',
      'Coordenação de Cardápios e Opções Alimentares',
      'Recomendações de restaurantes Horários',
      'Outro'
    ]
  },
  financeiro: {
    nome: 'Logística Financeira e de Compras',
    cor: 'from-yellow-500 to-yellow-600',
    borderColor: 'border-yellow-500',
    bgColor: 'bg-yellow-500/10',
    funcoes: [
      'Gestão de Orçamento e Planejamento',
      'Acompanhamento de Pagamentos',
      'Relatórios Financeiros',
      'Outro'
    ]
  },
  acomodacoes: {
    nome: 'Logística de Acomodações',
    cor: 'from-pink-500 to-pink-600',
    borderColor: 'border-pink-500',
    bgColor: 'bg-pink-500/10',
    funcoes: [
      'Pesquisa e Seleção de Casas ou Hotéis',
      'Negociação e Condições de Hospedagem',
      'Coordenação de Reservas',
      'Outro'
    ]
  },
  transporte: {
    nome: 'Logística de Transporte',
    cor: 'from-cyan-500 to-cyan-600',
    borderColor: 'border-cyan-500',
    bgColor: 'bg-cyan-500/10',
    funcoes: [
      'Levantamento de Transporte',
      'Organização dos Pontos de Encontro',
      'Centralização de Lista de Passageiros',
      'Outro'
    ]
  },
  esporteLazer: {
    nome: 'Logística de Esporte e Lazer',
    cor: 'from-orange-500 to-orange-600',
    borderColor: 'border-orange-500',
    bgColor: 'bg-orange-500/10',
    funcoes: [
      'Criação dos times de esportes',
      'Pesquisa e Escolha do Espaço',
      'Organização de Ranking',
      'Narração das Partidas',
      'Transmissão ao Vivo',
      'Gestão de Logística de Jogos',
      'Infraestrutura e Suporte',
      'Outro'
    ]
  },
  mutiroes: {
    nome: 'Logística de Mutirões',
    cor: 'from-indigo-500 to-indigo-600',
    borderColor: 'border-indigo-500',
    bgColor: 'bg-indigo-500/10',
    funcoes: [
      'Planejamento de Ações e Organização',
      'Coordenação de Equipes de Voluntários',
      'Gerenciamento de Materiais e Recursos',
      'Comunicação e Divulgação',
      'Gestão de Logística no Dia do Evento',
      'Outro'
    ]
  },
  seguranca: {
    nome: 'Logística de Segurança',
    cor: 'from-red-500 to-red-600',
    borderColor: 'border-red-500',
    bgColor: 'bg-red-500/10',
    funcoes: [
      'Organização da equipe de segurança',
      'Direcionamento do percurso',
      'Vigilância e Limitação de Áreas',
      'Identificação e Apoio',
      'Equipe Especial de Vigilância Suprema',
      'Distribuição de Água',
      'Treinamento de primeiros socorros',
      'Outro'
    ]
  }
} as const;

export type DepartamentoKey = keyof typeof DEPARTAMENTOS;
