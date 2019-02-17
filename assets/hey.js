export default (m) => {
  if (process.server) {
    console.log(`server ${m}`);
  }
  if (process.client) {
    console.log(`client ${m}`);
  }
};
