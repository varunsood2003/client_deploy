import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";

function HomePage() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Your Dream Place</h1>
          <p>
            Welcome to HouseHunt, where finding your perfect property is a
            breeze. Use our advanced filters to customize your search based on
            your unique requirements—whether it's the ideal neighborhood,
            specific amenities, or your budget range. Plus, connect and chat
            with other users in real-time to share insights, ask questions, and
            make informed decisions. Start your journey to a new home with HouseHunt today!
          </p>
          <SearchBar />
          <div className="boxes">
            {/* <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Property Ready</h2>
            </div> */}
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.svg" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
