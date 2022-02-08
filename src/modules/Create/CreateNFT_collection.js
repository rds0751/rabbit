import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Image from "../../assets/images/img-format.png";

const Button = styled.button``;

function CreateNFT_collection(Collection) {
  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    Collection.handleFile(fileUploaded);
  };

  return (
    <>
     <div className="col-sm-6 col-12 col-xs-12 offset-sm-2">
        <div className="top-heading">
          <h4 className="create-nft-font">Create your collection</h4>
        </div>
        <div className="create-nft-font1">
          <label for="email" className="form-label mt-3">
            Upload File*
          </label>
          <div className="card collection-nft-card">
            <Button
              onClick={handleClick}
              style={{ border: "none", backgroundColor: "#fff" }}
            >
              <img
                src={Image}
                style={{ width: "100px", color: "#366EEF", marginTop: "3em" }}
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
            <span
              className="text-dark text-center mt-2 font-13"
              style={{ flexDirection: "row" }}
            >
              Drag & Drop or
              <Link to="/" style={{ textDecoration: "none" }}>
                Browse
              </Link>
            </span>
          </div>
        </div>
        <div className="create-nft-font1">
          <label for="email" className="form-label mt-3">
            Upload Banner*
          </label>
          <div className="card banner-nft-card p-5 bannermob">
            <Button
              onClick={handleClick}
              style={{ border: "none", backgroundColor: "#fff" }}
            >
              <img src={Image} style={{ width: "100px", color: "#366EEF" }} />
            </Button>
            <input
              type="file"
              className="form-control"
              style={{ display: "none" }}
              ref={hiddenFileInput}
              onChange={handleChange}
            />
            <span className="text-dark font-13 text-center mt-2">
              Drag & Drop or
              <Link to="/" style={{ textDecoration: "none" }}>
                Browse
              </Link>
            </span>
          </div>
        </div>
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
                Category
              </label>
              {/* <Link>Create</Link> */}
              <select className="form-select mt-3 font-13 text-secondary">
                <option className="text-secondary">Select Category</option>
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
    </>
  );
}

export default CreateNFT_collection;
