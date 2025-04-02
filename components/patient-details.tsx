import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileEdit } from "lucide-react"
import Link from "next/link"

interface PatientDetailsProps {
  id: string
}

export function PatientDetails({ id }: PatientDetailsProps) {
  // Dados simulados - em um app real, você buscaria do banco de dados
  const patient = {
    id,
    name: "Ana Silva",
    birthDate: "15/05/1982",
    age: 42,
    gender: "Feminino",
    cpf: "123.456.789-00",
    phone: "(11) 98765-4321",
    email: "ana.silva@email.com",
    address: "Rua das Flores, 123 - São Paulo, SP",
    notes: "Paciente com histórico de hipertensão. Alérgica a penicilina.",
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold">{patient.name}</h2>
            <p className="text-muted-foreground">
              {patient.age} anos • {patient.gender}
            </p>
          </div>
          <Link href={`/pacientes/${id}/editar`}>
            <Button variant="outline" size="sm">
              <FileEdit className="h-4 w-4 mr-2" />
              Editar
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">CPF</h3>
            <p>{patient.cpf}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Data de Nascimento</h3>
            <p>{patient.birthDate}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Telefone</h3>
            <p>{patient.phone}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
            <p>{patient.email}</p>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Endereço</h3>
            <p>{patient.address}</p>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Observações</h3>
            <p>{patient.notes}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

