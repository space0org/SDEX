const accountLevelsABI = [
  {
    "constant": true,
    "inputs": [{"name": "user", "type": "address"}],
    "name": "accountLevel",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
  }
];

const etherDeltaABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "accountLevelsAddr",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{"name": "token", "type": "address"}, {"name": "user", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
  }
];

window.accountLevelsABI = accountLevelsABI;
window.etherDeltaABI = etherDeltaABI;
