// Swimlanes.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import BlockModal from "./BlockModal";
import BlockPreview from "./BlockPreview";

const Swimlanes = () => {
  const lanes = useSelector((state) => state.lanes.lanes);
  const blocks = useSelector((state) => state.blocks.blocks);
  const searchTerm = useSelector((state) => state.filter.searchTerm);
  const dispatch = useDispatch();

  const [modalData, setModalData] = useState({
    isOpen: false,
    blockId: null,
    destinationLane: "",
  });
  const [previewData, setPreviewData] = useState({
    isOpen: false,
    blockId: null,
  });

  const [newTaskModal, setNewTaskModal] = useState(false);
  const [newTaskData, setNewTaskData] = useState({
    title: "",
    description: "",
  });

  const [editTaskModal, setEditTaskModal] = useState(false);
  const [editTaskData, setEditTaskData] = useState({
    id: null,
    title: "",
    description: "",
  });

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    setModalData({
      isOpen: true,
      blockId: parseInt(draggableId),
      destinationLane: destination.droppableId,
    });

    dispatch({
      type: "MOVE_BLOCK",
      payload: {
        blockId: parseInt(draggableId),
        sourceLane: source.droppableId,
        destinationLane: destination.droppableId,
      },
    });
  };

  const handleBlockClick = (blockId) => {
    setPreviewData({
      isOpen: true,
      blockId,
    });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, blockId: null, destinationLane: "" });
  };

  const closePreview = () => {
    setPreviewData({ isOpen: false, blockId: null });
  };

  const handleFilterChange = (e) => {
    dispatch({
      type: "SET_FILTER",
      payload: e.target.value,
    });
  };

  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTaskData({ ...newTaskData, [name]: value });
  };

  const handleNewTaskSubmit = () => {
    if (newTaskData.title.trim() === "" || newTaskData.description.trim() === "") {
        alert("Please fill out both the title and description fields.");
        return;
      }
    const newBlockId = Date.now();

    dispatch({
      type: "ADD_BLOCK",
      payload: {
        id: newBlockId,
        title: newTaskData.title,
        description: newTaskData.description,
      },
    });

    dispatch({
      type: "ADD_TO_LANE",
      payload: { blockId: newBlockId, lane: "To Do" },
    });

    setNewTaskData({ title: "", description: "" });
    setNewTaskModal(false);
  };

  const handleEditTaskClick = (blockId) => {
    setEditTaskData({
      id: blockId,
      title: blocks[blockId].title,
      description: blocks[blockId].description,
    });
    setEditTaskModal(true);
  };

  const handleEditTaskChange = (e) => {
    const { name, value } = e.target;
    setEditTaskData({ ...editTaskData, [name]: value });
  };

  const handleEditTaskSubmit = () => {
    if (!editTaskData.title.trim() || !editTaskData.description.trim()) {
        alert("Both title and description are required!");
        return;
    }
    dispatch({
      type: "UPDATE_BLOCK",
      payload: {
        id: editTaskData.id,
        title: editTaskData.title,
        description: editTaskData.description,
      },
    });

    // Clear the input fields by resetting the editTaskData state
    setEditTaskData({
      id: null,
      title: "",
      description: "",
    });

    // Close the modal
    setEditTaskModal(false);
  };

  const handleDeleteTaskClick = (blockId) => {
    dispatch({
      type: "DELETE_BLOCK",
      payload: blockId,
    });
  };

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <input
          required
          type="text"
          placeholder="Search blocks..."
          value={searchTerm}
          onChange={handleFilterChange}
          style={{ padding: "10px", width: "100%", outline: "none" }}
        />
      </div>

      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <button
          onClick={() => setNewTaskModal(true)}
          style={{
            backgroundColor: "red" /* Green */,
            border: "none",
            color: "white",
            padding: " 16px 32px",
            textAlign: "center",
            display: "inline-block",
            fontSize: "16px",
            margin: "4px 2px",
            cursor: "pointer ",
          }}
        >
          Add New Task
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          {Object.keys(lanes).map((lane) => (
            <Droppable droppableId={lane} key={lane}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    backgroundColor: "#f0f0f0",
                    padding: "10px",
                    width: "300px",
                    minHeight: "500px",
                    borderRadius: "10px",
                  }}
                >
                  <h2>{lane}</h2>
                  {lanes[lane]
                    .filter(
                      (blockId) =>
                        blocks[blockId] &&
                        blocks[blockId].title
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                    )
                    .map((blockId, index) => (
                      <Draggable
                        draggableId={String(blockId)}
                        index={index}
                        key={blockId}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              backgroundColor: "grey",
                              padding: "10px",
                              color: "white",
                              borderRadius: "4px",
                              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                              ...provided.draggableProps.style,
                            }}
                          >
                            <h3>{blocks[blockId].title}</h3>
                            <p>{blocks[blockId].description}</p>
                            <button
                              onClick={() => handleBlockClick(blockId)}
                              style={{
                                marginTop: "10px",
                                marginLeft: "10px",
                                borderRadius: "50px",
                                padding: "5px",
                                cursor: "pointer",
                                backgroundColor: "black",
                                color: "white",
                              }}
                            >
                              View History
                            </button>
                            <button
                              onClick={() => handleEditTaskClick(blockId)}
                              style={{
                                marginTop: "10px",
                                marginLeft: "10px",
                                borderRadius: "50px",
                                padding: "5px",
                                width: "80px",
                                textAlign: "center",
                                cursor: "pointer",
                                backgroundColor: "black",
                                color: "white",
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteTaskClick(blockId)}
                              style={{
                                marginTop: "10px",
                                marginLeft: "10px",
                                borderRadius: "50px",
                                padding: "5px",
                                width: "80px",
                                textAlign: "center",
                                cursor: "pointer",
                                backgroundColor: "black",
                                color: "white",
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <BlockModal
        isOpen={modalData.isOpen}
        onClose={closeModal}
        blockId={modalData.blockId}
        destinationLane={modalData.destinationLane}
      />

      <BlockPreview
        isOpen={previewData.isOpen}
        onClose={closePreview}
        blockId={previewData.blockId}
      />

      {newTaskModal && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            // border:"1px solid black",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            marginTop: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          <h3>Add New Task</h3>
          <input
          
            type="text"
            name="title"
            placeholder="Title"
            value={newTaskData.title}
            onChange={handleNewTaskChange}
            style={{
              display: "block",
              marginBottom: "10px",
              outline: "none",
              width: "300px",
              padding: "10px",
            }}
            required
          />
          <textarea
            
            name="description"
            placeholder="Description"
            value={newTaskData.description}
            onChange={handleNewTaskChange}
            style={{
              display: "block",
              marginBottom: "10px",
              width: "300px",
              outline: "none",
              padding: "10px",
              height: "100px",
            }}
            required/>
          <button
            onClick={handleNewTaskSubmit}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              background: "#007aff",
              color: "white",
              border: "none",
              outline: "none",
            }}
          >
            Add Task
          </button>
          <button
            onClick={() => setNewTaskModal(false)}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              marginLeft: "10px",
              background: "#007aff",
              color: "white",
              border: "none",
              outline: "none",
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {editTaskModal && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            width: "300px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          <h3 style={{ borderLeft: "1px solid lightgrey" }}>Edit Task</h3>
          <input   required
            type="text"
            name="title"
            placeholder="Title"
            value={editTaskData.title}
            onChange={handleEditTaskChange}
            style={{
              display: "block",
              marginBottom: "10px",
              width: "93%",
              padding: "10px",
              outline: "none",
            }}
          />
          <textarea   required
            name="description"
            placeholder="Description"
            value={editTaskData.description}
            onChange={handleEditTaskChange}
            style={{
              display: "block",
              marginBottom: "10px",
              width: "93%",
              padding: "10px",
              outline: "none",
              height: "100px",
            }}
          />
          <button
            onClick={handleEditTaskSubmit}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              background: "#007aff",
              color: "white",
              border: "none",
              outline: "none",
              marginRight: "20px",
              marginTop: "10px",
            }}
          >
            Save
          </button>
          <button
            onClick={() => setEditTaskModal(false)}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              background: "#007aff",
              color: "white",
              border: "none",
              outline: "none",
              marginRight: "10px",
              marginTop: "10px",
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </>
  );
};

export default Swimlanes;
