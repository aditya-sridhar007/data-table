import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./Table.css";

let isDomLoaded, isLoading;

function Table({ data, fields, table }) {
  const [columns, setColumns] = useState(fields || []);
  const theadRef = useRef(null);

  let testColumns = fields;

  useEffect(() => {
    if (!fields) setColumns(columns);
  }, [fields]);

  useEffect(() => {
    resizeCallHandler();
    window.addEventListener("resize", resizeCallHandler);
    return () => {
      window.removeEventListener("resize", resizeCallHandler);
    };
  }, []);

  const resizeCallHandler = () => {
    console.log("clicked");
    const tableEl = document.querySelector("#d-table");
    const tHead = theadRef.current;
    const tableHeadersArray = Array.from(tHead.children);
    let totalWidth = 0;
    tableHeadersArray.forEach((el) => {
      totalWidth += el.clientWidth;
      console.log(el.clientWidth);
    });

    let tParent = tableEl.parentElement;
    let widthOfContainer = tParent.clientWidth;
    let copyOfColumns = [...testColumns];

    const containerOffset = 25;

    while (totalWidth >= widthOfContainer - containerOffset) {
      if (tableHeadersArray[copyOfColumns.length - 1]) {
        totalWidth -= tableHeadersArray[copyOfColumns.length - 1].clientWidth;
      }
      copyOfColumns.splice(copyOfColumns.length - 1, 1);
      // console.log({ totalWidth, widthOfContainer });
    }

    testColumns = copyOfColumns;

    setColumns(copyOfColumns);

    // console.log("===========================");
    // console.log(
    //   "Table width: ",
    //   totalWidth,
    //   " Container width: ",
    //   tableEl.clientWidth
    // );
    // console.log("===========================");
  };

  useLayoutEffect(() => {
    if (isDomLoaded && !isLoading && theadRef.current) {
      resizeCallHandler();
    }
    return () => {};
  }, [isDomLoaded, isLoading, theadRef]);

  return (
    <div className="container p-3 my-5 rounded border w-75 card shadow ">
      <button className="btn btn-dark btn-lg" onClick={resizeCallHandler}>
        Resize Call
      </button>
      <table
        className="table table-striped table-hover table-bordered w-100"
        id="d-table"
      >
        <thead>
          <tr ref={theadRef}>
            {columns.map((item, idx) => (
              <TableHeader item={item} key={idx} />
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item, idx) => (
            <TableRow item={item} columns={columns} key={idx} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const TableHeader = ({ item }) => <th>{item.heading}</th>;
const TableRow = ({ item, columns }) => (
  <tr>
    {columns.map((coloumnItem, index) => {
      return <td key={index}>{item[`${coloumnItem.value}`]}</td>;
    })}
  </tr>
);

export default Table;
