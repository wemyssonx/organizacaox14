import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { DEPARTAMENTOS, type DepartamentoKey } from '@/lib/types';
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
    departamento: initialData?.departamento || '',
    funcao: initialData?.funcao || '',
    funcaoOutro: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalFuncao = formData.funcao === 'Outro' && formData.funcaoOutro 
      ? formData.funcaoOutro 
      : formData.funcao;

    onSubmit({
      nome: formData.nome,
      telefone: formData.telefone,
      email: formData.email,
      cidadeEstado: formData.cidadeEstado,
      departamento: formData.departamento,
      funcao: finalFuncao
    });
    
    setFormData({
      nome: '',
      telefone: '',
      email: '',
      cidadeEstado: '',
      departamento: '',
      funcao: '',
      funcaoOutro: ''
    });
  };

  const selectedDept = formData.departamento as DepartamentoKey;
  const funcoes = selectedDept ? DEPARTAMENTOS[selectedDept].funcoes : [];

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

          <div className="space-y-2">
            <Label htmlFor="departamento">Departamento *</Label>
            <Select
              value={formData.departamento}
              onValueChange={(value) => setFormData({ ...formData, departamento: value, funcao: '' })}
              required
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

          {selectedDept && (
            <div className="space-y-3">
              <Label>Função no Departamento *</Label>
              <RadioGroup
                value={formData.funcao}
                onValueChange={(value) => setFormData({ ...formData, funcao: value })}
                className="space-y-2"
                required
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
              
              {formData.funcao === 'Outro' && (
                <Input
                  value={formData.funcaoOutro}
                  onChange={(e) => setFormData({ ...formData, funcaoOutro: e.target.value })}
                  placeholder="Descreva a função"
                  required
                  data-testid="input-funcao-outro"
                  className="mt-2"
                />
              )}
            </div>
          )}

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
            >
              {initialData ? 'Salvar Alterações' : 'Cadastrar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
