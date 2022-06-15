module.exports = {
  contracts_build_directory:"./src/contracts",
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 5000000,
      // from: "0xd2980712Bb205D7e9574f1d8AEEc6c48AA941614",
    }
  },
  compilers: {
    solc: {
      version:"0.8.2",
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200      // Default: 200
        },
      }
    }
  }
};