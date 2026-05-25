import axios from "axios";

const API = "http://localhost:8080/api/books";

// GET JWT TOKEN

const getToken = () => {

  return localStorage.getItem("token");

};

// PUBLIC

export const getBooks = () => {

  return axios.get(API);

  
};
export const borrowBook = (id, userId) =>
  axios.put(`${API}/borrow/${id}`, { userId });

export const returnBook = (id) =>
  axios.put(`${API}/return/${id}`);
// ADD BOOK

export const addBook = (data) => {

  return axios.post(
    API,
    data,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

};

// UPDATE BOOK

export const updateBook = (id, data) => {

  return axios.put(
    `${API}/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

};

// DELETE BOOK

export const deleteBook = (id) => {
  if (!id) {
    console.error("deleteBook called without id");
    return;
  }

  return axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};