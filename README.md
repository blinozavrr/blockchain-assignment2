# blockchain-assignment2

# AI Model Marketplace

This project implements a blockchain-based AI Model Marketplace using Solidity for smart contracts and Web3.js for interaction with the blockchain.

---

## **Overview**

The AI Model Marketplace allows users to:
- **List a Model**: Upload details of an AI model including name, description, and price.
- **Purchase a Model**: Buy a listed AI model by paying the specified price in ETH.
- **Rate a Model**: Provide a rating (1-5) for a purchased model.
- **Withdraw Funds**: Allow the creator of a model to withdraw earned funds.

The project is built on Ethereum and uses **Ganache** as the local blockchain environment.

---

## **Structure**

- **contracts/**: Contains the Solidity smart contract file `AIModelMarketplace.sol`.
- **scripts/**: Scripts for deploying the contract.
- **frontend/**: Contains HTML, CSS, and JavaScript files for the user interface.
  - `index.html`: Main UI for interacting with the blockchain.
  - `style.css`: Styling for the UI.
  - `app.js`: Contains logic for interacting with the smart contract.
- **README.md**: Documentation for the project.
- **package.json**: Dependencies for the project.

---

## **How to Run**

### 1. **Install Dependencies**
Make sure you have Node.js and Ganache installed.

Run the following command to install the required dependencies:
```bash
npm install

