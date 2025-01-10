const web3 = new Web3('http://127.0.0.1:7545');
const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "FundsWithdrawn",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "listModel",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "modelId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			}
		],
		"name": "ModelListed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "modelId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			}
		],
		"name": "ModelPurchased",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "modelId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "rating",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "rater",
				"type": "address"
			}
		],
		"name": "ModelRated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "modelId",
				"type": "uint256"
			}
		],
		"name": "purchaseModel",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "modelId",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "rating",
				"type": "uint8"
			}
		],
		"name": "rateModel",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "modelId",
				"type": "uint256"
			}
		],
		"name": "getModelDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "averageRating",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "models",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "totalRatings",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "ratingSum",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress = '0x2915C6f028f12836772725Ec3787C19862eeeec3';
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Добавление модели
document.getElementById('listModelForm').onsubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('modelName').value;
    const description = document.getElementById('modelDescription').value;
    const price = web3.utils.toWei(document.getElementById('modelPrice').value, 'ether');
    const accounts = await web3.eth.getAccounts();
    try {
        await contract.methods.listModel(name, description, price).send({ from: accounts[0], gas: 3000000 });
        alert('Model listed successfully!');
        loadModels();
    } catch (error) {
        alert('Error listing model: ' + error.message);
    }
};

// Покупка модели
async function purchaseModel(modelId) {
    const accounts = await web3.eth.getAccounts();
    const model = await contract.methods.getModelDetails(modelId).call();
    try {
        await contract.methods.purchaseModel(modelId).send({ from: accounts[0], value: model.price, gas: 3000000 });
        alert('Model purchased successfully!');
        loadModels();
    } catch (error) {
        alert('Error purchasing model: ' + error.message);
    }
}

// Оценка модели
async function rateModel(modelId, rating) {
    const accounts = await web3.eth.getAccounts();
    try {
        await contract.methods.rateModel(modelId, rating).send({ from: accounts[0], gas: 3000000 });
        alert('Model rated successfully!');
        loadModels();
    } catch (error) {
        alert('Error rating model: ' + error.message);
    }
}

// Вывод средств
document.getElementById('withdrawFunds').onclick = async () => {
    const accounts = await web3.eth.getAccounts();
    try {
        await contract.methods.withdrawFunds().send({ from: accounts[0], gas: 3000000 });
        alert('Funds withdrawn successfully!');
    } catch (error) {
        alert('Error withdrawing funds: ' + error.message);
    }
};

// Загрузка моделей
async function loadModels() {
    const modelList = document.getElementById('modelList');
    modelList.innerHTML = '';
    try {
        const modelsCount = 10; // Замените на реальное количество моделей
        for (let i = 0; i < modelsCount; i++) {
            const model = await contract.methods.getModelDetails(i).call();
            const modelHTML = `
                <div>
                    <h3>${model.name}</h3>
                    <p>${model.description}</p>
                    <p>Price: ${web3.utils.fromWei(model.price, 'ether')} ETH</p>
                    <p>Creator: ${model.creator}</p>
                    <p>Average Rating: ${model.averageRating}</p>
                    <button onclick="purchaseModel(${i})">Purchase</button>
                    <input type="number" id="rating${i}" placeholder="Rate (1-5)" />
                    <button onclick="rateModel(${i}, document.getElementById('rating${i}').value)">Rate</button>
                </div>
            `;
            modelList.innerHTML += modelHTML;
        }
    } catch (error) {
        console.error('Error loading models:', error);
    }
}

// Загрузка моделей при загрузке страницы
window.onload = loadModels;
