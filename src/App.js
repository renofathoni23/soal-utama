import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { SHA256 } from "crypto-js";

function App() {
  //Nomor 1
  const strukturJSON = [
    {
      nama: "Reno",
      asal: "Jakarta",
      sekolah: "SMA 3",
    },
    {
      nama: "Rehan",
      asal: "Jakarta",
      sekolah: "SMA 6",
    },
    {
      nama: "Ammar",
      asal: "Jakarta",
      sekolah: "SMA 82",
    },
  ];
  //Nomor 2
  const [indexOrang, setIndexOrang] = useState(0);
  let label = strukturJSON[indexOrang]?.nama;
  const handleChangeLabel = () => {
    setIndexOrang((indexOrang + 1) % strukturJSON.length);
  };

  //Nomor 3
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  //Nomor 5
  const removeData = (index) => {
    const updatedData = [...data.slice(0, index), ...data.slice(index + 1)];
    setData(updatedData);
  };

  //Nomor 6
  const removeKey = () => {
    //Remove body key
    const updatedData = [];
    data.forEach((post) => {
      const { body, ...rest } = post;
      updatedData.push(rest);
    });

    setData(updatedData);
  };

  //Nomor 7
  const convertSHA256 = (string) => {
    return SHA256(input).toString();
  };

  const input = "29082022renopriaifabula";
  const hashInput = convertSHA256(input);
  console.log(hashInput);

  //Nomor 9

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    setLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="App">
      <h1>Soal Utama</h1>
      <section>
        <h1>Nomor 9</h1>
        <div>
          {" "}
          {loggedIn ? (
            <div>
              <p>Selamat datang, {localStorage.getItem("username")}!</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
              />
              <br />
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <br />
              <button onClick={handleLogin}>Login</button>
            </div>
          )}
        </div>
      </section>
      <section>
        <h1>Nomor 2</h1>
        <span>{label}</span>
        <br />
        <button onClick={() => handleChangeLabel()}>Ganti Label</button>
      </section>
      <section>
        <h1>Nomor 4</h1>
        <table>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>Action</th>
          </tr>
          {data.slice(0, 10).map((post, index) => {
            return (
              <tr key={post.id}>
                <td>{post?.userId}</td>
                <td>{post?.id}</td>
                <td>{post?.title}</td>
                <td>{post?.body}</td>
                <td>
                  <button onClick={() => removeData(index)}>Hapus</button>
                </td>
              </tr>
            );
          })}
        </table>
      </section>
      <section>
        <h1>Nomor 6</h1>
        <span>
          Tekan Button "Hapus Body Key" Untuk menghapus key body pada data nomor
          4
        </span>
        <br />
        <button onClick={() => removeKey()}>Hapus Body Key</button>
      </section>
      <section>
        <h1>Nomor 7</h1>
        <span>Input: {input} </span>
        <br />
        <span>Hash: {hashInput}</span>
      </section>
    </div>
  );
}

export default App;
