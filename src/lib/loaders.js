import axios from "axios";
import { defer } from "react-router-dom";

axios.defaults.withCredentials = true;

export const singlePageLoader = async ({ request, params }) => {
  const res = await axios.get(`https://api-deploy-j18f.onrender.com/api/posts/${params.id}`);
  return res.data;
};

export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const postPromise = axios.get(`https://api-deploy-j18f.onrender.com/api/posts?${query}`);
  return defer({
    postResponse: postPromise,
  });
};

export const profilePageLoader = async () => {
  const postPromise = axios.get("https://api-deploy-j18f.onrender.com/api/users/profilePosts");
  const chatPromise = axios.get("https://api-deploy-j18f.onrender.com/api/chats");
  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise
  });
};
