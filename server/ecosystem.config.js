module.exports = {
    apps: [
        {
            name: "Celestia-Api App",
            script: "/usr/bin/yarn",
            args: "app",
            instances: 1,
            exec_mode: "cluster",
            autorestart: true,
            max_memory_restart: "500M",
        },
        {
            name: "Celestia-Api Cron",
            script: "/usr/bin/yarn",
            args: "cron",
            instances: 1,
            exec_mode: "cluster",
            autorestart: true,
            max_memory_restart: "500M",
        },
        {
            name: "Celestia-Api Queue",
            script: "/usr/bin/yarn",
            args: "queue",
            instances: 1,
            exec_mode: "cluster",
            autorestart: true,
            max_memory_restart: "500M",
        },
    ],
};
