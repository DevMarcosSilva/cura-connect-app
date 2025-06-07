
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, FileText, Activity } from "lucide-react";
import Header from "@/components/Header";
import ScheduleModal from "@/components/ScheduleModal";

const DoctorDashboard = () => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  
  const todayAppointments = [
    {
      id: 1,
      patient: "Maria Silva",
      time: "09:00",
      type: "Consulta de rotina",
      status: "confirmada"
    },
    {
      id: 2,
      patient: "João Santos",
      time: "10:30",
      type: "Retorno",
      status: "em_andamento"
    },
    {
      id: 3,
      patient: "Ana Costa",
      time: "14:00",
      type: "Primeira consulta",
      status: "pendente"
    }
  ];

  const stats = [
    {
      title: "Consultas Hoje",
      value: todayAppointments.length,
      icon: Calendar,
      color: "text-blue-600"
    },
    {
      title: "Pacientes do Mês",
      value: "47",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Próxima Consulta",
      value: "09:00",
      icon: Clock,
      color: "text-orange-600"
    },
    {
      title: "Receitas Emitidas",
      value: "23",
      icon: FileText,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header userType="doctor" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Painel Médico
          </h1>
          <p className="text-gray-600">
            Gerencie sua agenda e acompanhe seus pacientes
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
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
                <Activity className="w-5 h-5 text-blue-600" />
                <span>Ações Rápidas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={() => setShowScheduleModal(true)}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              >
                Definir Disponibilidade
              </Button>
              <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                Ver Agenda Completa
              </Button>
              <Button variant="outline" className="w-full border-green-200 text-green-600 hover:bg-green-50">
                Histórico de Pacientes
              </Button>
              <Button variant="outline" className="w-full border-purple-200 text-purple-600 hover:bg-purple-50">
                Emitir Receita
              </Button>
            </CardContent>
          </Card>

          {/* Today's Appointments */}
          <Card className="lg:col-span-2 bg-white/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>Agenda de Hoje</span>
              </CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString('pt-BR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{appointment.patient}</h3>
                        <p className="text-sm text-gray-600">{appointment.type}</p>
                        <p className="text-sm text-gray-500">{appointment.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        appointment.status === "confirmada" 
                          ? "bg-green-100 text-green-800" 
                          : appointment.status === "em_andamento"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-orange-100 text-orange-800"
                      }`}>
                        {appointment.status === "confirmada" ? "Confirmada" : 
                         appointment.status === "em_andamento" ? "Em Andamento" : "Pendente"}
                      </span>
                      <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Overview */}
        <Card className="mt-6 bg-white/70 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <span>Resumo Semanal</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-7 gap-4">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => (
                <div key={day} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-600 mb-1">{day}</div>
                  <div className="text-lg font-bold text-gray-800">
                    {index === 1 ? '8' : index === 2 ? '6' : index === 4 ? '7' : '0'}
                  </div>
                  <div className="text-xs text-gray-500">consultas</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <ScheduleModal 
        open={showScheduleModal} 
        onOpenChange={setShowScheduleModal} 
      />
    </div>
  );
};

export default DoctorDashboard;
