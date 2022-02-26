import { ethers } from "ethers";
import contractABI from "../assets/abi/abi.json";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
// const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS
const contractAddress = "0x6C91250d5CB9EA134b5Db188533d24bFa23A039b";
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
