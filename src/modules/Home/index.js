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
            nftDetails: null,
            loaderState: false


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
    BuyNowNft = async (data) => {
        this.setState({ loaderState: true })

        console.log("--sssssssssssssssss-", data?.newOwnerAddress)

        console.log('BUY', data)
        const [blockchainError, blockchainRes] = await Utils.parseResponse(
            BlockchainService.buyNFT({
                //TO do
                tokenId: this.state.responseData?.tokenId,
                price: this.state?.responseData?.salesInfo?.price

            })
        );
        console.log("blockchainError====", blockchainError)
        console.log("blockchainRes====", blockchainRes)
        if (blockchainError || !blockchainRes) {
            this.setState({ loaderState: false })

            return Utils.apiFailureToast(
                blockchainError?.data?.message || "Unable to sell NFT on blockchain"
            );
        }
        let requestDataInTx = {
            //   type: eventConstants.BUY,
            //   transaction: blockchainRes.transactionHash || '',
            contentId: this.state?.responseData?._id || '',
            seller: this.state?.responseData?.ownedBy || '',
            buyer: data?.buyerId || '',
            price: this.state?.responseData?.salesInfo?.price || '',
            currency: this.state?.responseData?.salesInfo?.currency || 'eth',
            addedBy: data?.buyerId || '',
            loyality: 5, // to do
            collectionId: this.state?.responseData?.collectionId || ''
            //   ownedBy: this.props?.user?.userDetails?._id || '',
            //   ownerAddress: this.props?.user?.userDetails?.userId || '',
            //   updatedBy: this.props?.user?.userDetails?._id || '',
            // _id: this.state?.nftDetails?._id || '',
            //   salesInfo: {
            //       ...this.state?.nftDetails?.saleData,
            //       isOpenForSale: false
            //   },
        }
        console.log("response data-----", requestDataInTx)
        if (!this.state.responseData._id) return;
        let [error, result] = await Utils.parseResponse(
            addNftTx(requestDataInTx)
        );
        console.log("--buy nFT resi;t-", result);
        if (error || !result) {
            this.setState({ loaderState: false })

            return Utils.apiFailureToast(error || "Unable to update Nft tx.");
        }
        let requestData = {
            transactionHash: blockchainRes.transactionHash || '',
            ownedBy: data?.buyerId || '',
            ownerAddress: data?.newOwnerAddress || '',
            updatedBy: data?.buyerId || '',
            // _id: this.state?.responseData?._id || '',
            salesInfo: {
                ...this.state?.responseData?.salesInfo,
                isOpenForSale: false
            },
        }
        if (!this.state.responseData._id) return;
        let [err, res] = await Utils.parseResponse(
            ContentService.ownershipTransfer(requestData, this.state?.responseData?._id)
        );
        console.log("--buy nFT ressssssi;t-", res);
        if (err || !res) {
            this.setState({ loaderState: false })

            return Utils.apiFailureToast(err || "Unable to update Nft ownership transfer.");
        }
        else {
            this.setState({ loaderState: false })

            this.setState({ nftDetails: res });
            Utils.apiSuccessToast("This nft has been buy successfully.");
        }
    };

    sellNowNft = async () => {
        this.setState({ loaderState: true })

        console.log("jjjjj", this.state.responseData.tokenId);
        const [blockchainError, blockchainRes] = await Utils.parseResponse(
            BlockchainService.putOnSaleNft({
                tokenId: this.state.responseData?.tokenId,
            })
        );
        console.log("blockchainError=sellNowNft==", blockchainError);
        console.log("blockchainRes==sellNowNft=", blockchainRes);
        if (blockchainError || !blockchainRes) {
            this.setState({ loaderState: false })

            return Utils.apiFailureToast(
                blockchainError?.data?.message || "Unable to sell NFT on blockchain"
            );
        }

        let requestData = {
            _id: this.state?.responseData?._id,
        };
        // console.log("nannnn",requestData)
        // this.updateNftDataInDb(requestData, eventConstants.SELL,this.state.responseData._id || '')
        if (!this.state?.responseData?._id) return;
        let [error, result] = await Utils.parseResponse(
            ContentService.openForSale(requestData)
        );
        console.log("-nnnnnnnnnnnnnnssssssssnnnn--", result);
        if (error || !result) {
            this.setState({ loaderState: false })

            return Utils.apiFailureToast(error || "Unable to update Nft content.");
        }
        else {
            this.setState({ loaderState: false })

            this.setState({ nftDetails: result });
            Utils.apiSuccessToast("Your nft has been updated for put on sell successfully.");
        }
    };
    
    removeNftFromSale = async (data) => {
        this.setState({ loaderState: true })

        console.log("removeNftFromSale");
        const [blockchainError, blockchainRes] = await Utils.parseResponse(
            BlockchainService.removeFromSaleNft({
                tokenId: this.state.responseData?.tokenId,
            })
        );
        if (blockchainError || !blockchainRes) {
            this.setState({ loaderState: false })

            return Utils.apiFailureToast(
                blockchainError?.data?.message || "Unable to remove NFT from sale"
            );
        }
        let requestData = {
            _id: this.state?.responseData?._id,
        };
        if (!this.state.responseData._id) return;
        let [error, result] = await Utils.parseResponse(
            ContentService.removeFromSale(requestData)
        );
        console.log("-remove from sellll--", result);
        if (error || !result) {
            this.setState({ loaderState: false })

            return Utils.apiFailureToast(error || "Unable to update Nft content.");
        }
        else {
            this.setState({ loaderState: false })

            this.setState({ nftDetails: result });
            Utils.apiSuccessToast("Your nft has been removed for sell successfully.");
        }
    };



    render() {
        return (
            <>
                <NftDetails
                    // createdBy={this.createdBy}
                    responseData={this.state.responseData}
                    // createdBy:"",
                    // salesInfo:null
                    loaderState={this.state.loaderState}

          BuyNowNft={this.BuyNowNft}
          sellNowNft={this.sellNowNft}
          removeNftFromSale={this.removeNftFromSale}
        />
      </>
    );
  }
}
