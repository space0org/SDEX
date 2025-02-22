import './contract-abis.js';
import './metamask.js';

// Initialize MetaMask integration
const metamask = new MetaMaskIntegration();

// Initialize Web3 with MetaMask provider
async function initWeb3() {
  try {
    await metamask.initialize();
    window.web3 = new Web3(window.ethereum);
    
    // Set up contract instances
    window.accountLevels = new web3.eth.Contract(accountLevelsABI, metamask.accountLevelsAddress);
    window.etherDelta = new web3.eth.Contract(etherDeltaABI, metamask.etherDeltaAddress);
    
    // Listen for account changes
    metamask.onAccountsChanged((accounts) => {
      if (accounts.length === 0) {
        console.log('Please connect to MetaMask.');
      } else {
        console.log('Account changed to:', accounts[0]);
        // Refresh UI or handle account change
      }
    });

    // Listen for chain changes
    metamask.onChainChanged((chainId) => {
      if (chainId !== metamask.chainId) {
        console.log('Please switch to Sepolia network');
        metamask.switchToSepolia();
      }
    });

    return true;
  } catch (error) {
    console.error('Failed to initialize Web3:', error);
    return false;
  }
}

// Export initialization function
window.initWeb3 = initWeb3;
