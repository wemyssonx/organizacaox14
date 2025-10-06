import { useState } from 'react';
import FilterChips from '../FilterChips';
import { type DepartamentoKey } from '@/lib/types';

export default function FilterChipsExample() {
  const [selected, setSelected] = useState<DepartamentoKey[]>([]);

  const handleToggle = (dept: DepartamentoKey) => {
    setSelected(prev => 
      prev.includes(dept) 
        ? prev.filter(d => d !== dept)
        : [...prev, dept]
    );
  };

  return (
    <div className="p-8 bg-background">
      <FilterChips
        selectedDepartments={selected}
        onToggle={handleToggle}
        onClear={() => setSelected([])}
      />
    </div>
  );
}
