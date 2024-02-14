import abi from "./abi/abi.json";
const { ethers } = require("ethers");


// Replace these values with your contract's details
const contractABI = abi;
const contractAddress = '0x3b0F40399E5A6bA4f3f7Eb08695167b63a8affB8';

export const initContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  return contract;
};
