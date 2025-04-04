"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface BodyPart {
  id: string
  name: string
  percentage: string
  adultPath: string
  childPath: string
}

interface BodyAreaSelectorProps {
  value: string[]
  onChange: (value: string[]) => void
}

const bodyParts: BodyPart[] = [
  {
    id: "head",
    name: "Cabeça",
    percentage: "9%",
    adultPath: "M335,120 a50,50 0 1,0 1,0 z",
    childPath: "M580,365 a30,30 0 1,0 1,0 z",
  },
  {
    id: "chest",
    name: "Tórax (frente)",
    percentage: "18%",
    adultPath: "M335,220 a60,40 0 1,0 1,0 z",
    childPath: "M580,415 a30,20 0 1,0 1,0 z",
  },
  {
    id: "abdomen",
    name: "Abdômen",
    percentage: "18%",
    adultPath: "M335,300 a40,60 0 1,0 1,0 z",
    childPath: "M580,460 a20,30 0 1,0 1,0 z",
  },
  {
    id: "back",
    name: "Dorso",
    percentage: "18%",
    adultPath: "M335,280 a40,60 0 1,0 1,0 z",
    childPath: "M580,445 a20,30 0 1,0 1,0 z",
  },
  {
    id: "leftArm",
    name: "Braço esquerdo",
    percentage: "9%",
    adultPath: "M270,270 a20,80 0 1,0 1,0 z",
    childPath: "M545,430 a10,40 0 1,0 1,0 z",
  },
  {
    id: "rightArm",
    name: "Braço direito",
    percentage: "9%",
    adultPath: "M400,270 a20,80 0 1,0 1,0 z",
    childPath: "M615,430 a10,40 0 1,0 1,0 z",
  },
  {
    id: "leftLeg",
    name: "Perna esquerda",
    percentage: "18%",
    adultPath: "M315,390 a20,100 0 1,0 1,0 z",
    childPath: "M570,510 a10,50 0 1,0 1,0 z",
  },
  {
    id: "rightLeg",
    name: "Perna direita",
    percentage: "18%",
    adultPath: "M355,390 a20,100 0 1,0 1,0 z",
    childPath: "M590,510 a10,50 0 1,0 1,0 z",
  },
]

export function BodyAreaSelector({ value, onChange }: BodyAreaSelectorProps) {
  const [selectedParts, setSelectedParts] = useState<string[]>(value || [])

  const toggleBodyPart = (partId: string) => {
    let newSelectedParts: string[]

    if (selectedParts.includes(partId)) {
      newSelectedParts = selectedParts.filter((id) => id !== partId)
    } else {
      newSelectedParts = [...selectedParts, partId]
    }

    setSelectedParts(newSelectedParts)
    onChange(newSelectedParts)
  }

  const getBodyPartNames = () => {
    return selectedParts
      .map((id) => bodyParts.find((part) => part.id === id)?.name)
      .filter(Boolean)
      .join(", ")
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Adulto */}
        <div className="border rounded-md p-4">
          <h3 className="text-sm font-medium mb-2 text-center">Adulto</h3>
          <div className="relative w-full aspect-[1/2] max-w-[400px] mx-auto">
            <svg viewBox="200 0 270 670" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* Contorno do corpo adulto */}
              <path
                d="M335,120 a50,50 0 1,0 1,0 z M335,170 L335,190 M285,190 L385,190 M285,190 C285,210 305,220 335,220 C365,220 385,210 385,190 M335,220 L335,390 M270,220 L400,220 M270,220 L250,320 L230,380 M400,220 L420,320 L440,380 M250,320 L270,320 M420,320 L400,320 M230,380 L250,380 M440,380 L420,380 M250,380 L250,390 M420,380 L420,390 M315,390 L315,570 M355,390 L355,570"
                fill="none"
                stroke="black"
                strokeWidth="2"
              />

              {/* Áreas clicáveis */}
              {bodyParts.map((part) => (
                <path
                  key={part.id}
                  d={part.adultPath}
                  className={cn(
                    "cursor-pointer hover:opacity-70 transition-opacity",
                    selectedParts.includes(part.id)
                      ? "fill-primary/40 stroke-primary"
                      : "fill-transparent stroke-gray-400",
                  )}
                  strokeWidth="1"
                  onClick={() => toggleBodyPart(part.id)}
                />
              ))}

              {/* Textos de porcentagem */}
              <text x="335" y="120" textAnchor="middle" fontSize="16">
                9%
              </text>
              <text x="335" y="220" textAnchor="middle" fontSize="16">
                18%
              </text>
              <text x="335" y="280" textAnchor="middle" fontSize="16">
                18%
              </text>
              <text x="270" y="270" textAnchor="middle" fontSize="16">
                9%
              </text>
              <text x="400" y="270" textAnchor="middle" fontSize="16">
                9%
              </text>
              <text x="315" y="390" textAnchor="middle" fontSize="16">
                18%
              </text>
              <text x="355" y="390" textAnchor="middle" fontSize="16">
                18%
              </text>
              <text x="335" y="570" textAnchor="middle" fontSize="16">
                Adulto
              </text>
            </svg>
          </div>
        </div>

        {/* Criança */}
        <div className="border rounded-md p-4">
          <h3 className="text-sm font-medium mb-2 text-center">Criança até 10 anos</h3>
          <div className="relative w-full aspect-[1/2] max-w-[400px] mx-auto">
            <svg viewBox="450 300 270 370" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* Contorno do corpo criança */}
              <path
                d="M580,365 a30,30 0 1,0 1,0 z M580,395 L580,405 M550,405 L610,405 M550,405 C550,415 560,415 580,415 C600,415 610,415 610,405 M580,415 L580,510 M545,415 L615,415 M545,415 L535,460 L525,490 M615,415 L625,460 L635,490 M535,460 L545,460 M625,460 L615,460 M525,490 L535,490 M635,490 L625,490 M535,490 L535,510 M625,490 L625,510 M570,510 L570,570 M590,510 L590,570"
                fill="none"
                stroke="black"
                strokeWidth="2"
              />

              {/* Áreas clicáveis */}
              {bodyParts.map((part) => (
                <path
                  key={`child-${part.id}`}
                  d={part.childPath}
                  className={cn(
                    "cursor-pointer hover:opacity-70 transition-opacity",
                    selectedParts.includes(part.id)
                      ? "fill-primary/40 stroke-primary"
                      : "fill-transparent stroke-gray-400",
                  )}
                  strokeWidth="1"
                  onClick={() => toggleBodyPart(part.id)}
                />
              ))}

              {/* Textos de porcentagem */}
              <text x="580" y="365" textAnchor="middle" fontSize="16">
                19%
              </text>
              <text x="580" y="415" textAnchor="middle" fontSize="16">
                13%
              </text>
              <text x="580" y="445" textAnchor="middle" fontSize="16">
                13%
              </text>
              <text x="545" y="430" textAnchor="middle" fontSize="16">
                9%
              </text>
              <text x="615" y="430" textAnchor="middle" fontSize="16">
                9%
              </text>
              <text x="570" y="510" textAnchor="middle" fontSize="16">
                13%
              </text>
              <text x="590" y="510" textAnchor="middle" fontSize="16">
                13%
              </text>
              <text x="580" y="590" textAnchor="middle" fontSize="16">
                Até 10 anos
              </text>
            </svg>
          </div>
        </div>
      </div>

      <div className="p-4 border rounded-md bg-muted/20">
        <p className="text-sm font-medium">Áreas selecionadas:</p>
        <p>{getBodyPartNames() || "Nenhuma área selecionada"}</p>
      </div>
    </div>
  )
}

