import axios from "axios";

const domain =
  process.env.NODE_ENV !== "development"
    ? "https://histadrut-inters.herokuapp.com"
    : "https://d4eb-2a0e-9cc0-23f4-d00-fce6-3347-eae8-4c60.eu.ngrok.io";
export async function addBoardRestriction(restriction) {
  const filteredRestriction = filterRestriction(restriction);
  console.log(
    `addBoardRestriction -> filteredRestriction`,
    filteredRestriction
  );
  const newRestriction = await axios.post(
    `${domain}/restriction/board`,
    filteredRestriction
  );
  return newRestriction.data;
}
export async function getExistingBoardRestrictions(accountId) {
  const existing = await axios.get(
    `${domain}/restriction/account/${accountId}`
  );
  return existing.data;
}
export async function editRestriction(restriction, account) {
  restriction.account = account;
  const filteredRestriction = filterRestriction(restriction);
  console.log(`editRestriction -> filteredRestriction`, filteredRestriction);
  console.log(`editRestriction -> restriction`, restriction);
  const edited = await axios.put(
    `${domain}/restriction/board`,
    filteredRestriction
  );
  console.log(`editRestriction -> edited`, edited);
  return edited;
}
export async function deleteRestriction(restriction) {
  const { _id } = restriction;
  const deleted = await axios.delete(`${domain}/restriction/board/${_id}`);
  console.log(`deleteRestriction -> deleted`, deleted);
  return deleted;
}
function filterRestriction(restriction) {
  const filteredRestriction = {
    accountId: restriction.accountId || restriction.account,
    boardId: Number(restriction.board.value),
    columnIds: restriction.columns.map((rest) => rest.value),
    _id: restriction._id,
  };
  // filteredRestriction.;
  // filteredRestriction.;
  // filteredRestriction.;
  console.log(`filterRestriction -> filteredRestriction`, filteredRestriction);
  return filteredRestriction;
}
