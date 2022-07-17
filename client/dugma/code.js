const socket = io();

socket.on("surprise", ({ thing }) => {
  console.log("server sent us surprise! it is:", thing);
});

function send() {
  socket.emit("new-pizza", { name: "paparoni", price: 12 });
}
