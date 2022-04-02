import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link ,useNavigate} from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "../../assets/styles/homepage.css";
import Wallet from '../../assets/images/Wallet-home.png';
import Sale from '../../assets/images/Sale.png';
import NFTs from '../../assets/images/NFTs.png';
import Collection from '../../assets/images/Collection-home.png';
import Category from '../../assets/images/Category.png';
import Activity from '../../assets/images/Activity.png';
import Easy from '../../assets/images/Easy.png';
import Offers from '../../assets/images/Offers.png';
import Stats from '../../assets/images/Stats.png';
import Image1 from '../../assets/images/Image1.png';
import Image2 from '../../assets/images/Image2.png';
import Image3 from '../../assets/images/Image3.png';
import {
  RedirectTo
} from "../../reducers/Action";
// import { Link, useLocation } from "react-router-dom";

import {
  getNfts,
  addLikeNft,
  getNFtsData,
} from "../../services/webappMicroservice";
import Image4 from '../../assets/images/Image4.png';
import { toast } from "react-toastify";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";





function Home() {
  const { user, sideBar } = useSelector((state) => state);
  const { userDetails, loggedInUser, walletAddress } = user;
  const [nfts, setNfts] = useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [changeState, setChangeState] = useState(0);

  const [filterType, setFilterType] = useState({
    sort: '-1',
  });

  useEffect(async () => {
    // checkapi();
    // setTimeout(6000);

    // setIsloading(true);
    // getNfts(defaultReq).then((response) => {
    // if(nfts.length==0){
    // const myTimeout = setTimeout(100000);
    console.log("API data")
    try {
      if (changeState === 0) {
        getNFtsData({}, (res) => {

          // console.log(res, "filterResponse");
          console.log("fkfsffksfsw", res)
          if (res.success) {
            console.log("data check", res?.responseData?.nftContent)
            // prevArray => [...prevArray, newValue]
            setNfts(res?.responseData?.nftContent);
            setChangeState(1);

            // setNfts([nfts,res.responseData.nftContent]);
            // setIsloading(false);
          } else {
            toast.error(res.message);
            // setIsloading(false);
          }

        });
      }
    }
    catch (error) { console.log("error message", error) }
    // }
    // else{
    //   console.log("its else statement")
    // }
  }, [nfts]);
  // setInterval(() => {
  console.log("ffffffffffffffffssssssssssssssss", nfts)
  // }, 5000);
  const createHandle = () => {
    if (walletAddress == null) {
      dispatch(RedirectTo("create"));
      navigate("/add-wallet");
      toast.error("Connect your wallet", {
        position: toast.POSITION.TOP_RIGHT
      });
    } else {
      navigate("/create-nft");
    }
  }
  return (
    <>
      <div className="homepage">
        <div className="banner">
          <div className="inner-width">
            <Container fluid>
              <Row>
                <Col lg={6}>
                  <div className="left-text">
                    <h1 className="heading">Buy, Trade and Sell your <br></br>NFTs</h1>
                    <p className="mob-heading">Buy, Trade and Sell your NFTs</p>

                    <p className="text">One stop solution for all types of NFTs</p>
                    <div style={{display:"flex"}}>
                    <Button href="/nfts" variant="custom" className="button-hide">
                      Explore
                    </Button>
                    <Button onClick={createHandle} variant="custom"   className="button-hide">
                      Create
                    </Button>
                    </div>

                  </div>
                </Col>
                <Col lg={6} className="carousel-hide">
                  <div className="right-slider">
                    <OwlCarousel className='owl-theme z-carousel' margin={10} items={1}>
                      <div className='item'>
                        {/* {console.log("kkkkkkkkkkkkkkkkkkkkk",nfts)} */}

                        <div className="d-flex flex-wrap">
                          {console.log("sssssssqqqqsqqsqsqqwswwwwwwwww", nfts)}

                          {nfts.length && nfts.slice(0, 4).map((nft) => {
                            // const { _id, cdnUrl, name, biddingDetails, salesInfo } = nft;

                            return (
                              <>
                                {/* <img src={nft?.cdnUrl}></img> */}
                                <Card>
                                  <Link to={"/nft-information/" + nft?._id} style={{ textDecoration: 'none' }}>
                                    <Card.Img variant="top" src={nft?.cdnUrl} />
                                  </Link>
                                  <Card.Body>
                                    <div className="d-flex align-items-start media">
                                      <div className="flex-shrink-0">
                                        <img src={nft?.cdnUrl} alt="Image1" width="38px" height="38px" className="profile-img" />
                                      </div>
                                      <div className="flex-grow-1 ms-2">
                                        <h3 className="title"><Link to={"/nft-information/" + nft?._id} style={{ textDecoration: 'none' }}>{nft?.name}</Link></h3>
                                        {/* {let n = nft?.description.split(' ')} */}
                                        <span
                                          className="nftTileEachDetailsFirstContainerValue"
                                        >
                                          {`${nft?.salesInfo?.price}  ${nft?.salesInfo?.currency}`}
                                        </span>
                                        {/* <p className="description">{nft?.description}</p> */}

                                      </div>
                                    </div>
                                  </Card.Body>
                                </Card>

                                {/* <Card>
                            <Card.Img variant="top" src={Image2} />
                            <Card.Body>
                              <div className="d-flex align-items-start media">
                                <div className="flex-shrink-0">
                                  <img src={Image2} alt="Image1" width="38px" height="38px" className="profile-img" />
                                </div>
                                <div className="flex-grow-1 ms-2">
                                  <h3 className="title">Revenge of the Val</h3>
                                  <p className="description">Mr Lazy</p>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                          <Card>
                            <Card.Img variant="top" src={Image3} />
                            <Card.Body>
                              <div className="d-flex align-items-start media">
                                <div className="flex-shrink-0">
                                  <img src={Image3} alt="Image1" width="38px" height="38px" className="profile-img" />
                                </div>
                                <div className="flex-grow-1 ms-2">
                                  <h3 className="title">Magic crystal</h3>
                                  <p className="description">Xwarrior</p>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                          <Card>
                            <Card.Img variant="top" src={Image4} />
                            <Card.Body>
                              <div className="d-flex align-items-start media">
                                <div className="flex-shrink-0">
                                  <img src={Image4} alt="Image1" width="38px" height="38px" className="profile-img" />
                                </div>
                                <div className="flex-grow-1 ms-2">
                                  <h3 className="title">The Gang</h3>
                                  <p className="description">Mr Lazy</p>
                                </div>
                              </div>
                            </Card.Body>
                          </Card> */}


                              </>
                            );
                          })
                          }

                        </div>
                      </div>
                      <div className='item'>
                        <div className="d-flex flex-wrap">
                          {nfts.length && nfts.slice(4, 8).map((nft) => {
                            return (
                              <>
                                {console.log("kdkdkddkkdkkkkkkkkkkk", nft)}
                                <Card>
                                  <Link to={"/nft-information/" + nft?._id} style={{ textDecoration: 'none' }}>
                                    <Card.Img variant="top" src={nft?.cdnUrl} />
                                  </Link>
                                  <Card.Body>
                                    <div className="d-flex align-items-start media">
                                      <div className="flex-shrink-0">
                                        <div>

                                          <img src={nft?.cdnUrl} alt="Image1" width="38px" height="38px" className="profile-img" />
                                        </div>
                                        <div className="flex-grow-1 ms-2">
                                          <h3 className="title"><Link to={"/nft-information/" + nft?._id} style={{ textDecoration: 'none' }}>{nft?.name}</Link></h3>
                                        </div>
                                        <span
                                          className="nftTileEachDetailsFirstContainerValue"
                                        >
                                          {`${nft?.salesInfo?.price}  ${nft?.salesInfo?.currency}`}
                                        </span>
                                        {/* <p className="description">{nft?.salesInfo.price} </p> */}
                                      </div>
                                    </div>
                                  </Card.Body>
                                </Card>
                                {/* <Card>
                            <Card.Img variant="top" src={Image1} />
                            <Card.Body>
                              <div className="d-flex align-items-start media">
                                <div className="flex-shrink-0">
                                  <img src={Image1} alt="Image1" width="38px" height="38px" className="profile-img" />
                                </div>
                                <div className="flex-grow-1 ms-2">
                                  <h3 className="title">Swoard Art online</h3>
                                  <p className="description">Xwarrior</p>
                                </div>
                              </div>
                            </Card.Body>
                          </Card> */}
                                {/* <Card>
                            <Card.Img variant="top" src={Image2} />
                            <Card.Body>
                              <div className="d-flex align-items-start media">
                                <div className="flex-shrink-0">
                                  <img src={Image2} alt="Image1" width="38px" height="38px" className="profile-img" />
                                </div>
                                <div className="flex-grow-1 ms-2">
                                  <h3 className="title">Revenge of the Val</h3>
                                  <p className="description">Mr Lazy</p>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                          <Card>
                            <Card.Img variant="top" src={Image3} />
                            <Card.Body>
                              <div className="d-flex align-items-start media">
                                <div className="flex-shrink-0">
                                  <img src={Image3} alt="Image1" width="38px" height="38px" className="profile-img" />
                                </div>
                                <div className="flex-grow-1 ms-2">
                                  <h3 className="title">Magic crystal</h3>
                                  <p className="description">Xwarrior</p>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                          <Card>
                            <Card.Img variant="top" src={Image4} />
                            <Card.Body>
                              <div className="d-flex align-items-start media">
                                <div className="flex-shrink-0">
                                  <img src={Image4} alt="Image1" width="38px" height="38px" className="profile-img" />
                                </div>
                                <div className="flex-grow-1 ms-2">
                                  <h3 className="title">The Gang</h3>
                                  <p className="description">Mr Lazy</p>
                                </div>
                              </div>
                            </Card.Body>
                          </Card> */}
                              </>
                            );
                          })
                          }

                        </div>
                      </div>
                    </OwlCarousel>
                  </div>
                {/* mob carousel */}

                </Col>


              </Row>
              <div className=" carousel-show">
                {/* <Slider {...settings}>
            {nfts.length && nfts.slice(4, 8).map((Sdata) => {
              return <img src={Sdata.cdnUrl} alt={Sdata.name}  />;
            })}
          </Slider> */}

                <AwesomeSlider organicArrows={false}>
                  {nfts.length &&
                    nfts.slice(0, 8).map((nft) => {
                      return (
                        <div>
                          {" "}
                          <Card>
                            <Link
                              to={"/nft-information/" + nft?._id}
                              style={{ textDecoration: "none" }}
                            >
                              <Card.Img
                                variant="top"
                                src={nft?.cdnUrl}
                                style={{ height: "243px", width: "365px" }}
                              />
                            </Link>
                            <Card.Body style={{margin:"0 0 0 12%"}}>
                              <div className="d-flex align-items-start media">
                                <div
                                  className="flex-shrink-0"
                                  style={{ width: "253px", display: "flex" }}
                                >
                                  <div>
                                    <img
                                      style={{ borderRadius: "20px" }}
                                      src={nft?.cdnUrl}
                                      alt="Image1"
                                      width="38px"
                                      height="38px"
                                      className="profile-img"
                                    />
                                  </div>
                                  <div className="flex-grow-1 ms-2">
                                    <h3 className="title">
                                      <Link
                                        to={"/nft-information/" + nft?._id}
                                        style={{ textDecoration: "none" }}
                                      >
                                        {nft?.name}
                                      </Link>
                                    </h3>
                                  </div>
                                  <span className="nftTileEachDetailsFirstContainerValue">
                                    {`${nft?.salesInfo?.price}  ${nft?.salesInfo?.currency}`}
                                  </span>
                                  {/* <p className="description">{nft?.salesInfo.price} </p> */}
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </div>
                      );
                    })}
                </AwesomeSlider>
              </div>
              <Col lg={6} className="button-show">
                  <div className="left-text">
                  
                    <Button href="/nfts" variant="custom">
                      Explore
                    </Button>
                    <Button onClick={createHandle} variant="custom">
                      Create
                    </Button>
                  </div>
                </Col>
            </Container>
          </div>
        </div>

        <div className="create-sell-nft">
          <h2 className="heading">Create and sell your NFTs</h2>
          <div className="inner-width">
            <div className="d-flex justify-content-center flex-wrap">
              <Card>
                <Card.Img variant="top" src={Wallet} />
                <Card.Body>
                  <Card.Title>Create Wallet</Card.Title>
                  <Card.Text>
                    Create your wallet on the platform to buy-sell NFTs.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Img variant="top" src={Collection} />
                <Card.Body>
                  <Card.Title>Create Collection</Card.Title>
                  <Card.Text>
                    Create on-chain personalised collections to mint NFTs in those collections.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Img variant="top" src={NFTs} />
                <Card.Body>
                  <Card.Title>Add NFTs</Card.Title>
                  <Card.Text>
                    Create on-chain NFTs to showcase your Art to the world or Sell to the community.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Img variant="top" src={Sale} />
                <Card.Body>
                  <Card.Title>List them for sale</Card.Title>
                  <Card.Text>
                    List your NFTs for sale or as collectibles.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>

        <div className="why-marketplace">
          <h2 className="heading">Why this Marketplace</h2>
          <div className="inner-width">
            <div className="d-flex justify-content-lg-start justify-content-md-center flex-wrap">
              <div className="d-flex align-items-center justify-content-center media">
                <div className="flex-shrink-0">
                  <img src={Category} alt="Category" width="60px" height="60px" />
                </div>
                <div className="flex-grow-0 ms-3">
                &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Browse by Category
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center media">
                <div className="flex-shrink-0">
                &nbsp;&nbsp; <img src={Stats} alt="Stats" width="60px" height="60px" />
                </div>
                <div className="flex-grow-0 ms-3">
                  Stats to show pricing history
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center media">
                <div className="flex-shrink-0">
                  <img src={Easy} alt="Easy" width="60px" height="60px" />
                </div>
                <div className="flex-grow-0 ms-3">
                 &nbsp; &nbsp;&nbsp;Easy to sell and buy NFT
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center media">
                <div className="flex-shrink-0">
                  <img src={Offers} alt="Offers" width="60px" height="60px" />
                </div>
                <div className="flex-grow-0 ms-3">
                &nbsp;&nbsp;  &nbsp; &nbsp;&nbsp;&nbsp; Make offers on NFTs
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center media">
                <div className="flex-shrink-0">
                &nbsp;&nbsp;&nbsp;&nbsp;<img src={Activity} alt="Activity" width="60px" height="60px" />
                </div>
                <div className="flex-grow-0 ms-3">
                  See all the activities on NFT
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Home;