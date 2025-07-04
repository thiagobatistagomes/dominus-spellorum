export interface AdicionarDominadoDTO {
  name: string;
  comentario?: string;
}

export interface AdicionarAAprenderDTO {
  name: string;
  comentario?: string;
  status: 'Pendente' | 'Em progresso';
  prioridade: 'Alta' | 'Média' | 'Baixa';
}
