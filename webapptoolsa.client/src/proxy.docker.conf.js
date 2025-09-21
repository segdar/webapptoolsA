const PROXY_CONFIG = [
  {
    context: [
      "/company",
      "/warehouse",
      "/tools",
      "/auth",
      "/transaction"
    ],
    target: "https://webapptoolsa.server:8081", // backend service name from docker-compose
    changeOrigin: true,
    secure: false,
    logLevel: "debug"
  }
];

module.exports = PROXY_CONFIG;
