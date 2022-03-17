import React, { useEffect, useMemo, useState } from "react";
import Button from "monday-ui-react-core/dist/Button";

import Select from "react-select";
export default function Restriction({
  i,
  restriction,
  getBoardColumns,
  editRestriction,
  deleteRestriction,
  boardsForDropdown,
  onSetRestriction,
  isLoading,
}) {
  const [columnsForDropdown, setColumnsForDropdown] = useState([]);
  useEffect(() => {
    console.log("change");
    if (restriction) {
      getColumns();
      // setRestriction(restriction);
    }
  }, [restriction]);
  const getColumns = async () => {
    const columns = await getBoardColumns(restriction);
    setColumnsForDropdown(columns);
    console.log(`getColumns -> columns`, columns);
  };

  return restriction ? (
    <div className="restriction" key={i}>
      <label>
        Board
        <Select
          className="restriction-select"
          options={boardsForDropdown}
          placeholder="Please choose a board"
          onChange={(board) => onSetRestriction(i, board, true)}
          value={restriction.board}
        />
      </label>
      <label>
        Columns
        <Select
          className="restriction-select"
          placeholder="Please choose mandatory columns"
          onChange={(column) => onSetRestriction(i, column, false)}
          options={columnsForDropdown}
          value={restriction.columns}
          isClearable
          isMulti
        />
      </label>
      <div className="button-div">
        <Button
          loading={isLoading?.edit}
          onClick={(e) => {
            editRestriction(i, restriction);
          }}
        >
          Update
        </Button>
        <Button
          loading={isLoading?.delete}
          kind={Button.kinds.TERTIARY}
          color={Button.colors.NEGATIVE}
          className="add-button"
          onClick={(e) => {
            deleteRestriction(i);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  ) : (
    <div>loading.. LOADER!.</div>
  );
}
