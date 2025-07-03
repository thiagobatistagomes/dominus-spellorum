export interface FeiticoDominadoResponseDTO {
  name: string;
  description: string;
  comentario: string;
}

export interface FeiticoAAprenderResponseDTO {
  name: string;
  description: string;
  comentario: string;
  status: 'pendente' | 'em progresso';
  prioridade: 'alta' | 'média' | 'baixa';
}

