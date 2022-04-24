import React, { useState, useEffect } from "react";
import Restriction from "../components/Restriction";
import * as utils from "../services/utils";
import Loader from "monday-ui-react-core/dist/Loader";

export default function ExistingRestrictions({
  getBoardColumnsAndGroups,
  account,
  boardsForDropdown,
  restrictions,
  setRestrictions,
  validateNewRestriction,
  getRestrictions,
  monday,
}) {
  console.log(`restrictions`, restrictions);
  const [isLoadingRestrictions, setIsLoadingRestrictions] = useState(true);
  useEffect(() => {
    _getRestrictions();
  }, [account]);

  const _getRestrictions = async () => {
    if (account) {
      await getRestrictions();
      setIsLoadingRestrictions(false);
    }
  };

  const editRestriction = async (i, restriction, onSetLoadState) => {
    console.log(`editRestriction -> i, restriction,`, i, restriction);
    onSetLoadState("edit", true);
    if (validateNewRestriction(restriction, false)) {
      const newRestriction = await utils.editRestriction(restriction, account);
      // const newRestriction = await utils.editRestriction(restriction, account).data;
      console.log(`editRestriction -> newRestriction`, newRestriction);
      restrictions[i] = newRestriction;
      setRestrictions(restrictions);
      monday.execute("notice", {
        message: `the restriction on ${restriction.board.label} was successfully updated!`,
        type: "success", // or "error" (red), or "info" (blue)
        timeout: 10000,
      });
    } else {
      monday.execute("notice", {
        message: `Please choose columns to restrict by!`,
        type: "error", // or "error" (red), or "info" (blue)
        timeout: 10000,
      });
    }
    onSetLoadState("edit", false);
  };

  const onSetRestriction = (i, item, kind, onSetLoadState) => {
    console.log(`onSetRestriction -> i, item, kind`, i, item, kind);
    onSetLoadState(kind, true);
    if (kind === "board") {
      const newRestrictions = restrictions;
      newRestrictions[i] = { board: item, columns: [] };
      setRestrictions([...newRestrictions]);
      // onSetLoadState("board", false);
    } else if (kind === "group") {
      // onSetLoadState("group", true);
      const newRestrictions = restrictions;
      newRestrictions[i] = { ...restrictions[i], group: item };
      setRestrictions([...newRestrictions]);
      // onSetLoadState("group", false);
    } else if (kind === "columns") {
      // onSetLoadState("columns", true);
      const newRestrictions = restrictions;
      newRestrictions[i] = { ...restrictions[i], columns: item };
      setRestrictions([...newRestrictions]);
    }
    onSetLoadState(kind, false);
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
  console.log(`restrictions`, restrictions);

  return (
    <div className="existing-restrictions">
      {isLoadingRestrictions ? (
        <div className="loader-div">
          <div className="loader">
            <Loader />
          </div>
          <p>Loading Existing Restrictions...</p>
        </div>
      ) : restrictions?.length ? (
        restrictions?.map((restriction, i) => (
          <Restriction
            key={i}
            i={i}
            restriction={restriction}
            getBoardColumnsAndGroups={getBoardColumnsAndGroups}
            editRestriction={editRestriction}
            deleteRestriction={deleteRestriction}
            boardsForDropdown={boardsForDropdown}
            onSetRestriction={onSetRestriction}
          />
        ))
      ) : (
        <div className="no-existing">
          <p>There's no restrictions yet...</p>
        </div>
      )}
    </div>
  );
}
