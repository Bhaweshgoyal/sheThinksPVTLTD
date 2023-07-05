import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import ModalPop from "./Components/ModalPop";
function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [shwModal, setShowModal] = useState(false);
  const [isEdite, setIsEdite] = useState(false);
  const [KeyNum, setKeyNum] = useState(0);
  const [searchVariable, setSearchVariable] = useState("");
  const handelChange = (e) => {
    let searchVarialbleTemp = e.target.value;
    setSearchVariable(searchVarialbleTemp);
    let temp = window.localStorage.getItem("list");
    temp = temp ?? "";

    if (temp.length > 0) {
      let arr = temp.split(",").filter((item) => {
        return item.includes(searchVarialbleTemp);
      });

      setData(arr);
    }
  };
  const handelDelete = (index) => {
    let list = window.localStorage.getItem("list");
    list.trim();
    let lists = list.split(",");
    lists.splice(index, 1).join(",");
    setData(lists);
    if (lists.length == 0 || lists[0] == "") {
      window.localStorage.removeItem("list");
      setData([]);
    }
    lists[0] == ""
      ? window.localStorage.removeItem("list")
      : window.localStorage.setItem("list", lists);
  };
  useEffect(() => {
    let temp = window.localStorage.getItem("list");
    temp = temp ?? "";

    if (temp.length > 0) {
      setData(temp.split(","));
    }
  }, [value]);

  return (
    <>
      <div className="headng fs-1 ">Todo - List</div>
      <input
        type="text"
        className="serach"
        placeholder="Search"
        value={searchVariable}
        onChange={handelChange}
      />
      <div
        className="btn btn-primary add-todo-btn"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Add Todo
      </div>
      {data.length > 0 &&
        data.map((ele, index) => {
          return (
            <div key={index} className="d-flex justify-content-around w-100">
              <h1>{ele}</h1>
              <div
                className="btn btn-primary mt-3"
                onClick={() => {
                  setShowModal(true);
                  setKeyNum(index);
                  setIsEdite(true);
                }}
              >
                Edit
              </div>
              <div
                className="btn btn-secondary mt-3"
                onClick={() => {
                  handelDelete(index);
                }}
              >
                Delete
              </div>
            </div>
          );
        })}
      <ModalPop
        showModel={shwModal}
        setShoweModel={setShowModal}
        value={value}
        setValue={setValue}
        isEdite={isEdite}
        keyNum={KeyNum}
        setIsEdite={setIsEdite}
      />
    </>
  );
}

export default App;
