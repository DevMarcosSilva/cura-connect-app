
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, TrendingUp, Settings, UserPlus, ClipboardList } from "lucide-react";
import Header from "@/components/Header";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const stats = [
    {
      title: "Total de Pacientes",
      value: "1,247",
      change: "+12%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Consultas Hoje",
      value: "34",
      change: "+8%",
      icon: Calendar,
      color: "text-green-600"
    },
    {
      title: "Médicos Ativos",
      value: "12",
      change: "+2",
      icon: UserPlus,
      color: "text-purple-600"
    },
    {
      title: "Taxa de Comparecimento",
      value: "94%",
      change: "+5%",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  const recentActivities = [
    {
      action: "Nova consulta agendada",
      patient: "Maria Silva",
      doctor: "Dr. João Santos",
      time: "2 min atrás"
    },
    {
      action: "Consulta finalizada",
      patient: "Carlos Oliveira",
      doctor: "Dra. Ana Costa",
      time: "15 min atrás"
    },
    {
      action: "Paciente cadastrado",
      patient: "Fernanda Lima",
      doctor: "-",
      time: "1 hora atrás"
    }
  ];

  const doctors = [
    {
      name: "Dr. João Santos",
      specialty: "Cardiologia",
      consultasHoje: 8,
      status: "ativo"
    },
    {
      name: "Dra. Ana Costa",
      specialty: "Dermatologia",
      consultasHoje: 6,
      status: "ativo"
    },
    {
      name: "Dr. Pedro Silva",
      specialty: "Ortopedia",
      consultasHoje: 4,
      status: "indisponivel"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header userType="admin" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Painel Administrativo
          </h1>
          <p className="text-gray-600">
            Visão geral e gestão completa da clínica
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
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <p className="text-xs text-green-600 font-medium">
                  {stat.change} em relação ao período anterior
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="lg:col-span-1 bg-white/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-blue-600" />
                <span>Ações Rápidas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={() => toast.success("Funcionalidade em desenvolvimento")}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              >
                Cadastrar Médico
              </Button>
              <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                Configurar Horários
              </Button>
              <Button variant="outline" className="w-full border-green-200 text-green-600 hover:bg-green-50">
                Relatórios
              </Button>
              <Button variant="outline" className="w-full border-purple-200 text-purple-600 hover:bg-purple-50">
                Backup de Dados
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="lg:col-span-2 bg-white/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ClipboardList className="w-5 h-5 text-blue-600" />
                <span>Atividades Recentes</span>
              </CardTitle>
              <CardDescription>
                Últimas movimentações do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100">
                    <div>
                      <h3 className="font-medium text-gray-800">{activity.action}</h3>
                      <p className="text-sm text-gray-600">
                        Paciente: {activity.patient}
                        {activity.doctor !== "-" && ` • ${activity.doctor}`}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Doctors Overview */}
        <Card className="mt-6 bg-white/70 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span>Médicos - Status Atual</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {doctors.map((doctor, index) => (
                <div key={index} className="p-4 bg-white rounded-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      doctor.status === "ativo" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {doctor.status === "ativo" ? "Ativo" : "Indisponível"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{doctor.specialty}</p>
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">{doctor.consultasHoje}</span> consultas hoje
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Chart Placeholder */}
        <Card className="mt-6 bg-white/70 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Desempenho da Clínica</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Gráfico de desempenho seria exibido aqui</p>
                <p className="text-sm text-gray-500">Integração com biblioteca de gráficos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
