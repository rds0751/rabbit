import React from "react";
import BaseComponent from "../baseComponent";
import CreateSingleNFT from "./CreateSingleNFT";
import Utils, { dispatchAction } from "../../utility";
import BlockchainServices from "../../services/blockchainService";
import getCollection from "../../services/contentMicroservice";
// import ContentService from "../../services/contentMicroservice";
import { eventConstants } from "../../constants";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import { red } from "@mui/material/colors";

class Index extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: "",
      mintData: [],
      isNftCreated: false,
      url: "",
      loaderState: false,
      isMintSuccess: false,
      isOpenMintModal: true,
      mintedNftId: ""
    };
    this.showToast=this.showToast.bind(this);
    this.defaultPosition=toast.POSITION.TOP_RIGHT;
  }

  async componentDidMount() {
    const checkvalue = await this.getCollectionsForNft();
    console.log(checkvalue, "<<<<checkvalue");
  }
   
 showToast = ( type = "success", msg, autoClose = 7000, className = "primaryColor", position = this.defaultPosition ) => {
    if (type === "success") {
      toast.success(msg, {
        autoClose: autoClose === null ? 7000 : autoClose,
        className: className === null ? "primaryColor" : className,
        position: position,
        theme:'colored',
      });
    } else if (type === "error") {
      toast.error(msg, {
        autoClose: autoClose === null ? 7000 : autoClose,
        className: className === null ? "primaryColor" : className,
        position: position,
        theme:'colored',
      });
    }
  };

  getRequestDataForSaveNftContent = (tokenId, data, blockchainRes) => {
    return {
      tokenId: tokenId,
      transactionHash: blockchainRes?.transactionHash || "",
      name: data?.nftName || "",
      //TO DO  need to pass collection _id
      collectionId: data.collection, // to do
      ipfsUrl: data?.ipfsUrl || "",
      cdnUrl: data?.cdnUrl || "",
      compressedURL:data?.compressedURL|| "",
      cid: data?.cid || "",
      contractAddress: data.contractAddress || "",
      description: data?.description || "",
      blockchain: data?.blockchain || "",
      network: {
        chainId: blockchainRes?.chainId || "",
        name: blockchainRes?.name || "",
      },
      salesInfo: {
        price: data?.price || 0,
        currency: "ETH"
      },
      //TO do need to pass user (owner) _id
      ownedBy: data?.createdBy,
      createdBy: data?.createdBy,
      updatedBy: data?.createdBy,
      ownerAddress: data?.ownerAddress || "", // put metamask address
    };
  };

  createNftHandler = async (data) => {
    let blockchainRes;
    this.setState({ loaderState: true });
    console.log(data?.ownerAddress, "dattttttttttttttttt");

    // if (!data || Object.keys(data).length < 1 || !data.nftFile){
    //   this.setState({loaderState:false})

    //   return Utils.apiFailureToast("Please select the file that to be upload");
    // console.log(data.nftFile, "<<<< this is file attachment");
    // // console.log("duke",data)
    // }
    // let formData = new FormData();
    // formData.append("attachment", data.nftFile);

    // if (!data?.ownerAddress) {
    //   this.setState({ loaderState: true });
    //   return Utils.apiFailureToast("Please connect your wallet");
    // }
    // if(!this.props.user?.userDetails)
    //   return Utils.apiFailureToast("Please connect your wallet");

    //add to IPFS
    // this.props.dispatchAction(eventConstants.SHOW_LOADER);

    // const [err, ipfsRes] = await Utils.parseResponse(
    //   getCollection.addIpfs(formData)
    // );

    // if (err || !ipfsRes.ipfsUrl) {
    //   this.setState({loaderState:false})
    //   return Utils.apiFailureToast(err || "Unable to add file on IPFS");
    // }
    // this.setState({ url: ipfsRes?.ipfsUrl || "" });
    //TODO we need to work on generate unique tokenId

    const tokenId = Utils.generateRandomNumber();
    // create NFT on blockchai
    if (data.contractAddress.length > 0) {

      const [blockchainError, blockchainResult] = await Utils.parseResponse(
        BlockchainServices.mintNFT({
          tokenURI: data.ipfsUrl,
          price: data.price,
          tokenId,
          contractAddress: data.contractAddress
        })
      );
      console.log("blockchainError", blockchainError)
      console.log("blockchainResult", blockchainResult)

      if (blockchainError || !blockchainResult) {
        this.setState({ loaderState: false });

        return this.showToast('error',
          blockchainError?.data?.message || blockchainError?.message || blockchainError || "Unable to Mint NFT on blockchain"
        );
      }
      blockchainRes = blockchainResult
    }


    else {
      const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS

      const [blockchainError, blockchainResult] = await Utils.parseResponse(
        BlockchainServices.mintNFT({
          tokenURI: data.ipfsUrl,
          price: data.price,
          tokenId,
          contractAddress: contractAddress
        })
      );
      console.log("blockchainError", blockchainError)
      console.log("blockchainResult", blockchainResult)
      if (blockchainError || !blockchainResult) {
        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
        this.setState({ loaderState: false });

        return this.showToast('error',
          blockchainError?.data?.message || blockchainError?.message || blockchainError || "Unable to Mint NFT on blockchain"
        );
      }
      blockchainRes = blockchainResult
    }



    console.log(
      this.getRequestDataForSaveNftContent(tokenId, data, blockchainRes)
    );

    // save NFT data on DB
    const [contentError, contentRes] = await Utils.parseResponse(

      getCollection.createNftContent(
        this.getRequestDataForSaveNftContent(tokenId, data, blockchainRes)
      )
    );
    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    if (contentError || !contentRes) {
      this.setState({ loaderState: false });
      this.setState({ isMintSuccess: null });
      this.setState({ isOpenMintModal: false });
      return this.showToast('error',
        contentError?.message || "Unable to save NFT content"
      );
    }
    // else if(contentRes.length <=0 )
    // {
    //   this.setState({loaderState:true})

    // }
    else {
      this.setState({ loaderState: false });
      this.setState({ isMintSuccess: true });
      this.setState({ isOpenMintModal: false });
      this.setState({ mintedNftId: contentRes._id });
      this.showToast('success',"Your NFT has been created")
      this.setState({ isNftCreated: true });
    }

    // '/nft-detail${id}'
  };

  render() {
    // alert("in 122 line")

    return (
      <>
        <CreateSingleNFT
          mintNft={this.mintNft}
          isNftCreated={this.state.isNftCreated}
          loaderState={this.state.loaderState}
          createNftHandler={this.createNftHandler.bind(this)}
          url
          mintedNftId={this.state.mintedNftId}

          isMintSuccess={this.state.isMintSuccess}
          isOpenMintModal={this.state.isOpenMintModal}
        />
        {/* <FooterComponent /> */}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { dispatchAction })(Index);
