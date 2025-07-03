export interface AdicionarDominadoDTO {
  name: string;
  comentario?: string;
}

export interface AdicionarAAprenderDTO {
  name: string;
  comentario?: string;
  status: 'pendente' | 'em progresso';
  prioridade: 'alta' | 'média' | 'baixa';
}
