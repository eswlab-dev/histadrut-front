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
  const [account, setAccount] = useState({ accountId: null, slug: null });
  const [currentNav, setCurrentNav] = useState("");
  const [existingRestrictions, setExistingRestrictions] = useState([]);
  useEffect(() => {
    setCurrentNav(
      window.location.hash.includes("create") ? "create" : "existing"
    );
    getBoards();
    console.log("אהוב את המלאכה");
  }, []);
  useEffect(() => {
    account.accountId && getRestrictions();
  }, [account]);
  useEffect(() => {
    const filteredBoards = boards?.filter(
      (board) =>
        !existingRestrictions.find(
          (restriction) =>
            Number(restriction?.board?.value) === Number(board?.id)
        )
    );
    setBoards(filteredBoards);
  }, [existingRestrictions]);
  const addNewRestriction = async (newRestriction) => {
    const columnIds = newRestriction.columns.map((col) => col?.value);
    const _newRestriction = {
      accountId: account.accountId,
      ...newRestriction,
    };
    const _newRest = await utils.addBoardRestriction(_newRestriction);
    const labeledRestriction = await getRestrictionLabels([newRestriction]);
    setExistingRestrictions([...existingRestrictions, ...labeledRestriction]);
  };

  const getBoardColumns = async (restriction) => {
    try {
      const { board } = restriction;
      if (board?.value) {
        const query = `query{
          boards(ids:${board.value}){
            columns{
              id
              type
              title
            }
          }
        }`;
        const res = await monday.api(query);
        const { columns } = res.data.boards[0];
        const filteredColumns = columns
          .filter(
            (col) =>
              col.title !== "Name" &&
              !["pulse-updated", "lookup"].includes(col.type)
          )
          .map((col) => {
            return { value: col.id, label: col.title };
          });

        return filteredColumns;
      } else {
      }
    } catch (err) {
      console.log(`getBoardColumns -> err`, err);
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
        const query = `query{
          boards(ids:${restriction.boardId || restriction.board.value}){
            name
            columns(ids:${JSON.stringify(restriction.columnIds)}){
              id
              title
            }
          }
        }`;
        const res = await monday.api(query);
        console.log(`getRestrictionLabels -> res`, res);
        const boardName = res.data.boards[0].name;

        const columns = res.data.boards[0].columns.map((col) => {
          return { value: col.id, label: col.title };
        });
        labeled.push({
          board: {
            value: Number(restriction.boardId),
            label: boardName,
          },
          columns,
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
      boards{
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
  const validateNewRestriction = (restriction) => {
    console.log(`validateNewRestriction -> restriction`, restriction);
    const { label, value } = restriction?.board;
    const { columns } = restriction;
    if (label && value && columns.length) {
      return true;
    } else {
      Swal.fire({
        title: "Couldn't add restriction",
        text: "some columns are missing",
        icon: "warning",
        returnFocus: true,
        allowEnterKey: true,
        allowEscapeKey: true,
      });
      return false;
    }
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
                  getBoardColumns={getBoardColumns}
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
                  getBoardColumns={getBoardColumns}
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
