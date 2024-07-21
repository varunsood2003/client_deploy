import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

function ProfileUpdatePage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { currentUser, updateUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
    try {
      const res = await axios.put(
        `https://api-deploy-j18f.onrender.com/api/users/${currentUser.id}`,
        {
          username,
          email,
          password,
          avatar: avatar[0],
        },
        {
          withCredentials: true,
        }
      );
      updateUser(res.data);
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              defaultValue={currentUser.username}
              id="username"
              name="username"
              type="text"
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              defaultValue={currentUser.email}
              id="email"
              name="email"
              type="email"
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={avatar[0] || currentUser.avatar || "/noavatar.png"}
          alt=""
          className="avatar"
        />
        <UploadWidget
          uwConfig={{
            cloudName: "di8gj8opv",
            uploadPreset: "varun_upload",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
