import React, { useEffect, useMemo, useState } from "react";
import Button from "monday-ui-react-core/dist/Button";
import * as utils from "../services/utils";
import Select from "react-select";
import Loader from "monday-ui-react-core/dist/Loader";

export default function RestrictionCreator({
  monday,
  boardsForDropdown,
  addNewRestriction,
  getBoardColumns,
  validateNewRestriction,
}) {
  const [boardColumns, setBoardColumns] = useState();
  const [isLoading, setIsLoading] = useState({
    board: false,
    column: false,
    button: false,
  });

  const [restriction, setRestriction] = useState({
    board: { value: null, label: "Choose a board to restrict" },
    columns: [],
  });
  useEffect(() => {
    onSetColumns();
  }, [restriction.board]);
  const onSetColumns = async () => {
    setIsLoading({ ...isLoading, column: true });
    const columns = await getBoardColumns(restriction);
    setIsLoading({ ...isLoading, column: false });
    setBoardColumns(columns);
  };
  const onAddNewRestriction = async () => {
    if (validateNewRestriction(restriction)) {
      setIsLoading({ ...isLoading, button: true });
      await addNewRestriction(restriction);
      setIsLoading({ ...isLoading, button: false });
      resetSelect();
    } else console.log("not valid");
  };
  const resetSelect = () => {
    setRestriction({
      board: { value: null, label: "Choose a board to restrict" },
      columns: [],
    });
  };

  const onSetRestriction = (isBoard, item) => {
    if (isBoard) {
      setRestriction({ ...restriction, board: item });
    } else {
      setRestriction({ ...restriction, columns: item });
    }
  };
  console.log(`isLoading.button`, isLoading.button);

  return (
    <div className="create-restriction">
      <div className="selects">
        <label className="restriction-label">
          Board
          {isLoading.board ? (
            <div className="small-loader">
              <Loader />
            </div>
          ) : (
            <Select
              isLoading={isLoading.board}
              placeholder="Choose board to restrict"
              className="restriction-select"
              options={boardsForDropdown}
              onChange={(board) => onSetRestriction(true, board)}
              value={restriction.board}
            />
          )}
        </label>
        <label
          className="restriction-label"
          title={boardColumns?.length ? "" : "Please choose a board first!"}
        >
          Columns
          <Select
            placeholder="Choose column to restrict"
            className="restriction-select"
            onChange={(column) => onSetRestriction(false, column)}
            options={boardColumns}
            isDisabled={!boardColumns?.length}
            value={restriction?.columns}
            isClearable
            isMulti
            isLoading={isLoading.column}
          />
        </label>
      </div>
      <div className="button-div">
        <Button
          size={Button.sizes.LARGE}
          loading={isLoading.button}
          onClick={(e) => {
            onAddNewRestriction(restriction);
          }}
          disabled={
            !restriction?.board?.label ||
            !restriction?.board?.value ||
            !restriction?.columns?.length
          }
        >
          Create
        </Button>
      </div>
    </div>
  );
}
