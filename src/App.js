import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
import * as utils from "./services/utils";
import RestrictionCreator from "./views/RestrictionCreator";
import { HashRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import ExistingRestrictions from "./views/ExistingRestrictions";
import Footer from "./components/Footer";

const monday = mondaySdk();

export default function App() {
  const [boards, setBoards] = useState([]);
  console.log(`App -> boards`, boards);
  const [account, setAccount] = useState();
  const [currentNav, setCurrentNav] = useState("existing");
  const [existingRestrictions, setExistingRestrictions] = useState([]);
  console.log(`App -> existingRestrictions`, existingRestrictions);
  useEffect(() => {
    getBoards();
    console.log("אהוב את המלאכה");
  }, []);
  useEffect(() => {
    const filteredBoards = boards?.filter(
      (board) =>
        !existingRestrictions.find(
          (restriction) => Number(restriction.board.value) === Number(board.id)
        )
    );
    console.log(`useEffect -> filteredBoards`, filteredBoards.length);
    console.log(
      `useEffect -> existingRestrictions`,
      existingRestrictions.length
    );
    console.log(`useEffect -> boards`, boards.length);
    setBoards(filteredBoards);
  }, [existingRestrictions]);
  const addNewRestriction = async (newRestriction) => {
    const columnIds = newRestriction.columns.map((col) => col.value);
    const _newRestriction = {
      accountId: account,
      ...newRestriction,
    };

    const _newRest = await utils.addBoardRestriction(_newRestriction);
    const labeledRestriction = await getRestrictionLabels([..._newRest]);
  };

  const getBoardColumns = async (restriction) => {
    try {
      const { board } = restriction;
      console.log(`getBoardColumns -> board`, board);
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
          .filter((col) => col.title !== "Name")
          .map((col) => {
            return { value: col.id, label: col.title };
          });
        // console.log(`getBoardColumns -> columns`, columns);
        return filteredColumns;
      } else {
      }
    } catch (err) {
      console.log(`getBoardColumns -> err`, err);
    }
  };
  const getRestrictionLabels = async (restrictions) => {
    try {
      const labeled = [];
      for (let restriction of restrictions) {
        // }
        // restrictions?.map(async (restriction) => {
        const query = `query{
          boards(ids:${restriction.boardId || restriction.board.value}){
            name
            columns(ids:${JSON.stringify(restriction.columnIds)}){
              id
              type
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
        // });
      }
      // await Promise.all(labeled);
      return labeled;
    } catch (error) {
      console.log(`getRestrictionLabels -> error`, error);
    }
  };

  const getBoards = async () => {
    const query = `query{
      account{
        id
      }
      boards{
        name
        id
      }
    }`;
    const res = await monday.api(query);
    setAccount(Number(res.data.account.id));
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

  return (
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
              />
            }
          />
          <Route
            path="/"
            element={
              <ExistingRestrictions
                boardsForDropdown={boardsForDropdown}
                getBoardColumns={getBoardColumns}
                getRestrictionLabels={getRestrictionLabels}
                account={account}
                restrictions={existingRestrictions}
                setRestrictions={setExistingRestrictions}
              />
            }
          />
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  );
}
