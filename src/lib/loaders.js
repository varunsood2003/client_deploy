import axios from "axios";
import { defer } from "react-router-dom";

axios.defaults.withCredentials = true;

export const singlePageLoader = async ({ request, params }) => {
  const res = await axios.get(`http://localhost:8800/api/posts/${params.id}`);
  return res.data;
};

export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const postPromise = axios.get(`http://localhost:8800/api/posts?${query}`);
  return defer({
    postResponse: postPromise,
  });
};

export const profilePageLoader = async () => {
  const postPromise = axios.get("http://localhost:8800/api/users/profilePosts");
  const chatPromise = axios.get("http://localhost:8800/api/chats");
  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise
  });
};
