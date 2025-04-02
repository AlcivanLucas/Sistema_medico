"use client"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

// Dados simulados de consultas
const appointments = [
  {
    id: "1",
    date: new Date(2024, 3, 15, 14, 30),
    patient: "Ana Silva",
    type: "Consulta",
  },
  {
    id: "2",
    date: new Date(2024, 3, 15, 16, 0),
    patient: "Carlos Oliveira",
    type: "Retorno",
  },
  {
    id: "3",
    date: new Date(2024, 3, 16, 10, 0),
    patient: "Mariana Santos",
    type: "Exame",
  },
  {
    id: "4",
    date: new Date(2024, 3, 16, 11, 30),
    patient: "Pedro Almeida",
    type: "Consulta",
  },
  {
    id: "5",
    date: new Date(2024, 3, 17, 9, 0),
    patient: "Juliana Costa",
    type: "Consulta",
  },
]

export function Calendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Filtra consultas para a data selecionada
  const filteredAppointments = appointments.filter(
    (appointment) =>
      date &&
      appointment.date.getDate() === date.getDate() &&
      appointment.date.getMonth() === date.getMonth() &&
      appointment.date.getFullYear() === date.getFullYear(),
  )

  // Função para verificar se um dia tem consultas
  const hasAppointments = (day: Date) => {
    return appointments.some(
      (appointment) =>
        appointment.date.getDate() === day.getDate() &&
        appointment.date.getMonth() === day.getMonth() &&
        appointment.date.getFullYear() === day.getFullYear(),
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-[300px_1fr]">
      <Card>
        <CardContent className="p-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"outline"} className="w-full justify-start text-left font-normal mb-4">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={ptBR}
                modifiers={{
                  hasAppointment: (date) => hasAppointments(date),
                }}
                modifiersClassNames={{
                  hasAppointment: "bg-primary/20 font-bold",
                }}
              />
            </PopoverContent>
          </Popover>

          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            locale={ptBR}
            modifiers={{
              hasAppointment: (date) => hasAppointments(date),
            }}
            modifiersClassNames={{
              hasAppointment: "bg-primary/20 font-bold",
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-4">
            {date ? (
              <>Consultas para {format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</>
            ) : (
              "Selecione uma data para ver as consultas"
            )}
          </h3>

          {filteredAppointments.length > 0 ? (
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className={cn(
                    "p-3 rounded-md border",
                    appointment.type === "Consulta"
                      ? "border-l-4 border-l-primary"
                      : appointment.type === "Retorno"
                        ? "border-l-4 border-l-amber-500"
                        : "border-l-4 border-l-emerald-500",
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{appointment.patient}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(appointment.date, "HH:mm")} - {appointment.type}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Detalhes
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
              <p>Nenhuma consulta agendada para esta data.</p>
              <Button variant="outline" className="mt-4">
                Agendar Nova Consulta
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

