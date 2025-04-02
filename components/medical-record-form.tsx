"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"

interface MedicalRecordFormProps {
  patientId: string
}

const medicalRecordSchema = z.object({
  date: z.string().min(1, {
    message: "A data é obrigatória.",
  }),
  weight: z.string().min(1, {
    message: "O peso é obrigatório.",
  }),
  height: z.string().min(1, {
    message: "A altura é obrigatória.",
  }),
  bloodPressure: z.string().min(1, {
    message: "A pressão arterial é obrigatória.",
  }),
  temperature: z.string().optional(),
  symptoms: z.string().min(1, {
    message: "Os sintomas são obrigatórios.",
  }),
  diagnosis: z.string().min(1, {
    message: "O diagnóstico é obrigatório.",
  }),
  treatment: z.string().min(1, {
    message: "O tratamento é obrigatório.",
  }),
  medications: z.string().optional(),
  exams: z.string().optional(),
  followUp: z.boolean().default(false),
  followUpDate: z.string().optional(),
  notes: z.string().optional(),
})

type MedicalRecordValues = z.infer<typeof medicalRecordSchema>

export function MedicalRecordForm({ patientId }: MedicalRecordFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<MedicalRecordValues>({
    resolver: zodResolver(medicalRecordSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      weight: "",
      height: "",
      bloodPressure: "",
      temperature: "",
      symptoms: "",
      diagnosis: "",
      treatment: "",
      medications: "",
      exams: "",
      followUp: false,
      followUpDate: "",
      notes: "",
    },
  })

  function onSubmit(data: MedicalRecordValues) {
    setIsLoading(true)

    // Simulando envio para API
    setTimeout(() => {
      console.log({ patientId, ...data })
      setIsLoading(false)
      form.reset()
    }, 1000)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data da Consulta</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peso (kg)</FormLabel>
                    <FormControl>
                      <Input placeholder="70.5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Altura (cm)</FormLabel>
                    <FormControl>
                      <Input placeholder="175" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bloodPressure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pressão Arterial</FormLabel>
                    <FormControl>
                      <Input placeholder="120/80" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="temperature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Temperatura (°C)</FormLabel>
                    <FormControl>
                      <Input placeholder="36.5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="symptoms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sintomas</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva os sintomas relatados pelo paciente"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="diagnosis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diagnóstico</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Diagnóstico clínico" className="min-h-[80px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="treatment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tratamento</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Plano de tratamento" className="min-h-[80px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="medications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medicamentos</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Medicamentos prescritos" className="min-h-[80px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="exams"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exames</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Exames solicitados" className="min-h-[80px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="followUp"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Retorno</FormLabel>
                      <FormDescription>Marcar retorno para o paciente</FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              {form.watch("followUp") && (
                <FormField
                  control={form.control}
                  name="followUpDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data do Retorno</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações Adicionais</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Observações adicionais sobre a consulta"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button" onClick={() => form.reset()}>
                Limpar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar Ficha"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

