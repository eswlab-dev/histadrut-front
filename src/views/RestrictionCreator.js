import React, { useEffect, useMemo, useState } from "react";
import Button from "monday-ui-react-core/dist/Button";
import * as utils from "../services/utils";
import Select from "react-select";

export default function RestrictionCreator({
  monday,
  boardsForDropdown,
  addNewRestriction,
  getBoardColumns,
}) {
  const [boardColumns, setBoardColumns] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [restriction, setRestriction] = useState({
    board: { value: null, label: null },
    columns: [],
  });
  useEffect(() => {
    onSetColumns();
  }, [restriction.board]);
  const onSetColumns = async () => {
    const columns = await getBoardColumns(restriction);
    setBoardColumns(columns);
  };
  const onSetRestriction = (isBoard, item) => {
    // console.log(`onSetRestriction -> isBoard, item`, isBoard, item);
    // console.log(`onSetRestriction -> restriction.columns`, restriction.columns);
    if (isBoard) {
      setRestriction({ ...restriction, board: item });
    } else {
      setRestriction({ ...restriction, columns: item });
    }
  };

  const columnsForDropdown = useMemo(() => {
    if (boardColumns)
      return boardColumns.map((boardColumn) => {
        return { label: boardColumn.title, value: boardColumn.id };
      });
  }, [boardColumns]);

  return (
    <div className="create-restriction">
      <Select
        className="restriction-select"
        options={boardsForDropdown}
        onChange={(board) => onSetRestriction(true, board)}
        value={restriction.board}
      />
      <Select
        className="restriction-select"
        onChange={(column) => onSetRestriction(false, column)}
        options={columnsForDropdown}
        isClearable
        isMulti
      />
      <div className="button-div">
        <Button
          size={Button.sizes.LARGE}
          loading={isLoading}
          onClick={(e) => {
            // console.log(`restriction`, restriction);
            addNewRestriction(restriction);
          }}
        >
          Create
        </Button>
      </div>
    </div>
  );
}
