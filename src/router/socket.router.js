const { isNullishCoalesce } = require("typescript");
const { HANDLE_TYPE } = require("../contants");
async function SocketController(payload) {
  let data;
  switch (payload.cmdtype) {
    case HANDLE_TYPE.GET_VIDEO:
      data = await "controller";

    default:
      data = null;
  }
  const response = {
    event: "video",
    data,
  };
  return response;
}

module.exports = SocketController;
