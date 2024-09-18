module.exports = {
  apps : [
      {
        name: "trio-comet",
        script: "docker run -dp 3000:3000 triocomet",
        port: 3000
      }
  ]
}