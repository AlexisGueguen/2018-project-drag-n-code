module.exports = {
    apps : [
        {
            name: "dragncode",
            script: "./src/index.jsx",
            watch: true,
            env: {
                "PORT": 8080,
                "NODE_ENV": "development"
            },
            env_production: {
                "PORT": 8080,
                "NODE_ENV": "production",
            }
        }
    ]
}