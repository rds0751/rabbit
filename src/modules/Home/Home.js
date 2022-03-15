import React, { useEffect, useState } from "react";
import {Button, Container, Row, Col, Card } from "react-bootstrap";
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
import Image4 from '../../assets/images/Image4.png';

function Home() {
  return(
    <>
      <div className="homepage">
        <div className="banner">
          <div className="inner-width">
            <Container fluid>
              <Row>
                <Col lg={6}>
                  <div className="left-text">
                    <h1 className="heading">Buy, Trade and Sell your <br></br>NFTs</h1>
                    <p className="text">One stop solution for all types of NFTs</p>
                    <Button variant="custom">Explore</Button>
                    <Button variant="custom">Create</Button>
                  </div>  
                </Col>
                <Col lg={6}>
                  <div className="right-slider">
                    <OwlCarousel className='owl-theme' margin={10} items={1}>
                      <div className='item'>
                        <div className="d-flex flex-wrap">
                          <Card>
                            <Card.Img variant="top" src={Image1}/>
                            <Card.Body>
                              <div className="d-flex align-items-start media">
                                <div className="flex-shrink-0">
                                  <img src={Image1} alt="Image1" width="38px" height="38px" className="profile-img"/>
                                </div>
                                <div className="flex-grow-1 ms-2">
                                  <h3 className="title">Swoard Art online</h3>
                                  <p className="description">Xwarrior</p>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                          <Card>
                            <Card.Img variant="top" src={Image2}/>
                            <Card.Body>
                              <div className="d-flex align-items-start media">
                                <div className="flex-shrink-0">
                                  <img src={Image2} alt="Image1" width="38px" height="38px" className="profile-img"/>
                                </div>
                                <div className="flex-grow-1 ms-2">
                                  <h3 className="title">Revenge of the Val</h3>
                                  <p className="description">Mr Lazy</p>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                          <Card>
                            <Card.Img variant="top" src={Image3}/>
                            <Card.Body>
                              <div className="d-flex align-items-start media">
                                <div className="flex-shrink-0">
                                  <img src={Image3} alt="Image1" width="38px" height="38px" className="profile-img"/>
                                </div>
                                <div className="flex-grow-1 ms-2">
                                  <h3 className="title">Magic crystal</h3>
                                  <p className="description">Xwarrior</p>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                          <Card>
                            <Card.Img variant="top" src={Image4}/>
                            <Card.Body>
                              <div className="d-flex align-items-start media">
                                <div className="flex-shrink-0">
                                  <img src={Image4} alt="Image1" width="38px" height="38px" className="profile-img"/>
                                </div>
                                <div className="flex-grow-1 ms-2">
                                  <h3 className="title">The Gang</h3>
                                  <p className="description">Mr Lazy</p>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                            
                        </div>                   
                      </div>
                      <div className='item'>
                        <div className="d-flex flex-wrap">
                          <Card>
                            <Card.Img variant="top" src={Image1}/>
                            <Card.Body>
                              <div className="d-flex align-items-start media">
                                <div className="flex-shrink-0">
                                  <img src={Image1} alt="Image1" width="38px" height="38px" className="profile-img"/>
                                </div>
                                <div className="flex-grow-1 ms-2">
                                  <h3 className="title">Swoard Art online</h3>
                                  <p className="description">Xwarrior</p>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                          <Card>
                            <Card.Img variant="top" src={Image2}/>
                            <Card.Body>
                              <div className="d-flex align-items-start media">
                                <div className="flex-shrink-0">
                                  <img src={Image2} alt="Image1" width="38px" height="38px" className="profile-img"/>
                                </div>
                                <div className="flex-grow-1 ms-2">
                                  <h3 className="title">Revenge of the Val</h3>
                                  <p className="description">Mr Lazy</p>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                          <Card>
                            <Card.Img variant="top" src={Image3}/>
                            <Card.Body>
                              <div className="d-flex align-items-start media">
                                <div className="flex-shrink-0">
                                  <img src={Image3} alt="Image1" width="38px" height="38px" className="profile-img"/>
                                </div>
                                <div className="flex-grow-1 ms-2">
                                  <h3 className="title">Magic crystal</h3>
                                  <p className="description">Xwarrior</p>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                          <Card>
                            <Card.Img variant="top" src={Image4}/>
                            <Card.Body>
                              <div className="d-flex align-items-start media">
                                <div className="flex-shrink-0">
                                  <img src={Image4} alt="Image1" width="38px" height="38px" className="profile-img"/>
                                </div>
                                <div className="flex-grow-1 ms-2">
                                  <h3 className="title">The Gang</h3>
                                  <p className="description">Mr Lazy</p>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                            
                        </div>                   
                      </div>
                    </OwlCarousel>
                  </div>
                </Col>
              </Row>
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Img variant="top" src={Collection} />
                <Card.Body>
                  <Card.Title>Create Collection</Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Img variant="top" src={NFTs} />
                <Card.Body>
                  <Card.Title>Add NFTs</Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Img variant="top" src={Sale} />
                <Card.Body>
                  <Card.Title>List them for sale</Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
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
                  <img src={Category} alt="Category" width="60px" height="60px"/>
                </div>
                <div className="flex-grow-0 ms-3">
                  Browse by Category
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center media">
                <div className="flex-shrink-0">
                  <img src={Stats} alt="Stats" width="60px" height="60px" />
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
                  Easy to sell and buy NFT
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center media">
                <div className="flex-shrink-0">
                  <img src={Offers} alt="Offers" width="60px" height="60px" />
                </div>
                <div className="flex-grow-0 ms-3">
                  Make offers on NFTs
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center media">
                <div className="flex-shrink-0">
                  <img src={Activity} alt="Activity" width="60px" height="60px" />
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