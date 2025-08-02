export interface Produto {
  _id: string;
  nome: string;
  descricao?: string;
  imagem: string;
  nota: number;
  precoBase: number;
  precoPromocional: number;
  contato:string;
  especificacoes: {
    destaque: string;
    [key: string]: string;
  };
}
