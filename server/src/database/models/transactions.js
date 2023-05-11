const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "transactions",
        {
            id: {
                autoIncrement: true,
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            walletAddress: {
                type: DataTypes.STRING(100),
                allowNull: false,
                references: {
                    model: "addresses",
                    key: "wallet_address",
                },
                field: "wallet_address",
            },
            namespaceId: {
                type: DataTypes.STRING(100),
                allowNull: false,
                field: "namespace_id",
            },
            height: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            txhash: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            rawLog: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: "raw_log",
            },
            gasWanted: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "gas_wanted",
            },
            gasUsed: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "gas_used",
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
            tableName: "transactions",
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "id" }],
                },
                {
                    name: "transactions_wallet_address",
                    using: "BTREE",
                    fields: [{ name: "wallet_address" }],
                },
            ],
        }
    );
};
