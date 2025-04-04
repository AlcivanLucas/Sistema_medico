"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BodyAreaSelector } from "./body-area-selector"

interface MedicalRecordFormProps {
  patientId: string
}

const medicalRecordSchema = z.object({
  name: z.string().min(1, {
    message: "O nome é obrigatório.",
  }),
  recordNumber: z.string().min(1, {
    message: "O número do prontuário é obrigatório.",
  }),
  gender: z.string().min(1, {
    message: "O sexo é obrigatório.",
  }),
  age: z.string().min(1, {
    message: "A idade é obrigatória.",
  }),
  birthDate: z.string().min(1, {
    message: "A data de nascimento é obrigatória.",
  }),
  referringDoctor: z.string().min(1, {
    message: "O médico que indicou é obrigatório.",
  }),
  phone: z.string().min(1, {
    message: "O telefone é obrigatório.",
  }),
  phototype: z.string().min(1, {
    message: "O fototipo é obrigatório.",
  }),
  diagnosis: z.string().min(1, {
    message: "O diagnóstico é obrigatório.",
  }),
  pathologicalExam: z.string().optional(),
  pathologicalExamDate: z.string().optional(),
  pathologicalExamLab: z.string().optional(),
  immunohistochemistry: z.string().optional(),
  immunohistochemistryDate: z.string().optional(),
  immunohistochemistryLab: z.string().optional(),
  labExams: z.object({
    fan: z.string().optional(),
    fanDate: z.string().optional(),
    renalFunction: z.string().optional(),
    renalFunctionDate: z.string().optional(),
    liverFunction: z.string().optional(),
    liverFunctionDate: z.string().optional(),
    vitaminD: z.string().optional(),
    vitaminDDate: z.string().optional(),
  }),
  previousPhototherapy: z.boolean().default(false),
  previousPhototherapyModality: z.string().optional(),
  accumulatedDose: z.string().optional(),
  sessionsNumber: z.string().optional(),
  previousTreatments: z.string().optional(),
  melanocyticNevi: z.string().optional(),
  comorbidities: z.string().optional(),
  medications: z.string().optional(),
  affectedBodyAreas: z.array(z.string()).default([]),
  treatmentModality: z.object({
    uvbfe: z.boolean().default(false),
    puva: z.boolean().default(false),
    puvaDose: z.string().optional(),
    uva1: z.boolean().default(false),
    puvaBath: z.boolean().default(false),
    puvaBathDose: z.string().optional(),
    cabin: z.boolean().default(false),
    handsAndFeet: z.boolean().default(false),
    localizedApplication: z.boolean().default(false),
    localizedApplicationArea: z.string().optional(),
  }),
  sessionFrequency: z.string().optional(),
  reactionAfterSession: z.array(z.string()).default([]),
  particularities: z.object({
    useOfStep: z.boolean().default(false),
    useOfGlasses: z.boolean().default(false),
    exposeFace: z.boolean().default(false),
    faceProtection: z.string().optional(),
    genitalProtection: z.boolean().default(false),
    cabinPosition: z.string().optional(),
    others: z.string().optional(),
  }),
  totalSessions: z.string().optional(),
  treatmentResponse: z.string().optional(),
})

type MedicalRecordValues = z.infer<typeof medicalRecordSchema>

export function MedicalRecordForm({ patientId }: MedicalRecordFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<MedicalRecordValues>({
    resolver: zodResolver(medicalRecordSchema),
    defaultValues: {
      name: "",
      recordNumber: "",
      gender: "",
      age: "",
      birthDate: "",
      referringDoctor: "",
      phone: "",
      phototype: "",
      diagnosis: "",
      pathologicalExam: "",
      pathologicalExamDate: "",
      pathologicalExamLab: "",
      immunohistochemistry: "",
      immunohistochemistryDate: "",
      immunohistochemistryLab: "",
      labExams: {
        fan: "",
        fanDate: "",
        renalFunction: "",
        renalFunctionDate: "",
        liverFunction: "",
        liverFunctionDate: "",
        vitaminD: "",
        vitaminDDate: "",
      },
      previousPhototherapy: false,
      previousPhototherapyModality: "",
      accumulatedDose: "",
      sessionsNumber: "",
      previousTreatments: "",
      melanocyticNevi: "",
      comorbidities: "",
      medications: "",
      affectedBodyAreas: [],
      treatmentModality: {
        uvbfe: false,
        puva: false,
        puvaDose: "",
        uva1: false,
        puvaBath: false,
        puvaBathDose: "",
        cabin: false,
        handsAndFeet: false,
        localizedApplication: false,
        localizedApplicationArea: "",
      },
      sessionFrequency: "",
      reactionAfterSession: [],
      particularities: {
        useOfStep: false,
        useOfGlasses: false,
        exposeFace: false,
        faceProtection: "",
        genitalProtection: false,
        cabinPosition: "",
        others: "",
      },
      totalSessions: "",
      treatmentResponse: "",
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
      <CardHeader>
        <CardTitle>Ficha Clínica - Fototerapia</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome completo do paciente" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="recordNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prontuário</FormLabel>
                    <FormControl>
                      <Input placeholder="Número do prontuário" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sexo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="feminino">Feminino</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Idade</FormLabel>
                    <FormControl>
                      <Input placeholder="Idade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Nascimento</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="referringDoctor"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Médico que indicou</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do médico" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="(00) 00000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phototype"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fototipo</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o fototipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="I">I - Pele branca, sempre queima, nunca bronzeia</SelectItem>
                      <SelectItem value="II">II - Pele branca, queima com facilidade, bronzeia pouco</SelectItem>
                      <SelectItem value="III">III - Pele morena clara, queima moderadamente</SelectItem>
                      <SelectItem value="IV">IV - Pele morena moderada, queima pouco</SelectItem>
                      <SelectItem value="V">V - Pele morena escura, queima raramente</SelectItem>
                      <SelectItem value="VI">VI - Pele negra, nunca queima</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Classificação do tipo de pele do paciente</FormDescription>
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

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="pathologicalExam"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exame anatomopatológico</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Resultado do exame" className="min-h-[80px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="pathologicalExamLab"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Laboratório</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do laboratório" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pathologicalExamDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="immunohistochemistry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Imuno-histoquímica</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Resultado do exame" className="min-h-[80px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="immunohistochemistryLab"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Laboratório</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do laboratório" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="immunohistochemistryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Exames laboratoriais</h3>
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="labExams.fan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>FAN</FormLabel>
                        <FormControl>
                          <Input placeholder="Resultado" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="labExams.fanDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="labExams.renalFunction"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Função renal</FormLabel>
                        <FormControl>
                          <Input placeholder="Resultado" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="labExams.renalFunctionDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="labExams.liverFunction"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Função hepática</FormLabel>
                        <FormControl>
                          <Input placeholder="Resultado" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="labExams.liverFunctionDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="labExams.vitaminD"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vitamina D</FormLabel>
                        <FormControl>
                          <Input placeholder="Resultado" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="labExams.vitaminDDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="previousPhototherapy"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Fototerapia anterior</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                {form.watch("previousPhototherapy") && (
                  <div className="space-y-4 pl-4">
                    <FormField
                      control={form.control}
                      name="previousPhototherapyModality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Modalidade</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: UVBfe, PUVA" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="accumulatedDose"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dose acumulada</FormLabel>
                          <FormControl>
                            <Input placeholder="Dose acumulada" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="sessionsNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número de sessões</FormLabel>
                          <FormControl>
                            <Input placeholder="Quantidade" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>

              <FormField
                control={form.control}
                name="previousTreatments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tratamentos anteriores / data / quanto tempo</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva os tratamentos anteriores, datas e duração"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="melanocyticNevi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nevos melanocíticos</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva a presença de nevos melanocíticos (pintas ou sinais)"
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
              name="comorbidities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comorbidades</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Outras condições de saúde que o paciente possui"
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
              name="medications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medicações em uso</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Medicamentos que o paciente está utilizando"
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
              name="affectedBodyAreas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Área corporal acometida</FormLabel>
                  <FormControl>
                    <BodyAreaSelector value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Modalidade de tratamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="treatmentModality.uvbfe"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>UVBfe</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="treatmentModality.puva"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>PUVA</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      {form.watch("treatmentModality.puva") && (
                        <FormField
                          control={form.control}
                          name="treatmentModality.puvaDose"
                          render={({ field }) => (
                            <FormItem className="ml-7">
                              <FormLabel>Dose psoralênico</FormLabel>
                              <FormControl>
                                <Input placeholder="Dose" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      <FormField
                        control={form.control}
                        name="treatmentModality.uva1"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>UVA1</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="treatmentModality.puvaBath"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>PUVA-banho</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      {form.watch("treatmentModality.puvaBath") && (
                        <FormField
                          control={form.control}
                          name="treatmentModality.puvaBathDose"
                          render={({ field }) => (
                            <FormItem className="ml-7">
                              <FormLabel>Dose psoralênico</FormLabel>
                              <FormControl>
                                <Input placeholder="Dose" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                    <div className="space-y-2 border-t pt-2">
                      <FormField
                        control={form.control}
                        name="treatmentModality.cabin"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Cabine</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="treatmentModality.handsAndFeet"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Mãos e/ou pés</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="treatmentModality.localizedApplication"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Aplicação localizada</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      {form.watch("treatmentModality.localizedApplication") && (
                        <FormField
                          control={form.control}
                          name="treatmentModality.localizedApplicationArea"
                          render={({ field }) => (
                            <FormItem className="ml-7">
                              <FormLabel>Área</FormLabel>
                              <FormControl>
                                <Input placeholder="Especifique a área" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="sessionFrequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Frequência das sessões</FormLabel>
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <Input placeholder="Número" {...field} />
                            </FormControl>
                            <span>sessões/semana</span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="reactionAfterSession"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reação após a sessão</FormLabel>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="reaction-1"
                                checked={field.value.includes("1")}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, "1"])
                                    : field.onChange(field.value.filter((value) => value !== "1"))
                                }}
                              />
                              <label
                                htmlFor="reaction-1"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                1- Ardência
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="reaction-2"
                                checked={field.value.includes("2")}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, "2"])
                                    : field.onChange(field.value.filter((value) => value !== "2"))
                                }}
                              />
                              <label
                                htmlFor="reaction-2"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                2- Eritema leve
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="reaction-3"
                                checked={field.value.includes("3")}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, "3"])
                                    : field.onChange(field.value.filter((value) => value !== "3"))
                                }}
                              />
                              <label
                                htmlFor="reaction-3"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                3- Eritema severo
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="reaction-4"
                                checked={field.value.includes("4")}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, "4"])
                                    : field.onChange(field.value.filter((value) => value !== "4"))
                                }}
                              />
                              <label
                                htmlFor="reaction-4"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                4- Bolhas
                              </label>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium mb-3">Particularidades</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <FormField
                        control={form.control}
                        name="particularities.useOfStep"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Uso de degrau</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="particularities.useOfGlasses"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Uso de óculos</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="particularities.exposeFace"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Expor face</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      {form.watch("particularities.exposeFace") && (
                        <FormField
                          control={form.control}
                          name="particularities.faceProtection"
                          render={({ field }) => (
                            <FormItem className="ml-7">
                              <FormLabel>Proteção</FormLabel>
                              <FormControl>
                                <Input placeholder="Especifique a proteção" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                    <div className="space-y-3">
                      <FormField
                        control={form.control}
                        name="particularities.genitalProtection"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Proteção genital</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="particularities.cabinPosition"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Posição na cabine</FormLabel>
                            <FormControl>
                              <Input placeholder="Especifique a posição" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="particularities.others"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Outras</FormLabel>
                            <FormControl>
                              <Input placeholder="Outras particularidades" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 border-t pt-4">
                  <FormField
                    control={form.control}
                    name="totalSessions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número total de sessões</FormLabel>
                        <FormControl>
                          <Input placeholder="Quantidade" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="treatmentResponse"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resposta ao tratamento</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a resposta" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="complete">Completa</SelectItem>
                            <SelectItem value="partial">Parcial</SelectItem>
                            <SelectItem value="none">Sem resposta</SelectItem>
                            <SelectItem value="worse">Piora/progressão</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

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

