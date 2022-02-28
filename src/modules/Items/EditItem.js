import React, { useState, useEffect } from "react";
import image from "../../assets/images/1.jpg";
import NftNoBid from "../../assets/images/NftNoBid.png";
import share from "../../assets/images/share.png";
import leftArrow from "../../assets/images/leftArrow.png";
import UpArrow from "../../assets/images/UpArrow.png";
import info from "../../assets/images/info.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link, useParams } from "react-router-dom";
// import { Button } from "@mui/material";
import "../../assets/styles/Leader.css";
import ethereum from "../../assets/images/ethereum.svg";

import styled from "styled-components";
import { getNft } from "../../services/webappMicroservice";
import { getCategories } from "../../services/UserMicroService";
import {
  // getCollection,
  getCollectionBySingleUser,
} from "../../services/contentServices";
const Button = styled.button``;

function EditItem(Collection) {
  const { id } = useParams();
  // const [, set] = useState(second)
  const [Categories, setCategories] = useState([]);
  const [CollectionData, setCollectionData] = useState([]);
  const [desLength, setDesLength] = useState(0);
  const [editForm, setEditForm] = useState({
    files: "",
    name: "",
    description: "",
    collectionId: "",
    blockchain: "",
    _id: "",
  });
  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  // yasah

  // const [first, setfirst] = useState(second);
  useEffect(async () => {
    console.log(id, "<<<<<params");
    getNft(id, (response) => {
      // const { responseData } = response;
      console.log(response, "<<<< response of nft");

      setEditForm({
        name: response.name,
        blockchain: response.blockchain,
        description: response.description,
        collectionId: response.collectionId,
        files: response.cdnUrl,
        _id: response._id,
      });
      // console.log("----------", this.state.responseData);
    });
    // getCategories((res) => {
    //   setCategories(res.responseData);
    // });
    const collections = await getCollectionBySingleUser();
    setCollectionData(collections);
  }, []);

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded, "<<<<<");
    setEditForm({ ...editForm, files: fileUploaded });
    // Collection.handleFile(fileUploaded);
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    if (name == "description") {
      setDesLength(value.length);
    }
    setEditForm({ ...editForm, [name]: value });
  };
  // const handleDesLength = () => {
  //   const { description } = editForm;

  // };
  const onSubmit = () => {
    console.log(editForm, "<<<< This is edit form");
  };
  return (
    <div className="editItem">
      <div className="edititems">
        <img src={leftArrow} alt="" />
        Edit Item
      </div>

      <div className="UploadFile row">
        <label
          for="profilepic"
          className="form-label mt-3"
          style={{
            fontSize: 14,
            fontWeight: "bold",
            marginBottom: "0.5rem",
            marginTop: "1rem",
          }}
        >
          Upload File*
        </label>
        <div
          className="card collection-nft-card"
          style={{ border: "none", alignItems: "center", marginLeft: "1.6rem" }}
        >
          <img
            src={editForm.files}
            style={{
              border: "none",
              height: "9rem",
              width: "10rem",
              borderRadius: "1.2rem",
            }}
          />

          <input
            type="file"
            className="form-control"
            placeholder="Write your name"
            name="files"
            style={{ display: "none" }}
            ref={hiddenFileInput}
            onChange={handleChange}
          />
          <div
            onClick={handleClick}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={UpArrow}
              alt=""
              style={{ width: "1.2rem", height: "1.2rem", marginTop: "0.5rem" }}
            />
            <div style={{ fontSize: "0.7rem", color: "#366eff" }}>
              Replace File
            </div>
          </div>
        </div>

        {/* <div className=" row">
      <form id="addsound" method="post" enctype="multipart/form-data" action="">
          <div className="UploadFile">
        <div className="form-group row control-labelmob">
          <label
            for="profilepic"
            className=" control-label"
            style={{ fontSize: 14, fontWeight: "bold", marginBottom: "0.5rem", marginTop :"1rem" }}
          >
            Upload File*{" "}
            
          </label>
          <div className="" style={{padding:"0px"}}>
            <input
              type="image"
              name="thumb"
              id="thumb"
              // onchange="return check_file_size()"
              className="form-control"
              src={image}
              style={{
               
                border:"none",
                height: "9rem",
    width:"10rem",
    borderRadius: "1.2rem"
              }}
              placeholder="Drag & Drop or Browse"
            />
          </div>
        </div> */}

        {/* <img src={UpArrow} alt="" style={{width:"1.2rem", height:"1.2rem", marginTop:"0.5rem"}} />
            <div style={{fontSize:"0.7rem", color:"#366eff"}}>Replace File</div> */}
      </div>
      <form id="addsound" method="post" enctype="multipart/form-data" action="">
        <div className="form-group row">
          <label
            for="fname"
            className=" control-label"
            style={{
              fontSize: 14,
              fontWeight: "bold",
              marginTop: "0.5rem",
              marginBottom: "0.3rem",
            }}
          >
            Name*:
          </label>
          <div className="">
            <input
              type="text"
              id="sound_name"
              required
              className="form-control"
              name="name"
              value={editForm.name}
              onChange={(e) => handleForm(e)}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            for="fname"
            className=" control-label"
            style={{
              fontSize: 14,
              fontWeight: "bold",
              marginTop: "0.5rem",
              marginBottom: "0.3rem",
            }}
          >
            Description*
          </label>
          <div className="">
            <textarea
              type="text"
              id="sound_name"
              required
              className="form-control"
              rows="3"
              name="description"
              value={editForm.description}
              onChange={(e) => {
                if (desLength < 1000) {
                  handleForm(e);
                  // handleDesLength();
                }
              }}
            />
            <span className="text-secondary font-13">
              {desLength} of 1000 characters used
            </span>
          </div>
        </div>
        {/* <div className="form-group">
  <label for="comment">Comment:</label>
  <textarea className="form-control" rows="5" id="comment"></textarea>
</div> */}
        <div>
          <label
            for="fname"
            className=" control-label"
            style={{
              fontSize: 14,
              fontWeight: "bold",
              marginTop: "0.5rem",
              marginBottom: "0.3rem",
            }}
          >
            Collection
          </label>
          <div className="block-chain-container">
            {/* <div>
              <img src={ethereum} height="32px" />
            </div> */}
            <div className="block-chain-right">
              <select
                name="collectionId"
                value={editForm.collectionId}
                className="input-box-1 rm-border"
                onChange={(e) => editForm(e)}
              >
                <option value="">Select Collection</option>
                {CollectionData.map((item) => (
                  <option className="option" value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* {CollectionData.map((item) => (
                <option className="option" value={item._id}>
                  {item.name}
                </option>
              ))} */}
        <div>
          <div className="form-label">Blockchain*</div>
          <div className="block-chain-container">
            <div>
              <img src={ethereum} height="32px" />
            </div>
            <div className="block-chain-right">
              <select
                name="blockchain"
                value={editForm.blockchain}
                className="input-box-1 rm-border"
                onChange={(e) => editForm(e)}
              >
                <option value="">Select Blockchain</option>
                <option selected value="Ethereum">
                  Ethereum
                </option>
              </select>
            </div>
          </div>
        </div>
        {/* --- */}
        {/* <div>
          <div className="form-label category-label">Category</div>
       
          <select className="input-box-1" onChange={(e) => {}}>
            <option>Select Category</option>
            {Categories.map((item, key) => {
              return <option value={item?._id}>{item?.name}</option>;
            })}
           </select>
        </div> */}

        {/* 0----- */}
        {/* <div className="form-group row">
          <label
            for="fname"
            className=" control-label"
            style={{
              fontSize: 14,
              fontWeight: "bold",
              marginTop: "0.5rem",
              marginBottom: "0.3rem",
            }}
          >
            Blockchain
          </label>
          <div className="">
            <input
              type="text"
              name="sound_name"
              id="sound_name"
              required
              className="form-control"
              style={{ backgroundColor: "#f3f3f3" }}
            />
          </div>
        </div> */}
      </form>
      <div className="done">
        <button
          onClick={onSubmit}
          type="button"
          className="btn btn-secondary"
          style={{ width: "30%", backgroundColor: "#366eef" }}
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default EditItem;
