import axios from "axios";
import Article from "../../@types/Article";

export function getArticles(
  query: { designation?: string; marque?: string } | null,
  callback: (data: Article[]) => void
) {
  axios
    .get("http://localhost:5000/article", {
      params: query,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then(({ data }) => {
      callback(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getArticle(id: string, callback: (data: Article) => void) {
  axios
    .get("http://localhost:5000/article/" + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then(({ data }) => {
      console.log(data);
      callback(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

export function addArticle(article: Article, callback: () => void) {
  axios
    .post("http://localhost:5000/article", article)
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error(error);
    });
}

export function editedArticle(
  article: Article,
  id: string,
  callback: () => void
) {
  axios
    .patch(`http://localhost:5000/facture/${id}/${article._id}`, article)
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error(error);
    });
}

export function deleteArticle(article: Article, callback: () => void) {
  axios
    .delete(`http://localhost:5000/article/${article._id}`)
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error(error);
    });
}
