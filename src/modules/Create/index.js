import React from "react";
import BaseComponent from "../baseComponent";
import CreateSingleNFT from "./CreateSingleNFT";
import Utils from "../../utility";
import { BlockchainService, ContentService } from "../../services";
import { eventConstants } from "../../constants";

export default class Index extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: "",
      // collection: [],
      mintData: [],
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
      collectionId: "61e7d82400e03f66fd4d2d24",
      ipfsUrl: ipfsRes?.ipfsUrl || "",
      cdnUrl: ipfsRes?.cdnUrl || "",
      cid: ipfsRes?.cid || "",
      description: data?.description || "",

      network: {
        chainId: blockchainRes?.chainId || "",
        name: blockchainRes?.name || "",
      },
      saleData: {
        price: data?.price || 0,
      },
      //TO do need to pass user (owner) _id
      ownedBy: "61e7db34c32d4e5a40567154",
      createdBy: "61e7db34c32d4e5a40567154",
      updatedBy: "61e7db34c32d4e5a40567154",
      ownerAddress: "61e7db34c32d4e5a40567154",
    };
  };

  createNftHandler = async (data) => {
    if (!data || Object.keys(data).length < 1 || !data.nftFile)
      return Utils.apiFailureToast("Please select the file that to be upload");
    // console.log("duke",data)
    let formData = new FormData();
    formData.append("attachment", data.nftFile);

    // if(!this.props.user?.userDetails)
    //   return Utils.apiFailureToast("Please connect your wallet");

    //add to IPFS
    const [err, ipfsRes] = await Utils.parseResponse(
      ContentService.addIpfs(formData)
    );
    if (err || !ipfsRes.ipfsUrl) {
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
      return Utils.apiFailureToast(err || "Unable to add file on IPFS");
    }
    //TODO we need to work on generate unique tokenId

    const tokenId = Utils.generateRandomNumber();

    // create NFT on blockchain
    const [blockchainError, blockchainRes] = await Utils.parseResponse(
      BlockchainService.mintNFT({
        price: data.price,
        tokenId,
        tokenURI: ipfsRes.ipfsUrl,
      })
    );


    if (blockchainError || !blockchainRes) {
      return Utils.apiFailureToast(
        blockchainError.message || "Unable to mint NFT on blockchain"
      );
    }

    console.log(
      this.getRequestDataForSaveNftContent(
        tokenId,
        data,
        ipfsRes,
        blockchainRes
      )
    );

    // save NFT data on DB
    const [contentError, contentRes] = await Utils.parseResponse(
      ContentService.createNftContent(
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
    // history.push("/nft-details/" + contentRes._id);
  };
  // Pre   =()=> {
  //   // e.preventDefault()
  //   alert("name")
  // }    


  render() {
    // console.log("jjjjjjjjjj",this.state.nn)
    return (
      <>
        <CreateSingleNFT
          // collection={this.state.collection}
          // m={this.state.nn}
          state={this.state}
          mintNft={this.mintNft}
          // pre={this.Pre.bind(this)}
          createNftHandler={this.createNftHandler.bind(this)}
        />
        {/* <FooterComponent /> */}
      </>
    );
  }
}

// const mapStateToProps = (state) => {
//   return { user: state.user };
// };

// export default connect(mapStateToProps, { dispatchAction })(CreateSingleNFT);
