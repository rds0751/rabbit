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
      // setSelectFile(
      //   acceptedFiles.map((file) =>
      //     Object.assign(file, {
      //       preview: URL.createObjectURL(file),
      //     })
      //   )
      // );
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
          <span>
            <div className="draganddropboxbanner" {...getRootProps()}>
              <input {...getInputProps()} name="banner" />
              <div className="draganddropboxinnerdiv">
                <img
                  src={Image}
                  style={{
                    width: "70%",
                    // marginTop: "3em",
                    color: "#366EEF",
                  }}
                />
                <span className="draganddropboxinnerdivtextspan">
                  Drag and Drop or
                  <span className="draganddropboxinnerdivtextspanbrowse">
                    {" "}
                    Browse
                  </span>
                </span>
              </div>
            </div>
          </span>
        )}
        {isBannerSelected && (
          <div className="draganddropbox" {...getRootProps()}>
            <input {...getInputProps()} name="banner" />
            <div className="draganddropboxinnerdiv">
              <img
                src={bannerCdn != "" ? bannerCdn : Image}
                style={{
                  width: "100%",
                  height: "100%",
                  // marginTop: "3em",
                  color: "#366EEF",
                }}
              />
              {/* <span className="draganddropboxinnerdivtextspan">
                Drag and Drop or
                <span className="draganddropboxinnerdivtextspanbrowse">
                  {" "}
                  Browse
                </span>
              </span> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Bannerdrop;
