import React from "react";
import BaseComponent from "../baseComponent";
// import HeaderComponent from "../common/header";
import NftDetails from "./NftInformation1";
import Utils from "../../utility";
import { BlockchainService, ContentService } from "../../services";
// import {history} from "../../managers/history";
// import {connect} from "react-redux";
import { transactionConstants } from "../../constants";


export default class NftDetail extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            nftDetails: null,
            transactionList: [],
            contentId: '',
            isLoggedInOwner: false,
        };
    }

    componentDidMount() {
    }

    BuyNowNft = async () => {
        console.log('BUY')
        const [blockchainError, blockchainRes] = await Utils.parseResponse(
            BlockchainService.buyNFT({
                //TO do
                tokenId: 43622716,

            })
        );
        console.log("blockchainError====", blockchainError)
        console.log("blockchainRes====", blockchainRes)
        if (blockchainError || !blockchainRes) {
            return Utils.apiFailureToast(
                blockchainError?.data?.message || "Unable to sell NFT on blockchain"
            );
        }
        let requestData = {
            type: transactionConstants.BUY,
            transaction: blockchainRes.transactionHash || '',
            seller: this.state?.nftDetails?.ownedBy?._id || this.state?.nftDetails?.ownedBy || '',
            buyer: this.props?.user?.userDetails?._id || '',
            ownedBy: this.props?.user?.userDetails?._id || '',
            ownerAddress: this.props?.user?.userDetails?.userId || '',
            updatedBy: this.props?.user?.userDetails?._id || '',
            // _id: this.state?.nftDetails?._id || '',
            saleData: {
                ...this.state?.nftDetails?.saleData,
                isOpenForSale: false
            },
        }
        this.updateNftDataInDb(requestData, transactionConstants.BUY,this.state?.nftDetails?._id || '')
    }

    sellNowNft = async () => {
        console.log("jjjjj")
        const [blockchainError, blockchainRes] = await Utils.parseResponse(
            BlockchainService.putOnSaleNft({
                tokenId: 43622716,
            })
        );
        console.log("blockchainError=sellNowNft==", blockchainError)
        console.log("blockchainRes==sellNowNft=", blockchainRes)
        if (blockchainError || !blockchainRes) {
            return Utils.apiFailureToast(
                blockchainError?.data?.message || "Unable to sell NFT on blockchain"
            );
        }
        let requestData = {
            type: transactionConstants.SELL,
            transaction: blockchainRes?.transactionHash || '',
            seller: this.state?.nftDetails?.ownedBy?._id || this.state?.nftDetails?.ownedBy || '',
            buyer: this.state?.nftDetails?.ownedBy?._id || this.state?.nftDetails?.ownedBy || '',
            // _id: this.state?.nftDetails?._id || '',
            saleData: {
                ...this.state?.nftDetails?.saleData,
                isOpenForSale: true
            },
        }
        this.updateNftDataInDb(requestData, transactionConstants.SELL,this.state?.nftDetails?._id || '')

    }

    removeNftFromSale = async () => {
        console.log("removeNftFromSale")
        const [blockchainError, blockchainRes] = await Utils.parseResponse(
            BlockchainService.removeFromSaleNft({
                tokenId: 43622716,
            })
        );
        if (blockchainError || !blockchainRes) {
            return Utils.apiFailureToast(
                blockchainError?.data?.message || "Unable to remove NFT from sale"
            );
        }
        let requestData = {
            type: transactionConstants.REMOVE_FROM_SALE,
            transaction: blockchainRes.transactionHash || '',
            seller: this.state?.nftDetails?.ownedBy?._id || this.state?.nftDetails?.ownedBy || '',
            buyer: this.state?.nftDetails?.ownedBy?._id || this.state?.nftDetails?.ownedBy || '',
            // _id: this.state?.nftDetails?._id || '',
            saleData: {
                ...this.state?.nftDetails?.saleData,
                isOpenForSale: false
            },
        }
        this.updateNftDataInDb(requestData, transactionConstants.REMOVE_FROM_SALE,this.state?.nftDetails?._id || '')
    }

    updateNftDataInDb = async (requestData, type,_id) => {
        if (!requestData || !_id)
            return;
        let [error, result] = await Utils.parseResponse(ContentService.updateNftContent(requestData,_id))
        if (error || !result) {
            return Utils.apiFailureToast(error || "Unable to update Nft content.");
        }
        this.setState({ nftDetails: result })

        let message = 'Your nft has been updated successfully.'
        if (type === transactionConstants.BUY)
            message = 'This nft has been buy successfully.'
        else if (type === transactionConstants.SELL)
            message = 'Your nft has been updated for sell successfully.'
        else if (type === transactionConstants.REMOVE_FROM_SALE)
            message = 'Your nft has been removed for sell successfully.'

        Utils.apiSuccessToast(message);

    }

    render() {
        return (
            <>

                <NftDetails
                    BuyNowNft={this.BuyNowNft}
                    sellNowNft={this.sellNowNft}
                    removeNftFromSale={this.removeNftFromSale}
                />
            </>
        );
    }
}
