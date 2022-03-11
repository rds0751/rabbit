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
      isOpenMintModal:true,
      mintedNftId:""
    };
  }

  async componentDidMount() {
    const checkvalue = await this.getCollectionsForNft();
    console.log(checkvalue, "<<<<checkvalue");
  }

  getRequestDataForSaveNftContent = (tokenId, data, blockchainRes) => {
    return {
      tokenId: tokenId,
      transactionHash: blockchainRes?.transactionHash || "",
      name: data?.nftName || "",
      //TO DO  need to pass collection _id
      collectionId: data.collection , // to do
      ipfsUrl: data?.ipfsUrl || "",
      cdnUrl: data?.cdnUrl || "",
      cid: data?.cid || "",
      description: data?.description || "",
      blockchain: data?.blockchain || "",
      network: {
        chainId: blockchainRes?.chainId || "",
        name: blockchainRes?.name || "",
      },
      salesInfo: {
        price: data?.price || 0,
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

    if (!data?.ownerAddress)
      return Utils.apiFailureToast("Please connect your wallet");
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
    if(data.collection.length > 0 ){
     
    const [blockchainError, blockchainResult] = await Utils.parseResponse(
      BlockchainServices.mintNFT({
        tokenURI: data.ipfsUrl,
        price: data.price,
        tokenId,
        contractAddress:data.collection
      })
    );

    if (blockchainError || !blockchainResult) {
      this.setState({ loaderState: false });

      return Utils.apiFailureToast(
        blockchainError.message || "Unable to mint NFT on blockchain"
      );
    }
    blockchainRes = blockchainResult
  }


  else{
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS

    const [blockchainError, blockchainResult] = await Utils.parseResponse(
      BlockchainServices.mintNFT({
        tokenURI: data.ipfsUrl,
        price: data.price,
        tokenId,
        contractAddress:contractAddress
      })
    );

    if (blockchainError || !blockchainResult) {
      this.setState({ loaderState: false });

      return Utils.apiFailureToast(
        blockchainError.message || "Unable to mint NFT on blockchain"
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
      return Utils.apiFailureToast(
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
      Utils.apiSuccessToast("Your Nft has been created successfully.");
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
