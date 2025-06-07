
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Users, Shield, Heart, CheckCircle } from "lucide-react";
import LoginModal from "@/components/LoginModal";
import RegisterModal from "@/components/RegisterModal";

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const features = [
    {
      icon: Calendar,
      title: "Agendamento Inteligente",
      description: "Sistema avançado de agendamentos com prevenção de conflitos e lembretes automáticos"
    },
    {
      icon: Users,
      title: "Múltiplos Perfis",
      description: "Painéis específicos para pacientes, médicos e administradores"
    },
    {
      icon: Shield,
      title: "Segurança Total",
      description: "Autenticação segura e proteção de dados médicos sensíveis"
    },
    {
      icon: Clock,
      title: "Disponibilidade 24/7",
      description: "Acesse sua agenda e informações a qualquer hora, em qualquer lugar"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              ClinicaCare
            </h1>
          </div>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setShowLogin(true)}
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              Entrar
            </Button>
            <Button 
              onClick={() => setShowRegister(true)}
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
            >
              Cadastrar-se
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Gerenciamento Médico
            <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Inteligente e Seguro
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Transforme a gestão da sua clínica com nossa plataforma moderna. 
            Agendamentos simplificados, comunicação eficiente e cuidado personalizado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setShowRegister(true)}
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-lg px-8 py-3"
            >
              Começar Agora
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => setShowLogin(true)}
              className="border-blue-200 text-blue-600 hover:bg-blue-50 text-lg px-8 py-3"
            >
              Acessar Sistema
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            Recursos Modernos para Cuidados Excepcionais
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nossa plataforma oferece tudo que você precisa para uma gestão médica eficiente e centrada no paciente
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:bg-white">
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-800">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white/50 backdrop-blur-sm py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Por que escolher o ClinicaCare?
              </h3>
              <div className="space-y-4">
                {[
                  "Interface intuitiva e moderna",
                  "Redução de 80% no tempo de agendamento",
                  "Notificações automáticas para pacientes",
                  "Relatórios detalhados em tempo real",
                  "Suporte técnico especializado 24/7"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-64 bg-gradient-to-r from-blue-400 to-green-400 rounded-2xl flex items-center justify-center">
                <Calendar className="w-20 h-20 text-white opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">ClinicaCare</span>
          </div>
          <p className="text-gray-400">
            © 2024 ClinicaCare. Cuidando da sua saúde com tecnologia de ponta.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal open={showLogin} onOpenChange={setShowLogin} />
      <RegisterModal open={showRegister} onOpenChange={setShowRegister} />
    </div>
  );
};

export default Index;
