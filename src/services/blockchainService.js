import {ethers} from 'ethers';
import contractABI from "../assets/abi/abi.json";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractAddress = "";
// const contractAddress = '0x9C96456E5eEDF827F17ED2F0809b31c21d821688'


export default {
    
    mintNFT,
    changeListedPrice,
    buyNFT,
    removeFromSaleNft,
}



async function mintNFT({tokenURI,price}) {
    const contractData = new ethers.Contract(contractAddress, contractABI, signer);
    const result = await contractData.mint(tokenURI,price)
    let res = await result.wait();
    return {
        ...res,
        chainId: provider?._network?.chainId || '',
        name: provider?._network?.name || '',
    }


}

//price should be in wei
async function changeListedPrice({tokenId, price}) {
    const contractData = new ethers.Contract(contractAddress, contractABI, signer);
    const result = await contractData.updatePrice(tokenId, ethers.utils.parseEther(price.toString()))
    let res = await result.wait();

    return {
        ...res,
        chainId: provider?._network?.chainId || '',
        name: provider?._network?.name || '',
    }
}

async function removeFromSaleNft({tokenId}) {
    const contractData = new ethers.Contract(contractAddress, contractABI, signer);
    const result = await contractData.updateListingStatus(tokenId,false)
    let res = await result.wait();
    return {
        ...res,
        chainId: provider?._network?.chainId || '',
        name: provider?._network?.name || '',
    }
}

//1bnb=0.136ether
async function buyNFT({tokenId}) {
    const contractData = new ethers.Contract(contractAddress, contractABI, signer);
    const result = await contractData.buy(tokenId)
    let res = await result.wait();

    return {
        ...res,
        chainId: provider?._network?.chainId || '',
        name: provider?._network?.name || '',
    }


}

