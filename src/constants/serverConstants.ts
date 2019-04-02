const constants = {
  port: process.env.PORT || 8888,
  host: "0.0.0.0",
  serviceName: "songbook",
  contextRoot: "/api/v1",
  apiInfoUrl: "/api-info",
  collectionUrl: "/collection",
  historyUrl: "/history",
  indexUrl: "/index",
  actionUrl: "/action",
  idGeneration: "incremental"
};

export default constants;
