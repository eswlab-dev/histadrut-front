import React, { useEffect, useMemo, useState } from "react";
import Button from "monday-ui-react-core/dist/Button";
import Loader from "monday-ui-react-core/dist/Loader";

import Select from "react-select";
export default function Restriction({
  i,
  restriction,
  getBoardColumns,
  editRestriction,
  deleteRestriction,
  boardsForDropdown,
  onSetRestriction,
}) {
  const [columnsForDropdown, setColumnsForDropdown] = useState([]);
  const [isLoading, setIsLoading] = useState({
    edit: false,
    delete: false,
    board: false,
    columns: false,
  });
  useEffect(() => {
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
  const onSetLoadState = (key, isLoad) => {
    setIsLoading({ ...isLoading, [key]: isLoad });
  };

  return restriction ? (
    <div className="restriction" key={i}>
      <label className="restriction-label">
        Board
        <Select
          className="restriction-select"
          options={boardsForDropdown}
          placeholder="Please choose a board"
          onChange={(board) => {
            onSetRestriction(i, board, true, onSetLoadState);
          }}
          value={restriction.board}
          isLoading={isLoading?.board}
        />
      </label>
      <label className="restriction-label">
        Columns
        <Select
          className="restriction-select"
          placeholder="Please choose mandatory columns"
          onChange={(column) => {
            onSetRestriction(i, column, false, onSetLoadState);
          }}
          options={columnsForDropdown}
          value={restriction.columns}
          isLoading={isLoading?.columns}
          isDisabled={!columnsForDropdown?.length}
          isClearable
          isMulti
        />
      </label>
      <div className="button-div">
        <Button
          loading={isLoading?.edit}
          onClick={(e) => {
            editRestriction(i, restriction, onSetLoadState);
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
            deleteRestriction(i, onSetLoadState);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  ) : (
    <div className="loader-div">
      <div className="loader">
        <Loader />
      </div>
    </div>
  );
}
