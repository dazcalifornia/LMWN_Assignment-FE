import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const API_URL = "http://localhost:9870/fetchData";
  // const JSON_SERVER = "http://localhost:9000/trips"

  //Fetch Data Part
  const [tripsData, setTripsData] = useState([]);

  useEffect(() => {
    Axios.get(API_URL)
      .then((response) => setTripsData(response.data))
      .catch((err) => console.log(err));
  }, []);

  //Search filter with api
  const [search, setSearch] = useState("");
  const searchWithAPI = async (e) => {
    try {
      e.preventDefault();
      const keyword = search;
      const Search_api = `http://localhost:9870/api${keyword}`;
      if (search !== "") {
        const searchWord = await Axios.get(Search_api, {
          params: keyword,
        }).then((res) => setTripsData(res.data));
        if (searchWord.data.length) {
          console.log("you search :" + searchWord.data);
        }
      }
    } catch (e) {
      if (e.response && e.response.data) {
        console.log("err:" + e.response.data.message);
      }
    }
  };
  //Read more & Less functon
  const ReadMore = ({ children, maxChar = 80 }) => {
    const text = children;
    const [isTruncated, setIsTruncated] = useState(true);
    const resultStr = isTruncated ? text.slice(0, maxChar) : text;
    const toggleIsTruncated = () => {
      setIsTruncated(!isTruncated);
    };
    return (
      <p className="card-text">
        {resultStr}
        <span onClick={toggleIsTruncated} className="show">
          {isTruncated ? " ...เพิ่มเติม" : " ...น้อยลง"}
        </span>
      </p>
    );
  };

  return (
    <div className="App">
      <h1 className="display3">เที่ยวไหนดี</h1>
      {/* Search from */}
      <from className="d-flex">
        <input
          type="text"
          className="form-control"
          placeholder="ค้นหาทริปดีๆ"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={searchWithAPI}
        >
          ค้นหา
        </button>
      </from>
      {tripsData.map((trips, index) => {
        return (
          <div className="container">
            <div className="item">
              <div key={index} className="card-body ">
                <a className=" wrapper card-title" href={trips.url}>
                  {trips.title}
                </a>
                <ReadMore className="text">{trips.description}</ReadMore>
                <p key={index}>
                  หมวดหมู่: {trips.tags + (index ? "," : "")}
                </p>
                {trips.photos.map((FetchPhoto, imgIndex) => {
                  return (
                    <img
                      className="card-img "
                      src={FetchPhoto}
                      key={imgIndex}
                      alt=""
                      width="150"
                      height="150"
                    />
                  );
                })}
                
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
