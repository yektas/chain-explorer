import React from "react";
import { useSortBy, useTable } from "react-table";

const EmptyState = () => {
  return (
    <div className="  p-4 w-full mx-auto">
      <div className="animate-pulse flex ">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};
const Datatable = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState: {
          sortBy: [
            {
              id: "value",
              desc: true,
            },
          ],
        },
      },
      useSortBy
    );

  return (
    <div className="mt-2 flex flex-col">
      <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table
              {...getTableProps()}
              className="min-w-full divide-y divide-gray-200"
            >
              <thead className="bg-dark">
                {headerGroups.map((headerGroup, i) => (
                  <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, i) => (
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        key={i}
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render("Header")}
                        {/* Add a sort direction indicator */}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " ▼"
                              : " ▲"
                            : ""}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="bg-white divide-y divide-gray-200"
              >
                {data && data.length > 0
                  ? rows.map((row, i) => {
                      // new
                      prepareRow(row);
                      return (
                        <tr key={i} {...row.getRowProps()}>
                          {row.cells.map((cell, i) => {
                            return (
                              <td
                                key={i}
                                {...cell.getCellProps()}
                                className="px-6 py-4 whitespace-nowrap"
                              >
                                {cell.render("Cell")}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })
                  : [...Array(5)].map((_, i) => (
                      <tr key={i}>
                        {columns.map((_, i) => (
                          <td key={i}>
                            <EmptyState />
                          </td>
                        ))}
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Datatable;
