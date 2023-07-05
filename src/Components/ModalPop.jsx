import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ModalPop({
  showModel,
  setShoweModel,
  value,
  setValue,
  isEdite,
  keyNum,
  setIsEdite,
}) {
  var pattern = /[\[\]"]/g;
  const handelClose = () => {
    setShoweModel(false);
  };
  const handelChange = (e) => {
    let changeValue = e.target.value;
    setValue(changeValue);
  };
  const handelClick = () => {
    if (!isEdite) {
      let newValue = value;
      let lists = window.localStorage.getItem("list");
      lists = lists == null ? newValue : lists + "," + newValue;
      setValue("");
      window.localStorage.setItem("list", lists);
    } else if (isEdite) {
      let lists = window.localStorage.getItem("list");
      let list = lists.split(",");
      list[keyNum] = value;
      window.localStorage.setItem("list", list);
      setIsEdite(false);
      setValue("");
    }
  };

  return (
    <>
      <Modal
        show={showModel}
        onHide={handelClose}
        backdrop="static"
        keyboard={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <b>Add Todo</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <input type="text" value={value} onChange={handelChange} />
            <button
              className="btn-primary"
              onClick={() => {
                handelClick();
              }}
            >
              Add Todo
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handelClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalPop;
