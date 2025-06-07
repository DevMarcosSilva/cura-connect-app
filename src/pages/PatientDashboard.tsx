
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Plus, History, Bell } from "lucide-react";
import AppointmentModal from "@/components/AppointmentModal";
import Header from "@/components/Header";
import { toast } from "sonner";

const PatientDashboard = () => {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: "Dr. João Silva",
      specialty: "Cardiologia",
      date: "2024-06-10",
      time: "09:00",
      status: "confirmada"
    },
    {
      id: 2,
      doctor: "Dra. Maria Santos",
      specialty: "Dermatologia",
      date: "2024-06-15",
      time: "14:30",
      status: "pendente"
    }
  ]);

  const stats = [
    {
      title: "Próximas Consultas",
      value: appointments.filter(apt => apt.status === "confirmada").length,
      icon: Calendar,
      color: "text-blue-600"
    },
    {
      title: "Consultas Pendentes",
      value: appointments.filter(apt => apt.status === "pendente").length,
      icon: Clock,
      color: "text-orange-600"
    },
    {
      title: "Histórico Total",
      value: "12",
      icon: History,
      color: "text-green-600"
    }
  ];

  const handleCancelAppointment = (id: number) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));
    toast.success("Consulta cancelada com sucesso!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header userType="patient" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Painel do Paciente
          </h1>
          <p className="text-gray-600">
            Gerencie suas consultas e acompanhe seu histórico médico
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/70 backdrop-blur-sm border-0 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="lg:col-span-1 bg-white/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-blue-600" />
                <span>Ações Rápidas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={() => setShowAppointmentModal(true)}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              >
                Agendar Consulta
              </Button>
              <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                Ver Histórico Completo
              </Button>
              <Button variant="outline" className="w-full border-green-200 text-green-600 hover:bg-green-50">
                Baixar Receitas
              </Button>
            </CardContent>
          </Card>

          {/* Appointments List */}
          <Card className="lg:col-span-2 bg-white/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>Próximas Consultas</span>
              </CardTitle>
              <CardDescription>
                Suas consultas agendadas e pendentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{appointment.doctor}</h3>
                        <p className="text-sm text-gray-600">{appointment.specialty}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(appointment.date).toLocaleDateString('pt-BR')} às {appointment.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        appointment.status === "confirmada" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-orange-100 text-orange-800"
                      }`}>
                        {appointment.status === "confirmada" ? "Confirmada" : "Pendente"}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCancelAppointment(appointment.id)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Notifications */}
        <Card className="mt-6 bg-white/70 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-blue-600" />
              <span>Notificações Recentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-sm text-gray-700">
                  Lembrete: Consulta com Dr. João Silva amanhã às 09:00
                </p>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm text-gray-700">
                  Receita médica disponível para download
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AppointmentModal 
        open={showAppointmentModal} 
        onOpenChange={setShowAppointmentModal} 
      />
    </div>
  );
};

export default PatientDashboard;
