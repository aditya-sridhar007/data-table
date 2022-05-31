import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Components/Table";

function App() {
  const coloumnH = [
    { heading: "Name", value: "name", isVisible: true },
    { heading: "Email", value: "email", isVisible: true },
    { heading: "Phone", value: "phone", isVisible: true },
    { heading: "Username", value: "username", isVisible: true },
    { heading: "Employee", value: "username", isVisible: true },
    { heading: "HR", value: "username", isVisible: true },
    { heading: "CEO", value: "username", isVisible: true },
    { heading: "HManager", value: "username", isVisible: true },
    { heading: "Candidate", value: "username", isVisible: true },
    { heading: "Freelancer", value: "username", isVisible: true },
    { heading: "Admin", value: "username", isVisible: true },
  ];
  const [dataTable, setDataTable] = useState([]);
  // console.log(dataTable);

  useEffect(() => {
    axios("https://jsonplaceholder.typicode.com/users")
      .then((res) => setDataTable(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <Table data={dataTable} fields={coloumnH} />
    </div>
  );
}

export default App;
