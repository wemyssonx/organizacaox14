import FloatingActionButton from '../FloatingActionButton';

export default function FloatingActionButtonExample() {
  return (
    <div className="relative p-8 bg-background h-96">
      <FloatingActionButton onClick={() => console.log('FAB clicked')} />
    </div>
  );
}
