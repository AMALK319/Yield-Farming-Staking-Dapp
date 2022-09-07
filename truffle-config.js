require('dotenv').config();


module.exports = {


    networks: {
        development: {
            host: "127.0.0.1:7545",
            port: 7545,
            network_id: "*", // match any network
        },
    },

    contracts_directory: './src/contracts/',
    contracts_build_directory: './src/truffle_abis',

    // Configure your compilers
    compilers: {
        solc: {
            version: "^0.8.16",
            optimizer: {
                enabled: false,
                runs: 200
            },

        }
    },


};
