import React from "react";
import { Link } from "react-router-dom";
import Single from "../../assets/images/single.png";
import Collection from "../../assets/images/collection.png";
function CreateNFT() {
  return (
    <div>
      <div className="container">
        <div className="text-center mt-4">
          <h4 className="create-nft-font">Create NFT</h4>
        </div>
        <div className="row">
          <div
            className="col-md-3 col-lg-3 col-sm-6 col-12 my-5 offset-sm-3"
            style={{ cursor: "pointer" }}
          >
            <div className="card card-border card-height card-width create_card_mob">
              <div className="card-body text-center mt-5">
                <Link to="/create-single-nft">
                  <img src={Single} alt="Single" className="create_imgmob" />
                </Link>
              </div>
            </div>
            <div className="text-center mt-4">
              <h5 className="bottom-heading-font">Single</h5>
            </div>
          </div>
          <div
            className="col-md-3 col-lg-3 col-sm-6 col-12 my-5 "
            style={{ cursor: "pointer" }}
          >
            <div className="card card-border card-height card-width mx-3 create_card_mob ">
              <div className="card-body text-center mt-5">
                <Link to="/create-nft-collection">
                  <img
                    src={Collection}
                    alt="Single"
                    className="create_imgmob"
                  />
                </Link>
              </div>
            </div>
            <div className="text-center">
              <h5 className="bottom-heading-font mt-4">Collection</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNFT;
