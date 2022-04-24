import React, { lazy, Suspense, useEffect, useMemo, useState } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import Swal from "sweetalert2";
import Loader from "monday-ui-react-core/dist/Loader";
import * as utils from "./services/utils";
import { HashRouter, Route, Routes } from "react-router-dom";
const RestrictionCreator = lazy(() => import("./views/RestrictionCreator"));
const ExistingRestrictions = lazy(() => import("./views/ExistingRestrictions"));
const NavBar = lazy(() => import("./components/NavBar"));
const Footer = lazy(() => import("./components/Footer"));

const monday = mondaySdk();

export default function App() {
  const [boards, setBoards] = useState([]);
  console.log(`App -> boards`, boards.length);
  const [account, setAccount] = useState({ accountId: null, slug: null });
  const [currentNav, setCurrentNav] = useState("");
  const [existingRestrictions, setExistingRestrictions] = useState([]);
  useEffect(() => {
    setCurrentNav(
      window.location.hash.includes("create") ? "create" : "existing"
    );
    getBoards();
    console.table({
      href: window.location.href,
      NODE_ENV: process.env.NODE_ENV,
    });
    console.log("אהוב את המלאכה");
  }, []);
  useEffect(() => {
    account.accountId && getRestrictions();
  }, [account]);
  // useEffect(() => {
  //   const filteredBoards = boards?.filter(
  //     (board) =>
  //       !existingRestrictions.find(
  //         (restriction) =>
  //           Number(restriction?.board?.value) === Number(board?.id)
  //       )
  //   );
  //   setBoards(filteredBoards);
  // }, [existingRestrictions]);
  const addNewRestriction = async (newRestriction) => {
    console.log(`addNewRestriction -> newRestriction`, newRestriction);
    const columnIds = newRestriction.columns.map((col) => col?.value);
    const _newRestriction = {
      accountId: account.accountId,

      ...newRestriction,
    };
    const _newRest = await utils.addBoardRestriction(_newRestriction);
    const labeledRestriction = await getRestrictionLabels([newRestriction]);
    console.log(`addNewRestriction -> labeledRestriction`, labeledRestriction);
    setExistingRestrictions([...existingRestrictions, ...labeledRestriction]);
  };

  const getBoardColumnsAndGroups = async (restriction) => {
    try {
      const { board } = restriction;
      if (board?.value) {
        const query = `query{
          boards(ids:${board.value}){
            groups{
              id
              title
            }
            columns{
              id
              type
              title
            }
          }
        }`;
        const res = await monday.api(query);
        const { columns, groups } = res.data.boards[0];
        console.log(
          `getBoardColumnsAndGroups -> columns, groups`,
          columns,
          groups
        );
        const filteredColumns = columns
          .filter(
            (col) =>
              col.title !== "Name" &&
              ![
                "pulse-updated",
                "lookup",
                "formula",
                "columns-battery",
                "button",
              ].includes(col.type)
          )
          .map((col) => {
            return { value: col.id, label: col.title };
          });
        const mappedGroups = groups?.map((group) => {
          return { value: group.id, label: group.title };
        });
        return { columns: filteredColumns, groups: mappedGroups };
      } else {
      }
    } catch (err) {
      console.log(`getBoardColumnsAndGroups -> err`, err);
    }
  };
  const getRestrictions = async () => {
    let rests = await utils.getExistingBoardRestrictions(account.accountId);
    rests = await Promise.all(rests);
    const fullRests = await getRestrictionLabels(rests);
    setExistingRestrictions(fullRests);
  };
  const getRestrictionLabels = async (restrictions) => {
    console.log(`getRestrictionLabels -> restrictions`, restrictions);
    try {
      const labeled = [];
      for (let restriction of restrictions) {
        const groupId = restriction?.group?.value || restriction?.groupId;
        const columnIds =
          restriction?.columns?.map((col) => col.id || col.value) ||
          restriction?.columnIds;
        const query = `query{ 
          boards(ids:${restriction.boardId || restriction.board.value}){
            name
            groups(ids:[${JSON.stringify(groupId)}]){
              title
              id
            }
            columns(ids:${JSON.stringify(columnIds)}){
              id
              title
            }
          }
        }`;
        console.log(`getRestrictionLabels -> query`, query);
        const res = await monday.api(query);
        console.log(`getRestrictionLabels -> res`, res.data.boards[0]);
        const boardName = res.data.boards[0].name;
        const group = {
          label: res.data.boards[0].groups[0].title,
          value: restriction.groupId,
        };
        const columns = res.data.boards[0].columns.map((col) => {
          return { value: col.id, label: col.title };
        });
        labeled.push({
          board: {
            value: Number(restriction.boardId),
            label: boardName,
          },
          columns,
          group,
          _id: restriction._id,
        });
      }
      return labeled;
    } catch (error) {
      console.log(`getRestrictionLabels -> error`, error);
    }
  };

  const getBoards = async () => {
    const query = `query{
      account{
        id
        slug
      }
      boards(limit:2000){
        name
        id
      }
    }`;
    const res = await monday.api(query);
    setAccount({
      accountId: Number(res.data.account.id),
      slug: res.data.account.slug,
    });
    // console.log(`getBoards -> res`, res.data);
    const _boards = res.data.boards;
    setBoards(_boards);
  };

  const boardsForDropdown = useMemo(() => {
    if (boards?.length) {
      return boards.map((board) => {
        return { label: board.name, value: board.id };
      });
    }
  }, [boards]);
  const validateNewRestriction = (restriction, isNew) => {
    console.log(`validateNewRestriction -> isNew`, isNew);
    console.log(`validateNewRestriction -> restriction`, restriction);
    const { board, group } = restriction;
    const { columns } = restriction;
    if (
      board.label &&
      board.value &&
      group.label &&
      group.value &&
      columns.length
    ) {
      const isExists = checkExistence(restriction) && isNew; // if it's an existing restriction dont check for existence
      console.log(`validateNewRestriction -> isExists`, isExists);
      if (isExists) {
        Swal.fire({
          title: "Couldn't add restriction",
          html: `<p>You already have an existing restriction on <b>${restriction.group.label}</b> group in <b>${restriction.board.label}</b> board</p>`,
          icon: "error",
          returnFocus: true,
          allowEnterKey: true,
          allowEscapeKey: true,
        });
        return false;
      } else {
        return true;
      }
    } else {
      Swal.fire({
        title: "Couldn't add restriction",
        text: "some columns are missing",
        icon: "error",
        returnFocus: true,
        allowEnterKey: true,
        allowEscapeKey: true,
      });
      return false;
    }
  };
  const checkExistence = (restriction) => {
    console.log(`checkExistence -> restriction`, restriction);
    const existing = existingRestrictions.find(
      (rest) =>
        Number(rest.board.value) === Number(restriction.board.value) &&
        rest.group.value === restriction.group.value
    );
    console.log(`existing -> existing`, existing);
    return !!existing;
  };

  return (
    <Suspense
      fallback={
        <div className="loader-div">
          <div className="loader">
            <Loader />
          </div>
        </div>
      }
    >
      <div className="App">
        <HashRouter>
          <NavBar currentNav={currentNav} setCurrentNav={setCurrentNav} />
          <Routes>
            <Route
              path="/create"
              element={
                <RestrictionCreator
                  boardsForDropdown={boardsForDropdown}
                  boards={boards}
                  monday={monday}
                  addNewRestriction={addNewRestriction}
                  getBoardColumnsAndGroups={getBoardColumnsAndGroups}
                  validateNewRestriction={validateNewRestriction}
                  slug={account?.slug}
                />
              }
            />
            <Route
              path="/"
              element={
                <ExistingRestrictions
                  boardsForDropdown={boardsForDropdown}
                  getBoardColumnsAndGroups={getBoardColumnsAndGroups}
                  account={account?.accountId}
                  restrictions={existingRestrictions}
                  setRestrictions={setExistingRestrictions}
                  validateNewRestriction={validateNewRestriction}
                  getRestrictions={getRestrictions}
                  monday={monday}
                />
              }
            />
          </Routes>
          <Footer />
        </HashRouter>
      </div>
    </Suspense>
  );
}
