import { BloodRequest } from "./requestCardType";

export const mockRequests: BloodRequest[] = [
  {
    id: "1",
    nome_paciente: "Mariana Cavalcante",
    tipo_sanguineo: "A+",
    data_pedido: "12 Out, 2023",
    estado: "ativo",
  },
  {
    id: "2",
    nome_paciente: "Roberto S. Mendes",
    tipo_sanguineo: "O-",
    data_pedido: "08 Out, 2023",
    estado: "em revisão",
  },
  {
    id: "3",
    nome_paciente: "Ana Beatriz Farias",
    tipo_sanguineo: "AB-",
    data_pedido: "25 Set, 2023",
    estado: "concluído",
  },
];
