import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { PatientsList } from "@/components/patients-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export default function PatientsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Pacientes" text="Gerencie seus pacientes.">
        <Link href="/pacientes/novo">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Paciente
          </Button>
        </Link>
      </DashboardHeader>
      <PatientsList />
    </DashboardShell>
  )
}

