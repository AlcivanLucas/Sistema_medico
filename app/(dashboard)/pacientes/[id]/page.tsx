import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { PatientDetails } from "@/components/patient-details"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MedicalRecordForm } from "@/components/medical-record-form"
import { MedicalRecordsList } from "@/components/medical-records-list"

export default function PatientPage({ params }: { params: { id: string } }) {
  return (
    <DashboardShell>
      <DashboardHeader heading="Detalhes do Paciente" text="Visualize e edite informações do paciente." />
      <PatientDetails id={params.id} />
      <div className="mt-6">
        <Tabs defaultValue="ficha">
          <TabsList>
            <TabsTrigger value="ficha">Ficha Clínica</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
          </TabsList>
          <TabsContent value="ficha" className="mt-4">
            <MedicalRecordForm patientId={params.id} />
          </TabsContent>
          <TabsContent value="historico" className="mt-4">
            <MedicalRecordsList patientId={params.id} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}

