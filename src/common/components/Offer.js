import React from "react";
import BlockchainService from "../.././services/blockchainService";
import { toast } from "react-toastify";
import Utils from "../../utility";
import {addNftTx,updateTxStatus} from  "../.././services/sellAndPurchaseMicroService";
import ContentService  from  "../.././services/contentMicroservice";

const offer = (props) => {
    
    const  Accept= async ()=>{
      
        var signMsg = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 32; i++ ) {
          signMsg += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
       }

       var date=new Date();
       var utc=date.getTime();
       var utcAfter=utc+10000;
       signMsg+='!'+utcAfter;

       const [blockchainError, blockchainRes] = await Utils.parseResponse(
        BlockchainService.acceptOffer({
            tokenId:props.nft.tokenId,
            signMsg:signMsg,
            contractAddress:"0x0fed614DCE3EE9F42C69fd753cd9532A522F6955",
            receiverAddress:props?.nft?.offers[0]?.receiverAddress,
            price:props?.nft?.salesInfo.price,
            privateKey:props?.nft?.offers[0]?.privateKey,
        })


    );
console.log(blockchainRes);
console.log(blockchainError);
      if(blockchainError || !blockchainRes){
        // this.setState({ loaderState: false })
        return toast.error(blockchainError || "Unable to generate signature");
       }
    else{
        toast.success("sign successfully generated")

        let requestDataInTx = {
            //   type: eventConstants.BUY,
            //   transaction: blockchainRes.transactionHash || '',
            contentId: props?.nft?._id || '',
            seller:  props?.nft?.ownedBy || '',
            buyer: props.buyerInfo.buyerId || '',
            price:  props?.nft?.salesInfo?.price || '',
            currency:  props?.nft?.salesInfo?.currency || 'ETH',
            addedBy: props.buyerInfo.buyerId || '',
            loyality: 5, // to do
            collectionId:  props?.nft?.collectionId || ''
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
        if (! props?.nft?._id) return;
        let [error, result] = await Utils.parseResponse(
            addNftTx(requestDataInTx)
        );
        console.log("--buy nFT resi;t-", result);
        if (error || !result) {
            // this.setState({ loaderState: false })

            return toast.error(error || "Unable to update Nft tx.",{autoClose:7000,theme:"colored"})
        }


        if (!props?.nft?._id) return;
        let [txUpdateResultErr, txUpdateResult] = await Utils.parseResponse(
            updateTxStatus({ status: "success" }, result._id)

        );
        // console.log("----sssssssss----",txUpdateResult)
        if (txUpdateResultErr || !txUpdateResult) {
            this.setState({ loaderState: false })

            return toast.error(txUpdateResultErr || "Unable to update status of tx",{autoClose:7000,theme:"colored"});
        }

        let requestData = {
            transactionHash: blockchainRes.transactionHash || '',
            ownedBy: props.buyerInfo.buyerId || '',
            ownerAddress:  props.nft?.newOwnerAddress || '',
            updatedBy:  props.buyerInfo?.buyerId || '',
            // _id: this.state?.responseData?._id || '',
            salesInfo: {
                ...props.nft?.salesInfo,
                isOpenForSale: false
            },
        }
        if (!this.state.responseData._id) return;
        let [err, res] = await Utils.parseResponse(
            ContentService.ownershipTransfer(requestData, props.nft._id)
        );
        console.log("--buy nFT ressssssi;t-", res);
        if (err || !res) {
            //this.setState({ loaderState: false })

            return toast.error(err || "Unable to update Nft ownership.",{autoClose:7000,theme:"colored"});
        }
        else {
            // this.setState({ loaderState: false })
            // this.setState({ refreshPage: true })

            // this.setState({ nftDetails: res });
            // this.setState({ buySuccess: true });

            toast.success("NFT has been bought successfully",{autoClose:7000,theme:"colored"});
        }


        console.log(blockchainRes,"<<<signRes");
     }


    }


  console.log(props, "<<<props");
  return (
    <div>
      {props.offer.map((data) => (
        <div>
          {data.receiverAddress}
          <p>{data.offerPrice}</p>
          <button
            onClick={()=>Accept()}
          >
            Accept
          </button>
          <button>reject</button>
        </div>
      ))}
    </div>
  );
};

export default offer;
