import React, { useState } from "react";
// const [bannerCdn, setbannerCdn] = useState("");
// const [bannerIpfs, setbannerIpfs] = useState("");
import { useDropzone } from "react-dropzone";
import Image from "../../assets/images/img-format.png";

import Utils from "../../utility";
import BlockchainServices from "../../services/blockchainService";
import getCollection from "../../services/contentMicroservice";
function Bannerdrop({ bannerCdn, setbannerIpfs, setbannerCdn, bannerIpfs }) {
  const [isBannerSelected, setisBannerSelected] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
     
      console.log(getInputProps, "<<<<<<", getRootProps, "<<<props");
      let formData = new FormData();
      formData.append(
        "attachment",
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )[0]
      );
      // const [err, ipfsRes] = addIPFS(formData)

      (async () => {
        const [err, ipfsRes] = await Utils.parseResponse(
          getCollection.addIpfs(formData)
        );
        if (err || !ipfsRes.ipfsUrl) {
          //   toast.error("Unable to add file to IPFS");
        } else {
          // alert("banner");
          console.log(ipfsRes, "<<<<ipfs Res");

          setbannerIpfs(ipfsRes.ipfsUrl);
          setbannerCdn(ipfsRes.cdnUrl);
          setisBannerSelected(true);
        }
      })();
    },
  });

  return (
    <>
      {" "}
      <div style={{ width: "100%" }}>
        {!isBannerSelected && (
            <div className="img-sec-div" {...getRootProps()}>
              <input {...getInputProps()} name="banner" />
              <img
                src={Image}
                alt="upload-icon"
                className="upload-icon"
              />
              <p className="fs-14 fw-b pt-20">Drag & Drop or <span style={{color:"#366EEF"}}>Browse</span></p>
            </div>
        )}
        {isBannerSelected && (
          <div className="img-sec-div" {...getRootProps()}>
            <input {...getInputProps()} name="banner" />
            <img
              src={bannerCdn != "" ? bannerCdn : Image}
              alt="upload-icon"    
              className="upload-icon"            
            />
            <p className="fs-14 fw-b pt-20">Drag & Drop or <span style={{color:"#366EEF"}}>Browse</span></p>
          </div>
        )}
      </div>
    </>
  );
}

export default Bannerdrop;
