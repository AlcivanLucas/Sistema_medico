import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { PatientForm } from "@/components/patient-form"

export default function NewPatientPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Novo Paciente" text="Adicione um novo paciente ao sistema." />
      <div className="grid gap-8">
        <PatientForm />
      </div>
    </DashboardShell>
  )
}

