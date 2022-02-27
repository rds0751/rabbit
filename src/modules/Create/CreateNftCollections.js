import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
import { getCategories } from "../../services/UserMicroService";

const Button = styled.button``;

function CreateNftCollections(props) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state);
  const [Categories, setCategories] = useState([]);
  const [DesLength, setDesLength] = useState(0);
  const name = useRef("");
  const description = useRef("");
  const imageUrl = useRef("");
  const coverUrl = useRef("");
  const blockchain = useRef("Ethereum");
  const categoryId = useRef("");
  const hiddenFileInputImage = useRef(null);
  const hiddenFileInputBanner = useRef(null);
  const handleClickImage = (event) => {
    hiddenFileInputImage.current.click();
  };
  const handleClickBanner = (event) => {
    hiddenFileInputBanner.current.click();
  };
  useEffect(() => {
    getCategories((res) => {
      setCategories(res.responseData);
    });
  }, []);
  const [desLEngth, setDesLEngth] = useState(0);

  const handleChangeImage = async (event) => {
    const fileUploaded = event.target.files[0];
    alert("onchage");
    // props.handleFileImage(fileUploaded);
    console.log(user.loggedInUser._id, "<<<");

    let formData = new FormData();
    formData.append("folderName", "collections");
    formData.append("createdBy", `${user.loggedInUser._id}`);
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
    formData.append("createdBy", `${user.loggedInUser._id}`);
    formData.append("attachment", fileUploaded);

    const res = await fetch(`${BASE_URL2}/api/v1/upload-documents`, {
      method: httpConstants.METHOD_TYPE.POST,
      body: formData,
    });
    const result = await res.json();
    if (result.success) coverUrl.current = result.responseData;
    console.log(result, ">>> banner upload");
  };
  const onChangeDes = () => {
    setDesLength(description.current.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // e.preventDefault();
    if (
      imageUrl.current == "" ||
      name.current == "" ||
      description.current == "" ||
      blockchain.current == ""
    ) {
      console.log(
        imageUrl.current,
        name.current,
        description.current,
        blockchain.current,
        "<<<"
      );
      console.log("require");
      toast.error("Fill the required field");
      return null;
    }

    console.log("here");
    const data = {
      coverUrl: coverUrl.current,
      imageUrl: imageUrl.current,
      name: name.current,
      description: description.current,
      blockchain: blockchain.current,
      addedBy: user.loggedInUser._id,
      // categoryId:categoryId.current,
    };
    const result = await createCollection(data);
    if (result.success) {
      toast.success("Collection created");
      navigate("collections-tile");
    } else toast.error(result.message);
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
            {/* <div className="input-outer"> */}
            <input
              type="file"
              placeholder="Write your name"
              name="file"
              ref={hiddenFileInputImage}
              className="fileInput  input-box-1"
              onChange={handleChangeImage}
              style={{ border: "4px solid red" }}
            />
            {/* </div> */}
            <div className="upload-image-upper">
              <img
                className="image-upload"
                src={imageUrl.current == "" ? Image : imageUrl.current}
              />

              {/* </Button> */}
              <div className="drag-and-drop">
                Drag & Drop or
                <span className="drag-and-drop-browse"> Browse</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="form-label">Upload Banner*</div>
          <div className="upload-file-outer bannerwidth">
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
              <img
                className="image-upload"
                src={coverUrl.current == "" ? Image : coverUrl.current}
                // style={{ display: coverUrl.current == "" ? "none" : "block" }}
              />
              <div className="drag-and-drop">
                Drag & Drop or
                <span className="drag-and-drop-browse"> Browse</span>
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
                onChange={(e) => {
                  description.current = e.target.value;
                  onChangeDes();
                }}
              ></textarea>
              <span>{DesLength} of 1000 characters used</span>
            </div>
            <div>
              <div className="form-label category-label">Category</div>
              {/* <Link>Create</Link> */}
              <select
                className="input-box-1"
                onChange={(e) => (categoryId.current = e.target.value)}
              >
                <option>Select Category</option>
                {Categories.map((item, key) => {
                  return <option value={item?._id}>{item?.name}</option>;
                })}
                {/* <option>2</option>
                <option>3</option>
                <option>4</option> */}
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
                    <option value="">Select Category</option>
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
        autoClose={5000}
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
