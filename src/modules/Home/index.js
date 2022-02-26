import React from "react";
import BaseComponent from "../baseComponent";
// import HeaderComponent from "../common/header";
import NftDetails from "./NftInformation";
import Utils from "../../utility";
import BlockchainService from "../../services/blockchainService";
import { addNftTx } from "../../services/sellAndPurchaseMicroService";

import ContentService from "../../services/contentMicroservice";
// import {history} from "../../managers/history";
import { getNft } from "../../services/webappMicroservice";
import { useParams } from "react-router-dom";
// import {connect} from "react-redux";
import { eventConstants } from "../../constants";

export default class NftDetail extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      createdBy: "",
      responseData: [],
      salesInfo: null,
    };
  }

  componentDidMount() {
    this.getNftDetail();
  }
  getNftDetail = async () => {
    // const { id } = useParams();
    const { pathname } = window.location;
    const pathArray = pathname.split("/");
    const id = pathArray[2];
    console.log(id, "<<<pathname");

    // getNft("620e7b4107515b002ab23afe", (response) => {
    getNft(id, (response) => {
      console.log(response, "<<<< response of nft");
      this.setState({
        responseData: response,
        createdBy: response?.createdBy,
        salesInfo: response?.salesInfo,
        // createdBy: "61de9sf37905a9s3863300611d",
      });
      console.log("----------", this.state.responseData);
    });
  };
  // BuyNowNft = async () => {
  //     console.log('BUY')
  //     const [blockchainError, blockchainRes] = await Utils.parseResponse(
  //         BlockchainService.buyNFT({
  //             //TO do
  //             tokenId: 43622716,

  //         })
  //     );
  //     console.log("blockchainError====", blockchainError)
  //     console.log("blockchainRes====", blockchainRes)
  //     if (blockchainError || !blockchainRes) {
  //         return Utils.apiFailureToast(
  //             blockchainError?.data?.message || "Unable to sell NFT on blockchain"
  //         );
  //     }
  //     let requestData = {
  //         type: eventConstants.BUY,
  //         transaction: blockchainRes.transactionHash || '',
  //         seller: this.state?.nftDetails?.ownedBy?._id || this.state?.nftDetails?.ownedBy || '',
  //         buyer: this.props?.user?.userDetails?._id || '',
  //         ownedBy: this.props?.user?.userDetails?._id || '',
  //         ownerAddress: this.props?.user?.userDetails?.userId || '',
  //         updatedBy: this.props?.user?.userDetails?._id || '',
  //         // _id: this.state?.nftDetails?._id || '',
  //         salesInfo: {
  //             ...this.state?.nftDetails?.saleData,
  //             isOpenForSale: false
  //         },
  //     }
  //     this.updateNftDataInDb(requestData, transactionConstants.BUY,this.state?.nftDetails?._id || '')
  // }

  sellNowNft = async () => {
    console.log("jjjjj", this.state.responseData.tokenId);
    const [blockchainError, blockchainRes] = await Utils.parseResponse(
      BlockchainService.putOnSaleNft({
        tokenId: 1,
      })
    );
    console.log("blockchainError=sellNowNft==", blockchainError);
    console.log("blockchainRes==sellNowNft=", blockchainRes);
    if (blockchainError || !blockchainRes) {
      return Utils.apiFailureToast(
        blockchainError?.data?.message || "Unable to sell NFT on blockchain"
      );
    }
    let requestData = {
      _id: this.state.responseData._id,
    };
    // console.log("nannnn",requestData)
    // this.updateNftDataInDb(requestData, eventConstants.SELL,this.state.responseData._id || '')
    if (!this.state.responseData._id) return;
    let [error, result] = await Utils.parseResponse(
      ContentService.openForSale(requestData)
    );
    console.log("---", result);
    if (error || !result) {
      return Utils.apiFailureToast(error || "Unable to update Nft content.");
    }
    this.setState({ nftDetails: result });
  };

  removeNftFromSale = async (data) => {
    console.log("removeNftFromSale");
    const [blockchainError, blockchainRes] = await Utils.parseResponse(
      BlockchainService.removeFromSaleNft({
        tokenId: 1,
      })
    );
    if (blockchainError || !blockchainRes) {
      return Utils.apiFailureToast(
        blockchainError?.data?.message || "Unable to remove NFT from sale"
      );
    }
    let requestData = {
      _id: this.state.responseData._id,
    };
    if (!this.state.responseData._id) return;
    let [error, result] = await Utils.parseResponse(
      ContentService.removeFromSale(requestData)
    );
    console.log("---", result);
    if (error || !result) {
      return Utils.apiFailureToast(error || "Unable to update Nft content.");
    }
    this.setState({ nftDetails: result });
  };

  updateNftDataInDb = async (requestData, type, _id) => {
    if (!requestData || !_id) return;
    let [error, result] = await Utils.parseResponse(
      ContentService.updateNftContent(requestData, _id)
    );
    console.log("---", result);
    if (error || !result) {
      return Utils.apiFailureToast(error || "Unable to update Nft content.");
    }
    this.setState({ nftDetails: result });

    let message = "Your nft has been updated successfully.";
    if (type === eventConstants.BUY)
      message = "This nft has been buy successfully.";
    else if (type === eventConstants.SELL)
      message = "Your nft has been updated for sell successfully.";
    else if (type === eventConstants.REMOVE_FROM_SALE)
      message = "Your nft has been removed for sell successfully.";

    Utils.apiSuccessToast(message);
  };

  render() {
    return (
      <>
        <NftDetails
          // createdBy={this.createdBy}
          responseData={this.state.responseData}
          // createdBy:"",
          // salesInfo:null

          BuyNowNft={this.BuyNowNft}
          sellNowNft={this.sellNowNft}
          removeNftFromSale={this.removeNftFromSale}
        />
      </>
    );
  }
}
