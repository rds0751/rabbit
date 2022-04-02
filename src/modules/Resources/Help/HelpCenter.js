import React from "react";
import { Link } from "react-router-dom";
import "../../../assets/styles/helpcenter.css";
import buying from "../../../assets/images/buying.png";
import selling from "../../../assets/images/selling.png";
import creating from "../../../assets/images/creation.png";
import adding from "../../../assets/images/adding.png";
function HelpCenter() {
  const data = [
    {
      link:"/buying",
      image: buying,
      title: "Buying",
      description:
        "Set up your wallet, connect it to ANAFTO and make purchases for your favourite NFTs.",
    },
    {
      link:"/selling",
      image: selling,
      title: "Selling",
      description:
        "Make your NFTs available for sale either by auction or fixed price listings.",
    },
    {
      link:"/resource-collection",
      image: creating,
      title: "Creating Collection",
      description:
        "Create your personalized on-chain collections. Add description, profile and banner images.",
    },
    {
      link:"/adding-Nfts",
      image: adding,
      title: "Adding Nfts",
      description:
        "Showcase your art by adding your NFTs to the marketplace and making them available for sale.",
    },
  ];

  return (
    <div>
      <div className="help-outer">
        <div className="help-center">Helpcenter</div>
        <div className="card-outer-body">
          {data.map((item, key) => {
            return (
              <>
                <Link to={item.link} className="link">
                  <div className="single-card">
                    <div className="">
                      <div className="">
                        <img src={item.image} />
                        <div className="title-help">{item.title}</div>
                        <div style={{width:"101.4%"}}>
                        <p title={item.description} className="content">{item.description.slice(0,73)+"..."}</p>

                        </div>
                     
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HelpCenter;
