const { Web3 } = require('web3');

const web3 = new Web3('http://127.0.0.1:7545'); 

const contractABI = [
    {
        "inputs": [
            { "internalType": "string", "name": "name", "type": "string" },
            { "internalType": "string", "name": "description", "type": "string" },
            { "internalType": "uint256", "name": "price", "type": "uint256" }
        ],
        "name": "listModel",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "uint256", "name": "modelId", "type": "uint256" },
            { "indexed": false, "internalType": "string", "name": "name", "type": "string" },
            { "indexed": false, "internalType": "uint256", "name": "price", "type": "uint256" },
            { "indexed": false, "internalType": "address", "name": "creator", "type": "address" }
        ],
        "name": "ModelListed",
        "type": "event"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "modelId", "type": "uint256" }
        ],
        "name": "getModelDetails",
        "outputs": [
            { "internalType": "string", "name": "name", "type": "string" },
            { "internalType": "string", "name": "description", "type": "string" },
            { "internalType": "uint256", "name": "price", "type": "uint256" },
            { "internalType": "address", "name": "creator", "type": "address" },
            { "internalType": "uint256", "name": "averageRating", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];


const contractAddress = '0x80bDc4328a3A9A8EeBf4Fd0E954d525a9D5d3d18'; 

// Создание экземпляра контракта
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Функция для добавления модели
async function listModel(name, description, priceInEther) {
    const accounts = await web3.eth.getAccounts(); // Получение списка аккаунтов из Ganache
    const sender = accounts[0]; // Используем первый аккаунт

    const price = web3.utils.toWei(priceInEther, 'ether'); // Перевод цены в Wei

    await contract.methods
        .listModel(name, description, price)
        .send({ from: sender });
    console.log(`Model "${name}" listed successfully!`);
}

// Функция для получения деталей модели
async function getModelDetails(modelId) {
    const details = await contract.methods.getModelDetails(modelId).call();
    console.log('Model Details:', details);
}

// Основная функция для вызова
async function main() {
    try {
        // Добавляем модель
        await listModel('Test Model', 'This is a test model', '1'); // 1 ETH

        // Получаем детали модели
        await getModelDetails(0); // Данные для модели с ID 0
    } catch (error) {
        console.error('Error:', error.message);
    }
}

main();
