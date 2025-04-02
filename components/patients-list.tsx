import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, FileEdit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"

const patients = [
  {
    id: "1",
    name: "Ana Silva",
    age: 42,
    gender: "Feminino",
    phone: "(11) 98765-4321",
    lastVisit: "12/03/2024",
    status: "Ativo",
  },
  {
    id: "2",
    name: "Carlos Oliveira",
    age: 35,
    gender: "Masculino",
    phone: "(11) 91234-5678",
    lastVisit: "05/03/2024",
    status: "Ativo",
  },
  {
    id: "3",
    name: "Mariana Santos",
    age: 28,
    gender: "Feminino",
    phone: "(11) 99876-5432",
    lastVisit: "28/02/2024",
    status: "Ativo",
  },
  {
    id: "4",
    name: "Pedro Almeida",
    age: 56,
    gender: "Masculino",
    phone: "(11) 95555-4444",
    lastVisit: "15/02/2024",
    status: "Inativo",
  },
  {
    id: "5",
    name: "Juliana Costa",
    age: 31,
    gender: "Feminino",
    phone: "(11) 94444-3333",
    lastVisit: "10/02/2024",
    status: "Ativo",
  },
]

export function PatientsList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="max-w-sm">
          <Input placeholder="Buscar pacientes..." />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Idade</TableHead>
              <TableHead>Gênero</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Última Visita</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">
                  <Link href={`/pacientes/${patient.id}`} className="hover:underline">
                    {patient.name}
                  </Link>
                </TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>{patient.lastVisit}</TableCell>
                <TableCell>
                  <Badge variant={patient.status === "Ativo" ? "default" : "secondary"}>{patient.status}</Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Abrir menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/pacientes/${patient.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Visualizar</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/pacientes/${patient.id}/editar`}>
                          <FileEdit className="mr-2 h-4 w-4" />
                          <span>Editar</span>
                        </Link>
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
      </div>
    </div>
  )
}

