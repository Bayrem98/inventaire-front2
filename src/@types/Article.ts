export default interface Article {
  _id?: string;
  designation: string;
  marque: string;
  numserie?: string;
  observation?: string;
  code?: string;
  affectation?: string;
  prixut: number;
  qc: number;
  qi?: number;
  ecart?: number;
}
