"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { 
  Search, 
  MapPin, 
  Clock, 
  DollarSign, 
  Star, 
  Users, 
  Briefcase, 
  Plus,
  Filter,
  Send,
  Eye,
  CheckCircle,
  AlertCircle,
  Building,
  User,
  Settings,
  Bell,
  Menu,
  X,
  BarChart3,
  FileText,
  Upload,
  Paperclip
} from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  company: string
  location: string
  type: "CLT" | "Freelance"
  budget: string
  skills: string[]
  postedAt: string
  proposals: number
  status: "open" | "in-progress" | "completed"
}

interface Proposal {
  id: string
  projectId: string
  engineer: string
  avatar: string
  price: string
  description: string
  status: "pending" | "analyzing" | "revision" | "approved" | "rejected"
  submittedAt: string
  rating?: number
}

export default function EngineeringPlatform() {
  const [activeTab, setActiveTab] = useState("projects")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showProposalDialog, setShowProposalDialog] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [contractType, setContractType] = useState("")

  const projects: Project[] = [
    {
      id: "1",
      title: "Sistema de Automação Industrial",
      description: "Desenvolvimento de sistema para controle automatizado de linha de produção com integração IoT e monitoramento em tempo real.",
      company: "TechCorp Indústria",
      location: "São Paulo, SP",
      type: "Freelance",
      budget: "R$ 25.000 - R$ 35.000",
      skills: ["Automação", "IoT", "Python", "PLC"],
      postedAt: "2 dias atrás",
      proposals: 8,
      status: "open"
    },
    {
      id: "2", 
      title: "Engenheiro Civil Sênior - CLT",
      description: "Vaga para engenheiro civil com experiência em projetos estruturais e gerenciamento de obras de grande porte.",
      company: "Construtora Alpha",
      location: "Rio de Janeiro, RJ",
      type: "CLT",
      budget: "R$ 12.000 - R$ 18.000/mês",
      skills: ["Estruturas", "AutoCAD", "Gerenciamento", "Concreto"],
      postedAt: "1 dia atrás",
      proposals: 12,
      status: "open"
    },
    {
      id: "3",
      title: "Projeto de Eficiência Energética",
      description: "Análise e otimização do consumo energético de complexo industrial com implementação de soluções sustentáveis.",
      company: "EcoEnergy Solutions",
      location: "Belo Horizonte, MG",
      type: "Freelance",
      budget: "R$ 15.000 - R$ 22.000",
      skills: ["Eficiência Energética", "Sustentabilidade", "Análise", "Relatórios"],
      postedAt: "3 dias atrás",
      proposals: 5,
      status: "open"
    }
  ]

  const proposals: Proposal[] = [
    {
      id: "1",
      projectId: "1",
      engineer: "Carlos Silva",
      avatar: "/api/placeholder/40/40",
      price: "R$ 28.000",
      description: "Tenho 8 anos de experiência em automação industrial e já desenvolvi sistemas similares para empresas do setor automotivo...",
      status: "analyzing",
      submittedAt: "1 dia atrás"
    },
    {
      id: "2",
      projectId: "1", 
      engineer: "Ana Santos",
      avatar: "/api/placeholder/40/40",
      price: "R$ 32.000",
      description: "Especialista em IoT e sistemas de monitoramento. Proposta inclui desenvolvimento completo com dashboard web...",
      status: "pending",
      submittedAt: "2 dias atrás"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500"
      case "analyzing": return "bg-blue-500"
      case "revision": return "bg-orange-500"
      case "approved": return "bg-green-500"
      case "rejected": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "Pendente"
      case "analyzing": return "Em Análise"
      case "revision": return "Em Revisão"
      case "approved": return "Aprovada"
      case "rejected": return "Rejeitada"
      default: return "Desconhecido"
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-[#8B0000] to-red-600 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  EngConnect
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                <Users className="w-4 h-4 mr-2" />
                Profissionais
              </Button>
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                <Briefcase className="w-4 h-4 mr-2" />
                Projetos
              </Button>
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                <Settings className="w-4 h-4" />
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4">
              <div className="flex flex-col space-y-2">
                <Button variant="ghost" className="justify-start text-gray-300 hover:text-white hover:bg-gray-800">
                  <Users className="w-4 h-4 mr-2" />
                  Profissionais
                </Button>
                <Button variant="ghost" className="justify-start text-gray-300 hover:text-white hover:bg-gray-800">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Projetos
                </Button>
                <Button variant="ghost" className="justify-start text-gray-300 hover:text-white hover:bg-gray-800">
                  <Bell className="w-4 h-4 mr-2" />
                  Notificações
                </Button>
                <Button variant="ghost" className="justify-start text-gray-300 hover:text-white hover:bg-gray-800">
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Conecte Talentos
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            A plataforma premium que une empresas e engenheiros para projetos excepcionais
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Buscar projetos, especialidades ou empresas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-[#8B0000] focus:ring-[#8B0000] rounded-xl"
              />
              <Button 
                size="sm" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#8B0000] to-red-600 hover:from-red-700 hover:to-red-800"
              >
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="inline-flex h-16 items-center justify-center rounded-2xl bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 p-2 shadow-2xl shadow-black/20 max-w-4xl w-full">
              <TabsTrigger 
                value="projects" 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-xl px-8 py-4 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8B0000] data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#8B0000]/25 hover:bg-gray-800/50 hover:text-gray-200 text-gray-400 flex-1 min-w-0"
              >
                <Briefcase className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="hidden sm:inline">Projetos Disponíveis</span>
                <span className="sm:hidden">Projetos</span>
              </TabsTrigger>
              <TabsTrigger 
                value="proposals"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-xl px-8 py-4 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8B0000] data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#8B0000]/25 hover:bg-gray-800/50 hover:text-gray-200 text-gray-400 flex-1 min-w-0"
              >
                <FileText className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="hidden sm:inline">Propostas Enviadas</span>
                <span className="sm:hidden">Propostas</span>
              </TabsTrigger>
              <TabsTrigger 
                value="dashboard"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-xl px-8 py-4 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8B0000] data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#8B0000]/25 hover:bg-gray-800/50 hover:text-gray-200 text-gray-400 flex-1 min-w-0"
              >
                <BarChart3 className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="hidden sm:inline">Meu Dashboard</span>
                <span className="sm:hidden">Dashboard</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Projects Tab */}
          <TabsContent value="projects" className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Projetos Disponíveis</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-[#8B0000] to-red-600 hover:from-red-700 hover:to-red-800">
                    <Plus className="w-4 h-4 mr-2" />
                    Publicar Projeto
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Publicar Novo Projeto</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Descreva seu projeto para encontrar o profissional ideal
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-sm font-medium text-gray-300">
                        Título do Projeto
                      </Label>
                      <Input 
                        id="title"
                        placeholder="Ex: Sistema de Automação Industrial" 
                        className="bg-gray-800 border-gray-600 focus:border-[#8B0000] focus:ring-[#8B0000]" 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-medium text-gray-300">
                        Descrição Detalhada
                      </Label>
                      <Textarea 
                        id="description"
                        placeholder="Descreva detalhadamente o projeto, objetivos, requisitos técnicos e expectativas..." 
                        className="bg-gray-800 border-gray-600 min-h-[120px] focus:border-[#8B0000] focus:ring-[#8B0000]" 
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-sm font-medium text-gray-300">
                          Localização
                        </Label>
                        <Input 
                          id="location"
                          placeholder="Ex: São Paulo, SP" 
                          className="bg-gray-800 border-gray-600 focus:border-[#8B0000] focus:ring-[#8B0000]" 
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contract-type" className="text-sm font-medium text-gray-300">
                          Tipo de Contrato
                        </Label>
                        <Select value={contractType} onValueChange={setContractType}>
                          <SelectTrigger className="bg-gray-800 border-gray-600 focus:border-[#8B0000] focus:ring-[#8B0000]">
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            <SelectItem value="clt">CLT (Contrato de Trabalho)</SelectItem>
                            <SelectItem value="prestacao-servico">Prestação de Serviço</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget" className="text-sm font-medium text-gray-300">
                        Orçamento
                      </Label>
                      <Input 
                        id="budget"
                        placeholder={contractType === "clt" ? "Ex: R$ 8.000 - R$ 12.000/mês" : "Ex: R$ 15.000 - R$ 25.000"} 
                        className="bg-gray-800 border-gray-600 focus:border-[#8B0000] focus:ring-[#8B0000]" 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="skills" className="text-sm font-medium text-gray-300">
                        Habilidades Necessárias
                      </Label>
                      <Input 
                        id="skills"
                        placeholder="Ex: Python, AutoCAD, Gestão de Projetos (separadas por vírgula)" 
                        className="bg-gray-800 border-gray-600 focus:border-[#8B0000] focus:ring-[#8B0000]" 
                      />
                    </div>

                    {/* File Upload Section */}
                    <div className="space-y-2">
                      <Label htmlFor="file-upload" className="text-sm font-medium text-gray-300">
                        Anexar Arquivos (Opcional)
                      </Label>
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-[#8B0000] transition-colors">
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          onChange={handleFileSelect}
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <div className="flex flex-col items-center space-y-2">
                            <Upload className="w-8 h-8 text-gray-400" />
                            <div className="text-sm text-gray-400">
                              <span className="font-medium text-[#8B0000] hover:text-red-500">
                                Clique para selecionar
                              </span>
                              {" "}ou arraste arquivos aqui
                            </div>
                            <div className="text-xs text-gray-500">
                              PDF, DOC, DOCX, JPG, PNG, ZIP (máx. 10MB)
                            </div>
                          </div>
                        </label>
                      </div>
                      
                      {selectedFile && (
                        <div className="flex items-center space-x-2 p-3 bg-gray-800 rounded-lg border border-gray-600">
                          <Paperclip className="w-4 h-4 text-[#8B0000]" />
                          <span className="text-sm text-gray-300 flex-1">{selectedFile.name}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedFile(null)}
                            className="text-gray-400 hover:text-red-400 p-1"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <Button 
                        variant="outline" 
                        className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        Salvar Rascunho
                      </Button>
                      <Button 
                        className="flex-1 bg-gradient-to-r from-[#8B0000] to-red-600 hover:from-red-700 hover:to-red-800"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Publicar Projeto
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="bg-gray-900 border-gray-700 hover:border-[#8B0000] transition-all duration-300 hover:shadow-2xl hover:shadow-[#8B0000]/20">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant={project.type === "CLT" ? "default" : "secondary"} className={project.type === "CLT" ? "bg-[#8B0000]" : "bg-gray-700"}>
                        {project.type}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-400">
                        <Clock className="w-4 h-4 mr-1" />
                        {project.postedAt}
                      </div>
                    </div>
                    <CardTitle className="text-white text-lg leading-tight">{project.title}</CardTitle>
                    <CardDescription className="text-gray-400 line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-300">
                        <Building className="w-4 h-4 mr-2 text-[#8B0000]" />
                        {project.company}
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <MapPin className="w-4 h-4 mr-2 text-[#8B0000]" />
                        {project.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <DollarSign className="w-4 h-4 mr-2 text-[#8B0000]" />
                        {project.budget}
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-3">
                        {project.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs border-gray-600 text-gray-300">
                            {skill}
                          </Badge>
                        ))}
                        {project.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                            +{project.skills.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-gray-700">
                        <div className="flex items-center text-sm text-gray-400">
                          <Users className="w-4 h-4 mr-1" />
                          {project.proposals} propostas
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              className="bg-gradient-to-r from-[#8B0000] to-red-600 hover:from-red-700 hover:to-red-800"
                              onClick={() => setSelectedProject(project)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Ver Detalhes
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-3xl">
                            <DialogHeader>
                              <DialogTitle className="text-xl">{selectedProject?.title}</DialogTitle>
                              <DialogDescription className="text-gray-400">
                                {selectedProject?.company} • {selectedProject?.location}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <p className="text-gray-300">{selectedProject?.description}</p>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold text-white mb-2">Orçamento</h4>
                                  <p className="text-[#8B0000] font-semibold">{selectedProject?.budget}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-white mb-2">Tipo</h4>
                                  <Badge className={selectedProject?.type === "CLT" ? "bg-[#8B0000]" : "bg-gray-700"}>
                                    {selectedProject?.type}
                                  </Badge>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold text-white mb-2">Habilidades Necessárias</h4>
                                <div className="flex flex-wrap gap-2">
                                  {selectedProject?.skills.map((skill) => (
                                    <Badge key={skill} variant="outline" className="border-gray-600 text-gray-300">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <Button 
                                className="w-full bg-gradient-to-r from-[#8B0000] to-red-600 hover:from-red-700 hover:to-red-800"
                                onClick={() => setShowProposalDialog(true)}
                              >
                                <Send className="w-4 h-4 mr-2" />
                                Enviar Proposta
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Proposals Tab */}
          <TabsContent value="proposals" className="mt-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Minhas Propostas</h3>
              
              {proposals.map((proposal) => {
                const project = projects.find(p => p.id === proposal.projectId)
                return (
                  <Card key={proposal.id} className="bg-gray-900 border-gray-700">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white">{project?.title}</CardTitle>
                          <CardDescription className="text-gray-400">
                            Proposta para {project?.company}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(proposal.status)}`}></div>
                          <span className="text-sm text-gray-300">{getStatusText(proposal.status)}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <h4 className="font-semibold text-white mb-1">Valor Proposto</h4>
                          <p className="text-[#8B0000] font-semibold">{proposal.price}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">Enviado</h4>
                          <p className="text-gray-400">{proposal.submittedAt}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">Status</h4>
                          <Badge className={`${getStatusColor(proposal.status)} text-white`}>
                            {getStatusText(proposal.status)}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-2">Descrição da Proposta</h4>
                        <p className="text-gray-300 text-sm">{proposal.description}</p>
                      </div>
                      
                      {proposal.status === "revision" && (
                        <div className="mt-4 p-4 bg-orange-900/20 border border-orange-700 rounded-lg">
                          <div className="flex items-center mb-2">
                            <AlertCircle className="w-4 h-4 text-orange-400 mr-2" />
                            <span className="font-semibold text-orange-400">Revisão Solicitada</span>
                          </div>
                          <p className="text-sm text-gray-300">
                            O cliente solicitou algumas alterações na sua proposta. Revise os comentários e reenvie.
                          </p>
                          <Button size="sm" className="mt-2 bg-orange-600 hover:bg-orange-700">
                            Revisar Proposta
                          </Button>
                        </div>
                      )}

                      {proposal.status === "approved" && (
                        <div className="mt-4 p-4 bg-green-900/20 border border-green-700 rounded-lg">
                          <div className="flex items-center mb-2">
                            <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                            <span className="font-semibold text-green-400">Proposta Aprovada!</span>
                          </div>
                          <p className="text-sm text-gray-300">
                            Parabéns! Sua proposta foi aprovada. O cliente entrará em contato em breve.
                          </p>
                          <div className="flex space-x-2 mt-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Ver Contrato
                            </Button>
                            <Button size="sm" variant="outline" className="border-green-600 text-green-400">
                              Iniciar Projeto
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-400">Propostas Enviadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">24</div>
                  <p className="text-xs text-gray-400 mt-1">+12% este mês</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-400">Projetos Ativos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#8B0000]">3</div>
                  <p className="text-xs text-gray-400 mt-1">2 em andamento</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-400">Avaliação Média</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="text-2xl font-bold text-white mr-2">4.8</div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Baseado em 15 avaliações</p>
                </CardContent>
              </Card>

              {/* Profile Card */}
              <Card className="bg-gray-900 border-gray-700 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white">Perfil Profissional</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src="/api/placeholder/64/64" />
                      <AvatarFallback className="bg-[#8B0000] text-white">JS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">João Silva</h3>
                      <p className="text-gray-400">Engenheiro Civil Sênior</p>
                      <p className="text-sm text-gray-500 mt-1">São Paulo, SP</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant="outline" className="border-gray-600 text-gray-300">Estruturas</Badge>
                        <Badge variant="outline" className="border-gray-600 text-gray-300">AutoCAD</Badge>
                        <Badge variant="outline" className="border-gray-600 text-gray-300">Gerenciamento</Badge>
                      </div>
                    </div>
                    <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                      Editar Perfil
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Card */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Completude do Perfil</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progresso</span>
                      <span className="text-white">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <p className="text-xs text-gray-400">
                      Adicione mais projetos ao seu portfólio para aumentar sua visibilidade
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Proposal Dialog */}
      <Dialog open={showProposalDialog} onOpenChange={setShowProposalDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Enviar Proposta</DialogTitle>
            <DialogDescription className="text-gray-400">
              Descreva sua proposta para este projeto
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Dados de Contato */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                  Email de Contato *
                </Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="seu@email.com" 
                  className="bg-gray-800 border-gray-600 focus:border-[#8B0000] focus:ring-[#8B0000]" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-sm font-medium text-gray-300">
                  WhatsApp *
                </Label>
                <Input 
                  id="whatsapp"
                  placeholder="(11) 99999-9999" 
                  className="bg-gray-800 border-gray-600 focus:border-[#8B0000] focus:ring-[#8B0000]" 
                />
              </div>
            </div>

            {/* Valor e Prazo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="value" className="text-sm font-medium text-gray-300">
                  Valor da Proposta *
                </Label>
                <Input 
                  id="value"
                  placeholder="Ex: R$ 25.000" 
                  className="bg-gray-800 border-gray-600 focus:border-[#8B0000] focus:ring-[#8B0000]" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline" className="text-sm font-medium text-gray-300">
                  Prazo de Entrega *
                </Label>
                <Input 
                  id="deadline"
                  placeholder="Ex: 30 dias" 
                  className="bg-gray-800 border-gray-600 focus:border-[#8B0000] focus:ring-[#8B0000]" 
                />
              </div>
            </div>

            {/* Descrição da Proposta */}
            <div className="space-y-2">
              <Label htmlFor="proposal-description" className="text-sm font-medium text-gray-300">
                Descrição da Proposta *
              </Label>
              <Textarea 
                id="proposal-description"
                placeholder="Descreva sua experiência, metodologia e como pretende executar o projeto..."
                className="bg-gray-800 border-gray-600 min-h-[120px] focus:border-[#8B0000] focus:ring-[#8B0000]"
              />
            </div>

            {/* Anexar Proposta Detalhada */}
            <div className="space-y-2">
              <Label htmlFor="proposal-file" className="text-sm font-medium text-gray-300">
                Anexar Proposta Detalhada (Opcional)
              </Label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-[#8B0000] transition-colors">
                <input
                  id="proposal-file"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                />
                <label htmlFor="proposal-file" className="cursor-pointer">
                  <div className="flex flex-col items-center space-y-2">
                    <Upload className="w-8 h-8 text-gray-400" />
                    <div className="text-sm text-gray-400">
                      <span className="font-medium text-[#8B0000] hover:text-red-500">
                        Clique para selecionar
                      </span>
                      {" "}ou arraste sua proposta aqui
                    </div>
                    <div className="text-xs text-gray-500">
                      PDF, DOC, DOCX (máx. 10MB)
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex space-x-3 pt-4">
              <Button 
                variant="outline" 
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                onClick={() => setShowProposalDialog(false)}
              >
                Cancelar
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-[#8B0000] to-red-600 hover:from-red-700 hover:to-red-800"
                onClick={() => setShowProposalDialog(false)}
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar Proposta
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}