import React, { useEffect } from "react";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
// useEffect(() => {
  

//   return () => {};
// }, []);

function About() {
  return (
    <>
      <div className="container">
        <div className="text-center mt-5 ml-0 mr-0">
          <p className="font-32 font-weight-700">About NFT marketplace</p>
          <p className="font-16 mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            <br /> Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            <br /> dolor in reprehenderit in voluptate velit esse cillum dolore
            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non{" "}
            <br /> proident, sunt in culpa qui officia deserunt mollit anim id
            est laborum
          </p>
          <p className="mt-4 font-16">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam,
            <br /> eaque ipsa quae ab illo inventore veritatis et quasi
            architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam <br />{" "}
            voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
            consequuntur magni dolores eos qui ratione voluptatem <br /> sequi
            nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit
            amet, consectetur, adipisci velit, sed quia
          </p>
          <h6 className="font-18 font-weight-700 mt-4">
            NFT marketplace in numbers
          </h6>
        </div>
      </div>
      <div className="container">
        <div className="row text-center mt-5">
          <div className="col-sm-3"></div>
          <div className="col-sm-2 col-12">
            <p className="text-primary font-weight-700 font-22 ">$274M</p>
            <p className="font-16">Trading volume</p>
          </div>
          <div className="col-sm-2 col-12">
            <p className="text-primary font-weight-700 font-22">405K</p>
            <p className="font-16">NFTs created</p>
          </div>
          <div className="col-sm-2 col-12">
            <p className="text-primary font-weight-700 font-22">1.6M</p>
            <p className="font-16">Total users</p>
          </div>
          <div className="col-sm-3"></div>
        </div>
        <div className="row mt-5">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <div
              className="card cardmob"
              style={{ borderRadius: "7px", width: "300px" }}
            >
              <h6 className="text-center font-14 font-weight-700 mt-2">
                <MailOutlineIcon
                  style={{ fontSize: "35px" }}
                  className="text-primary"
                />
                Contact Us:{" "}
                <a href="mailto:nftmarketplace.com">nftmarketplace.com</a>
              </h6>
            </div>
          </div>
          <div className="col-sm-4"></div>
        </div>
      </div>
    </>
  );
}

export default About;
