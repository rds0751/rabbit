import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useDropzone } from "react-dropzone";
import Utils from "../../utility";
import BlockchainServices from "../../services/blockchainService";
import getCollection from "../../services/contentMicroservice";

import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
// import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Image from "../../assets/images/img-format.png";
import ethereum from "../../assets/images/ethereum.svg";

import { httpConstants } from "../../constants";
import { BASE_URL2 } from "../../reducers/Constants";
import { createCollection } from "../../services/createServices";
import "../../assets/styles/collection.css";
import { getCategories } from "../../services/UserMicroService";
import Bannerdrop from "./Bannerdrop";

const Button = styled.button``;

function CreateNftCollections(props) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state);
  // -------
  const [logoCdn, setlogoCdn] = useState("");
  const [bannerCdn, setbannerCdn] = useState("");
  const [logoipfs, setlogoipfs] = useState("");
  const [bannerIpfs, setbannerIpfs] = useState("");
  const [isLogoSelected, setisLogoSelected] = useState(false);
  const [isBannerSelected, setisBannerSelected] = useState(false);
  const [clickedOn, setClickedOn] = useState("");
  const [selectFile, setSelectFile] = useState("");
  const [checkReqField, setCheckReqField] = useState(false);

  // -------
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

  // ------------------drag and drop
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      console.log(getInputProps, "<<<<<<", getRootProps, "<<<props");
      let formData = new FormData();
      formData.append(
        "attachment",
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )[0]
      );

      (async () => {
        const [err, ipfsRes] = await Utils.parseResponse(
          getCollection.addIpfs(formData)
        );
        if (err || !ipfsRes.ipfsUrl) {
          toast.error("Unable to upload this image");
        } else {
          setlogoipfs(ipfsRes.ipfsUrl);
          setlogoCdn(ipfsRes.cdnUrl);
          setisLogoSelected(true);
        }
      })();

      // setLogoPresent(true);
    },
  });
  // -------------
  const [desLEngth, setDesLEngth] = useState(0);

  const handleChangeImage = async (event) => {
    const fileUploaded = event.target.files[0];
    // alert("onchage");
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
      logoCdn == "" ||
      bannerCdn == "" ||
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
      alert("154");
      toast.error("Fill the required field");
      return null;
    }
    alert("here");
    console.log("here");
    const data = {
      coverUrl: bannerCdn,
      imageUrl: logoCdn,
      name: name.current,
      description: description.current,
      blockchain: blockchain.current,
      addedBy: user.loggedInUser._id,
      // categoryId:categoryId.current,
    };
    const result = await createCollection(data);
    if (result.success) {
      toast.success("Collection created");
      navigate("/collections-tile");
    } else toast.error(result.message);
    console.log(result, ">>> submit nftCollection");
  };
  const checkReqFieldFun = () => {
    const currname = name.current;
    const currdes = description.current;
    const currblock = blockchain.current;

    if (
      currname.trim() == "" ||
      currdes.trim() == "" ||
      currblock.trim() == "" ||
      logoCdn == "" ||
      bannerCdn == ""
    ) {
      setCheckReqField(false);
    } else {
      setCheckReqField(true);
    }
  };

  return (
    <>
      <div className="main-container">
        <h1 className="fs-32 fw-b c-b title">Create your collection</h1>
        <p className="fs-16 fw-b c-b pt-3">Upload Logo*</p>
        <div>
          {!isLogoSelected && (
              <div
                onClick={() => setClickedOn("logo")}
                className="img-div"
                {...getRootProps()}
              >
                <input
                  {...getInputProps()}
                  name="logo"
                  onChange={() => setClickedOn("logo")}
                />
                  <img
                    src={logoCdn != "" ? logoCdn : Image}
                    alt="upload-icon"
                  />
                  <p className="fw-b" style={{color:"#366EEF"}}>Upload</p>
              </div>
          )}
          {isLogoSelected && (
            <div className="img-div" {...getRootProps()}>
              <input {...getInputProps()} name="logo" />
              <img
                src={logoCdn != "" ? logoCdn : Image}
                alt="upload-icon"
              />
              <p className="fw-b" style={{color:"#366EEF"}}>Upload</p>
            </div>
          )}
        </div>
        <div>
          {/* ---------------------------OLD BANNER UPLOAD----------------- */}
          <div className="fs-16 fw-b c-b pt-3 pb-3">Upload Banner*</div>

          <Bannerdrop
            bannerCdn={bannerCdn}
            setbannerCdn={setbannerCdn}
            bannerIpfs={bannerIpfs}
            setbannerIpfs={setbannerIpfs}
          />

          {/* ----------------------------- */}
        </div>
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <p className="fs-16 fw-b c-b pt-3">Name*</p>
              <input
                type="name"
                name="name"
                className="input-box-1"
                placeholder="Write your name"
                onChange={(e) => {
                  name.current = e.target.value;
                  checkReqFieldFun();
                }}
              />
            </div>
            <div>
              <p className="fs-16 fw-b c-b pt-3">Description*</p>
              <textarea
                rows="4"
                name="Description"
                placeholder="Write description"
                className="input-box-1"
                value={description.current}
                onChange={(e) => {
                  if (DesLength < 1000) {
                    description.current = e.target.value;
                    onChangeDes();
                    checkReqFieldFun();
                  }
                }}
              ></textarea>
              <span className="fs-14" style={{color:"#707070"}}>{DesLength} of 1000 characters used</span>
            </div>
            <div>
              <div className="fs-16 fw-b c-b pt-3 pb-3">Category</div>
              {/* <Link>Create</Link> */}
              <select
                className="input-box-1"
                onChange={(e) => (categoryId.current = e.target.value)}
              >
                <option style={{color:"#707070"}}>Select Category</option>
                {Categories.map((item, key) => {
                  return <option value={item?._id} style={{color:"#707070"}}>{item?.name}</option>;
                })}
                {/* <option>2</option>
                <option>3</option>
                <option>4</option> */}
              </select>
            </div>
            <div>
              <div className="fs-16 fw-b c-b pt-3 pb-3">Blockchain*</div>
              <div className="block-chain-container">
                <div>
                  <img src={ethereum} height="32px" />
                </div>
                <div className="block-chain-right">
                  <select
                    className="input-box-1 rm-border"
                    onChange={(e) => {
                      blockchain.current = e.target.value;
                      checkReqFieldFun();
                    }}
                  >
                    <option value="">Select Category</option>
                    <option selected value="Ethereum">
                      Ethereum
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={checkReqField ? false : true}
              className="submit-button"
              style={{ opacity: checkReqField ? "1" : "0.5" }}
            >
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
