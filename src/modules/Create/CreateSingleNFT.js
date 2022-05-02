import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../../assets/images/img-format.svg";
import success from "../../assets/images/Check.svg";
import ethereum from "../../assets/images/ethereum.svg";
import polygon from "../../assets/images/polygon.png";
import binance from "../../assets/images/binance.png";
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
import Close from "../../assets/images/close.png";
import Select from 'react-select';
import { PrintDisabled } from "@mui/icons-material";
import $ from 'jquery';
import { errors } from "ethers";
import { getTenantData } from "../../services/clientConfigMicroService";

// import "../../assets/styles/Leader.css"
// import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
const Button = styled.button``;
function CreateSingleNFT(props) {

  const [collectionData, setCollectionData] = useState([]);
  const [selectFile, setSelectFile] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [contractAddress, setContractAddress] = useState("");

  const [ipfsUrl, setIpfsUrl] = useState("");
  const [myProfileUrl, setmyProfileUrl] = useState("");
  const [DesError,SetDesError]=useState("");
  const [royalityError,setRoyalityError]=useState("");

  const [cdnUrl, setcdnUrl] = useState("");
  const [uploadFileObj, setUploadFileObj] = useState("");
  const [openMintodal, setOpenMintodal] = useState(false);

  // >>>> This is user id
  const { user } = useSelector((state) => state);
  const navigation = useNavigate();
  const { loggedInUser, walletAddress } = user;
  const [checkDisable, setcheckDisable] = useState(true);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isloader, setisLoader] = useState(false);
  const[specialChar,setSpecialChar]=useState("");
  // console.log(user.addUserData._id, "<<<< user data");
  // -------------------------------
  const name = useRef("");
  const price = useRef("");
  const description = useRef("");
  const blockchain = useRef("Ethereum");
  // const ipfsUrl = useRef("");
  const createdBy = loggedInUser?._id;

  const [desLength, setDesLength] = useState(0);
  const[error,setError]=useState('');
  const [nameError,SetNameError]=useState('');
  // const { userDetails, loggedInUser, walletAddress } = user;

  if (loggedInUser) { localStorage.setItem('userId', loggedInUser._id); }
  let userId = (loggedInUser) ? loggedInUser._id : localStorage.userId;
  const [selectedOption, setSelectedOption] = useState(null);
  const [blockchainOption, setBlockchainOption] = useState([]);
  const [blockchains, setBlockChains] = useState([])
 
  useEffect(() => {
    async function fetchData() {
      await getTenantData().then(response => setBlockChains(response?.blockchains));
    }
    fetchData();
  }, []);

  useEffect(() => {
    for (let eachItem of blockchains) {
      if (eachItem === "Ethereum") {
        blockchainOption.push({ value: 'ETH', label: <div><img src={ethereum} height="32px" alt=""/> Ethereum</div> })
      } else if (eachItem === "Polygon") {
        blockchainOption.push({ value: 'MATIC', label: <div><img src={polygon} height="32px" alt=""/> Polygon</div> })
      } else if (eachItem === "Binance") {
        blockchainOption.push({ value: 'BNB', label: <div><img src={binance} height="32px" alt=""/> Binance</div> })
      }
   }
  }, [blockchains])

  // ----------------------------------------------states end-------------
  useEffect(async () => {
    // if (walletAddress == null) {
    //   navigation("/add-wallet");
    // };

    // this code will check if user already connected wallet from localstorage
    if(!localStorage.getItem('has_wallet')){
      navigation("/add-wallet");
    }
  
    setmyProfileUrl("/nft-information/")
    // const collections = await getCollectionBySingleUser(userId);
    // setCollectionData(collections);
  }, []);

  useEffect(async () => {
    const collections = await getCollectionBySingleUser(userId);
    setCollectionData(collections);
  }, []);
const [compressedUrl,setCompressedUrl]=useState("");
  // --------------------------------React Drop Zone---------------------
  const { getRootProps, getInputProps } = useDropzone({
    accept: ".png,.jpg,.jpeg,.gif",
    maxSize: "40485760",
    onDrop: (acceptedFiles,fileRejections) => {
      setisLoader(true);
      fileRejections.forEach((file)=>{
        file.errors.forEach((err)=>{
          if(err.code === "file-too-large"){
            toast.error("Image file size should be less than 40 mb")
            setisLoader(false);
            return ;
          }
          else if(err.code === "file-invalid-type"){
            toast.error("File type not acceptable. Please use JPG,JPEG, PNG, GIF file");
            setisLoader(false);
            return ;
          }
          else{
            toast.error("Image file size should be greater than ……. pxl");
            setisLoader(false);
            return ;
          }
        })
      })
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
        if (!ipfsRes.ipfsUrl) {
          toast.error("unable to upload image");
          setisLoader(false);
        } else {
          console.log(ipfsRes, "<<<<ipfs Res");

          setIpfsUrl(ipfsRes.ipfsUrl);
          setcdnUrl(ipfsRes.cdnUrl);
          setCompressedUrl(ipfsRes.compressedURL);
          setisLoader(false);
          setIsFileSelected(true);
          // if (
          //   name.current != ""  &&
          //   price.current != "" &&
          //   description.current !=""
          //   // cdnUrl != "" 
          //   // selectFile !="" 
          // ) {
          //   setcheckDisable(false);
          // } 
          // else{
          //   setcheckDisable(true);
          // }
        }
      })();

      // setLogoPresent(true);
    },
  });
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

  useEffect(()=>{
    $(document).ready(function(){

      var lines = 20;
      var linesUsed = $('#linesUsed');
  
      $('#test').keydown(function(e) {
  
          let newLines = $(this).val().split("\n").length;
          linesUsed.text(newLines);
  
          if(e.keyCode == 13 && newLines >= lines) {
              
              return false;
          }
          
      });
  });
  },[])

  const handleSubmit = async (e) => {
    var priceValue=price.current;
    var format = /[!@$%^&*()_+\=\[\]{};:"\\|,.<>\/?]+/;

    if(priceValue.toString().slice(0,1)=="."){
     priceValue="0"+priceValue;
     price.current=priceValue;
    console.log(priceValue,"<hello-world");
    }
    else{
      price.current=+priceValue;
      price.current = price.current.toString();
      console.log(price.current,"<<<hello-world");

    }
   
   

    console.log(selectFile, "<<<selected file");
    if (
      name.current == "" ||
      price.current == "" ||
      description.current == "" ||
      selectFile == ""
    ) {
      toast.error("Enter The Required Field");
      return null;
    }else{
      setcheckDisable(false);
    }

    
    if(format.test(name.current)){
      toast.error("Name should be not contain special character");
      return null;
    }
    if(name.current.length < 3){
      toast.error("Name  should be atleast 3 character");
      return null;
    }
    if(error!=""){
      toast.error("Minimum listing price for an NFT should be more than 0.004 ETH");
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
      // alert(contractAddress)
      // alert(collectionId)
      // alert(contractAddress)
      props.createNftHandler({
        // nftFile: selectFile,
        ipfsUrl: ipfsUrl,
        cdnUrl: cdnUrl,
        compressedURL:compressedUrl,
        nftName: name.current,
        price: price.current,
        description: description.current,
        blockchain: blockchain.current,
        createdBy: loggedInUser._id,
        collection: collectionId,
        contractAddress: contractAddress,
        ownerAddress: walletAddress.address,
      });
      // setloader(false)
      setOpenMintodal(true);
    };
    addIPFS();
  };
  
  
const enabled=name?.current.length > 0 && price?.current.length>0 && description?.current.length >0 && selectFile!="" && nameError=="" && error=="" && royalityError=="";



  return (
    <>

      {props?.loaderState ? (
        <div className="mint-mod-outer">
          <div className="mint-abs">
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
                      Complete your minting
                    </div>
                    {/* <div
                      onClick={() => setOpenMintodal(false)}
                      className="completelistin"
                    >
                      <img src={Close} width="12px" height="12px" />
                    </div> */}
                  </div>

                  <div className="abstractillusion">
                    <img src={cdnUrl != "" ? cdnUrl : Image} />
                    <div className="abstractillusioncontent">
                      <div className="abstracttitle">{name.current}</div>
                      {/* <div className="abstractposter"> </div> */}
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
                        <div className="heading">
                          {props.isFileSelected === 'true' ? (
                            'Uploading'
                          ) : (
                            'Upload'
                          )}
                        </div>
                        <div className="description">
                          Uploading all media assets and metadata to IPFS
                        </div>
                      </div>
                    </div>
                    <div className="checkpost">
                      {props.isMintSuccess === true ? (
                        <img src={success} className="checkimg" />
                      ) : (
                        <div className="checkimg">
                          <Oval
                            vertical="top"
                            horizontal="center"
                            color="#00BFFF"
                            height={30}
                            width={30} />
                        </div>
                      )}
                      {/* {!props.isMintSuccess && (
                          <div className="checkvalue checkvaluetext">2</div>
                        )} */}
                      <div className="checkposttext">
                        <div className="heading">
                          {props.isMintSuccess === 'true' ? (
                            'Mint'
                          ) : (
                            'Minting'
                          )}
                        </div>
                        <div className="description">Send Transaction to Create your NFT</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}


      {/* ----------------------------- */}
      {props?.isNftCreated ?
        navigation(myProfileUrl + props?.mintedNftId) : (
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
          <div
            className="create-nft-form"
            style={
              {
                // flexDirection: "column",
              }
            }
          >
            <div className="nft-file-upload">
              <label htmlFor="email" className="form-key">
                Upload File*
              </label>

              <div className="inpput-image-wrap"></div>

              {/* -----------------------NEW DRA GAND DROP */}

              {!isFileSelected && (
                <div className="draganddropbox" {...getRootProps()}>
                  <input {...getInputProps()} />

                  {!isloader ? (
                    <div className="draganddropboxinnerdiv">
                      <img
                        src={cdnUrl != "" ? cdnUrl : Image}
                        className="nft-image"
                        style={{
                          // maxWidth: "100px",
                          // width: "70%",
                          // marginTop: "3em",
                      
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
                  ) : (
                    <div className="" style={{ margin: "auto 0" }} >
                      {" "}
                      <Oval
                        vertical="top"
                        horizontal="center"
                        color="#00BFFF"
                        height={30}
                        width={30}

                      />
                    </div>
                  )}

                </div>
              )}

              {isFileSelected && (
                <div className="draganddropbox" {...getRootProps()}>
                  <input {...getInputProps()} />

                  {!isloader ? (<div className="draganddropboxinnerdiv">
                    <img
                      src={cdnUrl != "" ? cdnUrl : Image}
                      style={{
                        width: "100%",
                        // marginTop: "3em",
                        height: "100%",
                        color: "#366EEF",
                        objectFit:"cover",
                       
                      }}
                    />
                    {/* <span className="draganddropboxinnerdivtextspan">
                    Drag and Drop or
                    <span className="draganddropboxinnerdivtextspanbrowse">
                      {" "}
                      Browse
                    </span>
                  </span> */}
                  </div>) : (
                    <div className="" style={{ margin: "auto 0" }}>
                      {" "}
                      <Oval
                        vertical="top"
                        horizontal="center"
                        color="#00BFFF"
                        height={30}
                        width={30}
                      />
                    </div>
                  )}

                </div>
              )}
              {/* ----------------- */}
              <div className="draganddropboxmsg">
                Supported(JPG,JPEG, PNG, GIF) <br></br>Max size: 40 mb
              </div>
            </div>
            <div className="single-form">
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
                      to={"/create-nft-collection"}
                        // pathname:"/create-nft-collection",
                        state={{
                          data:true}}>
                    
                      <span className="color36 font-16 poppins-normal create-text">
                        {" "}
                        Create
                      </span>
                    </Link>
                  </div>
                </div>
                {/* <Link>Create</Link> */}
                <select
                  onChange={(e) => {
                    // checkChanges();
                    // setCollectionId(e.target.value);
                    const addressId = e.target.value.split(",")
                    setCollectionId(addressId[0]);
                    // alert(contractAddress);
                    setContractAddress(addressId[1]);
                    // alert(collectionId);
                    // alert(contractAddress);

                  


                  }}
                  className="form-control-1 category-select"
                >
                  <option className="color82">ANAFTO Collection</option>
                  {collectionData.map((item, index) => (
                    <option className="option color82" value={[item._id, item.contractAddress]} >
                      {item?.name}
                    </option>
                  ))}
                </select>

              </div>

              <div className="input-name">
                <label htmlFor="email" className=" input-label">
                  Name*
                </label>
                <div style={{color:"red",fontSize:"15px"}}>{nameError}</div>
                <input
                  type="text"
                  className="form-control-1"
                  style={{border:nameError!=""?"1px solid red":"1px solid #C8C8C8"}}
                  name="email"
                  placeholder="Enter name"
                  autoComplete="off"
                  maxLength="20"
                  title=" "
                  onChange={(e) => {
                    name.current = e.target.value;
                    var format = /[!@$%^&*()_+\=\[\]{};:"\\|,.<>\/?]+/;
                      if(!format.test(e.target.value))
                      SetNameError("");
                      else if(e.target.value.length!=0)
                      SetNameError("")
                      else if (!name.current.value.length < 3)
                      SetNameError("")
                      
                  }}
                />
               
              </div>
              <div className="input-price">
                <label htmlFor="price" className=" input-label">
                  Price*
                </label>
                <div style={{color:"red",fontSize:"15px"}}>{error}</div>
                <div class="input-group">
             
                  <input
                    className="form-control"
                    type="number"
                    title=" "
                    placeholder="0 ETH"
                    autoComplete="off"
                    style={{border:error!=""?"1px solid red":"1px solid #C8C8C8"}}
                    onWheel={(e)=>e.target.blur()}
                    onFocus={(e)=>{
                      var format = /[!@$%^&*()_+\=\[\]{};:"\\|,.<>\/?]+/;
                      if(format.test(name.current)){
                        SetNameError("(No Special Character Allowed)");
                      }else if(name.current.length == 0){
                        SetNameError("( Name is required )")
                      }
                      else if(name.current.length < 3){
                        SetNameError("( Name should be atleast 3 character )")
                      } else {
                      SetNameError("");
                      }
                    }}
                    onChange={(e) => {
                      price.current = e.target.value;
                      if(price.current.length != 0)
                      setError("")
                      else if(!price.current < "0.004" || !price.current=="0")
                      setError("")
                      else if(!price.current > "1000000000")
                      setError("")

                      // checkChanges();
                     
                    }}
                  />
                  <span class="input-group-text">ETH</span>
                 
                </div>
                
              </div>
              <div className="input-description">
                <label htmlFor="comment" className="input-label pb-2">
                  Description*
                </label>
                <div style={{color:"Red" ,fontSize:"15px"}}>{DesError}</div>
               
                <textarea
                  className="form-control-1 text-area-input"
                  rows="4"
                  id="test"
                  style={{
                    
                    border:DesError!=""?"1px solid red":"1px solid #C8C8C8"
                  }}
                  maxLength="1000"
                  name="text"
                  placeholder="Write description"
                  value={description.current}
                  onFocus={(e)=>{
                    var format = /[!@$%^&*()_+\=\[\]{};:"\\|,.<>\/?]+/;
                      if(format.test(name.current)){
                        SetNameError("(No Special Character Allowed)");
                      }else if(name.current.length == 0){
                        SetNameError("( Name is required )")
                      }
                      else if(name.current.length < 3){
                        SetNameError("( Name should be atleast 3 character )")
                      } else {
                      SetNameError("");
                      }
                    if(price.current.length == 0)
                      setError("( price is required)")
                    else if(price.current < "0.004" || price.current==="0")
                      setError("( Minimum listing price for an NFT should be more than 0.004 ETH )")
                    else if(price.current > "1000000000")
                      setError("( Maximum listing price for an NFT should be less than 1,000,000,000 ETH )")
                    else
                      SetNameError("");
                    
                    
                  }}
                  onChange={(e) => {
                    if(e.target.value.length==0){
                      SetDesError("( Description is required )")
                    }else
                    SetDesError("")
                    if (desLength < 1000) {
                      
                      // checkChanges();
                      let x=e.target.value.replace(/\s+/g, '').length
                      description.current = e.target.value;
                      setDesLength(description.current.length);
                      
                    }
                  }}
                ></textarea>
                <span className="color82">
                  {desLength} of 1000 characters and 
                  <span> <span id="linesUsed">0</span> of 20 Lines.</span>
                </span>
              </div>

              <div className="input-name">
                <label htmlFor="email" className=" input-label">
                  Royalty <span style={{color:"blue",fontWeight:"bold"}}>( Coming Soon) </span>
                </label>
                <p className="headingRoyality">Write down the percentage you want from this sale of this NFT</p>
                <div style={{color:"red",fontSize:"15px"}}>{royalityError}</div> 
                <input
                  type="number"
                  id="royality"
                  className="form-control-1"
                  onWheel={(e)=>e.target.blur()}
                  placeholder="Enter Royalty"
                  autoComplete="off"
                  maxLength="100"
                  style={{
                    border:royalityError!=""?"1px solid red":"1px solid #C8C8C8"
                  }}
                  title=" "
                  disabled={true}
                  onChange={(e)=>{
                    if(+e.target.value > 50)
                    setRoyalityError("( Royalty can not be more than 50% )")
                    else
                    setRoyalityError("")
                  }}
                />
               
              </div>
              
              <div className="mt-3">
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
                {/* <div className="d-flex block-chain-container">
                  <div>
                    <img src={ethereum} height="32px" />
                  </div>
                  <div className="block-chain-right">
                    <select
                      className="input-box-1 rm-border blockchainSelect"
                      onChange={(e) => (blockchain.current = e.target.value)}
                    >
                      <option selected value="eth" className="color82">
                        Ethereum
                      </option>
                    </select>
                  </div>
                </div> */}
                <div className="block-chain-right">
                  <Select
                    className="input-box-1 rm-border blockchainSelect"
                    defaultValue={blockchainOption[0]}
                    onChange={setSelectedOption}
                    options={blockchainOption}
                    placeholder="Select Blockchain"
                    value={selectedOption}
                  >
                  </Select>
                </div>
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="submit-button"
                style={{ opacity: !enabled ? 0.6 : 1 }}
                disabled={!enabled}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ---------------- */}
      {/* <div className="mint-mod-outer"> */}

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
