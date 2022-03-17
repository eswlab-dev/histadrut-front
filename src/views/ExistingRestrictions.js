import React, { useState, useEffect } from "react";
import Restriction from "../components/Restriction";
import * as utils from "../services/utils";

export default function ExistingRestrictions({
  getBoardColumns,
  account,
  getRestrictionLabels,
  boardsForDropdown,
  restrictions,
  setRestrictions,
}) {
  const [buttonLoading, setButtonLoading] = useState([]);
  useEffect(() => {
    if (account) getRestrictions();
  }, [account]);
  useEffect(() => {
    if (!buttonLoading.length)
      setButtonLoading(
        Array.from(restrictions, (load) => {
          return { edit: false, delete: false };
        })
      );
  }, [restrictions]);
  const onSetLoadState = (i, key, isLoad) => {
    const newLoadState = buttonLoading;
    newLoadState[i] = { ...newLoadState, [key]: isLoad };
    setButtonLoading(newLoadState);
  };
  const editRestriction = async (i, restriction) => {
    onSetLoadState(i, "edit", true);
    const newRestriction = (await utils.editRestriction(restriction, account))
      .data;
    restrictions[i] = newRestriction;
    setRestrictions(restrictions);
    onSetLoadState(i, "edit", false);
  };
  const onSetRestriction = (i, item, isBoard) => {
    if (isBoard) {
      const newRestrictions = restrictions;
      newRestrictions[i] = { board: item, columns: [] };
      setRestrictions([...newRestrictions]);
    } else {
      const newRestrictions = restrictions;
      newRestrictions[i] = { ...restrictions[i], columns: item };
      setRestrictions([...newRestrictions]);
    }
  };
  const getRestrictions = async () => {
    let rests = await utils.getExistingBoardRestrictions(account);
    rests = await Promise.all(rests);
    const fullRests = await getRestrictionLabels(rests);
    setRestrictions(fullRests);
  };
  const deleteRestriction = async (i) => {
    onSetLoadState(i, "delete", true);
    const restriction = restrictions[i];
    const deletedRest = await utils.deleteRestriction(restriction);
    const filteredRestrictions = restrictions.filter(
      (rest) => rest._id !== restriction._id
    );
    onSetLoadState(i, "delete", false);
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
          isLoading={buttonLoading[i]}
        />
      ))}
    </div>
  );
}
