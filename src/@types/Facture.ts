import Article from "./Article";

export default interface Facture {
  _id?: string;
  reference: string;
  societe: string;
  date: Date;
  categorie: string;
  fournisseur: string;
  quantite: number;
  prix: number;
  etat: string;
  articles: [
    {
      _id: string;
      sub_article: Array<Article>;
    }
  ];
}
