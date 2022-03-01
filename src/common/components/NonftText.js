import React from "react";

function NonftText({ text }) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: "1.2rem",
        fontFamily: "poppins-medium",
      }}
    >
      <div>{text} </div>
    </div>
  );
}

export default NonftText;
