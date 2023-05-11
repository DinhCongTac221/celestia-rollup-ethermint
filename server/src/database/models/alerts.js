const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "alerts",
        {
            id: {
                autoIncrement: true,
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            addressId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: "addresses",
                    key: "id",
                },
                unique: "alerts_address_id_FK",
                field: "address_id",
            },
            chatId: {
                type: DataTypes.STRING(100),
                allowNull: false,
                references: {
                    model: "addresses",
                    key: "chat_id",
                },
                field: "chat_id",
            },
            botTokenId: {
                type: DataTypes.STRING(100),
                allowNull: false,
                references: {
                    model: "addresses",
                    key: "bot_token_id",
                },
                field: "bot_token_id",
            },
            message: {
                type: DataTypes.STRING(500),
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM("success", "failed"),
                allowNull: true,
                defaultValue: "failed",
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
            tableName: "alerts",
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "id" }],
                },
                {
                    name: "alerts_address_id",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "address_id" }],
                },
                {
                    name: "alerts_chat_id_FK",
                    using: "BTREE",
                    fields: [{ name: "chat_id" }],
                },
                {
                    name: "alerts_bot_token_id_FK",
                    using: "BTREE",
                    fields: [{ name: "bot_token_id" }],
                },
            ],
        }
    );
};
