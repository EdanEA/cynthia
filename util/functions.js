module.exports = () => {
  process.on("uncaughtException", (err) => {
    console.error(`Uncaught Exception: ${JSON.stringify(err)}`);
  });

  process.on("unhandledRejection", err => {
    console.error(`Unhandled rejection: ${err}`);
  });
};
