import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
// import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Image from "../../assets/images/img-format.png";
import ethereum from "../../assets/images/ehereum.png";

import { httpConstants } from "../../constants";
import { BASE_URL2 } from "../../reducers/Constants";
import { createCollection } from "../../services/createServices";
import "../../assets/styles/collection.css";
const Button = styled.button``;

function CreateNftCollections(props) {
  const { user } = useSelector((state) => state);

  const name = useRef("");
  const description = useRef("");
  const imageUrl = useRef("");
  const coverUrl = useRef("");
  const blockchain = useRef("");
  const categoryId = useRef("");

  const hiddenFileInputImage = useRef(null);
  const hiddenFileInputBanner = useRef(null);

  const handleClickImage = (event) => {
    hiddenFileInputImage.current.click();
  };

  const handleClickBanner = (event) => {
    hiddenFileInputBanner.current.click();
  };

  const handleChangeImage = async (event) => {
    const fileUploaded = event.target.files[0];
    // props.handleFileImage(fileUploaded);

    let formData = new FormData();
    formData.append("folderName", "collections");
    formData.append("createdBy", `${user.addUserData._id}`);
    formData.append("attachment", fileUploaded);

    const res = await fetch(`${BASE_URL2}/api/v1/upload-documents`, {
      method: httpConstants.METHOD_TYPE.POST,
      body: formData,
    });
    const result = await res.json();
    if (result.success) imageUrl.current = result.responseData;
    console.log(result, ">>> image upload");
  };

  const handleChangeBanner = async (event) => {
    const fileUploaded = event.target.files[0];
    // props.handleFileBanner(fileUploaded);

    let formData = new FormData();
    formData.append("folderName", "collections");
    formData.append("createdBy", `${user.addUserData._id}`);
    formData.append("attachment", fileUploaded);

    const res = await fetch(`${BASE_URL2}/api/v1/upload-documents`, {
      method: httpConstants.METHOD_TYPE.POST,
      body: formData,
    });
    const result = await res.json();
    if (result.success) coverUrl.current = result.responseData;
    console.log(result, ">>> banner upload");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      coverUrl: coverUrl.current,
      imageUrl: imageUrl.current,
      name: name.current,
      description: description.current,
      blockchain: blockchain.current,
      addedBy: user.addUserData._id,
      // categoryId:categoryId.current,
    };
    const result = await createCollection(data);
    if (result.success) toast.success("Collection created");
    else toast.error(result.message);
    console.log(result, ">>> submit nftCollection");
  };

  return (
    <>
      <div className="collection-outer">
        <div className="collection-heading">Create your collection</div>
        <div className="collection-form-outer">
          <div className="form-label">Upload Logo*</div>
          <div className="upload-file-outer">
            {/* <Button onClick={handleClickImage}> */}
            <input
              type="file"
              placeholder="Write your name"
              name="email"
              ref={hiddenFileInputImage}
              className="fileInput  input-box-1"
              onChange={handleChangeImage}
            />
            <div className="upload-image-upper">
              <img className="image-upload" src={Image} />

              {/* </Button> */}
              <div className="drag-and-drop">
                Drag & Drop or
                <Link to="/">Browse</Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="form-label">Upload Banner*</div>
          <div className="upload-image-banner">
            {/* <Button onClick={handleClickImage}> */}
            <input
              type="file"
              placeholder="Write your name"
              name="email"
              ref={hiddenFileInputBanner}
              className="fileInput  input-box-1"
              onChange={handleChangeBanner}
            />
            <div className="upload-image-upper">
              <img className="image-upload" src={Image} />
              <div className="drag-and-drop">
                Drag & Drop or
                <Link to="/">Browse</Link>
              </div>
            </div>
            {/* </Button> */}
          </div>
        </div>
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <div className="form-label">Name*</div>
              <input
                type="name"
                name="email"
                className="input-box-1"
                placeholder="Write your name"
                onChange={(e) => (name.current = e.target.value)}
              />
            </div>
            <div className="">
              <div className="form-label">Description*</div>
              <textarea
                rows="4"
                name="text"
                placeholder="Write description"
                className="input-box-1"
                onChange={(e) => (description.current = e.target.value)}
              ></textarea>
              <span>0 of 1000 characters used</span>
            </div>
            <div>
              <div className="form-label category-label">Category</div>
              {/* <Link>Create</Link> */}
              <select className="input-box-1">
                <option>Select Category</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
            <div>
             
              <div className="form-label">Blockchain*</div>
              <div className="block-chain-container">
                <div>
                  <img src={ethereum} height="32px" />
                </div>
                <div className="block-chain-right">
                  <select
                    className="input-box-1 rm-border"
                    onChange={(e) => (blockchain.current = e.target.value)}
                  > 
                    <option>Select Category</option>
                    <option selected value="Ethereum">
                      Ethereum
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <button type="submit" className="submit-button">
              Create
            </button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default CreateNftCollections;
