import { useContext, useEffect, useState } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import { PrevInfoContext } from "./AppContext";
import "./Table.css";
import numeral from "numeral";

export const Table = ({ columns, data }) => {
  // Use the state and functions returned from useTable to build your UI
  const [prevInfo, setPrevInfo] = useState({});
  const [prevInfoCtx, setPrevInfoCtx] = useContext(PrevInfoContext);
  const isEmptyObj = (obj) => {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }
    return JSON.stringify(obj) === JSON.stringify({});
  };
  useEffect(() => {
    setPageSize(15);
  }, []);

  useEffect(() => {
    if (!isEmptyObj(prevInfoCtx)) {
      setPrevInfo(prevInfoCtx);
    }
    let curr = {};
    data.forEach(({ id, priceUsd }) => {
      curr[id] = numeral(priceUsd);
    });
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
    },
    useSortBy,
    usePagination
  );
  const addClass = (key, val) => {
    if (!isEmptyObj(prevInfo)) {
      let prevPrice = prevInfo[key]._value;
      let curPrice = numeral(val)._value;
      if (prevPrice < curPrice) {
        return "price-down";
      } else if (prevPrice > curPrice) {
        return "price-up";
      } else {
        return "";
      }
    }
  };
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
            return (
              // className={addClass(key, val)}
              <tr
                className={addClass(row.original.id, row.original.priceUsd)}
                {...row.getRowProps()}
              >
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
