import axios from "axios";

const API = "http://localhost:8080/api/books";

const getToken = () => {
  return localStorage.getItem("token");
};

// ================= GET BOOKS =================
export const getBooks = () => {
  return axios.get(API);
};

// ================= ADD BOOK =================
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

// ================= UPDATE BOOK =================
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

// ================= DELETE BOOK =================
export const deleteBook = (id) => {
  return axios.delete(
    `${API}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
};

// ================= BORROW BOOK =================
export const borrowBook =
(id)=>{

return axios.put(

`${API}/borrow/${id}`,

{},

{
headers:{
Authorization:
`Bearer ${getToken()}`
}
}

);

};

// ================= RETURN BOOK =================
export const returnBook =
(id)=>{

return axios.put(

`${API}/return/${id}`,

{},

{
headers:{
Authorization:
`Bearer ${getToken()}`
}
}

);

};

// ================= ADMIN DASHBOARD =================
export const getDashboard = () => {
  return axios.get(
    `${API}/dashboard`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
};
export const getAnalytics = () =>
  axios.get("http://localhost:8080/api/books/analytics", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });