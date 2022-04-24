import axios from "axios";

const domain =
  process.env.NODE_ENV !== "development"
    ? "https://histadrut-inters.herokuapp.com"
    : "https://a5a7-2a0e-9cc0-24cb-7e00-115e-fe2d-b1c7-26d3.eu.ngrok.io";
export async function addBoardRestriction(restriction) {
  const filteredRestriction = filterRestriction(restriction);
  // console.log(
  // `addBoardRestriction -> filteredRestriction`,
  // filteredRestriction
  // );
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
  // console.log(`editRestriction -> filteredRestriction`, filteredRestriction);
  // console.log(`editRestriction -> restriction`, restriction);
  const edited = await axios.put(
    `${domain}/restriction/board`,
    filteredRestriction
  );
  // console.log(`editRestriction -> edited`, edited);
  if (edited) return restriction;
}
export async function deleteRestriction(restriction) {
  const { _id } = restriction;
  const deleted = await axios.delete(`${domain}/restriction/board/${_id}`);
  // console.log(`deleteRestriction -> deleted`, deleted);
  return deleted;
}
function filterRestriction(restriction) {
  const filteredRestriction = {
    accountId: restriction.accountId || restriction.account,
    boardId: restriction?.board?.value,
    // ? Number(restriction.board.value)
    // : restriction.boardId,
    columnIds: restriction.columns.map((rest) => rest?.value),
    // columnIds: restriction.columns.map((rest) => rest?.value || rest),
    groupId: restriction?.group?.value,
    // ? Number(restriction.group.value)
    // : restriction.groupId,
    _id: restriction._id,
  };
  // filteredRestriction.;
  // filteredRestriction.;
  // filteredRestriction.;
  // console.log(`filterRestriction -> filteredRestriction`, filteredRestriction);
  return filteredRestriction;
}
