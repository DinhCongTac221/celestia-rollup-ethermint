const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "addresses",
        {
            id: {
                autoIncrement: true,
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            ip: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            nodeId: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: "addresses_node_id",
                field: "node_id",
            },
            lastUptimeScore: {
                type: DataTypes.FLOAT,
                allowNull: true,
                defaultValue: 0,
                field: "last_uptime_score",
            },
            qualityIndex: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0,
                field: "quality_index",
            },
            walletAddress: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: "addresses_wallet_address",
                field: "wallet_address",
            },
            walletBalance: {
                type: DataTypes.FLOAT,
                allowNull: true,
                defaultValue: 0,
                field: "wallet_balance",
            },
            chatId: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: "addresses_chat_id",
                field: "chat_id",
            },
            botTokenId: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: "addresses_bot_token_id",
                field: "bot_token_id",
            },
            status: {
                type: DataTypes.ENUM("enable", "disable"),
                allowNull: true,
                defaultValue: "enable",
            },
            createdAt: {
                type: DataTypes.BIGINT,
                allowNull: false,
                field: "created_at",
            },
            updatedAt: {
                type: DataTypes.BIGINT,
                allowNull: true,
                field: "updated_at",
            },
        },
        {
            sequelize,
            tableName: "addresses",
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "id" }],
                },
                {
                    name: "addresses_node_id",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "node_id" }],
                },
                {
                    name: "addresses_wallet_address",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "wallet_address" }],
                },
                {
                    name: "addresses_chat_id",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "chat_id" }],
                },
                {
                    name: "addresses_bot_token_id",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "bot_token_id" }],
                },
            ],
        }
    );
};
