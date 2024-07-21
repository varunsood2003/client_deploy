import React, { Suspense, useContext } from "react";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import { useNavigate,Link ,useLoaderData,Await} from "react-router-dom";
import "./profilePage.scss";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";


function ProfilePage() {
  const navigate = useNavigate();
  const data = useLoaderData();
  const { currentUser, updateUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await axios.post("https://api-deploy-j18f.onrender.com/api/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.error("Failed to logout", err);
    }
  };
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
            <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser?.avatar || "/noavatar.png"}
                alt="User Avatar"
              />
            </span>
            <span>
              Username: <b>{currentUser?.username || "John Doe"}</b>
            </span>
            <span>
              E-mail: <b>{currentUser?.email || "john@gmail.com"}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to={"/add"}>
            <button>Create New Post</button>
            </Link>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={data.postResponse} errorElement={<p>Error Loading</p>}>
              {(postResponse) => <List posts={postResponse.data.userPosts}/>}
            </Await>
          </Suspense>
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={data.postResponse} errorElement={<p>Error Loading</p>}>
              {(postResponse) => <List posts={postResponse.data.savedPosts}/>}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
        <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={data.chatResponse} errorElement={<p>Error Loading</p>}>
              {(chatResponse) => <Chat chats={chatResponse.data}/>}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
