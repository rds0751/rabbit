import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Image from "../../assets/images/1.jpg";
import "../../assets/styles/Myitems.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UpperMyItems from "../../common/components/UpperMyItems";
import { getNftOwnedByUser } from "../../services/contentMicroservice";
import { getCollectionOwnedByUser } from "../../services/contentMicroservice";
import { useSelector } from "react-redux";

function MyItems() {


  const [activeInActive, setActiveInActive] = useState("active");
  const [toggleSelect, setToggleSelect] = useState(true);
  const item = localStorage.setItem('keyValue', 'dataToPersist')
  const Item = localStorage.getItem('keyValue')

  const [ownedNft, setownedNft] = useState([]);

  useEffect(async () => {
    await getNftOwnedByUser().then((response) => setownedNft(response));
  }, []);
  console.log("Nft Owned by user", ownedNft);




  const [ownedCollection, setownedCollection] = useState([]);
  useEffect(async () => {
    await getCollectionOwnedByUser().then((response) => setownedCollection(response));
  }, []);
  console.log("Srinivas Collections Owned by user", ownedCollection);



  // const [userId, setUserId] = useState("");


  // const [checkClick, setcheckClick] = useState(false);
  // const { user } = useSelector((state) => state);
  // const navigate = useNavigate();
  // const [isloading, setIsloading] = useState(false);

  // const { loggedInUser } = user;
  // useEffect(() => {
  //   setUserId(loggedInUser._id)
  //   // console.log()
  //   console.log("logged user", loggedInUser._id)

  //   if (loggedInUser == null) {
  //     navigate("/my-profile");
  //     navigate("/add-wallet");
  //   } else {
  //     setIsloading(true);
  //     getOwnedByNft();

  //     setIsloading(false);
  //   }

  // }, []);

  // const getOwnedByNft = () => {
  //   NftOwnedByUser((response) => {
  //     console.log(response, "myprofile");
  //     if (response.success) {
  //       setownedNft(response.responseData);
  //     } else {
  //       toast.error(response.msg);
  //     }
  //   }, loggedInUser._id);
  // };



  return (
    <>
      <div className="myItemspage">
        {/* ----- Toggle Upper Part */}
        <div className="my-item-container">
          <div className="">
            <h1 className="poppins-normal bold-600 font-20 blackish mb-0">
              My Items
            </h1>
          </div>

          <div className="toggle-items">
            <div
              onClick={() => setToggleSelect(true)}
              className="font-16 bold-bold poppins-normal"
              style={{

                color: toggleSelect ? "#191919" : "#828282",
                borderBottom: toggleSelect ? "3px solid #366EEF" : "none",
                cursor: "pointer",
              }}
            >
              Single
            </div>
            <div
              onClick={() => setToggleSelect(false)}
              className="font-16 bold-bold poppins-normal"
              style={{
                marginLeft: "18px",
                color: !toggleSelect ? "#191919" : "#828282",
                borderBottom: !toggleSelect ? "3px solid #366EEF" : "none",
                cursor:"pointer",
              }}
            >
              Collections
            </div>
          </div>
          {toggleSelect ?
            <button type="submit" className="add-item-button p-0 bord-rad-4">
              <Link
                to="/create-nft"
                style={{ textDecoration: "none", color: '#FFFFFF' }}>
                Add item
              </Link>
            </button>
            :
            <button type="submit" className="add-item-button p-0 bord-rad-4">
              <Link
                to="/create-nft" style={{ textDecoration: "none", color: '#FFFFFF' }}>
                Create Collection
              </Link>
            </button>
          }
        </div>

        {/* ----------- */}

        {toggleSelect && (
          <div style={{ marginTop: "40.12px", marginLeft: 'auto', rowGap: "50px" }} className="row">
            {ownedNft.map((curElem) => {
              const { cdnUrl, name, _id } =
                curElem;
              const route = "/nft-information/" + _id;
              return (

                <div className=" col-md-6 col-lg-3  col-sm-12 nft_card my-item-card p-0" >
                  <div className="card nft-card-radius border-radius cardmob">
                    <Link to={route} style={{ textDecoration: "none" }}>
                      <img
                        className="nftTileEachImage img-fluid border-radius card_imgmob"
                        src={cdnUrl}
                        alt="nft-img"
                        style={{ height: "187px", borderTopLeftRadius: '13px', borderTopRightRadius: '13px' }}
                      />
                    </Link>
                    <div
                      className="nftTileEachDetails card-lower"
                      style={{
                        padding: "0px 14px 0px 12px",
                      }}
                    >
                      <div className="nftTileEachDetailsFirstContainer container__up">
                        <div
                          className="nftTileEachDetailsFirstContainerName"
                          style={{
                            color: "#191919",
                            // height: "20px",
                            overflow: "hidden",
                          }}
                        >
                          {name}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              );
            })}
          </div>
        )}
        {!toggleSelect && (
          <div style={{ marginLeft: 'auto', rowGap: "50px" }} className="row">
            {ownedCollection.map((curElem) => {
              const { imageUrl, name, _id } =
                curElem;
              const collection = "/collection-details/" + _id;
              return (
                <div className="col-md-6 col-lg-3 col-sm-12 mt-5 my-item-card p-0">
                  < div
                    className=" nft-card-radius collection-card border-radius pt-4 cardmob"
                    style={{ backgroundColor: "#F8F8F8" }
                    }
                  >
                    <div className="text-center">
                      <Link to={collection} style={{ textDecoration: "none" }}>
                        <img
                          className="img-fluid border-radius collection-img-card-radius collection_imgmob"
                          src={imageUrl}
                          alt="nft"
                          style={{
                            width: "100px",
                            height: "100px",
                            textDecoration: "none",
                          }}
                        />
                      </Link>
                    </div>
                    <div className="text-center pt-3">
                      <p
                        className="collectionCardEachName text-center font-weight-900"
                        style={{ color: "#191919" }}
                      >
                        {name}
                      </p>
                      <p className="collectionCardEachTotalitems">
                        <span className=" font-14 text-dark">
                          Total Items:
                          <span className="text-primary">2</span>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        )}
      </div>
    </>
  );
}

export default MyItems;
