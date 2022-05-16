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
import NoItem from "../../assets/images/Noitems.svg"
import Ethereum from "../../assets/images/ether.svg";
import Polygon from "../../assets/images/ploygon.svg";
import Binance from "../../assets/images/binance.svg";
import { fetchPalletsColor } from "../../utility/global";

function MyItems() {

  const appearance = useSelector(state =>  state.customize.appearance);

  const [activeInActive, setActiveInActive] = useState("active");
  const [toggleSelect, setToggleSelect] = useState(true);


  const [ownedNft, setownedNft] = useState([]);
  const { user } = useSelector((state) => state);
  const { loggedInUser } = user;
  if (loggedInUser) { localStorage.setItem('userId', loggedInUser._id); }
  let userId = (loggedInUser) ? loggedInUser._id : localStorage.userId;

  useEffect(async () => {
    await getNftOwnedByUser(userId).then(res => setownedNft(res));
  }, []);


  const [ownedCollection, setownedCollection] = useState([]);
  useEffect(async () => {
    await getCollectionOwnedByUser(userId).then(res => setownedCollection(res));
  }, []);

  const blockchainCheck=(blockchain)=>{
    switch(blockchain){
      case 'Ethereum':
      return <img className="currency-sign" src={Ethereum}></img>
      case 'Polygon':
      return <img  className="currency-sign" src={Polygon}></img>
      case 'Binance':
      return <img className="currency-sign" src={Binance}></img>
      default:
        return '';
    }
    
  }


  return (
    <>
      <div className="myItemspage">
        {/* ----- Toggle Upper Part */}
        <div className="my-item-container">
          <div className="">
            <h1 className="poppins-normal bold-600 font-20 blackish mb-0  headingtag">
              My Items
            </h1>
          </div>

          <div className="toggle-items">
            <div
              onClick={() => setToggleSelect(true)}
              className="font-16 bold-bold poppins-normal singleheading"
              style={{

                color: toggleSelect ? "#191919" : "#828282",
                borderBottom: toggleSelect ? `3px solid ${fetchPalletsColor(appearance.colorPalette)}` : "none",
                cursor: "pointer",
                borderRadius: "2px",
              }}
            >
              Single
            </div>
            <div
              onClick={() => setToggleSelect(false)}
              className="font-16 bold-bold poppins-normal collectionHeading"
              style={{
                marginLeft: "18px",
                color: !toggleSelect ? "#191919" : "#828282",
                borderBottom: !toggleSelect ? `3px solid ${fetchPalletsColor(appearance.colorPalette)}` : "none",
                cursor: "pointer",
                borderRadius:"3px",
              }}
            >
              Collections
            </div>
          </div>
          {toggleSelect ?
            <button type="submit" className="add-item-button p-0 bord-rad-4" style={{background: `${fetchPalletsColor(appearance.colorPalette)}`}}>
              <Link
                to="/create-single-nft"
                style={{ textDecoration: "none", color: '#FFFFFF' }}>
                Add item
              </Link>
            </button>
            :
            <button type="submit" className="add-item-button p-0 bord-rad-4" style={{background: `${fetchPalletsColor(appearance.colorPalette)}`}}>
              <Link
                to="/create-nft-collection" style={{ textDecoration: "none", color: '#FFFFFF' }}>
                Create Collection
              </Link>
            </button>
          }
        </div>

        {/* ----------- */}

        {toggleSelect && (
          <div style={{ marginTop: "40.12px", marginLeft: 'auto', rowGap: "50px",marginBottom: "113px" }} className="row">

            {ownedNft.length > 1 ?(
              ownedNft.map((curElem) => {
                const { cdnUrl, name, _id,salesInfo,likes,compressedURL,blockchain} =
                  curElem;
                const route = "/nft-information/" + _id;
                return (
  
                  <div className=" col-md-6 col-lg-3  col-sm-12 nft_card my-item-card p-0" >
                    <div className="card nft-card-radius border-radius cardmob">
                      <Link to={route} style={{ textDecoration: "none" }}>
                        <img
                          className="nftTileEachImage img-fluid border-radius card_imgmob"
                          src={compressedURL}
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
                            className="nftTileEachDetailsFirstContainerName myItemNFT"
                          >
                            {name}
                          </div>
                         <span className="priceTag"> 
                         {blockchainCheck(blockchain)}
                         {`${salesInfo?.price}  ${salesInfo?.currency}`}
                         </span>
                         
                        </div>
                        <div className="likeCount" title="Like Count">
                        {likes?.length}
                        <i
                          className="fa-solid fa-heart"
                          style={{ color: "#ef3643",marginLeft:"8.5px"}}
                        />
                          </div>
                      </div>
                    </div>
                  </div>
                  
  
                );
              })

            ):(<div>
              <div className="Noitemdiv">
                <img className="no-image" src={NoItem}/>
                <p className="textitem">No items available</p>
                </div>
              </div>) }
            

           
          </div>
        )}
        {!toggleSelect && (
          <div style={{ marginLeft: 'auto', rowGap: "50px",marginBottom: "107px" }} className="row">
            {ownedCollection.length > 1 ? (
              ownedCollection.map((curElem) => {
                const { imageUrl, name, _id,nftCount } =
                  curElem;
                const collection = "/collection-details/" + _id;
                return (
                  <div className="col-md-6 col-lg-3 col-sm-12 mt-5 my-item-card p-0 collectioncard">
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
                        <div>
                        <p className="collectionCardEachTotalitems">
                          <span className=" font-14 text-dark">
                            Total Items:
                            <span className="text-primary total-nft-collection">{nftCount}</span>
                          </span>
                        </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })

            ):(
              <div>
              <div className="Noitemdiv">
                <img className="no-image" src={NoItem}/>
                <p className="textitem">No items available</p>
                </div>
              </div>)}
              
            {/* {ownedCollection.map((curElem) => {
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
                          <span className="text-primary">0</span>
                          {console.log("kkkkkkkkkkkkkk",curElem)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })} */}
          </div>

        )}
      </div>
    </>
  );
}

export default MyItems;
