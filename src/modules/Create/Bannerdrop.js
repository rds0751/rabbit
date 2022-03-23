import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
// const [bannerCdn, setbannerCdn] = useState("");
// const [bannerIpfs, setbannerIpfs] = useState("");
import { useDropzone } from "react-dropzone";
import Image from "../../assets/images/img-format.svg";

import Utils from "../../utility";
import BlockchainServices from "../../services/blockchainService";
import getCollection from "../../services/contentMicroservice";
import { Oval } from "react-loader-spinner";

function Bannerdrop({ bannerCdn, setbannerIpfs, setbannerCdn, bannerIpfs }) {



  const [isBannerSelected, setisBannerSelected] = useState(false);
  const[isloader,setisLoader]=useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxSize: "10485760",
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
        setisLoader(true);
        const [err, ipfsRes] = await Utils.parseResponse(
          getCollection.addIpfs(formData)
        );
        if (err || !ipfsRes.ipfsUrl) {
          toast.error("File is not acceptable");
          setisLoader(false);
        } else {
          
          // alert("banner");
          console.log(ipfsRes, "<<<<ipfs Res");

          setbannerIpfs(ipfsRes.ipfsUrl);
          setbannerCdn(ipfsRes.cdnUrl);
          setisLoader(false);
          setisBannerSelected(true);
        }
      })();
    },
  });

  return (
    <>
      {" "}
      <div >
        {!isBannerSelected && (
          <div className="img-sec-div" {...getRootProps()}>
            <input {...getInputProps()} name="banner" />

            {!isloader ? (
              <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
               <img
               src={Image}
               alt="upload-icon"
               className="upload-icon"
 
             />
              <div>
               <p className="fs-14 fw-b pt-20">Drag & Drop or <span style={{ color: "#366EEF" }}>Browse go</span></p>
             </div>

            </div>


            ):(
              <div className="">
              {" "}
              <Oval
                vertical="top"
                horizontal="center"
                color="#00BFFF"
                height={30}
                width={30}
              />
            </div>

            )}
            
            
           
          </div>
        )}
        {isBannerSelected && (
          <div className="img-sec-div" {...getRootProps()}>
            <input {...getInputProps()} name="banner"
            />
            {!isloader?(
              <img
              style={{
                width: "100%",
                height: "100%",
                objectFit:"cover"
              }}
              src={bannerCdn != "" ? bannerCdn : Image}
              alt="upload-icon"
              className="upload-icon"
            />

            ):(
              <div className="">
              {" "}
              <Oval
                vertical="top"
                horizontal="center"
                color="#00BFFF"
                height={30}
                width={30}
              />
            </div>

            )}
          
          </div>
        )}
      </div>
    </>
  );
}

export default Bannerdrop;
