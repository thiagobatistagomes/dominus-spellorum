export interface FeiticoDominadoResponseDTO {
  name: string;
  description: string;
  comentario: string;
}

export interface FeiticoAAprenderResponseDTO {
  name: string;
  description: string;
  comentario: string;
  status: 'Pendente' | 'Em progresso';
  prioridade: 'Alta' | 'Média' | 'Baixa';
}

