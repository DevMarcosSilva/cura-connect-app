
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, User } from "lucide-react";
import { toast } from "sonner";

interface AppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AppointmentModal = ({ open, onOpenChange }: AppointmentModalProps) => {
  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
    time: "",
    type: "",
    notes: ""
  });

  const doctors = [
    { id: "1", name: "Dr. João Silva", specialty: "Cardiologia" },
    { id: "2", name: "Dra. Maria Santos", specialty: "Dermatologia" },
    { id: "3", name: "Dr. Pedro Costa", specialty: "Ortopedia" },
    { id: "4", name: "Dra. Ana Oliveira", specialty: "Neurologista" }
  ];

  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ];

  const appointmentTypes = [
    "Consulta de rotina",
    "Primeira consulta",
    "Retorno",
    "Consulta de urgência",
    "Exame"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { doctor, date, time, type } = formData;
    
    if (!doctor || !date || !time || !type) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    // Validar se a data não é no passado
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      toast.error("Não é possível agendar consultas em datas passadas");
      return;
    }

    // Simulação de agendamento - em produção, conectar com backend/Supabase
    toast.success("Consulta agendada com sucesso! Você receberá uma confirmação por email.");
    onOpenChange(false);
    
    // Limpar formulário
    setFormData({
      doctor: "",
      date: "",
      time: "",
      type: "",
      notes: ""
    });
  };

  // Gerar data mínima (hoje)
  const today = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center">
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold">Agendar Consulta</DialogTitle>
          <DialogDescription>
            Preencha os dados para agendar sua consulta
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="doctor">Médico *</Label>
            <Select value={formData.doctor} onValueChange={(value) => handleInputChange("doctor", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o médico" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <div>
                        <span className="font-medium">{doctor.name}</span>
                        <span className="text-sm text-gray-500 ml-2">({doctor.specialty})</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Consulta *</Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {appointmentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Data *</Label>
            <Input
              id="date"
              type="date"
              min={today}
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Horário *</Label>
            <Select value={formData.time} onValueChange={(value) => handleInputChange("time", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o horário" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{time}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              placeholder="Descreva seus sintomas ou motivo da consulta (opcional)"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
            Confirmar Agendamento
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
