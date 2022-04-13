import * as React from "react";
import Paper from "@mui/material/Paper";
import "../../assets/styles/Leader.css";

export default function ComplexGrid() {
  return (
    <div>
      <div className="hero-image">
        <div className="hero-text">
          <p>Blogs</p>
        </div>
      </div>
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          marginTop: "81px",
          maxWidth: 800,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>What is NFT?</p>
          <p>2 March 2021</p>
        </div>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididuntLorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in
          </p>
        </div>
        <button style={{ border: "none", background: "none" }}>
          Read more
        </button>
      </Paper>
    </div>
  );
}
