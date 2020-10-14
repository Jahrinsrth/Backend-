module.exports = {
  networks: {
    development: {
      host: "192.168.8.100",
      port: 7545,
      network_id: "*" // Match any network id
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}