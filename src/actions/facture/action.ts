import axios from "axios";
import Facture from "../../@types/Facture";
import { v4 as uuidv4 } from "uuid";

export function getFactures(
  query: { reference?: string; date?: string } | null,
  callback: (data: Facture[]) => void
) {
  axios
    .get("http://localhost:5000/facture", {
      params: query,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then(({ data }) => {
      callback(data);
    })
    .catch((event) => {
      console.error(event);
    });
}

export function getFacture(
  { id }: { id?: string },
  callback: (data: Facture) => void
) {
  axios
    .get("http://localhost:5000/facture/" + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then(({ data }) => {
      callback(data);
    })
    .catch((event) => {
      console.error(event);
    });
}

export function addFacture(facture: any, callback: () => void) {
  //var fn = [];
  const qc = facture.articles.map((a: any) => {
 //   const prixut = a.prixut / a.qc;
    return {
      _id: `${uuidv4()}`,
      sub_article: Array.from({ length: a.qc }, (_, i) => i).map((l, i) => {
        return {
          _id: `${uuidv4()}${i}`,
          designation: a.designation,
          marque: a.marque,
          prixut: a.prixut,
          qc: 1,
        };
      }),
    };
  });

  const final = Array.prototype.concat.apply([], [...qc]);
  facture.articles = final;

  axios
    .post("http://localhost:5000/facture", facture)
    .then(() => {
      callback();
    })
    .catch((event) => {
      console.error(event);
    });
}

export function editFacture(
  factureId: string,
  facture: Facture,
  callback: () => void
) {
  axios
    .put(`http://localhost:5000/facture/${factureId}`, facture)
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error(error);
    });
}

export function deleteFacture(facture: Facture, callback: () => void) {
  axios
    .delete(`http://localhost:5000/facture/${facture._id}`)
    .then(() => {
      callback();
    })
    .catch((event) => {
      console.error(event);
    });
}
