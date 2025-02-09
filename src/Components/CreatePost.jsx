import React, { useState } from "react";
import Web3 from "web3";

const CreatePost = ({ account, contract }) => {
  const [content, setContent] = useState("");

  const handlePost = async () => {
    if (content && contract) {
      try {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        let gasPrice;
        try {
          const isEip1559Supported = await web3.eth
            .getBlock("latest")
            .then((block) => block.baseFeePerGas !== undefined);
          if (isEip1559Supported) {
            const feeData = await web3.eth.getFeeHistory(
              1,
              "latest",
              [10, 20, 30]
            );
            gasPrice = feeData.baseFeePerGas[0] + feeData.reward[0][0];
          } else {
            gasPrice = await web3.eth.getGasPrice();
          }
        } catch (error) {
          console.error("Error fetching gas price:", error);
          gasPrice = await web3.eth.getGasPrice();
        }

        const transactionParameters = {
          to: "0xBf8A15F20bb11C388570900d62ac7e2ba66EFf86",
          from: account,
          value: web3.utils.toHex(web3.utils.toWei("0.1", "ether")),
          gasPrice: web3.utils.toHex(gasPrice),
          gas: web3.utils.toHex(3000000),
        };

        const txHash = await web3.eth.sendTransaction(transactionParameters);
        console.log("Transaction successful with hash:", txHash);

        await contract.methods.createPost(content).send({ from: account });
        setContent("");
        alert("Post created successfully!");
      } catch (error) {
        console.error("Transaction failed:", error);
        alert("Transaction failed. Please check the console for more details.");
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="mb-2">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="content"
        >
          What's on your mind?
        </label>
        <textarea
          id="content"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 hover:cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handlePost}
      >
        Post
      </button>
    </div>
  );
};

export default CreatePost;
