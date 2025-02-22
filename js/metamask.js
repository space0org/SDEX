// Modern MetaMask integration
class MetaMaskIntegration {
  constructor() {
    this.ethereum = window.ethereum;
    this.chainId = '0xaa36a7'; // Sepolia chainId in hex
    this.accountLevelsAddress = '0xC6849b102241A181030c61bb3bF2808Eb2921D58';
    this.etherDeltaAddress = '0x07ef7942554a62F98eFC96a464c005D2e0b21873';
  }

  async initialize() {
    if (!this.ethereum) {
      throw new Error('Please install MetaMask!');
    }

    try {
      // Request account access
      const accounts = await this.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Switch to Sepolia network
      await this.switchToSepolia();
      
      return accounts[0];
    } catch (error) {
      console.error('User denied account access or network switch failed');
      throw error;
    }
  }

  async switchToSepolia() {
    try {
      await this.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: this.chainId }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        await this.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: this.chainId,
            chainName: 'Sepolia',
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18
            },
            rpcUrls: ['https://sepolia.infura.io/v3/edb21febc56648be87babedccd5fe088'],
            blockExplorerUrls: ['https://sepolia.etherscan.io']
          }]
        });
      } else {
        throw switchError;
      }
    }
  }

  async signMessage(message) {
    try {
      const accounts = await this.ethereum.request({ method: 'eth_accounts' });
      const signature = await this.ethereum.request({
        method: 'personal_sign',
        params: [message, accounts[0]],
      });
      return signature;
    } catch (error) {
      console.error('Error signing message:', error);
      throw error;
    }
  }

  // Listen for account changes
  onAccountsChanged(callback) {
    this.ethereum.on('accountsChanged', callback);
  }

  // Listen for chain changes
  onChainChanged(callback) {
    this.ethereum.on('chainChanged', callback);
  }

  // Get current chain ID
  async getChainId() {
    return await this.ethereum.request({ method: 'eth_chainId' });
  }
}

// Export for use in main.js
window.MetaMaskIntegration = MetaMaskIntegration;
