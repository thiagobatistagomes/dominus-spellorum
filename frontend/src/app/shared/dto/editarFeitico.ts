export interface EditarFeiticoDominadoDTO {
  comentario?: string;
}

export interface EditarFeiticoAAprenderDTO {
  comentario?: string;
  status?: 'Pendente' | 'Em progresso';
  prioridade?: 'Alta' | 'Média' | 'Baixa';
}
