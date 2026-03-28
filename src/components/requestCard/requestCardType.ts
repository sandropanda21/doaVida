export type RequestStatus = "ativo" | "em revisão" | "concluído";

export interface BloodRequest {
  id: string;
  nome_paciente: string;
  tipo_sanguineo: string;
  data_pedido: string;
  estado: RequestStatus;
}
