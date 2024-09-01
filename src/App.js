import "./App.css";
import Home from "./pages/Home/index";
import axios from "axios";
import PostContext from "./context/PostContext";
import { useState, useEffect } from "react";

function App() {
  // состояние для хранения всех постов, загруженных с сервера.
  const [allPosts, setAllPosts] = useState([]);
  // состояние для хранения текущих постов, которые отображаются на странице.
  const [currentPosts, setCurrentPosts] = useState([]);
  // состояние для отслеживания состояния загрузки данных
  const [isloading, setIsLoading] = useState(true);
  // состояние для отслеживания ошибок при загрузке данных.
  const [error, setError] = useState(false);
  // состояние для отслеживания текущей страницы.
  const [page, setPage] = useState(1);

  const [isEdit, setIsEdit] = useState(false);

  const BASE_URL = "https://66ced69b901aab24841fc6d9.mockapi.io/";

  // async function getPost(id) {
  //   try {
  //     const data = await axios.get(`${BASE_URL}/tasks/${id}`);
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async function fetchPosts() {
    try {
      const data = await axios.get(`${BASE_URL}/tasks`);

      return data;
    } catch (error) {
      throw error;
    }
  }

  async function handleDelete(id) {
    try {
      const data = await axios.delete(`${BASE_URL}/tasks/${id}`);
      const updatePost = allPosts.filter((post) => {
        console.log(allPosts);
        return post.id !== id;
      });
      setAllPosts(updatePost);
      const startIndex = (page - 1) * 3;
      const endIndex = page * 3;
      const maxPage = Math.ceil(allPosts.length / 3);
      if (page > maxPage) {
        setPage(maxPage);
      } else {
        setCurrentPosts(updatePost.slice(startIndex, endIndex));
      }

      return data;
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }

  async function createPost(newPost) {
    try {
      const data = await axios.post(`${BASE_URL}/tasks`, newPost);
      setAllPosts((prevPosts) => [data.data, ...prevPosts]);
      const startIndex = (page - 1) * 3;
      const endIndex = page * 3;
      setCurrentPosts((prevPosts) =>
        [data.data, ...prevPosts].slice(startIndex, endIndex)
      );

      return data;
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }

  async function updatePost(id, newPost) {
    try {
      const data = await axios.put(`${BASE_URL}/tasks/${id}`, newPost);
      const updatePost = allPosts.map((post) => {
        return post.id === id ? (post = data.data) : post;
      });
      setAllPosts(updatePost);
      const startIndex = (page - 1) * 3;
      const endIndex = page * 3;
      setCurrentPosts(updatePost.slice(startIndex, endIndex));

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  // async function getCurrentPosts() {
  //   try {
  //     const new_url = new URL(`${BASE_URL}/tasks`);
  //     new_url.searchParams.append("completed", false);
  //     new_url.searchParams.append("page", 1);
  //     new_url.searchParams.append("limit", 3);

  //     const data = await axios.get(new_url);
  //     setCurrentPosts(data.data);
  //     setIsLoading(false);
  //     return data;
  //   } catch (error) {
  //     setError(error);
  //     console.log(error);
  //   }
  // }

  function loadMorePosts() {
    const maxPage = Math.ceil(allPosts.length / 3);
    const startIndex = page * 3;
    const endIndex = (page + 1) * 3;
    if (page < maxPage) {
      setCurrentPosts(allPosts.slice(startIndex, endIndex));
      setPage(page + 1);
    } else {
      setPage(1);
      setCurrentPosts(allPosts.slice(0, 3));
    }

    // Увеличивает значение page, чтобы перейти на следующую страницу.
    // ○ Вычисляет новые индексы для следующей порции постов.
    // ○ Обновляет состояние currentPosts, чтобы отображать следующие 10 постов.
  }

  useEffect(() => {
    fetchPosts()
      .then((respose) => {
        setAllPosts(respose.data);
        setCurrentPosts(respose.data.slice(0, 3));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setIsLoading(false);
      });
    // getPost("8");
    // getAllPosts();
    // deletePost();
    // createPost({ completed: true, content: "learn react" });
    // deletePost("6");
    // updatePost("9", { title: 1, completed: false });>
  }, []);

  return (
    <PostContext.Provider
      value={{
        createPost,
        allPosts,
        currentPosts,
        loadMorePosts,
        handleDelete,
        isloading,
        error,
        updatePost,
        isEdit,
        setIsEdit,
      }}
    >
      <Home />
    </PostContext.Provider>
  );
}

export default App;
