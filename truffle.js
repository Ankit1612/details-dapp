/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

 var HDWalletProvider = require('truffle-hdwallet-provider');

 var mnemonic = 'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat';

module.exports = {
  networks: {
    rinkeby: {
      provider: new HDWalletProvider(mnemonic,
      'https://rinkeby.infura.io/v3/52fff26f925b4a43975cc1eb6a2a3bbe',
      1),
      network_id: 5,
      gas: 6712388,
      gasPrice: 10000000
    },
  }, 
};
