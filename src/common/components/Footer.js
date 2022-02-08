import React from "react";
import "../../assets/styles/Notification.css";

// import './Footer.css'

function Footer() {
  return (
    <>
      <div className='conatiner mobfooter' style={{ backgroundColor: "#FBFBFB", marginTop: "10px" }}>
                <footer className='footermob'>

                    <div className="row mb-0 mt-5 mx-5 row-2 justify-content-xl-around justify-content-sm-between" >
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 pt-4 order-1 footerfix1" >
                            <ul className="list-unstyled" style={{ textAlign: "left" }}>
                                <li className="mt-md-0 mt-0" style={{ fontSize: "18px", color: "#8F8F8F", fontWeight: "bold"}} >Marketplace</li>
                                <li style={{ fontSize: "16px", color: "#8F8F8F", fontWeight: "normal",marginTop: "5px" }}>NFT</li>
                                <li style={{ fontSize: "16px", color: "#8F8F8F", fontWeight: "normal",marginTop: "5px" }}>Collections</li>
                            </ul>

                            <ul className="list-unstyled mobfooter1" style={{ textAlign: "left" }}>
                                <li className="mt-md-0 mt-4" style={{ fontSize: "18px", color: "#8F8F8F", fontWeight: "bold" }}>Leaderboard</li>
                                <li style={{ fontSize: "16px", color: "#8F8F8F", fontWeight: "normal",marginTop: "5px" }}>Top Seller</li>
                                <li style={{ fontSize: "16px", color: "#8F8F8F", fontWeight: "normal",marginTop: "5px" }}>Top Bidder</li>
                                <li style={{ fontSize: "16px", color: "#8F8F8F", fontWeight: "normal",marginTop: "5px" }}>Top Collections</li>
                            </ul>
                            <ul className="list-unstyled mobfooter3" style={{ textAlign: "left" }}>
                                <li className="mt-md-0 mt-0" style={{ fontSize: "18px", color: "#8F8F8F", fontWeight: "bold" }}>Company</li>
                                <li style={{ fontSize: "16px", color: "#8F8F8F", fontWeight: "normal",marginTop: "5px"}}>About </li>

                            </ul>
                            <ul className="list-unstyled mobfooter2" style={{ textAlign: "left" }}>
                                <li className="mt-md-0 mt-0" style={{ fontSize: "18px", color: "#8F8F8F", fontWeight: "bold" }}>Community</li>
                                <li style={{ fontSize: "16px", color: "#8F8F8F", fontWeight: "normal",marginTop: "5px" }}>Help Centers</li>
                                <li style={{ fontSize: "16px", color: "#8F8F8F", fontWeight: "normal",marginTop: "5px" }}>FAQs</li>
                                <li style={{ fontSize: "16px", color: "#8F8F8F", fontWeight: "normal",marginTop: "5px" }}>Suggestions</li>

                            </ul>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 pt-4 order-2 footerfix mobview" >
                            <ul className="list-unstyled" style={{ textAlign: "left" }}>
                                <li className="mt-md-0 mt-0" style={{ fontSize: "18px", color: "#8F8F8F", fontWeight: "bold" }}>Community</li>
                                <li style={{ fontSize: "16px", color: "#8F8F8F", fontWeight: "normal",marginTop: "5px" }}>Help Centers</li>
                                <li style={{ fontSize: "16px", color: "#8F8F8F", fontWeight: "normal",marginTop: "5px" }}>FAQs</li>
                                <li style={{ fontSize: "16px", color: "#8F8F8F", fontWeight: "normal",marginTop: "5px" }}>Suggestions</li>

                            </ul>
                        </div>
                        <div className="col-xl-auto col-lg-6 col-md-6 pt-4 col-sm-6 my-sm-0 order-md-3 order-sm-1 d-flex mobview" >
                            <ul className="list-unstyled footerfix3" style={{ textAlign: "left" }}>
                                <li className="mt-md-0 mt-0" style={{ fontSize: "18px", color: "#8F8F8F", fontWeight: "bold" }}>Company</li>
                                <li style={{ fontSize: "16px", color: "#8F8F8F", fontWeight: "normal",marginTop: "5px"}}>About </li>

                            </ul>
                        </div>


                        <ul className="list-unstyled   mt-0 " style={{ textAlign: "left" }}>
                            <li>
                                <p className="mb-0 pb-0 mt-4 mb-2" style={{ fontSize: "18px", color: "#8F8F8F" }} >Join our Community</p>
                            </li>
                            <li ><i class="fab fa-facebook" ></i><i class="fab fa-twitter"></i><i class="fab fa-instagram"></i></li>
                            <li style={{ fontSize: "18px", color: "#8F8F8F", marginTop: "5px" }}>Subscribe to our newsletter for the latest NFTs </li>
                        </ul>


                        <div className="col-xl-auto text-left col-lg-4 col-md-4 col-sm-6 col-12 pt-4 my-sm-0 order-6 my-auto" style={{ padding: "0px", margin: "0px" }} >
                            <div className="input-group-lg input-group mb-3 mt-md-0 mt-4 ml-0" ><input type="text" className="form-control"
                                placeholder="Your email" aria-label="Recipient's username" aria-describedby="button-addon2"
                                style={{ height: "38px", borderTopLeftRadius: "0.2em", borderBottomLeftRadius: "0.2em" }}
                            />
                                <div className="input-group-append"><button className="btn btn-primary" type="button" id="button-addon2"
                                    style={{ height: "38px", borderTopLeftRadius: "0em", borderBottomLeftRadius: "0em" }}
                                > <b>Submit</b></button></div>
                            </div>


                            <h3 style={{ fontSize: "18px", color: "#8F8F8F", textAlign: "left" }}>About DLT NFT marketplace</h3>
                            <p style={{ fontSize: "16px", color: "#8F8F8F", fontWeight: "normal", textAlign: "left" }} >Lorem ipsum dolor sit amet, consectetur adipiscing<br /> elit, sed do eiusmod tempor incididunt ut labore et<br /> dolore magna aliqua. Ut enim ad minim veniam.</p>

                        </div>
                    </div>


                </footer>
            </div >
    </>
  );
}

export default Footer;
