import { useState } from 'react';
import ParticipantFormModal from '../ParticipantFormModal';
import { Button } from '@/components/ui/button';

export default function ParticipantFormModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8 bg-background">
      <Button onClick={() => setOpen(true)}>
        Abrir Formulário
      </Button>
      <ParticipantFormModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(data) => {
          console.log('Submitted:', data);
          setOpen(false);
        }}
      />
    </div>
  );
}
