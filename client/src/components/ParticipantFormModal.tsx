import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';
import { DEPARTAMENTOS, type DepartamentoKey, type ParticipantAssignment } from '@/lib/types';
import type { Participant } from '@/lib/types';

interface ParticipantFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (participant: Omit<Participant, 'id'>) => void;
  initialData?: Participant;
}

export default function ParticipantFormModal({ 
  open, 
  onClose, 
  onSubmit,
  initialData 
}: ParticipantFormModalProps) {
  const [formData, setFormData] = useState({
    nome: initialData?.nome || '',
    telefone: initialData?.telefone || '',
    email: initialData?.email || '',
    cidadeEstado: initialData?.cidadeEstado || '',
  });

  const [assignments, setAssignments] = useState<ParticipantAssignment[]>(
    initialData?.assignments || []
  );

  const [currentAssignment, setCurrentAssignment] = useState({
    departamento: '' as DepartamentoKey | '',
    funcao: '',
    funcaoOutro: ''
  });

  const handleAddAssignment = () => {
    if (!currentAssignment.departamento || !currentAssignment.funcao) return;

    const finalFuncao = currentAssignment.funcao === 'Outro' && currentAssignment.funcaoOutro
      ? currentAssignment.funcaoOutro
      : currentAssignment.funcao;

    setAssignments([...assignments, {
      departamento: currentAssignment.departamento as DepartamentoKey,
      funcao: finalFuncao
    }]);

    setCurrentAssignment({
      departamento: '',
      funcao: '',
      funcaoOutro: ''
    });
  };

  const handleRemoveAssignment = (index: number) => {
    setAssignments(assignments.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (assignments.length === 0) {
      alert('Adicione pelo menos um departamento');
      return;
    }

    onSubmit({
      nome: formData.nome,
      telefone: formData.telefone,
      email: formData.email,
      cidadeEstado: formData.cidadeEstado,
      assignments: assignments
    });
    
    setFormData({
      nome: '',
      telefone: '',
      email: '',
      cidadeEstado: '',
    });
    setAssignments([]);
    setCurrentAssignment({
      departamento: '',
      funcao: '',
      funcaoOutro: ''
    });
  };

  const funcoes = currentAssignment.departamento 
    ? DEPARTAMENTOS[currentAssignment.departamento].funcoes 
    : [];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="modal-participant-form">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {initialData ? 'Editar Participante' : 'Novo Cadastro'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo *</Label>
              <Input
                id="nome"
                required
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Ex: João da Silva"
                data-testid="input-nome"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone *</Label>
              <Input
                id="telefone"
                required
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                placeholder="(91) 98765-4321"
                data-testid="input-telefone"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="joao@email.com"
              data-testid="input-email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cidadeEstado">Cidade/Estado *</Label>
            <Input
              id="cidadeEstado"
              required
              value={formData.cidadeEstado}
              onChange={(e) => setFormData({ ...formData, cidadeEstado: e.target.value })}
              placeholder="Belém, PA"
              data-testid="input-cidade-estado"
            />
          </div>

          <div className="border-t pt-4">
            <Label className="text-base font-semibold mb-4 block">
              Departamentos e Funções *
            </Label>

            {assignments.length > 0 && (
              <div className="space-y-2 mb-4">
                {assignments.map((assignment, idx) => {
                  const dept = DEPARTAMENTOS[assignment.departamento];
                  return (
                    <Card key={idx} className="p-3 flex items-center justify-between gap-3">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{dept.nome}</p>
                        <p className="text-xs text-muted-foreground">{assignment.funcao}</p>
                      </div>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => handleRemoveAssignment(idx)}
                        data-testid={`button-remove-assignment-${idx}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </Card>
                  );
                })}
              </div>
            )}

            <Card className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="departamento">Departamento</Label>
                <Select
                  value={currentAssignment.departamento}
                  onValueChange={(value) => setCurrentAssignment({ 
                    ...currentAssignment, 
                    departamento: value as DepartamentoKey, 
                    funcao: '',
                    funcaoOutro: ''
                  })}
                >
                  <SelectTrigger data-testid="select-departamento">
                    <SelectValue placeholder="Selecione um departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(DEPARTAMENTOS).map(([key, dept]) => (
                      <SelectItem key={key} value={key}>
                        {dept.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {currentAssignment.departamento && (
                <div className="space-y-3">
                  <Label>Função no Departamento</Label>
                  <RadioGroup
                    value={currentAssignment.funcao}
                    onValueChange={(value) => setCurrentAssignment({ 
                      ...currentAssignment, 
                      funcao: value 
                    })}
                    className="space-y-2"
                  >
                    {funcoes.map((funcao) => (
                      <div key={funcao} className="flex items-center space-x-2">
                        <RadioGroupItem value={funcao} id={funcao} data-testid={`radio-funcao-${funcao}`} />
                        <Label htmlFor={funcao} className="font-normal cursor-pointer">
                          {funcao}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  
                  {currentAssignment.funcao === 'Outro' && (
                    <Input
                      value={currentAssignment.funcaoOutro}
                      onChange={(e) => setCurrentAssignment({ 
                        ...currentAssignment, 
                        funcaoOutro: e.target.value 
                      })}
                      placeholder="Descreva a função"
                      data-testid="input-funcao-outro"
                      className="mt-2"
                    />
                  )}
                </div>
              )}

              <Button
                type="button"
                variant="outline"
                onClick={handleAddAssignment}
                disabled={!currentAssignment.departamento || !currentAssignment.funcao}
                className="w-full"
                data-testid="button-add-assignment"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Departamento
              </Button>
            </Card>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-testid="button-cancel"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-success hover:bg-success/90"
              data-testid="button-submit"
              disabled={assignments.length === 0}
            >
              {initialData ? 'Salvar Alterações' : 'Cadastrar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
