import { isVisible } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./Table.css";

let isDomLoaded, isLoading;
let headersArray;
let clientWidths;

function Table({ data, fields, table }) {
  const [columns, setColumns] = useState(() => {
    let fieldsRef = [...fields];

    // for (let i = 0; i < 6; i++) {
    //   fieldsRef.splice(i, 1);
    // }
    return fieldsRef;
  });

  const theadRef = useRef(null);

  let testColumns = fields;

  useEffect(() => {
    if (!fields) setColumns(columns);
  }, [fields]);

  useEffect(() => {
    // resizeCallHandler();
    window.addEventListener("resize", resizeCallHandler);
    return () => {
      window.removeEventListener("resize", resizeCallHandler);
    };
  }, []);

  const resizeCallHandler = () => {
    console.log("clicked");
    const tableEl = document.querySelector("#table");
    const tHead = theadRef.current;
    const tableHeadersArray = Array.from(tHead.children);
    let totalWidth = 0;
    tableHeadersArray.forEach((el) => {
      totalWidth += el.clientWidth;
    });

    let tParent = tableEl.parentElement;
    let widthOfContainer = tParent.clientWidth;
    let copyOfColumns = [...testColumns];

    const containerOffset = 25;

    let spliced = false;
    let hiddencolumns = [];
    while (totalWidth >= widthOfContainer - containerOffset) {
      if (tableHeadersArray[copyOfColumns.length - 1]) {
        totalWidth -= tableHeadersArray[copyOfColumns.length - 1].clientWidth;
      }

      copyOfColumns.splice(copyOfColumns.length - 1, 1);

      // copyOfColumns[copyOfColumns.length - 1]["isVisible"] = false;

      spliced = true;
    }

    let startIndex = copyOfColumns.length;
    console.log({
      startIndex,
      clientWidth: headersArray[startIndex].clientWidth,
      trueclientWidth: clientWidths[startIndex],
      totalWidth,
      widthOfContainer,
    });

    while (
      totalWidth < widthOfContainer &&
      clientWidths[startIndex] &&
      clientWidths[startIndex] + totalWidth < widthOfContainer
    ) {
      totalWidth += clientWidths[startIndex];
      copyOfColumns.push(fields[startIndex++]);
      spliced = true;
    }

    console.log({ tableHeadersArray, copyOfColumns, headersArray });

    testColumns = copyOfColumns;

    spliced && setColumns(copyOfColumns);

    // console.log("===========================");
    // console.log(
    //   "Table width: ",
    //   totalWidth,
    //   " Container width: ",
    //   tableEl.clientWidth
    // );
    // console.log("===========================");
  };

  useEffect(() => {
    // resizeCallHandler();
    const tHead = theadRef.current;
    headersArray = Array.from(tHead.children).slice();
    clientWidths = headersArray.map((header) => header.clientWidth);
    console.log({ headersArray });
  }, [theadRef]);

  useLayoutEffect(() => {
    if (isDomLoaded && !isLoading && theadRef.current) {
      // resizeCallHandler();
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
        id="table"
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
