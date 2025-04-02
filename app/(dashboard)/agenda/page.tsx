import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Calendar } from "@/components/calendar"

export default function SchedulePage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Agenda" text="Gerencie suas consultas e compromissos." />
      <Calendar />
    </DashboardShell>
  )
}

