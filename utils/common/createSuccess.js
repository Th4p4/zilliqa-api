export const accountCreated = (account) => {
  return {
    privateKey: account.privateKey,
    publicKey: account.publicKey,
    address: account.address,
    bech32Address: account.bech32Address,
  };
};
