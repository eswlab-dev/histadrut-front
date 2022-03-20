import React, { useState, useEffect } from "react";
import Restriction from "../components/Restriction";
import * as utils from "../services/utils";

export default function ExistingRestrictions({
  getBoardColumns,
  account,
  boardsForDropdown,
  restrictions,
  setRestrictions,
  validateNewRestriction,
  getRestrictions,
}) {
  useEffect(() => {
    if (account) getRestrictions();
  }, [account]);

  const editRestriction = async (i, restriction, onSetLoadState) => {
    onSetLoadState("edit", true);
    if (validateNewRestriction(restriction)) {
      const newRestriction = (await utils.editRestriction(restriction, account))
        .data;
      restrictions[i] = newRestriction;
      setRestrictions(restrictions);
    }
    onSetLoadState("edit", false);
  };

  const onSetRestriction = (i, item, isBoard, onSetLoadState) => {
    if (isBoard) {
      onSetLoadState("board", true);
      const newRestrictions = restrictions;
      newRestrictions[i] = { board: item, columns: [] };
      setRestrictions([...newRestrictions]);
      onSetLoadState("board", false);
    } else {
      onSetLoadState("columns", true);
      const newRestrictions = restrictions;
      newRestrictions[i] = { ...restrictions[i], columns: item };
      setRestrictions([...newRestrictions]);
      onSetLoadState("columns", false);
    }
  };

  const deleteRestriction = async (i, onSetLoadState) => {
    onSetLoadState("delete", true);
    const restriction = restrictions[i];
    const deletedRest = await utils.deleteRestriction(restriction);
    const filteredRestrictions = restrictions.filter(
      (rest) => rest._id !== restriction._id
    );
    onSetLoadState("delete", false);
    setRestrictions([...filteredRestrictions]);
  };

  return (
    <div className="existing-restrictions">
      {restrictions?.map((restriction, i) => (
        <Restriction
          key={i}
          i={i}
          restriction={restriction}
          getBoardColumns={getBoardColumns}
          editRestriction={editRestriction}
          deleteRestriction={deleteRestriction}
          boardsForDropdown={boardsForDropdown}
          onSetRestriction={onSetRestriction}
        />
      ))}
    </div>
  );
}
