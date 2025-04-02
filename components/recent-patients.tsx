import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const recentPatients = [
  {
    id: "1",
    name: "Ana Silva",
    date: "Hoje, 14:30",
    status: "Consulta",
    initials: "AS",
  },
  {
    id: "2",
    name: "Carlos Oliveira",
    date: "Hoje, 16:00",
    status: "Retorno",
    initials: "CO",
  },
  {
    id: "3",
    name: "Mariana Santos",
    date: "Ontem, 10:15",
    status: "Exame",
    initials: "MS",
  },
  {
    id: "4",
    name: "Pedro Almeida",
    date: "Ontem, 11:30",
    status: "Consulta",
    initials: "PA",
  },
]

export function RecentPatients() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pacientes Recentes</CardTitle>
        <CardDescription>Últimos pacientes atendidos ou agendados.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentPatients.map((patient) => (
            <div key={patient.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarFallback>{patient.initials}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <Link href={`/pacientes/${patient.id}`} className="text-sm font-medium hover:underline">
                  {patient.name}
                </Link>
                <p className="text-xs text-muted-foreground">{patient.date}</p>
              </div>
              <div className="ml-auto">
                <Badge variant="outline">{patient.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

