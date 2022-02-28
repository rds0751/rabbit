import { ethers } from "ethers";
import contractABI from "../assets/abi/abi.json";
import { toast } from "react-toastify";

import Utils from "../utility";

let signer;
let provider;
if (!window.ethereum) {
  // toast.error("Please install metamask ext otherwise you will not able to do tx");
  //  alert("")
  Utils.apiFailureToast("Please install metamask ext otherwise you will not able to do tx");
}
else {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
}
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS

// const contractAddress = "0xd3E390083BC66d87aFD1457879A2fDDfBBe16e06";
const BlockchainServices = {
  mintNFT,
  changeListedPrice,
  buyNFT,
  removeFromSaleNft,
  putOnSaleNft,
};

export default BlockchainServices;

async function mintNFT({ tokenURI, price, tokenId }) {
  console.log("mint function", tokenURI);
  //   console.log("mint function price",price)

  const contractData = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  const result = await contractData.mint(
    tokenURI,
    tokenId,
    ethers.utils.parseEther(price.toString())
  );
  // console.log("mint function")

  let res = await result.wait();
  return {
    ...res,
    chainId: provider?._network?.chainId || "",
    name: provider?._network?.name || "",
  };
}

//price should be in wei
async function changeListedPrice({ tokenId, price }) {
  const contractData = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  const result = await contractData.updatePrice(
    tokenId,
    ethers.utils.parseEther(price.toString())
  );
  let res = await result.wait();

  return {
    ...res,
    chainId: provider?._network?.chainId || "",
    name: provider?._network?.name || "",
  };
}

async function removeFromSaleNft({ tokenId }) {
  const contractData = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  const result = await contractData.updateListingStatus(tokenId, false);
  let res = await result.wait();
  return {
    ...res,
    chainId: provider?._network?.chainId || "",
    name: provider?._network?.name || "",
  };
}
// async function putOnSaleNft({tokenId}) {
//     const contractData = new ethers.Contract(contractAddress, contractABI, signer);
//     console.log("blockchain fn",contractData)

//     const result = await contractData.updateListingStatus(tokenId,true)

//     let res = await result.wait();
//     return {
//         ...res,
//         chainId: provider?._network?.chainId || '',
//         name: provider?._network?.name || '',
//     }
// }

//1bnb=0.136ether
async function buyNFT({ tokenId, price }) {
  const contractData = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  const options = { value: ethers.utils.parseEther(price.toString()) };

  const result = await contractData.buy(tokenId, options);
  let res = await result.wait();

  return {
    ...res,
    chainId: provider?._network?.chainId || "",
    name: provider?._network?.name || "",
  };
}
async function putOnSaleNft({ tokenId }) {
  const contractData = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  console.log("blockchain fn", tokenId);

  const result = await contractData.updateListingStatus(tokenId, true);

  let res = await result.wait();
  return {
    ...res,
    chainId: provider?._network?.chainId || "",
    name: provider?._network?.name || "",
  };
}
