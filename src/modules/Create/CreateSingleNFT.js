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

const Button = styled.button``;

function CreateSingleNFT( props,Single) {


  const [firstName, setFirstName] = useState("")
  const [price, setPrice] = useState("")
  const [nftFile, setNftFile] = useState(null);

  const [nftName, setNftName] = useState("")
  const [description, setDescription] = useState("")
  const [collection, setCollection] = useState("")
  const [blockchain, setBlockchain] = useState("")

  const [allUserCount, setAllUserCount] = useState("")



  let dispatch = useDispatch();

  const userdata = useSelector((state) => state.user.addUserData);
  const alluserdata = useSelector((state) => state.user.allUserData);
  const errorDATA = useSelector((state) => state.error.errorsData);
  console.log("userdata : ", userdata);
  console.log("errorDATA : ", errorDATA);
  const addIPFS = async () => {
    console.log("-----------------------------ll")
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


  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    Single.handleFile(fileUploaded);
  };

  return (
    <>
      <div>
        <div className="text-center mt-5">
          <h4 className="create-nft-font">Create NFT</h4>
        </div>
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
                  <input type ="file"></input>
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
                    <input type="text" className="form-control" onChange={(e) => setPrice(e.target.value)} value={nftName} />
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

export default CreateSingleNFT;
