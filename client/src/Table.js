import { useContext, useEffect, useState } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import { PrevInfoContext } from "./AppContext";
import "./Table.css";
import numeral from "numeral";

const isEmptyObj = (obj) => {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return JSON.stringify(obj) === JSON.stringify({});
};
export const Table = ({ columns, data }) => {
  // Use the state and functions returned from useTable to build your UI
  // const [currInfo, setCurrInfo] = useState({});
  const [prevInfo, setPrevInfo] = useState({});
  const [prevInfoCtx, setPrevInfoCtx] = useContext(PrevInfoContext);

  useEffect(() => {
    setPageSize(15);
  }, []);

  useEffect(() => {
    if (!isEmptyObj(prevInfoCtx)) {
      // console.log("setPrevInfo");
      // console.log(prevInfoCtx);
      setPrevInfo(prevInfoCtx);
    }
    // console.log("inUseEffect");
    let curr = {};
    data.forEach(({ id, priceUsd }) => {
      curr[id] = numeral(priceUsd);
    });
    // console.log("setPrevInfoCtx");
    setPrevInfoCtx(curr);
  }, [data]);

  const alignSide = (i) => {
    return i === 1
      ? "padLR left-align"
      : i === 0
      ? "padLR"
      : "padLR right-align";
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      autoResetPage: false,
      // useControlledState: false,
    },
    useSortBy,
    usePagination
  );
  const addClass = (key, val) => {
    // console.log("prevInfo->", prevInfo["bitcoin"]);
    // console.log(key);
    // if (!prevInfo || !currInfo) return;
    // console.log("prevInfo -> ", prevInfo[key]);
    // console.log("currInfo -> ", currInfo[key]);
    // if (prevInfo[key]._value) return "";
    if (!isEmptyObj(prevInfo)) {
      let prevPrice = prevInfo[key]._value;
      let curPrice = numeral(val)._value;
      // console.log(prevPrice, curPrice);

      if (prevPrice < curPrice) {
        return "price-down";
      } else if (prevPrice > curPrice) {
        return "price-up";
      } else {
        return "";
      }
      // if (prevInfo[key] === 'bitcoi')
    }
  };
  // Render the UI for your table
  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th
                  className={alignSide(i)}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            let val = row.original.priceUsd;
            let key = row.original.id;
            // console.log("prevInfo->", prevInfo["bitcoin"]);
            // console.log("currentInfo", data[0].priceUsd);

            // if (!isEmptyObj(prevInfo)) {
            //   console.log(prevInfo[key]);

            // }
            // console.log(prevInfo);
            // console.log(data);
            // currInfo[key] = numeral(val);
            return (
              // className={addClass(key, val)}
              <tr className={addClass(key, val)} {...row.getRowProps()}>
                {row.cells.map((cell, i) => {
                  return (
                    <td className={alignSide(i)} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          {/* {(prevInfo = currInfo)} */}
        </tbody>
      </table>
      {/* 
          Pagination can be built however you'd like. 
          This is just a very basic UI implementation:
        */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
      </div>
    </div>
  );
};
