import React, { useState } from "react";

const Table = ({ filteredData, toggleEdit }) => {
  const [tableData, setTableData] = useState(filteredData);

  const onChangeInput = (e, id) => {
    const { name, value } = e.target;

    const updatedData = tableData.map((item) =>
      item.id === id ? { ...item, [name]: value } : item
    );

    setTableData(updatedData);
  };

  // check if there's data to display
  if (tableData.length === 0) {
    return <p>No data to display</p>;
  }

  // get headers from the keys of the first item
  const headers = Object.keys(tableData[0]);

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr key={item.id}>
              {headers.map((header, index) => (
                <td key={index}>
                  {header === 'id' ? (
                    item[header]
                  ) : (
                    <input
                      name={header}
                      value={item[header]}
                      type="text"
                      onChange={(e) => onChangeInput(e, item.id)}
                      placeholder={`Type ${header}`}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;