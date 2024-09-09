import React, { useState } from "react";
import { useDispatch } from "react-redux";

const BlockModal = ({ isOpen, onClose, blockId, destinationLane }) => {
  const [formData, setFormData] = useState({
    comment: "",
    additionalField1: "",
    additionalField2: "",
  });
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Check if all required fields are filled
    if (!formData.comment || !formData.additionalField1 || !formData.additionalField2) {
      alert("Please fill out all required fields.");
      return;
    }

    const historyEntry = {
      lane: destinationLane,
      timestamp: new Date().toISOString(),
      comment: formData.comment,
      additionalData: {
        field1: formData.additionalField1,
        field2: formData.additionalField2,
      },
    };

    dispatch({
      type: "HISTORY_BLOCK",
      payload: {
        id: blockId,
        data: { historyEntry },
      },
    });
    setFormData({
        comment: "",
        additionalField1: "",
        additionalField2: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          width: "320px",
        }}
      >
        <h2 style={{ borderLeft:"1px solid lightgrey"}}>Move Block to {destinationLane}</h2>
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleInputChange}
          placeholder="Add a comment"
          rows={3}
          style={{ width: "100%", outline: "none", marginTop: "20px", width: "280px" }}
          required
        />
        <input
          name="additionalField1"
          value={formData.additionalField1}
          onChange={handleInputChange}
          placeholder="Additional Field 1"
          style={{ width: "100%", outline: "none", marginBottom: "10px", width: "280px" }}
          required
        />
        <input
          name="additionalField2"
          value={formData.additionalField2}
          onChange={handleInputChange}
          placeholder="Additional Field 2"
          style={{ width: "100%", outline: "none", marginBottom: "10px", width: "280px" }}
          required
        />
        <button
          onClick={handleSubmit}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            background: "#007aff",
            color: "white",
            border: "none",
            marginTop: "10px",
            marginLeft: "10px",
          }}
        >
          Submit
        </button>
        <button
          onClick={onClose}
          style={{
            marginTop: "10px",
            marginLeft: "10px",
            padding: "10px 20px",
            cursor: "pointer",
            background: "#007aff",
            color: "white",
            border: "none",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BlockModal;
