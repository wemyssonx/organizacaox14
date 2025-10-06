import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick?: () => void;
}

export default function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <Button
      size="icon"
      className="fixed bottom-4 right-4 md:bottom-10 md:right-10 h-16 w-16 rounded-full shadow-2xl bg-orange hover:bg-orange/90 z-50"
      onClick={onClick}
      data-testid="button-fab"
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
}
