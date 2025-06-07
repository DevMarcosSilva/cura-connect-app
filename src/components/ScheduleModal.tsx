
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calendar, Clock } from "lucide-react";
import { toast } from "sonner";

interface ScheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ScheduleModal = ({ open, onOpenChange }: ScheduleModalProps) => {
  const [schedule, setSchedule] = useState({
    monday: { active: true, start: "08:00", end: "17:00" },
    tuesday: { active: true, start: "08:00", end: "17:00" },
    wednesday: { active: true, start: "08:00", end: "17:00" },
    thursday: { active: true, start: "08:00", end: "17:00" },
    friday: { active: true, start: "08:00", end: "17:00" },
    saturday: { active: false, start: "08:00", end: "12:00" },
    sunday: { active: false, start: "08:00", end: "12:00" }
  });

  const dayLabels = {
    monday: "Segunda-feira",
    tuesday: "Terça-feira",
    wednesday: "Quarta-feira", 
    thursday: "Quinta-feira",
    friday: "Sexta-feira",
    saturday: "Sábado",
    sunday: "Domingo"
  };

  const handleDayToggle = (day: string, active: boolean) => {
    setSchedule(prev => ({
      ...prev,
      [day]: { ...prev[day as keyof typeof prev], active }
    }));
  };

  const handleTimeChange = (day: string, field: "start" | "end", value: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: { ...prev[day as keyof typeof prev], [field]: value }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar horários
    for (const [day, config] of Object.entries(schedule)) {
      if (config.active && config.start >= config.end) {
        toast.error(`Horário inválido para ${dayLabels[day as keyof typeof dayLabels]}: início deve ser anterior ao fim`);
        return;
      }
    }

    // Simulação de salvamento - em produção, conectar com backend/Supabase
    toast.success("Disponibilidade atualizada com sucesso!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center">
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold">Definir Disponibilidade</DialogTitle>
          <DialogDescription>
            Configure seus horários de atendimento para cada dia da semana
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {Object.entries(dayLabels).map(([day, label]) => (
            <div key={day} className="space-y-3 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">{label}</Label>
                <Switch
                  checked={schedule[day as keyof typeof schedule].active}
                  onCheckedChange={(checked) => handleDayToggle(day, checked)}
                />
              </div>
              
              {schedule[day as keyof typeof schedule].active && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-600">Início</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="time"
                        value={schedule[day as keyof typeof schedule].start}
                        onChange={(e) => handleTimeChange(day, "start", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-600">Fim</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="time"
                        value={schedule[day as keyof typeof schedule].end}
                        onChange={(e) => handleTimeChange(day, "end", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <div className="flex space-x-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
            >
              Salvar Disponibilidade
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleModal;
