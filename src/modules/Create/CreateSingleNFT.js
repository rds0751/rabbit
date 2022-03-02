import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../../assets/images/img-format.png";
import success from "../../assets/images/success.png";
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
import { Oval } from "react-loader-spinner";
import "../../assets/styles/createSingleNft.css";
import "../../assets/styles/MintModal.css";
import UploadSingleNft from "./CreateSingleUploadFile";

// import "../../assets/styles/Leader.css"
// import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
const Button = styled.button``;
function CreateSingleNFT(props) {
  console.log("ppppppppppppp", props, "");
  console.log("ppppppppppppp", props?.loaderState);
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
  const [isFileSelected, setIsFileSelected] = useState(false);
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
  console.log(props, "<<<<< fromindexfile");
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
      formData.append(
        "attachment",
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )[0]
      );
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
          setIsFileSelected(true);
        }
      })();

      // setLogoPresent(true);
    },
  });
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
    console.log(event, "<<<<< event");
    // const fileUploaded = event;
    console.log(event, "<<<<file uploaded");
    setUploadFileObj(event);
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
    if (
      name.current == "" ||
      price.current == "" ||
      description.current == "" ||
      selectFile == ""
    ) {
      toast.error("Enter The Required Field");
      return null;
    }

    console.log(
      price.current,
      name.current,
      description.current,
      "<<<<price current "
    );
    const addIPFS = async () => {
      console.log(selectFile, "<<<selectedFile");

      props.createNftHandler({
        // nftFile: selectFile,
        ipfsUrl: ipfsUrl,
        cdnUrl: cdnUrl,
        nftName: name.current,
        price: price.current,
        description: description.current,
        blockchain: blockchain.current,
        createdBy: loggedInUser._id,
        collection: collectionId,
        ownerAddress: walletAddress.address,
      });
      // setloader(false)
      setOpenMintodal(true);
    };
    addIPFS();
  };
  console.log(selectFile, "<<<s");
  return (
    <>
      {props?.loaderState ? (
        <div className="center">
          {" "}
          <Oval
            vertical="top"
            horizontal="center"
            color="#00BFFF"
            height={30}
            width={30}
          />
        </div>
      ) : (
        ""
      )}
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
      <div className="full-content-margin">
        <div className="create-nft-text">Create NFT</div>

        <div className="create-single-nft-outer">
          <div className="create-nft-form" style={{}}>
            <div className="nft-file-upload">
              <label htmlFor="email" className="form-key">
                Upload File*
              </label>

              <div className="inpput-image-wrap"></div>

              {/* -----------------------NEW DRA GAND DROP */}

              {!isFileSelected && (
                <div className="draganddropbox" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="draganddropboxinnerdiv">
                    <img
                      src={cdnUrl != "" ? cdnUrl : Image}
                      style={{
                        // maxWidth: "100px",
                        width: "70%",
                        // marginTop: "3em",
                        color: "#366EEF",
                      }}
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
              )}

              {isFileSelected && (
                <div className="draganddropbox" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="draganddropboxinnerdiv">
                    <img
                      src={cdnUrl != "" ? cdnUrl : Image}
                      style={{
                        width: "100%",
                        // marginTop: "3em",
                        height: "100%",
                        color: "#366EEF",
                      }}
                    />
                    {/* <span className="draganddropboxinnerdivtextspan">
                    Drag and Drop or
                    <span className="draganddropboxinnerdivtextspanbrowse">
                      {" "}
                      Browse
                    </span>
                  </span> */}
                  </div>
                </div>
              )}
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
                  style={{
                    height: "8rem",
                    maxHeight: "8rem",
                    minHeight: "8rem",
                  }}
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
                <span className="color82">
                  {desLength} of 1000 characters used
                </span>
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
                      }}
                    >
                      <span className="color36 font-16 poppins-normal">
                        {" "}
                        Create
                      </span>
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
                  <option className="color82">Select collection</option>
                  {collectionData.map((item) => (
                    <option className="option color82" value={item._id}>
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
                      <option value="" className="color82">
                        Select Category
                      </option>
                      <option selected value="Ethereum" className="color82">
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
      </div>
      {/* ---------------- */}
      {/* <div className="mint-mod-outer"> */}
      <div
        className="mint-mod-outer"
        style={{ display: openMintodal ? "block" : "none" }}
      >
        {/* <div className=""> */}
        <div className="mint-abs">
          {/* <div className=""> */}
          {/* <div className="mint-modal-rp"> */}
          <div className="">
            <div className="mint-outer" style={{ opacity: "1" }}>
              <div className="mintbody">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    className="completelistin"
                    onClick={() => setOpenMintodal(false)}
                  >
                    Complete your listing
                  </div>
                  <div
                    onClick={() => setOpenMintodal(false)}
                    className="completelistin"
                  >
                    X
                  </div>
                </div>

                <div className="abstractillusion">
                  <img src={cdnUrl != "" ? cdnUrl : Image} />
                  <div className="abstractillusioncontent">
                    <div className="abstracttitle">Abstract illusion</div>
                    <div className="abstractposter"> {name.current}</div>
                    <div className="ethprice">{price.current}ETH</div>
                    {/* <div className="ethprice">$162.09</div> */}
                  </div>
                </div>
                <div className="checkpostcontainer">
                  <div className="checkpost">
                    {isFileSelected && (
                      <img src={success} className="checkimg" />
                    )}
                    {!isFileSelected && (
                      <div className="checkvalue checkvaluetext">1</div>
                    )}
                    <div className="checkposttext">
                      <div>Uploading</div>
                      <div>
                        Uploading all Media assests and metadata to Ipfs
                      </div>
                    </div>
                  </div>
                  <div className="checkpost">
                    {props.isMintSuccess && (
                      <img src={success} className="checkimg" />
                    )}
                    {!props.isMintSuccess && (
                      <div className="checkvalue checkvaluetext">2</div>
                    )}
                    <div className="checkposttext">
                      <div>Mint</div>
                      <div>Send transaction to create your nft</div>
                    </div>
                  </div>
                  <div className="checkpost">
                    {props.isMintSuccess && (
                      <img src={success} className="checkimg" />
                    )}
                    {!props.isMintSuccess && (
                      <div className="checkvalue checkvaluetext">23</div>
                    )}
                    <div className="checkposttext">
                      <div>Approve</div>
                      <div>
                        This transaction conducted only once per collection
                      </div>
                    </div>
                  </div>
                  {/* <div className="checkpost">
              <div className="checkvalue checkvaluetext noborder">4</div>
              <div className="checkposttext">
                <div>Put on sale</div>
                <div>Sign message to set fixed price</div>
              </div>
            </div> */}
                </div>
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
