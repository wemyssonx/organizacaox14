import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick?: () => void;
}

export default function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <Button
      size="icon"
      className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl bg-orange hover:bg-orange/90 md:hidden z-50"
      onClick={onClick}
      data-testid="button-fab"
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
}
