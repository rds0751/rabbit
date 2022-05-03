import  React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import "../../assets/styles/Leader.css";
import banner from "../../assets/images/Banner.png";
import {getBlogs} from "../../services/clientConfigMicroService"
export default function ComplexGrid() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    async function fetchData() {
      await getBlogs().then((res) => setBlogs(res));
      console.log("test11", blogs)
    }
    fetchData();    
  }, []);

  return (
    <div>
      <div className="hero-image">
        <div className="hero-text">
          <p>Blogs</p>
        </div>
      </div>
      <Paper
        sx={{
          margin: "auto",
          marginTop: "81px",
          maxWidth: 960,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <div>
          <img
            style={{
              width: "-webkit-fill-available",
              height: "240px",
              objectFit: "fill",
            }}
            src={banner}
          ></img>
        </div>
      </Paper>
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 960,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="blog-title">What is NFT?</p>
          <p className="blog-date">2 March 2021</p>
        </div>
        <div>
          <p className="blog-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididuntLorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in
          </p>
        </div>
        <button className="blog-read">
          Read more
        </button>
      </Paper>
    </div>
  );
}
