import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { DEPARTAMENTOS, type DepartamentoKey } from '@/lib/types';

interface FilterChipsProps {
  selectedDepartments: DepartamentoKey[];
  onToggle: (dept: DepartamentoKey) => void;
  onClear: () => void;
  departmentCounts?: Record<DepartamentoKey, number>;
}

export default function FilterChips({ selectedDepartments, onToggle, onClear, departmentCounts }: FilterChipsProps) {
  const departmentKeys = Object.keys(DEPARTAMENTOS) as DepartamentoKey[];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm font-medium text-muted-foreground">Filtrar:</span>
      {departmentKeys.map((key) => {
        const dept = DEPARTAMENTOS[key];
        const isSelected = selectedDepartments.includes(key);
        const count = departmentCounts?.[key] ?? 0;
        
        return (
          <Badge
            key={key}
            variant={isSelected ? 'default' : 'outline'}
            className={`cursor-pointer hover-elevate active-elevate-2 ${
              isSelected ? dept.bgColor : ''
            }`}
            onClick={() => onToggle(key)}
            data-testid={`filter-chip-${key}`}
          >
            {dept.nome}
            {count > 0 && (
              <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs font-semibold ${
                isSelected ? 'bg-white/20' : 'bg-primary/10'
              }`}>
                {count}
              </span>
            )}
            {isSelected && <X className="ml-1 h-3 w-3" />}
          </Badge>
        );
      })}
      {selectedDepartments.length > 0 && (
        <Badge
          variant="destructive"
          className="cursor-pointer hover-elevate active-elevate-2"
          onClick={onClear}
          data-testid="button-clear-filters"
        >
          Limpar Filtros
        </Badge>
      )}
    </div>
  );
}
