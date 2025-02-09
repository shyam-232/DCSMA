import React, { useState } from 'react';
import Profile from './Components/Profile';
import CreatePost from './Components/CreatePost';
import Posts from './Components/Posts';
import Web3 from 'web3';
import contractABI from './contractABI.json';

const App = () => {
  
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const contractAddress = '0xB0c02bF8ef4Ae53d2Ea109cbD8C7b67110b776b1';
      const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
      setContract(contractInstance);
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <div className='bg-gray-600 w-full h-screen rounded-lg'>
      <div className="bg-blue-600 rounded-xl py-6 px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl text-center">
            Decentralized Social Media Platform
          </h1>
          {!account ? (
            <button className='text-white font-semibold bg-blue-700 hover:cursor-pointer hover:bg-blue-800 px-3 py-2 rounded-xl' onClick={connectWallet}>
              Connect Wallet
            </button>
          ) : (
            <h2 className="text-white">Wallet: {account}</h2>
          )}
        </div>
      </div>

      <div className="container mx-auto mt-4">
        {account ? (
          <>
            <Profile account={account} contract={contract} />
            <CreatePost account={account} contract={contract} />
            <Posts contract={contract} />
          </>
        ) : (
          <h1 className='text-center text-xl mt-8 text-white'>
            Please connect your wallet to start using the platform.
          </h1>
        )}
      </div>
    </div>
  );
};

export default App;
