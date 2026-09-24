module.exports = {
	apps: [{
		name:"aula19",
		script: "./server.js",
		max_memory_restart: "100M",
		env: {
			NODE_ENV: "development",
			PORT: 3001
		},
		env_production: {
			NODE_ENV: "production",
			PORT: 8081
		}
	}]
};
