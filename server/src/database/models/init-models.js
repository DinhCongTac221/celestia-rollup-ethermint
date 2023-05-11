var DataTypes = require("sequelize").DataTypes;
var _addresses = require("./addresses");
var _alerts = require("./alerts");
var _transactions = require("./transactions");

function initModels(sequelize) {
    var addresses = _addresses(sequelize, DataTypes);
    var alerts = _alerts(sequelize, DataTypes);
    var transactions = _transactions(sequelize, DataTypes);

    alerts.belongsTo(addresses, { as: "address", foreignKey: "addressId" });
    addresses.hasOne(alerts, { as: "alert", foreignKey: "addressId" });
    alerts.belongsTo(addresses, { as: "botToken", foreignKey: "botTokenId" });
    addresses.hasMany(alerts, { as: "botTokenAlerts", foreignKey: "botTokenId" });
    alerts.belongsTo(addresses, { as: "chat", foreignKey: "chatId" });
    addresses.hasMany(alerts, { as: "chatAlerts", foreignKey: "chatId" });
    transactions.belongsTo(addresses, { as: "walletAddressAddress", foreignKey: "walletAddress" });
    addresses.hasMany(transactions, { as: "transactions", foreignKey: "walletAddress" });

    return {
        addresses,
        alerts,
        transactions,
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
