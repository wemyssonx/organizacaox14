# Design Guidelines: Organizador do 14º Aniversário da Filosofia X no Pará

## Design Approach
**Reference-Based Design** inspirado em Trello e Linear, com adaptações para gestão de eventos. Foco em funcionalidade, clareza visual e eficiência operacional para organização de participantes em departamentos.

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary)**
- Background Primary: 220 15% 12%
- Background Secondary: 220 15% 16%
- Background Tertiary: 220 12% 20%
- Card Background: 220 15% 18%
- Border Color: 220 10% 28%

**Light Mode**
- Background Primary: 210 20% 98%
- Background Secondary: 210 15% 95%
- Background Tertiary: 210 12% 92%
- Card Background: 0 0% 100%
- Border Color: 210 10% 88%

**Brand Colors (Tema do Evento)**
- Primary Blue: 215 80% 55% (botões principais, headers)
- Secondary Green: 150 60% 50% (confirmações, success states)
- Accent Orange: 25 85% 60% (highlights, CTAs secundários, badges)

**Functional Colors**
- Text Primary: 220 10% 95% (dark) / 220 15% 15% (light)
- Text Secondary: 220 8% 65% (dark) / 220 10% 45% (light)
- Success: 150 60% 50%
- Warning: 45 90% 60%
- Error: 0 75% 60%

### B. Typography

**Font Families**
- Primary: 'Inter' (Google Fonts) - UI, forms, labels
- Secondary: 'Poppins' (Google Fonts) - headers, títulos de departamento

**Type Scale**
- Display (Títulos principais): 2.5rem/3rem, font-bold, Poppins
- H1 (Headers de seção): 2rem/2.5rem, font-semibold, Poppins
- H2 (Títulos de departamento): 1.5rem/2rem, font-semibold, Poppins
- H3 (Nomes de cards): 1.125rem/1.5rem, font-medium, Inter
- Body Large: 1rem/1.5rem, font-normal, Inter
- Body: 0.875rem/1.25rem, font-normal, Inter
- Small: 0.75rem/1rem, font-normal, Inter
- Labels: 0.75rem/1rem, font-medium, uppercase, tracking-wider

### C. Layout System

**Spacing Primitives (Tailwind)**
- Micro: 1, 2 (gaps, borders)
- Small: 3, 4 (card padding, form spacing)
- Medium: 6, 8 (section spacing, margins)
- Large: 12, 16 (page padding, board gaps)
- XLarge: 20, 24 (major section dividers)

**Grid Structure**
- Dashboard: Horizontal scroll container com colunas fixas de 320px (mobile: 280px)
- Cards: max-width de 320px, min-height de 160px
- Forms: max-width de 600px, centered
- Modais: max-width de 700px

### D. Component Library

**Kanban Board**
- Colunas de departamento com header colorido (gradient sutil usando cores do tema)
- Background de coluna: bg-secondary com border-l-4 na cor do departamento
- Scroll horizontal suave com snap-points
- Indicador de contagem de participantes no header

**Participant Cards**
- Fundo: card background com border sutil
- Shadow: shadow-md no hover, shadow-lg no drag
- Layout: Grid de informações (nome em destaque, função como badge, contatos em texto menor)
- Badges de função: rounded-full, px-3 py-1, cores diferenciadas por departamento
- Drag handle: ícone de 6 pontos (grip-vertical) em text-secondary

**Formulário de Cadastro Modal**
- Overlay escuro: bg-black/60 com backdrop-blur-sm
- Container modal: rounded-xl com shadow-2xl
- Campos: bg-tertiary com border focus:border-primary transition
- Dropdown de departamento: destaque visual maior (border-2 border-primary/20)
- Radio buttons de função: cards selecionáveis com estado active visual

**Navigation Bar**
- Fixed top, bg-primary/95 com backdrop-blur-lg
- Logo do evento à esquerda
- Busca central com ícone (w-96 max-width)
- Botões de ação à direita (Novo Cadastro, Exportar, Admin)
- Height: h-16

**Filtros e Busca**
- Barra de filtros abaixo da nav: bg-secondary com py-4
- Chips de filtro: rounded-full, removíveis, com ícones de departamento
- Campo de busca: ícone de lupa, placeholder claro, clear button

**Botões**
- Primary: bg-primary, text-white, rounded-lg, px-6 py-3, font-medium
- Secondary: bg-secondary, border border-primary/30, rounded-lg
- Floating Action (Novo Cadastro): fixed bottom-right, rounded-full, shadow-2xl, bg-orange (accent)
- Icon-only: p-2, rounded-lg, hover:bg-tertiary

**Data Display**
- Tabelas (admin): border-collapse, striped rows, hover states
- Empty states: ilustração + texto motivacional em text-secondary
- Loading: skeleton cards com animação pulse

**Overlays/Modals**
- Confirmação de exclusão: danger red accent, ações clear
- Detalhes expandidos: slide-in lateral (mobile) ou modal (desktop)
- Toast notifications: fixed top-right, auto-dismiss, ícones de status

### E. Animations

**Drag & Drop**
- Card lift: scale-105 transform com shadow-2xl durante drag
- Drop zone highlight: border-dashed border-2 border-primary pulsante
- Smooth transitions: 200ms ease-in-out

**Micro-interactions**
- Button hover: scale-102, brightness-110
- Card hover: translateY(-2px), shadow-lg
- Modal entrance: fade-in + scale-95 to scale-100 (150ms)
- Toast slide-in: translateX(100%) to translateX(0)

**Page Transitions**
- Minimal: fade between states (100ms)
- Loading states: pulse animation em skeleton elements

## Images

**Dashboard (Kanban View)**
- Sem imagens hero - foco total na funcionalidade do board
- Ícones de departamento: usar Heroicons para representar cada departamento (sparkles para Marketing, clipboard-check para Licenciamento, utensils para Restaurante, etc.)
- Avatar placeholders: iniciais do participante em círculos coloridos

**Empty States**
- Ilustração SVG minimalista de board vazio quando não há participantes em um departamento
- Ícone de confete/celebração nas mensagens de sucesso

**Authentication**
- Logo do evento (texto estilizado) no topo do modal de login
- Sem background images - design clean e focado

## Mobile Responsive Strategy

**Breakpoints**
- Mobile: < 768px (single column, stacked departments)
- Tablet: 768px - 1024px (2 columns side-by-side)
- Desktop: > 1024px (horizontal scroll board)

**Mobile Adaptations**
- Board vira accordion com departamentos expansíveis
- Cards ocupam full-width com padding-x de 4
- FAB (botão flutuante) aumenta para fácil toque (64x64px)
- Nav collapse em menu hambúrguer
- Modais ocupam full-screen em mobile

## Accessibility & UX

- Alto contraste em todos os estados (WCAG AAA quando possível)
- Focus rings visíveis (ring-2 ring-primary ring-offset-2)
- Drag alternativo via keyboard (setas + Enter para mover)
- Labels claros em todos os form fields
- Toasts com ícones + texto (não só cor)
- Dark mode consistente em 100% da interface