import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Lobby from "./components/Lobby";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useState } from "react";
import Chat from "./components/Chat";

function App() {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  async function joinRoom(user, room) {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:44361/chat")
        .configureLogging(LogLevel.Information)
        .build();

connection.on("UsersInRoom",(users)=>{setUsers(users);});


      connection.on("ReceiveMessage", (user, message) => {
        // console.log("message received: ", message);
        setMessages((messages) => [...messages, { user, message }]);
      });

      connection.onclose(e => {
        setConnection();
        setMessages([]);
        setUsers([]);
      });

      await connection.start();
      await connection.invoke("joinRoom", { user, room });
      setConnection(connection);


    } catch (e) {
      console.log(e);
    }
  }

  async function closeConnection() {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  }

  async function sendMessage(message) {
    try {
      await connection.invoke("sendMessage", message);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="App">
      <h2>My Chat</h2>
      <hr className="line" />
      {console.log("connect" + connection)}
      {!connection ? (
        <Lobby joinRoom={joinRoom} />
      ) : (
        <Chat messages={messages} sendMessage={sendMessage} closeConnection={closeConnection} users={users} />
      )}
    </div>
  );
}

export default App;
