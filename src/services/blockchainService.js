import { ethers } from "ethers";
import contractABI from "../assets/abi/abi.json";
import contractCollectionABI from "../assets/abi/collectionAbi.json";

import { toast } from "react-toastify";

import Utils from "../utility";

// let signer;
// let provider;
// if (!window.ethereum) {
//     // toast.error("Please install metamask ext otherwise you will not able to do tx");
//     //  alert("")
//     Utils.apiFailureToast("Please install metamask ext otherwise you will not able to do tx");
// } else {
//     provider = new ethers.providers.Web3Provider(window.ethereum);
//     signer = provider.getSigner();
// }
// const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS
const contractCollectionAddress = process.env.REACT_APP_CONTRACT_COLLECTION_ADDRESS

// const contractAddress = "0xd3E390083BC66d87aFD1457879A2fDDfBBe16e06";
const BlockchainServices = {
    mintNFT,
    changeListedPrice,
    buyNFT,
    removeFromSaleNft,
    putOnSaleNft,
    createCollections
};

export default BlockchainServices;

async function mintNFT({ tokenURI, price, tokenId, contractAddress }) {

    if (!window.ethereum)
        return Promise.reject("Please install metamask")
    if (window.ethereum.networkVersion == 4) { }
    else
        // console.log("kkkkkkkkkkkkkkkkkkkkkk network swutch")
        return Promise.reject("Switch this network into Rinkeby")
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(contractAddress, contractABI, signer);
    const result = await contractData.mint(
        tokenURI,
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

//price should be in wei
async function changeListedPrice({ tokenId, price, contractAddress }) {
    if (!window.ethereum)
        return Promise.reject("Please install metamask")
    if (window.ethereum.networkVersion == 4) { }
    else
        return Promise.reject("Switch this network into Rinkeby")
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
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

async function removeFromSaleNft({ tokenId, contractAddress }) {
    if (!window.ethereum)
        return Promise.reject("Please install metamask")
    if (window.ethereum.networkVersion == 4) { }
    else
        return Promise.reject("Switch this network into Rinkeby")
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
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
async function buyNFT({ tokenId, price, contractAddress }) {
    console.log("kdkkkkkkkkkkkk",contractAddress)
    if (!window.ethereum)
        return Promise.reject("Please install metamask")
    if (window.ethereum.networkVersion == 4) { }
    else
        return Promise.reject("Switch this network into Rinkeby")
    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
    );
    const amount = ethers.utils.parseUnits(price.toString(), 18);
    const accounts = await provider.send("eth_requestAccounts", []);


    const balance = await provider.getBalance(accounts[0])
    if (ethers.utils.formatUnits(balance, 18) < ethers.utils.formatUnits(amount, 18))
        return Promise.reject("Insufficient balance")


    const options = { value: ethers.utils.parseEther(price.toString()) };

    const result = await contractData.buy(tokenId, options);
    console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",result)

    let res = await result.wait();

    return {
        ...res,
        chainId: provider?._network?.chainId || "",
        name: provider?._network?.name || "",
    };
}

async function putOnSaleNft({ tokenId, contractAddress }) {
    if (!window.ethereum)
        return Promise.reject("Please install metamask")
    if (window.ethereum.networkVersion == 4) { }
    else
        return Promise.reject("Switch this network into Rinkeby")
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
    );
    const result = await contractData.updateListingStatus(tokenId, true);

    let res = await result.wait();
    return {
        ...res,
        chainId: provider?._network?.chainId || "",
        name: provider?._network?.name || "",
    };
}
// for create collections
async function createCollections({ name, symbol }) {
    if (!window.ethereum)
        return Promise.reject("Please install metamask")
    if (window.ethereum.networkVersion == 4) { }
    else
        return Promise.reject("Switch this network into Rinkeby")
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractData = new ethers.Contract(
        contractCollectionAddress,
        contractCollectionABI,
        signer
    );
    const result = await contractData.createCollection(name, symbol);

    let res = await result.wait();
    console.log("---------ssss----")
    // console.log("000000000000000000000000", pp.logs)
    // console.log("000000wwww000000000000000000",)
    const getReceipt = await provider.getTransactionReceipt(res.transactionHash)
    // console.log("lssssssss",getReceipt.logs[0].address)
    return {
        ...res,
        contract_address: getReceipt.logs[0].address,
        chainId: provider?._network?.chainId || "",
        name: provider?._network?.name || "",
    };
}
