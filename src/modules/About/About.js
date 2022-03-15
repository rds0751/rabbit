import React, { useEffect, useState } from "react";
import { getAboutData } from "../../services/contentMicroservice";
import axios from "axios";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
const dev_url = "https://goi4mbj86f.execute-api.us-east-1.amazonaws.com/dev/"; // need to store it in .env file

function About() {
  const [aboutData, setAboutData] = useState([]);
  useEffect(() => {
    (async () => {
      const url = `${dev_url}api/v1/about/61f7b7a4c017de6244c51144`;
      const { data } = await axios.get(url);
      console.log(data, "<<<in about page");
      setAboutData(data.responseData.about);
    })();

    // return () => {};
  }, []);
  return (
    <>
      <div className="container">
        <div className="text-center mt-5 ml-0 mr-0">
          <p className="font-32 font-weight-700">{aboutData.title}</p>
          <p className="font-16 mt-4">{aboutData.description}</p>
          {/* <p className="mt-4 font-16">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam,
            <br /> eaque ipsa quae ab illo inventore veritatis et quasi
            architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam <br />{" "}
            voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
            consequuntur magni dolores eos qui ratione voluptatem <br /> sequi
            nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit
            amet, consectetur, adipisci velit, sed quia
          </p> */}
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
                <a href="mailto:nftmarketplace.com">{aboutData.contactEmail}</a>
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
