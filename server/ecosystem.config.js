module.exports = {
    apps: [
        {
            name: "Celestia-Ethermint-Api Faucet",
            script: "/usr/bin/yarn",
            args: "app",
            instances: 1,
            exec_mode: "cluster",
            autorestart: true,
            max_memory_restart: "500M",
        },        
    ],
};
