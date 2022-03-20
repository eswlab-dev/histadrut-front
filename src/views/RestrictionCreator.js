import React, { useEffect, useMemo, useState } from "react";
import Button from "monday-ui-react-core/dist/Button";
import * as utils from "../services/utils";
import Select from "react-select";
import Loader from "monday-ui-react-core/dist/Loader";
import Swal from "sweetalert2";

export default function RestrictionCreator({
  monday,
  boardsForDropdown,
  addNewRestriction,
  getBoardColumns,
  validateNewRestriction,
  slug,
}) {
  console.log(`slug`, slug);
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
    if (restriction.board.value !== null) onSetColumns();
  }, [restriction.board]);
  const onSetColumns = async () => {
    setIsLoading({ ...isLoading, column: true });
    const columns = await getBoardColumns(restriction);
    if (!columns?.length) {
      Swal.fire({
        title: "Oops!",
        html: `<p>It looks like you dont have any columns in <a href="https://${slug}.monday.com/boards/${restriction.board.value}" target="_blank">${restriction?.board?.label}</a>!</p> <p> Please choose a different board, or add columns on that board.</p>`,
        icon: "error",
      });
      resetSelect();
    }
    setIsLoading({ ...isLoading, column: false });
    setBoardColumns(columns);
  };
  const onAddNewRestriction = async () => {
    if (validateNewRestriction(restriction)) {
      setIsLoading({ ...isLoading, button: true });
      await addNewRestriction(restriction);
      setIsLoading({ ...isLoading, button: false });
      resetSelect();
      monday.execute("notice", {
        message: `congrats! New restriction was created at ${restriction.board.label}!`,
        type: "success", // or "error" (red), or "info" (blue)
        timeout: 10000,
      });
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
