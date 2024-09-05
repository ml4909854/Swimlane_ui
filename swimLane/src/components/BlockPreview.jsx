import React from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';

const BlockPreview = ({ isOpen, onClose, blockId }) => {
    const block = useSelector((state) => state.blocks.blocks[blockId]);

    if (!block) return null;

    const renderHistory = () => {
        if (!block.history.length) {
            return <p>No transition history available.</p>;
        }

        return block.history.map((entry, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
                <p>
                    <strong>Moved to {entry.destinationLane}:</strong> {new Date(entry.timestamp).toLocaleString()}
                </p>
                <p><strong>Comment:</strong> {entry.comment || "Not Available"}</p>
                <p><strong>Additional Data:</strong> {Object.keys(entry.additionalData).length > 0 ? JSON.stringify(entry.additionalData) : "Not Available"}</p>
            </div>
        ));
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Block Preview"
            ariaHideApp={false}
            style={{
                content: {
                    maxWidth: '400px',
                    margin: 'auto',
                    padding: '20px',
                    borderRadius: '8px',
                },
            }}
        >
            <h2>{block.title}</h2>
            <p>{block.description}</p>
            <h3>Transition History</h3>
            <div style={{
                maxHeight: '200px',
                overflowY: 'auto',
                border: '1px solid #ddd',
                padding: '10px',
                borderRadius: '4px',
                backgroundColor: '#f9f9f9'
            }}>
                {renderHistory()}
            </div>
            <button onClick={onClose} style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
            }}>Close</button>
        </Modal>
    );
};

export default BlockPreview;