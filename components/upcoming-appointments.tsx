import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const appointments = [
  {
    id: "1",
    patient: "Ana Silva",
    time: "14:30 - 15:00",
    type: "Consulta",
  },
  {
    id: "2",
    patient: "Carlos Oliveira",
    time: "16:00 - 16:30",
    type: "Retorno",
  },
  {
    id: "3",
    patient: "Juliana Costa",
    time: "17:15 - 17:45",
    type: "Consulta",
  },
  {
    id: "4",
    patient: "Roberto Ferreira",
    time: "18:00 - 18:30",
    type: "Exame",
  },
]

export function UpcomingAppointments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Próximas Consultas</CardTitle>
        <CardDescription>Consultas agendadas para hoje.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{appointment.patient}</p>
                <p className="text-xs text-muted-foreground">{appointment.time}</p>
              </div>
              <Badge variant={appointment.type === "Consulta" ? "default" : "secondary"}>{appointment.type}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

