// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AIModelMarketplace {
    struct Model {
        string name;
        string description;
        uint256 price;
        address payable creator;
        uint8 totalRatings;
        uint256 ratingSum;
    }

    Model[] public models;

    event ModelListed(uint256 modelId, string name, uint256 price, address creator);
    event ModelPurchased(uint256 modelId, address buyer);
    event ModelRated(uint256 modelId, uint8 rating, address rater);

    function listModel(string memory name, string memory description, uint256 price) public {
        require(bytes(name).length > 0, "Name required");
        require(price > 0, "Price must be greater than 0");

        models.push(Model({
            name: name,
            description: description,
            price: price,
            creator: payable(msg.sender),
            totalRatings: 0,
            ratingSum: 0
        }));

        emit ModelListed(models.length - 1, name, price, msg.sender);
    }

    function purchaseModel(uint256 modelId) public payable {
        require(modelId < models.length, "Model does not exist");
        Model storage model = models[modelId];
        require(msg.value == model.price, "Incorrect payment value");
        require(msg.sender != model.creator, "You cannot buy your own model");

        model.creator.transfer(msg.value);

        emit ModelPurchased(modelId, msg.sender);
    }

    function rateModel(uint256 modelId, uint8 rating) public {
        require(modelId < models.length, "Model does not exist");
        require(rating > 0 && rating <= 5, "Rating must be between 1 and 5");

        Model storage model = models[modelId];
        model.totalRatings++;
        model.ratingSum += rating;

        emit ModelRated(modelId, rating, msg.sender);
    }

    function getModelDetails(uint256 modelId) public view returns (
        string memory name, 
        string memory description, 
        uint256 price, 
        address creator, 
        uint256 averageRating
    ) {
        require(modelId < models.length, "Model does not exist");

        Model storage model = models[modelId];
        uint256 avgRating = model.totalRatings > 0 ? model.ratingSum / model.totalRatings : 0;
        return (model.name, model.description, model.price, model.creator, avgRating);
    }
}
