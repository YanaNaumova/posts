import { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home/index";
import axios from "axios";

function App() {
  const BASE_URL = "https://66ced69b901aab24841fc6d9.mockapi.io/";

  async function getPost(id) {
    try {
      const data = await axios.get(`${BASE_URL}/tasks/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllPosts() {
    try {
      const data = axios.get(`${BASE_URL}/tasks`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function deletePost(id) {
    try {
      const data = await axios.delete(`${BASE_URL}/tasks/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function createPost(newPost) {
    try {
      const data = await axios.post(`${BASE_URL}/tasks`, newPost);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function updatePost(id) {
    try {
      const data = await axios.put(`${BASE_URL}/tasks/${id}`, {
        completed: false,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // getPost("8");
    // getAllPosts();
    // deletePost();
    // createPost({ completed: true, content: "learn react" });
    // deletePost("6");
    // updatePost("9", { title: 1, completed: false });>
  }, []);

  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
