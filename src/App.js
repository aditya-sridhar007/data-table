import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Components/Table";

function App() {
  const coloumnH = [
    { heading: "Name", value: "name" },
    { heading: "Email", value: "email" },
    { heading: "Phone", value: "phone" },
    { heading: "Username", value: "username" },
    { heading: "Employee", value: "username" },
    { heading: "HR", value: "username" },
    { heading: "CEO", value: "username" },
    { heading: "HManager", value: "username" },
    { heading: "Candidate", value: "username" },
    { heading: "Freelancer", value: "username" },
    { heading: "Admin", value: "username" },
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
