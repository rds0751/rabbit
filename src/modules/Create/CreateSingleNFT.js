import React from "react";
import { Link } from "react-router-dom";
import Image from "../../assets/images/img-format.png";
import styled from "styled-components";
// import "../../assets/styles/Leader.css"
// import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

const Button = styled.button``;

function CreateSingleNFT(Single) {
  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    Single.handleFile(fileUploaded);
  };

  return (
    <div>
      <div className="text-center mt-5">
        <h4 className="create-nft-font">Create NFT</h4>
      </div>
      <div className="row no-gutters create_singlemob">
        <div className="col-sm-3 col-12 col-xs-12 createnft_mob">
          <label for="email" className="form-label">
            Upload File*
          </label>
          <div className="card single-nft-card p-5">
            <Button
              onClick={handleClick}
              style={{ border: "none", backgroundColor: "#fff" }}
            >
              <img
                src={Image}
                style={{ width: "100px", marginTop: "3em", color: "#366EEF" }}
              />
            </Button>
            <input
              type="file"
              className="form-control"
              placeholder="Write your name"
              name="email"
              style={{ display: "none" }}
              ref={hiddenFileInput}
              onChange={handleChange}
            />
            <span className="text-dark font-13">
              Drag & Drop or
              <Link to="/" style={{ textDecoration: "none" }}>
                Browse
              </Link>
            </span>
          </div>
          <span className="text-secondary font-13">
            Supported(JPG,PNG,GIF,SVG,MP4, WEBM,WAV) Max size 40mb
          </span>
        </div>
        <div className="col-sm-5 col-12 col-xs-12">
          <div className="singlenft-form-box">
            <form className="suggestion-form  p-4 ">
              <div className="mb-3 mt-3">
                <label for="email" className="form-label input-heading">
                  Name*
                </label>
                <input type="name" className="form-control" name="email" />
              </div>
              <div className="mb-3 mt-3">
                <label for="comment" className="input-heading pb-2">
                  Description*
                </label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="text"
                  placeholder="Write description"
                ></textarea>
                <spna className="text-secondary font-13">
                  0 of 1000 characters used
                </spna>
              </div>
              <div className="mb-3 mt-3">
                <label for="collection" className="input-heading">
                  Collection
                  <Link
                    to="/create-nft"
                    className=" createbtn"
                    style={{
                      textDecoration: "none",
                      marginLeft: "23em",
                      fontWeight: "normal",
                    }}
                  >
                    Create
                  </Link>
                </label>
                {/* <Link>Create</Link> */}
                <select className="form-select mt-3 font-13 text-secondary">
                  <option>Select Category</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>
              <div className="mb-3 mt-3">
                <label for="email" className="form-label input-heading">
                  blockchain*
                </label>
                <input
                  type="name"
                  className="form-control bg-light"
                  placeholder="Ethereum"
                  id="ethereum"
                  name="email"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-4 w-100 disabled"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateSingleNFT;