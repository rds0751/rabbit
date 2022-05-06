import  React, { useState, useEffect } from "react";
import * as moment from "moment";
import Paper from "@mui/material/Paper";
import "../../assets/styles/Leader.css";
import banner from "../../assets/images/Banner.png";
import {useLocation} from 'react-router-dom';
import parse from "html-react-parser";
export default function BlogDetail() {
    const location = useLocation();
    const from = location?.state;
console.log(from,"location")
  return (
    <div>

   

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
            src={from?.data?.coverUrl}
          ></img>
        </div>
        <div style={{padding:"32px"}}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="blog-title">{from?.data?.postTitle}</p>
          <p className="blog-date"> {moment(from?.data?.addedOn).format("DD MMMM YYYY")}
</p>
        </div>
        <div>
          <p className="blog-content">
          {parse(from?.data?.content)}
          </p>
        </div>

        </div>
      </Paper>
  

 
    
    </div>
  );
}
