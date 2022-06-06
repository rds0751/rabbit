import React from "react";
import BlockchainService from "../.././services/blockchainService";
import { toast } from "react-toastify";
import Utils from "../../utility";

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
       var utcAfter=utc+1000;
       signMsg+='!'+utcAfter;

       const [signError, signRes] = await Utils.parseResponse(
        BlockchainService.acceptOffer({
            tokenId:props.nft.tokenId,
            signMsg:signMsg,
            contractAddress:"0xaA0842869e1a627B749bE2795d5D699d86F4dfc9",
            receiverAddress:props?.nft?.offers[0]?.receiverAddress,
            price:props?.nft?.salesInfo.price,
        })
    );
      if(signError || !signRes){
        this.setState({ loaderState: false })
        return toast.error(signError || "Unable to generate signature");
       }
    else{
        console.log(signRes,"<<<signRes");
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
