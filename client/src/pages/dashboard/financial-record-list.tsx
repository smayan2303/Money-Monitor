import { useMemo, useState } from "react";
import {
  FinancialRecord,
  useFinancialRecords,
} from "../../contexts/financial-record-context";
import { useTable, Column, CellProps } from "react-table";

interface EditableCellProps extends CellProps<FinancialRecord> {
  updateRecord: (rowIndex: number, columnId: string, value: any) => void;
  editable: boolean;
}

const EditableCell: React.FC<EditableCellProps> = ({
  value: initialValue,
  row,
  column,
  updateRecord,
  editable,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  /*const onBlur = () => {
    setIsEditing(false);
    updateRecord(row.index, column.id, value);
  } */
    const commitChange = () => {
      setIsEditing(false);
      updateRecord(row.index, column.id, value);
    };
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        commitChange();
      } else if (e.key === "Escape") {
        setIsEditing(false);
        setValue(initialValue); // Optionally revert changes on Escape
      }
    };
  return (
    <div onClick={() => editable && setIsEditing(true)} style={{cursor: editable ? "pointer" : "default"}}>
      {isEditing ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          onKeyDown={handleKeyDown}
          style={{ width: "75%" }}
        />
      ) : typeof value === "string" ? (
        value
      ) : (
        value.toString()
      )}
    </div>
  );
};

export const FinancialRecordList = () => {
  const { records, updateRecord, deleteRecord } = useFinancialRecords();

  const updateCellRecord = (rowIndex: number, columnId: string, value: any) => {
    const id = records[rowIndex]._id;
    updateRecord(id ?? "", {...records[rowIndex], [columnId]: value});
  }

  const columns: Array<Column<FinancialRecord>> = useMemo(() => [
    {
      Header: "Description",
      accessor: "description",
      Cell: (props) => (
        <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />
      ),
    },
    {
        Header: "Amount",
        accessor: "amount",
        Cell: (props) => (
          <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />
        ),
    },
    {
        Header: "Category",
        accessor: "category",
        Cell: (props) => (
          <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />
        ),
    },
    {
        Header: "Payment Method",
        accessor: "paymentMethod",
        Cell: (props) => (
          <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />
        ),
    },
    {
        Header: "Date",
        accessor: "date",
        Cell: (props) => (
          <EditableCell {...props} updateRecord={updateCellRecord} editable={false} />
        ),
    },
    {
        Header: "Delete",
        id: "delete",
        Cell: ({row}) => (
        <button className="delete" onClick={() => deleteRecord(row.original._id ?? "")}>
          <span className="text">Delete</span>
          <span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>
          </button>
        ),
    },
  ],
  [records]
);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: records });

  return (
    <div className="table-container">
      <h3 className="h3">Click on an Item to change it</h3>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((hg) => (
            <tr {...hg.getHeaderGroupProps()}>
              {hg.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {" "}
                  {column.render("Header") as React.ReactNode}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>
                    {" "}
                    {cell.render("Cell") as React.ReactNode}{" "}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
