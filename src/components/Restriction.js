import React, { useEffect, useMemo, useState } from "react";
import Button from "monday-ui-react-core/dist/Button";
import Loader from "monday-ui-react-core/dist/Loader";

import Select from "react-select";
export default function Restriction({
  i,
  restriction,
  getBoardColumnsAndGroups,
  editRestriction,
  deleteRestriction,
  boardsForDropdown,
  onSetRestriction,
}) {
  const [columnsForDropdown, setColumnsForDropdown] = useState([]);
  const [groupsForDropdown, setGroupsForDropdown] = useState([]);
  const [isLoading, setIsLoading] = useState({
    edit: false,
    delete: false,
    board: false,
    columns: false,
  });
  useEffect(() => {
    if (restriction?.board?.value) {
      getColumnsAndGroups();
    }
  }, [restriction]);
  const getColumnsAndGroups = async () => {
    const { columns, groups } = await getBoardColumnsAndGroups(restriction);
    setColumnsForDropdown(columns);
    setGroupsForDropdown(groups);
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
            onSetRestriction(i, board, "board", onSetLoadState);
          }}
          value={restriction.board}
          isLoading={isLoading?.board}
        />
      </label>
      <label className="restriction-label">
        Group
        <Select
          className="restriction-select"
          options={groupsForDropdown}
          placeholder="Please choose a board"
          onChange={(group) => {
            onSetRestriction(i, group, "group", onSetLoadState);
          }}
          value={restriction.group}
          isLoading={isLoading?.board}
        />
      </label>
      <label className="restriction-label">
        Columns
        <Select
          className="restriction-select"
          placeholder="Please choose restricting columns"
          onChange={(column) => {
            onSetRestriction(i, column, "columns", onSetLoadState);
          }}
          options={columnsForDropdown}
          value={restriction?.columns}
          isLoading={isLoading?.columns || !columnsForDropdown?.length}
          isDisabled={isLoading?.columns || !columnsForDropdown?.length}
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
