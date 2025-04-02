import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, FileEdit, Trash2, Eye, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface MedicalRecordsListProps {
  patientId: string
}

export function MedicalRecordsList({ patientId }: MedicalRecordsListProps) {
  // Dados simulados - em um app real, você buscaria do banco de dados
  const records = [
    {
      id: "1",
      date: "15/03/2024",
      diagnosis: "Hipertensão Arterial",
      doctor: "Dr. Ricardo",
    },
    {
      id: "2",
      date: "28/02/2024",
      diagnosis: "Gripe",
      doctor: "Dr. Ricardo",
    },
    {
      id: "3",
      date: "10/01/2024",
      diagnosis: "Check-up de rotina",
      doctor: "Dr. Ricardo",
    },
    {
      id: "4",
      date: "05/12/2023",
      diagnosis: "Dor lombar",
      doctor: "Dr. Ricardo",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Consultas</CardTitle>
        <CardDescription>Histórico de consultas e fichas técnicas do paciente.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Diagnóstico</TableHead>
              <TableHead>Médico</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.diagnosis}</TableCell>
                <TableCell>{record.doctor}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Abrir menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Visualizar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileEdit className="mr-2 h-4 w-4" />
                        <span>Editar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Imprimir</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Excluir</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

