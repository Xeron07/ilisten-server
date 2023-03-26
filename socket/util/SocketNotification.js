socketNotification = (socket) => {
  socket.on("subscribe", (filter) => {
    let filterSerialized = JSON.stringify(filter);
    socket.join(filterSerialized);
    socket
      .to(filterSerialized)
      .emit(
        "response",
        JSON.stringify({ status: "Subscribed", id: socket.id })
      );
  });

  socket// Runs when client disconnects
  .socket
    .on("disconnect", () => {
      console.log("Disconnected!!");
    });
};

module.exports = socketNotification;
