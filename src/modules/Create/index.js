import React from "react";
import BaseComponent from "../baseComponent";
import CreateSingleNFT from "./CreateSingleNFT";
// import HeaderComponent from "../common/header";
// import FooterComponent from "../common/footer";
import Utils, { dispatchAction } from "../../utility";
// import { getcollection } from "../../services/adminConfigMicroservices";
import { BlockchainService,ContentService } from "../../services";
import { connect } from "react-redux";
import { eventConstants } from "../../constants";
import { history } from "../../managers/history";

class FirstPageNft extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: "",
      collection: [],
      mintData: [],
    };
  }

  async componentDidMount() {
    await this.getCollectionsForNft();
  }

//   getCollectionsForNft = async () => {
//     let pathName = window.location.pathname;
//     let pathArray = pathName.split("/");
//     if (pathArray.length !== 3) return history.push("/");

//     this.props.dispatchAction(eventConstants.SHOW_LOADER);
//     const [err, response] = await Utils.parseResponse(
//       getcollection(pathArray[pathArray.length - 1])
//     );
//     this.props.dispatchAction(eventConstants.HIDE_LOADER);

//     if (err || !response) {
//       return Utils.apiFailureToast(
//         err?.message || "Unable to fetch collection list"
//       );
//     }
//     this.setState({
//       collection: response,
//       categoryId: pathArray[pathArray.length - 1],
//     });
//   };

  getRequestDataForSaveNftContent = (tokenId, data, ipfsRes, blockchainRes) => {
    return {
      tokenId: tokenId,
      transactionHash: blockchainRes?.transactionHash || "",
      name: data?.nftName || "",
      collectionId: data?.collection || "",
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
      ownedBy: this.props.user?.userDetails?._id || "",
      createdBy: this.props.user?.userDetails?._id || "",
      updatedBy: this.props.user?.userDetails?._id || "",
      ownerAddress: this.props.user?.userDetails?.userId || "",
    };
  };

  createNftHandler = async (data) => {
    if (!data || Object.keys(data).length < 1 || !data.nftFile)
      return Utils.apiFailureToast("Please select the file that to be upload");

    let formData = new FormData();
    // formData.append("fileName", data.nftFile?.nftName);
    formData.append("attachment", data.nftFile);

    if(!this.props.user?.userDetails)
      return Utils.apiFailureToast("Please connect your wallet");


    //add to IPFS
    this.props.dispatchAction(eventConstants.SHOW_LOADER);
    const [err, ipfsRes] = await Utils.parseResponse(
      ContentService.addIpfs(formData)
    );
    if (err || !ipfsRes.ipfsUrl) {
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
      return Utils.apiFailureToast(err || "Unable to add file on IPFS");
    }
    // create NFT on blockchain
    //TODO we need to work on generate unique tokenId
    const tokenId = Utils.generateRandomNumber();
    const [blockchainError, blockchainRes] = await Utils.parseResponse(
      BlockchainService.mintNFT({
        tokenId,
        tokenURI: ipfsRes.ipfsUrl,
      })
    );
    console.log("tokenId=", tokenId);
    if (blockchainError || !blockchainRes) {
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
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
    // const [contentError, contentRes] = await Utils.parseResponse(
    //   ContentService.createNftContent(
    //     this.getRequestDataForSaveNftContent(
    //       tokenId,
    //       data,
    //       ipfsRes,
    //       blockchainRes
    //     )
    //   )
    // );
    // this.props.dispatchAction(eventConstants.HIDE_LOADER);
    // if (contentError || !contentRes) {
    //   return Utils.apiFailureToast(
    //     contentError.message || "Unable to save NFT content"
    //   );
    // }
    Utils.apiSuccessToast("Your Nft has been created successfully.");
    // history.push("/nft-details/" + contentRes._id);
  };

  render() {
    return (
      <>
        <CreateSingleNFT
          collection={this.state.collection}
          mintNft={this.mintNft}
          createNftHandler={this.createNftHandler}
        />
        {/* <FooterComponent /> */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { dispatchAction })(FirstPageNft);
