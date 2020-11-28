import { Socket } from "socket.io";

const emitData = async (socket: Socket, getCoinsInfo: Function, setts: any) => {
  console.log("emitDAta -> IN");
  let info = await getCoinsInfo();
  socket.emit(setts.socket.EVENT.getData, info);
};

let interval: NodeJS.Timeout;

export default (socket: Socket, getCoinsInfo: Function, setts: any) => {
  socket.on("connection", async (socket: Socket) => {
    console.log("New client connected");
    if (interval) {
      clearInterval(interval);
    }

    emitData(socket, getCoinsInfo, setts);
    interval = setInterval(
      () => emitData(socket, getCoinsInfo, setts),
      setts.server.TIMEOUT
    );
    socket.on("disconnect", () => {
      console.log("Client disconnected");
      clearInterval(interval);
    });
  });
};
