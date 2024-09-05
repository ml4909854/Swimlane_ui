import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const BlockModal = ({ isOpen, onClose, blockId, destinationLane }) => {
    const [formData, setFormData] = useState({
        comment: '',
        addField1: '',  // Example additional fields
        addField2: '',
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
        const historyEntry = {
            lane: destinationLane,
            timestamp: new Date().toISOString(),
            comment: formData.comment,
            additionalData: {
                field1: formData.addField1,
                field2: formData.addField2,
            },
        };

        dispatch({
            type: 'UPDATE_BLOCK',
            payload: {
                id: blockId,
                data: { historyEntry }
            },
        });

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
            <div style={{
                backgroundColor: '#fff', padding: '20px', borderRadius: '8px', width: '300px',
            }}>
                <h2>Move Block to {destinationLane}</h2>
                <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    placeholder="Add a comment"
                    rows={3}
                    style={{ width: '100%', marginBottom: '10px' }}
                />
                <input
                    name="addField1"
                    value={formData.additionalField1}
                    onChange={handleInputChange}
                    placeholder="Add Field 1"
                    style={{ width: '100%', marginBottom: '10px' }}
                />
                <input
                    name="addField2"
                    value={formData.additionalField2}
                    onChange={handleInputChange}
                    placeholder="Add Field 2"
                    style={{ width: '100%', marginBottom: '10px' }}
                />
                <button onClick={handleSubmit} style={{ marginTop: '10px' }}>Submit</button>
                <button onClick={onClose} style={{ marginTop: '10px', marginLeft: '10px' }}>Cancel</button>
            </div>
        </div>
    );
};

export default BlockModal;