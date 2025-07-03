export interface EditarFeiticoDominadoDTO {
  comentario?: string;
}

export interface EditarFeiticoAAprenderDTO {
  comentario?: string;
  status?: 'pendente' | 'em progresso';
  prioridade?: 'alta' | 'média' | 'baixa';
}
