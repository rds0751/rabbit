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
import { toast } from "react-toastify";
import { red } from "@mui/material/colors";

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
      isOpenMintModal: true,
      mintedNftId: "",
    };
    this.showToast = this.showToast.bind(this);
    this.defaultPosition = toast.POSITION.TOP_RIGHT;
  }

  async componentDidMount() {
    // const checkvalue = await this.getCollectionsForNft();
    // console.log(checkvalue, "<<<<checkvalue");
  }

  showToast = (
    type = "success",
    msg,
    autoClose = 7000,
    className = "primaryColor",
    position = this.defaultPosition
  ) => {
    if (type === "success") {
      toast.success(msg, {
        autoClose: autoClose === null ? 7000 : autoClose,
        className: className === null ? "primaryColor" : className,
        position: position,
        theme: "colored",
      });
    } else if (type === "error") {
      toast.error(msg, {
        autoClose: autoClose === null ? 7000 : autoClose,
        className: className === null ? "primaryColor" : className,
        position: position,
        theme: "colored",
      });
    }
  };

  getRequestDataForSaveNftContent = (tokenId, data, blockchainRes) => {
    return {
      tokenId: tokenId,
      transactionHash: blockchainRes?.transactionHash || "",
      name: data?.nftName || "",
      //TO DO  need to pass collection _id
      collectionId: data?.collectionId, // to do
      collectionName:
        data?.collectionName == undefined
          ? "NFTinger Collection"
          : data?.collectionName,
      ipfsUrl: data?.ipfsUrl || "",
      cdnUrl: data?.cdnUrl || "",
      compressedURL: data?.compressedURL || "",
      cid: data?.cid || "",
      contractAddress: data.contractAddress || "",
      description: data?.description || "",
      blockchain: data?.blockchain || "",
      network: {
        chainId: blockchainRes?.chainId || "",
        name: blockchainRes?.name || "",
      },
       salesInfo: {
       // price: data?.price || 0,
        currency: data?.currency,
       },
      royalty: data?.royality,
      //TO do need to pass user (owner) _id
      ownedBy: data?.createdBy,
      createdBy: data?.createdBy,
      updatedBy: data?.createdBy,
      ownerAddress: data?.ownerAddress || "", // put metamask address
      previewImage: data?.previewImage,
      fileExtension: data?.fileExtension,
      lazyMinting: {
        isEnabled: data?.isLazyMintingEnabled,
        signature: blockchainRes?.signature || "",
        message: blockchainRes?.signMsg || "",
      },
    };
  };

  batchNFTHandler = async (data) => {
    let blockchainRes;
    const tokenId = Utils.generateRandomNumber();
    let contractAddress = "0x40ED9c272908a9D39Fc0E6Cd49D10263302D3524";

    const [blockchainError, blockchainResult] = await Utils.parseResponse(
      BlockchainServices.batchMintNFT({
        tokenId,
        amount: 20,
        contractAddress: contractAddress,
        blockchain: "Ethereum",
      })
    );
    console.log("blockchainError", blockchainError);
    console.log("blockchainResult", blockchainResult);

    if (blockchainError || !blockchainResult) {
      this.setState({ loaderState: false });

      return this.showToast(
        "error",
        blockchainError?.data?.message ||
          blockchainError?.message ||
          blockchainError ||
          "Unable to Mint NFT on blockchain"
      );
    }
    blockchainRes = blockchainResult;
    toast.success("Successfully BatchMint");
    console.log(blockchainRes, "<<<blockchainRes");
  };

  createNftHandler = async (data) => {
    let blockchainRes;
    this.setState({ loaderState: true });
    console.log(data, "dattttttttttttttttt");
    let contractAddress;
    // = "0xCDe6A5fccf0cCaF7bc51D35C1f8Efe3BbC5c8057"
    // //-ethreum

    if (data?.blockchain === "Polygon")
      contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS_POLYGON;
    else if (data?.blockchain === "Ethereum")
      contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    else if (data?.blockchain === "Binance")
      contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS_BINANCE;

    let IpfsObject = {
      name: data?.nftName,
      description: data?.description,
      image: data?.cdnUrl,
      external_link: 123,
      seller_fee_basis_points: 0,
      fee_recipient: 1,
    };

    const [err, ipfsRes] = await Utils.parseResponse(
      getCollection.addIpfsObject(IpfsObject)
    );
    console.log(ipfsRes, "<<<ipfsRes");
    if (!ipfsRes) toast.error("unable to upload data");

    // if (!data || Object.keys(data).length < 1 || !data.nftFile){
    //   this.setState({loaderState:false})

    //   return Utils.apiFailureToast("Please select the file that to be upload");
    // console.log(data.nftFile, "<<<< this is file attachment");
    // // console.log("duke",data)
    // }
    // let formData = new FormData();
    // formData.append("attachment", data.nftFile);

    // if (!data?.ownerAddress) {
    //   this.setState({ loaderState: true });
    //   return Utils.apiFailureToast("Please connect your wallet");
    // }
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
    if (data.contractAddress.length > 0) {
      console.log(data?.blockchain, "blockchainValue");

      if (data?.isLazyMintingEnabled) {
        var signMsg = "";
        var characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < 32; i++) {
          signMsg += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        signMsg += "!" + tokenId;

        const [blockchainError, blockchainResult] = await Utils.parseResponse(
          BlockchainServices.signcheck({
            signMsg: signMsg,
            blockchain: data?.blockchain,
          })
        );

        console.log("blockchainError", blockchainError);
        console.log("blockchainResult", blockchainResult);

        if (blockchainError || !blockchainResult) {
          this.setState({ loaderState: false });

          return this.showToast(
            "error",
            blockchainError?.data?.message ||
              blockchainError?.message ||
              blockchainError ||
              "Unable to Mint NFT on blockchain"
          );
        }
        blockchainRes = blockchainResult;
        console.log(blockchainRes, "<<<blockchainRes");
      } else {
        const [blockchainError, blockchainResult] = await Utils.parseResponse(
          BlockchainServices.mintNFT({
            tokenURI: data.ipfsUrl,
            price: data.price,
            tokenId,
            contractAddress: contractAddress,
            royalty: data.royality,
            blockchain: data?.blockchain,
            ipfsUrl: ipfsRes,
          })
        );
        console.log("blockchainError", blockchainError);
        console.log("blockchainResult", blockchainResult);

        if (blockchainError || !blockchainResult) {
          this.setState({ loaderState: false });

          return this.showToast(
            "error",
            blockchainError?.data?.message ||
              blockchainError?.message ||
              blockchainError ||
              "Unable to Mint NFT on blockchain"
          );
        }
        blockchainRes = blockchainResult;
        console.log(blockchainRes, "<<<blockchainRes");
      }
    } else {
      console.log(data?.blockchain, "blockchainValue");


      if (data?.isLazyMintingEnabled) {
        var signMsg = "";
        var characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < 32; i++) {
          signMsg += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        signMsg += "!" + tokenId;

        const [blockchainError, blockchainResult] = await Utils.parseResponse(
          BlockchainServices.signcheck({
            signMsg: signMsg,
            blockchain: data?.blockchain,
          })
        );

        console.log("blockchainError", blockchainError);
        console.log("blockchainResult", blockchainResult);

        if (blockchainError || !blockchainResult) {
          this.setState({ loaderState: false });

          return this.showToast(
            "error",
            blockchainError?.data?.message ||
              blockchainError?.message ||
              blockchainError ||
              "Unable to Mint NFT on blockchain"
          );
        }
        blockchainRes = blockchainResult;
        console.log(blockchainRes, "<<<blockchainRes");
      } else {
        const [blockchainError, blockchainResult] = await Utils.parseResponse(
          BlockchainServices.mintNFT({
            tokenURI: data.ipfsUrl,
            price: data.price,
            tokenId,
            contractAddress: contractAddress,
            blockchain: data?.blockchain,
            royalty: data.royality,
            ipfsUrl: ipfsRes,
          })
        );
        console.log("blockchainError", blockchainError);
        console.log("blockchainResult", blockchainResult);

        if (blockchainError || !blockchainResult) {
          console.log(
            "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"
          );
          this.setState({ loaderState: false });
          console.log(
            blockchainError?.data?.message ||
              blockchainError?.message ||
              blockchainError,
            "<<<BlockchainRes"
          );

          return this.showToast(
            "error",
            blockchainError?.data?.message ||
              blockchainError?.message ||
              blockchainError ||
              "Unable to Mint NFT on blockchain"
          );
        }
        blockchainRes = blockchainResult;
        console.log(blockchainRes, "<<<blockchainRes");
      }
    }

    console.log(
      this.getRequestDataForSaveNftContent(tokenId, data, blockchainRes),
      "DATA ON Blockchian"
    );

    // save NFT data on DB
    const [contentError, contentRes] = await Utils.parseResponse(
      getCollection.createNftContent(
        this.getRequestDataForSaveNftContent(tokenId, data, blockchainRes)
      )
    );

    console.log(contentError, contentRes, "nft response");

    this.props.dispatchAction(eventConstants.HIDE_LOADER);
    if (contentError || !contentRes) {
      this.setState({ loaderState: false });
      this.setState({ isMintSuccess: null });
      this.setState({ isOpenMintModal: false });
      return this.showToast(
        "error",
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
      this.showToast("success", "Your NFT has been created");
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
          batchNFTHandler={this.batchNFTHandler.bind(this)}
          url
          mintedNftId={this.state.mintedNftId}
          isMintSuccess={this.state.isMintSuccess}
          isOpenMintModal={this.state.isOpenMintModal}
          loader={this.props.loader}
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
