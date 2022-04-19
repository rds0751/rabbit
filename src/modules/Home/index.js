import React from "react";
import BaseComponent from "../baseComponent";
// import HeaderComponent from "../common/header";
import NftDetails from "./NftInformation";
import Utils from "../../utility";
import BlockchainService from "../../services/blockchainService";
import { addNftTx, updateTxStatus } from "../../services/sellAndPurchaseMicroService";

import ContentService from "../../services/contentMicroservice";
// import {history} from "../../managers/history";
import { getNft } from "../../services/webappMicroservice";
import { useParams } from "react-router-dom";
// import {connect} from "react-redux";
import { eventConstants } from "../../constants";
import { toast } from "react-toastify";

export default class NftDetail extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            createdBy: "",
            responseData: [],
            salesInfo: null,
            nftDetails: null,
            loaderState: true,
            refreshPage: false,
            buySuccess :false,
            saleSuccess :false,
            removeSuccess :false




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
        await getNft(id, (response) => {
            console.log(response, "<<<< response of nft");
            this.setState({
                responseData: response[0],
                createdBy: response?.createdBy,
                salesInfo: response?.salesInfo,
                // createdBy: "61de9sf37905a9s3863300611d",
            });
            console.log("----------", this.state.responseData);
        });
    };
    BuyNowNft = async (data) => {

        // this.setState({ loaderState: true })
        let blockchainRes;

        const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS

        console.log("--sssssssssssssssss-", data?.newOwnerAddress)

        console.log('BUY', data)
        let requestDataInTx = {
            //   type: eventConstants.BUY,
            //   transaction: blockchainRes.transactionHash || '',
            contentId: this.state?.responseData?._id || '',
            seller: this.state?.responseData?.ownedBy || '',
            buyer: data?.buyerId || '',
            price: this.state?.responseData?.salesInfo?.price || '',
            currency: this.state?.responseData?.salesInfo?.currency || 'ETH',
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
        console.log("response dasssssssssssssssssta-----", requestDataInTx)
        if (!this.state.responseData._id) return;
        let [error, result] = await Utils.parseResponse(
            addNftTx(requestDataInTx)
        );
        console.log("--buy nFT resi;t-", result);
        if (error || !result) {
            this.setState({ loaderState: false })

            return Utils.apiFailureToast(error || "Unable to update Nft tx.");
        }

        if (this.state?.responseData?.contractAddress > 0) {

            //-------------------------------------------------------
            const [blockchainError, blockchainResult] = await Utils.parseResponse(
                BlockchainService.buyNFT({
                    //TO do
                    tokenId: this.state.responseData?.tokenId,
                    price: this.state?.responseData?.salesInfo?.price,
                    contractAddress: this.state?.responseData?.contractAddress

                })
            );
            console.log("blockchainError====", blockchainError)
            console.log("blockchainRes====", blockchainResult)
            if (blockchainError || !blockchainResult) {
                this.setState({ loaderState: false })
                if (!this.state.responseData._id) return;
                let [txFailErr, txFailResult] = await Utils.parseResponse(
                    updateTxStatus({ status: "failed" }, result._id)
                );
                return Utils.apiFailureToast(
                    blockchainError?.data?.message ||blockchainError?.message ||blockchainError|| "Unable to Buy NFT on blockchain"
                );
            }
            blockchainRes = blockchainResult
        }
        else {
            const [blockchainError, blockchainResult] = await Utils.parseResponse(
                BlockchainService.buyNFT({
                    //TO do
                    tokenId: this.state.responseData?.tokenId,
                    price: this.state?.responseData?.salesInfo?.price,
                    contractAddress: contractAddress

                })
            );
            console.log("blockchainError====", blockchainError)
            console.log("blockchainRes====", blockchainResult)
            if (blockchainError || !blockchainResult) {
                this.setState({ loaderState: false })
                if (!this.state.responseData._id) return;
                let [txFailErr, txFailResult] = await Utils.parseResponse(
                    updateTxStatus({ status: "failed" }, result._id)
                );
                return Utils.apiFailureToast(
                    blockchainError?.data?.message ||blockchainError?.message ||blockchainError|| "Unable to Buy NFT on blockchain"
                );
            }
            blockchainRes = blockchainResult
        }






        //------------------------------------
        if (!this.state.responseData._id) return;
        let [txUpdateResultErr, txUpdateResult] = await Utils.parseResponse(
            updateTxStatus({ status: "success" }, result._id)

        );
        // console.log("----sssssssss----",txUpdateResult)
        if (txUpdateResultErr || !txUpdateResult) {
            this.setState({ loaderState: false })

            return Utils.apiFailureToast(txUpdateResultErr || "Unable to update status of tx");
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

            return Utils.apiFailureToast(err || "Unable to update Nft ownership.");
        }
        else {
            this.setState({ loaderState: false })
            this.setState({ refreshPage: true })

            this.setState({ nftDetails: res });
            this.setState({ buySuccess: true });

            Utils.apiSuccessToast("NFT has been buy successfully");
        }

    };

    sellNowNft = async () => {
        console.log("daaaaaaaaaa", this.state?.responseData?.contractAddress)
        // this.setState({ loaderState: true })
        const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS

        console.log("jjjjj", this.state.responseData.tokenId);
        if (this.state?.responseData?.contractAddress > 0) {
            const [blockchainError, blockchainRes] = await Utils.parseResponse(
                BlockchainService.putOnSaleNft({
                    tokenId: this.state.responseData?.tokenId,
                    contractAddress: this.state?.responseData?.contractAddress
                })
            );
            console.log("blockchainEsssssrror=sellNowNft=", blockchainError);
            console.log("blockchainRes==sellNowNft=", blockchainRes);
            if (blockchainError || !blockchainRes) {
                this.setState({ loaderState: false })

                return toast.error(
                    blockchainError?.data?.message ||blockchainError?.message ||blockchainError|| "Unable to sell NFT on blockchain",{autoClose:5000}
                );
            }
        }



        else {

            const [blockchainError, blockchainRes] = await Utils.parseResponse(
                BlockchainService.putOnSaleNft({
                    tokenId: this.state.responseData?.tokenId,
                    contractAddress: contractAddress,
                })
            );
            console.log("blockchainwwwwwwwError=sellNowNft=", blockchainError);
            console.log("blockchainRes==sellNowNft=", blockchainRes);
            if (blockchainError || !blockchainRes) {
                // alert(blockchainError?.data?.message)
                this.setState({ loaderState: false })

                return toast.error(
                    blockchainError?.data?.message ||blockchainError?.message ||blockchainError|| "Unable to sell NFT on blockchain",{autoClose:5000}
                );
            }
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

            return toast.error(error || "Unable to update Nft content.",{autoClose:5000});
        }
        else {
            this.setState({ loaderState: false })
            this.setState({ refreshPage: true })
            this.setState({ saleSuccess: true });

            this.setState({ nftDetails: result });
            Utils.apiSuccessToast("NFT has been put on sell");
        }
    };

    removeNftFromSale = async (data) => {
        // this.setState({ loaderState: true })
        const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS

        console.log("removeNftFromSale");
        if (this.state?.responseData?.contractAddress > 0) {
            const [blockchainError, blockchainRes] = await Utils.parseResponse(
                BlockchainService.removeFromSaleNft({
                    tokenId: this.state.responseData?.tokenId,
                    contractAddress: this.state?.responseData?.contractAddress,
                })
            );
            if (blockchainError || !blockchainRes) {
                this.setState({ loaderState: false })

                return toast.error( blockchainError?.data?.message ||blockchainError?.message ||blockchainError|| "Unable to remove NFT on blockchain",{autoClose:5000})
            }
        }
        else {
            const [blockchainError, blockchainRes] = await Utils.parseResponse(
                BlockchainService.removeFromSaleNft({
                    tokenId: this.state.responseData?.tokenId,
                    contractAddress: contractAddress,
                })
            );
            if (blockchainError || !blockchainRes) {
                this.setState({ loaderState: false })

                return toast.error(
                    blockchainError?.data?.message ||blockchainError?.message ||blockchainError|| "Unable to remove NFT on blockchain",{autoClose:5000}
                );
            }

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

            return toast.error(error || "Unable to update Nft content.",{autoClose:5000});
        }
        else {
            this.setState({ loaderState: false })
            this.setState({ refreshPage: true })
            this.setState({ removeSuccess: true });

            this.setState({ nftDetails: result });
            Utils.apiSuccessToast("NFT has been removed for sell.");
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
                    buySuccess={this.state.buySuccess}
                    saleSuccess={this.state.saleSuccess}
                    removeSuccess={this.state.removeSuccess}

                    BuyNowNft={this.BuyNowNft}
                    refreshPage={this.state.refreshPage}

                    sellNowNft={this.sellNowNft}
                    removeNftFromSale={this.removeNftFromSale}
                />
            </>
        );
    }
};