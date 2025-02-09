import React, { useEffect, useState } from 'react';

const Profile = ({ account, contract }) => {
  const [username, setUsername] = useState('');
  const [reputation, setReputation] = useState(0);

  const fetchProfile = async () => {
    if (contract) {
      const profile = await contract.methods.getProfile(account).call();
      setUsername(profile[0]);
      setReputation(profile[1]);
    }
  };

  const createProfile = async () => {
    const user = prompt('Enter your username');
    if (user && contract) {
      await contract.methods.createProfile(user).send({ from: account });
      fetchProfile();
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [contract]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-2xl text-gray-700 font-bold mb-4">Profile</h2>
      {username ? (
        <div>
          <p className="text-gray-700">Username: {username}</p>
          <p className="text-gray-500">Reputation: {reputation}</p>
        </div>
      ) : (
        <button
          className="bg-blue-500 hover:cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={createProfile}
        >
          Create Profile
        </button>
      )}
    </div>
  );
};

export default Profile;
