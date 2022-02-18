<<<<<<< HEAD
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Image from "../../assets/images/img-format.png";
import styled from "styled-components";
import { connect } from "react-redux";
import { getCollection, uploadDocs } from "../../services/contentServices";
import { httpConstants } from "../../constants";
import { BASE_URL2 } from "../../reducers/Constants";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";
// import "../../assets/styles/Leader.css"
// import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

const Button = styled.button``;

function CreateSingleNFT(props) {
  const [collectionData, setCollectionData] = useState([]);
  const [collectionId, setCollectionId] = useState("");
=======
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "../../assets/images/img-format.png";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addUseraction, allUseraction } from "../../reducers/Action";
// import "../../assets/styles/Leader.css"
// import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { ToastContainer } from "react-toastify";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UploadFile from './uploadFile'


const Button = styled.button``;

function CreateSingleNFT(props, Single) {


  const [firstName, setFirstName] = useState("")
  const [price, setPrice] = useState("")
  const [nftFile, setNftFile] = useState(null);

  const [nftName, setNftName] = useState("")
  const [description, setDescription] = useState("")
  const [collection, setCollection] = useState("")
  const [blockchain, setBlockchain] = useState("")

  const [allUserCount, setAllUserCount] = useState("")


>>>>>>> 5a415e2f2fbcf448ea7ba7610a2d30d8f72f7207

  const name = useRef("");
  const description = useRef("");
  const blockchain = useRef("");
  const ipfsUrl = useRef("");
  const createdBy = (props.user && props.user._id) || "";

<<<<<<< HEAD
  useEffect(async () => {
    const collectionData = await getCollection();
    setCollectionData(collectionData);
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    console.log(acceptedFiles, "<<<< accepted files");
    handleChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });
=======
  const userdata = useSelector((state) => state.user.addUserData);
  const alluserdata = useSelector((state) => state.user.allUserData);
  const errorDATA = useSelector((state) => state.error.errorsData);
  console.log("userdata : ", userdata);
  console.log("errorDATA : ", errorDATA);
  const addIPFS = async () => {
    props.createNftHandler({
      nftFile,
      nftName,
      price,
      description,
      blockchain,
      collection,
    });
  };
  useEffect(() => {
    let count = alluserdata && alluserdata.responseData && alluserdata.responseData.totalUsersCount
    setAllUserCount(count)
  }, [alluserdata])

  const handleSubmit = (e) => {
    // console.log("event",e);
    e.preventDefault()
    // let data = {
    //   userId:100 + allUserCount,
    //   firstName:firstName,
    //   nftName:nftName,
    //   email:blockchain,
    //   password:password,
    //   phone:phoneNumber
    // }
    // console.log("data",data);
    // dispatch(addUseraction(data))
  }


  useEffect(() => {
    dispatch(allUseraction())
  }, [])


  // useEffect(() => {
  //   if((userdata && userdata.data.message == "User added successfully") && (userdata && userdata.data.responseCode === 200)){
  //     console.log("datatatatatatatata");
  //     setFirstName("")
  //     setNftName("")
  //     setDescription("")
  //     setCollection("")
  //     setBlockchain("")
  //     setPhoneNumber("")
  //     setPassword("")
  //     toast.success('User Added');
  //   }
  // },[userdata])
>>>>>>> 5a415e2f2fbcf448ea7ba7610a2d30d8f72f7207

  const hiddenFileInput = useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = async (event) => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
    let formData = new FormData();
    formData.append("folderName", "collections");
    formData.append("createdBy", `${props.user._id}`);
    // alert(props.user._id);
    formData.append("attachment", fileUploaded);

    const res = await fetch(`${BASE_URL2}/api/v1/upload-documents`, {
      method: httpConstants.METHOD_TYPE.POST,
      body: formData,
    });
    const result = await res.json();
    if (result.success) ipfsUrl.current = result.responseData;
    console.log(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", name.current);
    formData.append("description", description.current);
    formData.append("blockchain", blockchain.current);
    formData.append("ipfsUrl", ipfsUrl.current);
    formData.append("createdBy", createdBy);
    console.log(formData.getAll("createdBy"));
    console.log(formData, "<<< formData");
    fetch(`${BASE_URL2}/api/v1/nft`, {
      method: httpConstants.METHOD_TYPE.POST,
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) toast.success("Nft created");
        else toast.error("Internal server error");
        console.log(result, "<error");
      });
    // console.log(
    //   name.current,
    //   description.current,
    //   blockchain.current,
    //   ipfsUrl.current,
    //   createdBy,
    //   collectionId
    // );
  };

  return (
    <>
      <div>
        <div className="text-center mt-5">
          <h4 className="create-nft-font">Create NFT</h4>
        </div>
<<<<<<< HEAD
        <div className="row no-gutters create_singlemob">
          <div className="col-sm-3 col-12 col-xs-12 createnft_mob">
            <label htmlFor="email" className="form-label">
              Upload File*
            </label>
            {/* <div className="card single-nft-card p-5"> */}
            {/* <Button
                onClick={handleClick}
                style={{ border: "none", backgroundColor: "#fff" }}
              > */}

            <div
              className="card single-nft-card p-5"
              style={{ display: "block" }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <img
                src={Image}
                style={{ width: "100px", marginTop: "3em", color: "#366EEF" }}
              />
              <div>Drag and drop your images </div>
              {/* </div> */}
              {/* </Button> */}
              {/* <input
                type="file"
                className="form-control"
                placeholder="Write your name"
                name="email"
                style={{ display: "none" }}
                ref={hiddenFileInput}
                onChange={(e) => console.log(e.target)}
              /> */}
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
              <form
                className="suggestion-form  p-4 "
                onSubmit={(e) => handleSubmit(e)}
              >
                <div className="mb-3 mt-3">
                  <label htmlFor="email" className="form-label input-heading">
                    Name*
                  </label>
                  <input
                    type="name"
                    className="form-control"
                    name="email"
                    onChange={(e) => (name.current = e.target.value)}
                  />
                </div>
                <div className="mb-3 mt-3">
                  <label htmlFor="comment" className="input-heading pb-2">
                    Description*
                  </label>
                  <textarea
                    className="form-control"
                    rows="4"
                    name="text"
                    placeholder="Write description"
                    onChange={(e) => (description.current = e.target.value)}
                  ></textarea>
                  <span className="text-secondary font-13">
                    0 of 1000 characters used
                  </span>
                </div>
                <div className="mb-3 mt-3">
                  <div className="d-flex justify-content-between">
                    <label htmlFor="collection" className="input-heading">
=======
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="row no-gutters create_singlemob">
            <div className="col-sm-3 col-12 col-xs-12 createnft_mob">
              <label for="email" className="form-label">
                Upload File*
              </label>
              <div className="card single-nft-card p-5">
                <Button
                  // onClick={handleClick}
                  style={{ border: "none", backgroundColor: "#fff" }}
                >
                  <UploadFile onChange={(e) => setNftFile(e.target.files[0])} />
                  {/* <UploadFile onChange={(e) => console.log("iii",(e.target.files[0]))} /> */}

                  {/* <input type="file" onChange={(e) => { console.log("oooo", e) }} /> */}
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
                // ref={hiddenFileInput}
                // onChange={handleChange}
                />
                <span className="text-dark font-13">
                  Drag & Drop or
                  {/* <Link to="/" style={{ textDecoration: "none" }}> */}
                  Browse
                  {/* </Link> */}
                </span>
              </div>
              <span className="text-secondary font-13">
                Supported(JPG,PNG,GIF,SVG,MP4, WEBM,WAV) Max size 40mb
              </span>
            </div>
            <div className="col-sm-5 col-12 col-xs-12">
              <div className="singlenft-form-box">
                <div className="suggestion-form  p-4 ">
                  <div className="mb-3 mt-3">
                    <label className="form-label input-heading">
                      Name*
                    </label>
                    <input type="text" className="form-control" onChange={(e) => setNftName(e.target.value)} value={nftName} />
                  </div>
                  <div className="mb-3 mt-3">
                    <label className="form-label input-heading">
                      Price*
                    </label>
                    <input type="number" className="form-control" onChange={(e) => setPrice(e.target.value)} value={price} />
                  </div>
                  <div className="mb-3 mt-3">
                    <label className="input-heading pb-2">
                      Description*
                    </label>
                    <textarea
                      className="form-control"
                      rows="4"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      placeholder="Write description"
                    ></textarea>
                    <spna className="text-secondary font-13">
                      0 of 1000 characters used
                    </spna>
                  </div>
                  <div className="mb-3 mt-3">
                    <label for="collection" className="input-heading">
>>>>>>> 5a415e2f2fbcf448ea7ba7610a2d30d8f72f7207
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
<<<<<<< HEAD
                        <div>Create</div>
                      </Link>
                    </label>
                  </div>

                  {/* <Link>Create</Link> */}
                  <select className="form-select mt-3 font-13 text-secondary ">
                    <option>Select Category</option>
                    {collectionData.map((item) => (
                      <option
                        onClick={() => setCollectionId(item._id)}
                        key={item._id}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3 mt-3">
                  <label htmlFor="email" className="form-label input-heading">
                    blockchain*
                  </label>
                  <input
                    type="name"
                    className="form-control bg-light"
                    placeholder="Ethereum"
                    id="ethereum"
                    name="email"
                    onChange={(e) => (blockchain.current = e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-4 w-100">
                  Create
                </button>
              </form>
=======
                        Create
                      </Link>

                    </label>
                    {/* <Link>Create</Link> */}
                    <select className="form-select mt-3 font-13 text-secondary" onChange={(e) => setCollection(e.target.value)}
                      value={collection}>
                      <option>Select Category</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                  </div>
                  <div className="mb-3 mt-3">
                    <label className="form-label input-heading">
                      Blockchain*
                    </label>
                    <input
                      type="email"
                      className="form-control bg-light"
                      placeholder="Ethereum"
                      // id="email"
                      onChange={(e) => setBlockchain(e.target.value)}
                      value={blockchain}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary mt-4 w-100"
                    onClick={() => {
                      // addNftContent();
                      // mintNft();
                      addIPFS();
                    }}
                  >
                    Create
                  </button>
                </div>
              </div>
>>>>>>> 5a415e2f2fbcf448ea7ba7610a2d30d8f72f7207
            </div>
          </div>
        </form>
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

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.user.addUserData,
  };
};

export default connect(mapStateToProps)(CreateSingleNFT);
