import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../../assets/images/img-format.png";
import ethereum from "../../assets/images/ethereum.svg";
// import { FaCloudUploadAlt } from "react-icons/fa";
import styled from "styled-components";
import { connect } from "react-redux";
import Utils from "../../utility";
import BlockchainServices from "../../services/blockchainService";
import getCollection from "../../services/contentMicroservice";
import {
  // getCollection,
  getCollectionBySingleUser,
} from "../../services/contentServices";
import { httpConstants } from "../../constants";
import { BASE_URL2 } from "../../reducers/Constants";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import ImageFile from "./uploadFile";
import { Oval } from  'react-loader-spinner';
import "../../assets/styles/createSingleNft.css";
import "../../assets/styles/MintModal.css";
import UploadSingleNft from "./CreateSingleUploadFile";



// import "../../assets/styles/Leader.css"
// import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
const Button = styled.button``;
function CreateSingleNFT(props) {
  console.log("ppppppppppppp", props, "");
  console.log("ppppppppppppp",props?.loaderState)
  // console.log("ppppppppppppp", props?.isNftCreated);
  const [collectionData, setCollectionData] = useState([]);
  const [selectFile, setSelectFile] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [ipfsUrl, setIpfsUrl] = useState("");
  const [cdnUrl, setcdnUrl] = useState("");
  const [uploadFileObj, setUploadFileObj] = useState("");
  const [openMintodal, setOpenMintodal] = useState(false);


  // >>>> This is user id
  const { user } = useSelector((state) => state);
  const navigation = useNavigate();
  const { loggedInUser, walletAddress } = user;
  const [checkDisable, setcheckDisable] = useState(true);
  // console.log(user.addUserData._id, "<<<< user data");
  // -------------------------------
  const name = useRef("");
  const price = useRef("");
  const description = useRef("");
  const blockchain = useRef("Ethereum");
  // const ipfsUrl = useRef("");
  const createdBy = loggedInUser?._id;

  const [desLength, setDesLength] = useState(0);

  // ----------------------------------------------states end-------------

  useEffect(async () => {
    if (loggedInUser == null) {
      navigation("/add-wallet");
    }
    const collections = await getCollectionBySingleUser();
    setCollectionData(collections);
  }, []);

  // --------------------------------React Drop Zone---------------------
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setSelectFile(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      let formData = new FormData();
      formData.append("attachment", selectFile[0]);
      // const [err, ipfsRes] = addIPFS(formData)
      (async () => {
        const [err, ipfsRes] = await Utils.parseResponse(
          getCollection.addIpfs(formData)
        );
        if (err || !ipfsRes.ipfsUrl) {
          toast.error("Unable to add file to IPFS");
        } else {
          console.log(ipfsRes, "<<<<ipfs Res");
          setIpfsUrl(ipfsRes.ipfsUrl);
          setcdnUrl(ipfsRes.cdnUrl);



        }
      })();

      // setLogoPresent(true);
    },
  });
  // ----------------old drop----------

  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop,
  // });
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    console.log(acceptedFiles, "<<<< accepted files");
    handleChange(acceptedFiles);
  }, []);
  const hiddenFileInput = useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = async (event) => {
    // let formData = new FormData();
    // formData.append("attachment", data.nftFile);

    console.log(event, "<<<<< event");
    // const fileUploaded = event;
    console.log(event, "<<<<file uploaded");
    setUploadFileObj(event);
    // console.log(event);
    // let formData = new FormData();
    // formData.append("folderName", "collections");
    // formData.append("createdBy", `${user._id}`);
    // // alert(props.user._id);
    // formData.append("attachment", event);
    // const res = await fetch(`${BASE_URL2}/api/v1/upload-documents`, {
    //   method: httpConstants.METHOD_TYPE.POST,
    //   body: formData,
    // });
    // const result = await res.json();
    // if (result.success) ipfsUrl.current = result.responseData;
    // console.log(result);
  };
  const checkChanges = () => {
    if (name.current && price.current && description.current) {
      if (
        name.current != "" &&
        price.current != "" &&
        description.current != "" &&
        selectFile != ""
      ) {
        setcheckDisable(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    console.log(selectFile, "<<<selected file");
    let formData = new FormData();
    formData.append("attachment", selectFile[0]);
    // const [err, ipfsRes] = addIPFS(formData)
    const [err, ipfsRes] = await Utils.parseResponse(
      getCollection.addIpfs(formData)
    );
    if (err || !ipfsRes.ipfsUrl) {
      toast.error("Unable to add file to IPFS");
    }
    console.log(err, ipfsRes, "<<<<<<");

    return null;

    if (
      name.current == "" ||
      price.current == "" ||
      description.current == "" ||
      selectFile == ""
    ) {
      // setcheckDisable(false);
      toast.error("Enter The Required Field");
      return null;
    }
    // if(price.current=="")
    console.log(
      price.current,
      name.current,
      description.current,
      "<<<<price current "
    );
    const addIPFS = async () => {
      console.log(selectFile, "<<<selectedFile");
      // console.log("address of owner", walletAddress.address)
      // console.log(
      //   "file",
      //   { ...selectFile[0], filename: selectFile[0].name },
      //   selectFile[0]
      // );
      console.log("Called IPFx", {
        nftFile: selectFile,
        nftName: name.current,
        price: price.current,
        description: description.current,
        blockchain: blockchain.current,
        createdBy: loggedInUser._id,
        collection: collectionId,
        ownerAddress: walletAddress.address,
      });
      // setloader(true)

      props.createNftHandler({
        nftFile: selectFile,
        nftName: name.current,
        price: price.current,
        description: description.current,
        blockchain: blockchain.current,
        createdBy: loggedInUser._id,
        collection: collectionId,
        ownerAddress: walletAddress.address,
      });
      // setloader(false)

    };
    addIPFS();
    // e.preventDefault();
    // let formData = new FormData();
    // console.log(collectionId, "<<<< collectionid");
    // console.log(
    //   name.current,
    //   description.current,
    //   blockchain.current,
    //   ipfsUrl.current,
    //   createdBy,
    //   uploadFileObj
    // );
    // formData.append("name", name.current);
    // formData.append("description", description.current);
    // formData.append("blockchain", blockchain.current);
    // formData.append("ipfsUrl", ipfsUrl);
    // formData.append("createdBy", createdBy);
    // formData.append("collectionId", collectionId);
    // console.log(formData.getAll("createdBy"));
    // console.log(formData, "<<< formData");
    // console.log()
    // ---------
    // fetch(`${BASE_URL2}/api/v1/nft`, {
    //   method: httpConstants.METHOD_TYPE.POST,
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then((result) => {
    //     if (result.success) toast.success("Nft created");
    //     else toast.error("Internal server error");
    //     console.log(result, "<error");
    //   });
  };
  console.log(selectFile, "<<<s");
  return (
    <>
       {
      props?.loaderState?<div className= "center"> <Oval  vertical= "top" horizontal="center"   color="#00BFFF" height={30} width={30} /></div>:""
    }
      <ToastContainer
        position="top-center"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="">
        <div className="create-nft-text">Create NFT</div>
      </div>
      <div className="create-single-nft-outer">
        <div className="create-nft-form">
          <div className="nft-file-upload">
            <label htmlFor="email" className="form-key">
              Upload File*
            </label>
            {/* <div className="card single-nft-card p-5"> */}
            {/* <Button
                onClick={handleClick}
                style={{ border: "none", backgroundColor: "#fff" }}
              > */}
            {/* <div
              className="card single-nft-card p-5"
              style={{ display: "block" }}
              // {...getRootProps()}
            >
              {/* <input {...getInputProps()} /> */}

            <div className="inpput-image-wrap">
              {/* <ImageFile onChange={(e) => setSelectFile(e.target.files[0])} /> */}
              <UploadSingleNft
                onChange={(e) => setSelectFile(e.target.files[0])}
              />
              {/* <UploadFile onChange={(e) => console.log("iii",(e.target.files[0]))} /> */}
              {/* <img src={} /> */}
              {/* <span className="">
                Supported(JPG,PNG,GIF,SVG,MP4, WEBM,WAV) Max size 40mb
              </span> */}
            </div>

            {/* --------------------------------------------- */}
            {/* <img
              src={Image}
              style={{ width: "100px", marginTop: "3em", color: "#366EEF" }}
            />
            <div>Drag and drop your images </div>
            <ImageFile
              onChange={(e) => setSelectFile(e.target.value)}
            ></ImageFile> */}
            {/* ------------------------------------ */}
            {/* </div> */}
            {/* </Button> */}
            {/* <input
                type="file"
                style={{ width: "2rem" }}
                // className="form-control-1"
                // placeholder="Write your name"
                // name="email"
                // style={{ display: "none" }}
                // ref={hiddenFileInput}
                onChange={(e) => setSelectFile(e.target.value)}
              /> */}
            {/* <span className="text-dark font-13">
                Drag & Drop or
                  Browse
              </span> */}
            {/* </div> */}

            {/* -----------------------NEW DRA GAND DROP */}

            <div className="draganddropbox" {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="draganddropboxinnerdiv">
                <img
                  src={cdnUrl != "" ? cdnUrl : Image}
                  style={{ width: "100px", marginTop: "3em", color: "#366EEF" }}
                />
                <span className="draganddropboxinnerdivtextspan">
                  Drag and Drop or
                  <span className="draganddropboxinnerdivtextspanbrowse">
                    {" "}
                    Browse
                  </span>
                </span>
              </div>
            </div>

            {/* ----------------- */}
          </div>
          <div className="single-form">
            <div className="">
              <label htmlFor="email" className=" input-label">
                Name*
              </label>
              <input
                type="email"
                className="form-control-1"
                name="email"
                onChange={(e) => {
                  name.current = e.target.value;
                  checkChanges();
                }}
              />
            </div>
            <div className="">
              <label htmlFor="email" className=" input-label">
                Price*
              </label>
              <input
                type="price"
                className="form-control-1"
                min="0"
                type="number"
                onChange={(e) => {
                  price.current = e.target.value;
                  checkChanges();
                }}
              />
            </div>
            <div className="">
              <label htmlFor="comment" className="input-label pb-2">
                Description*
              </label>
              <textarea
                className="form-control-1 text-area-input"
                rows="4"
                name="text"
                placeholder="Write description"
                value={description.current}
                onChange={(e) => {
                  if (desLength < 1000) {
                    description.current = e.target.value;
                    setDesLength(description.current.length);
                    checkChanges();
                  }
                }}
              ></textarea>
              <span className="">{desLength} of 1000 characters used</span>
            </div>
            <div className="">
              <div className="create-collection">
                <div
                  htmlFor="collection"
                  className="input-label collection-label"
                >
                  Collection
                </div>

                <div>
                  <Link
                    to="/create-nft"
                    style={{
                      textDecoration: "none",
                      fontWeight: "normal",
                    }}
                  >
                    Create
                  </Link>
                </div>
              </div>
              {/* <Link>Create</Link> */}
              <select
                onChange={(e) => {
                  setCollectionId(e.target.value);
                  checkChanges();
                }}
                className="form-control-1 category-select"
              >
                <option>Select collection</option>
                {collectionData.map((item) => (
                  <option className="option" value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="email" className="input-label">
                Blockchain*
              </label>
              {/* <select
                onChange={(e) => {
                  blockchain.current = e.target.value;
                  checkChanges();
                }}
                className="form-control-1"
              >
                <option value="">Select Blockchain</option>
                <option value="Ethereum">Ehtereum</option>
              </select> */}
              <div className="block-chain-container">
                <div>
                  <img src={ethereum.svg} height="32px" />
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
            <button
              type="submit"
              onClick={handleSubmit}
              className="submit-button"
              style={{ opacity: checkDisable ? 0.6 : 1 }}
              disabled={checkDisable}
            >
              Create
            </button>
          </div>
        </div>
      </div>
      <div
        className="mint-outer"
        style={{ display: openMintodal ? "block" : "none" }}
      >
        <div className="mintbody">
          <div
            className="completelistin"
            onClick={() => setOpenMintodal(false)}
          >
            Complete your listing
          </div>
          <div className="abstractillusion">
            <img src={Image} />
            <div className="abstractillusioncontent">
              <div className="abstracttitle">Abstract illusion</div>
              <div className="abstractposter">Abstract Poster</div>
              <div className="ethprice">0.49ETH</div>
              <div className="ethprice">$162.09</div>
            </div>
          </div>
          <div className="checkpostcontainer">
            <div className="checkpost">
              <img src={Image} className="checkvalue" />
              <div className="checkposttext">
                <div>Uploading</div>
                <div>Uploading all Media assests and metadata to Ipfs</div>
              </div>
            </div>
            <div className="checkpost">
              <div className="checkvalue checkvaluetext">2</div>
              <div className="checkposttext">
                <div>Mint</div>
                <div>Send transaction to create your nft</div>
              </div>
            </div>
            <div className="checkpost">
              <div className="checkvalue checkvaluetext">3</div>
              <div className="checkposttext">
                <div>Approve</div>
                <div>This transaction conducted only once per collection</div>
              </div>
            </div>
            <div className="checkpost">
              <div className="checkvalue checkvaluetext noborder">4</div>
              <div className="checkposttext">
                <div>Put on sale</div>
                <div>Sign message to set fixed price</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.user.addUserData,
  };
};
export default CreateSingleNFT;
// export default connect(mapStateToProps)(CreateSingleNFT);