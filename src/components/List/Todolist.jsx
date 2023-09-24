import React, { useState, useEffect } from "react";
import Todo from "../ListItem/Todo";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

export default function todolist() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [itemtitle, setItemtitle] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  useState(() => {
    if (localStorage.getItem("localTasks")) {
      setItems(JSON.parse(localStorage.getItem("localTasks")));
    }
  }, []);

  function changeinput(event) {
    setInput(event.target.value);
  }

  function additem(event) {
    event.preventDefault();

    if (input.trim() !== "") {
      let newobject = {
        title: input,
        id: items.length + 1,
      };

      setItems([...items, newobject]);
      setInput("");
      localStorage.setItem("localTasks", JSON.stringify([...items, newobject]));
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Item added successfully",
      });
    } else {
      setInput("");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "your input is empty!",
      });
    }
  }

  function deleteoneitem() {
    setShow(false);
    const deleted = items.filter((f) => f.title !== itemtitle);
    setItems(deleted);
    localStorage.setItem("localTasks", JSON.stringify(deleted));
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Item deleted",
    });
  }

  function deleteall() {
    setShow2(false);
    setItems([]);
    localStorage.removeItem("localTasks");
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "list is empty now",
    });
  }

  const handleClose = () => setShow(false);

  function handleShow(event) {
    setShow(true);
    setItemtitle(event.title);
  }

  const handleClose2 = () => setShow2(false);

  function handleShow2() {
    if (items.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "your list is empty!",
      });
    } else {
      setShow2(true);
    }
  }
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "black", color: "white" }}
        >
          <Modal.Title>warning</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "black", color: "white" }}>
          Do you want to delete this item?
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "black", color: "white" }}>
          <Button onClick={handleClose} variant="secondary">
            No
          </Button>
          <Button onClick={deleteoneitem} variant="primary">
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose2} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete items?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            No
          </Button>
          <Button variant="primary" onClick={deleteall}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <div id="container">
        <h1 className="title">Todo App</h1>
        <form id="add-book" onSubmit={additem}>
          <input
            value={input}
            onChange={changeinput}
            type="text"
            placeholder="Add your new todo"
          />
          <button onClick={additem} type="submit" className="button">
            <p>+</p>
          </button>
        </form>
        <div id="book-list">
          <ul>
            {items.length === 0 && (
              <h3 id="child">
                <i className="fa-solid fa-triangle-exclamation"></i> list is
                empty
              </h3>
            )}
            {items.map((item) => {
              return <Todo title={item.title} deletehandler={handleShow} />;
            })}
          </ul>
        </div>

        <div className="info">
          <div className="info-text">
            <p className="info-text-item">You have </p>
            <p className="info-text-item" id="number">
              {items.length}
            </p>
            <p className="info-text-item"> pending tasks</p>
          </div>
          <button onClick={handleShow2} id="clear-all">
            Clear All
          </button>
        </div>
      </div>
    </>
  );
}

