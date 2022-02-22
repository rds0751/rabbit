import React from "react";
import BaseComponent from "../baseComponent";
import CreateSingleNFT from "./CreateSingleNFT";
import Utils from "../../utility";
import BlockchainServices from "../../services/blockchainService";
import getCollection from "../../services/contentMicroservice";
// import ContentService from "../../services/contentMicroservice";
import { eventConstants } from "../../constants";
import { useNavigate } from "react-router-dom";
export default class Index extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: "",
      // collection: [],
      mintData: [],
      isNftCreated: false
    };
  }

  async componentDidMount() {
    await this.getCollectionsForNft();
  }

  getRequestDataForSaveNftContent = (tokenId, data, ipfsRes, blockchainRes) => {
    return {
      tokenId: tokenId,
      transactionHash: blockchainRes?.transactionHash || "",
      name: data?.nftName || "",
      //TO DO  need to pass collection _id
      collectionId: data.collection,
      ipfsUrl: ipfsRes?.ipfsUrl || "",
      cdnUrl: ipfsRes?.cdnUrl || "",
      cid: ipfsRes?.cid || "",
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
      ownerAddress: data?.ownerAddress || '', // put metamask address
    };
  };

  createNftHandler = async (data) => {
    // const navigate =useNavigate()

    console.log(data?.ownerAddress, "dattttttttttttttttt");

    if (!data || Object.keys(data).length < 1 || !data.nftFile)
      return Utils.apiFailureToast("Please select the file that to be upload");
    // console.log("duke",data)
    let formData = new FormData();
    formData.append("attachment", data.nftFile);


    // if(!this.props.user?.userDetails)
    //   return Utils.apiFailureToast("Please connect your wallet");

    //add to IPFS
    const [err, ipfsRes] = await Utils.parseResponse(
      getCollection.addIpfs(formData)
    );

    if (err || !ipfsRes.ipfsUrl) {
      // this.props.dispatchAction(eventConstants.HIDE_LOADER);
      return Utils.apiFailureToast(err || "Unable to add file on IPFS");
    }
    //TODO we need to work on generate unique tokenId

    const tokenId = Utils.generateRandomNumber();
    // create NFT on blockchain
    const [blockchainError, blockchainRes] = await Utils.parseResponse(
      BlockchainServices.mintNFT({
        tokenURI: ipfsRes.ipfsUrl,
        price: data.price,
        tokenId,
      })
    );

    if (blockchainError || !blockchainRes) {
      return Utils.apiFailureToast(
        blockchainError.message || "Unable to mint NFT on blockchain"
      );
    }

    console.log("checkngggggg-----",
      this.getRequestDataForSaveNftContent(
        tokenId,
        data,
        ipfsRes,
        blockchainRes
      )
    );

    // save NFT data on DB
    const [contentError, contentRes] = await Utils.parseResponse(
      getCollection.createNftContent(
        this.getRequestDataForSaveNftContent(
          tokenId,
          data,
          ipfsRes,
          blockchainRes
        )
      )
    );
    // this.props.dispatchAction(eventConstants.HIDE_LOADER);
    if (contentError || !contentRes) {
      return Utils.apiFailureToast(
        contentError.message || "Unable to save NFT content"
      );
    }
    Utils.apiSuccessToast("Your Nft has been created successfully.");
    // navigate(`/nft-information/${contentRes._id}`);
    // this.setState(isNftCreated)
    this.setState({ isNftCreated: true });
    // '/nft-detail${id}'

  };

  render() {
    // alert("in 122 line")

    return (
      <>
        <CreateSingleNFT
          mintNft={this.mintNft}
          isNftCreated={this.isNftCreated}

          createNftHandler={this.createNftHandler.bind(this)}
        />
        {/* <FooterComponent /> */}
      </>
    );
  }
}
