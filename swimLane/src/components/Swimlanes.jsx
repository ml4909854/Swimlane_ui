import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import BlockModal from './BlockModal';
import BlockPreview from './BlockPreview';

const Swimlanes = () => {
    const lanes = useSelector((state) => state.lanes.lanes);
    const blocks = useSelector((state) => state.blocks.blocks);
    const searchTerm = useSelector((state) => state.filter.searchTerm);
    const dispatch = useDispatch();

    const [modalData, setModalData] = useState({
        isOpen: false,
        blockId: null,
        destinationLane: '',
    });
    const [previewData, setPreviewData] = useState({
        isOpen: false,
        blockId: null,
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
        setModalData({ isOpen: false, blockId: null, destinationLane: '' });
    };

    const closePreview = () => {
        setPreviewData({ isOpen: false, blockId: null });
    };

    const handleFilterChange = (e) => {
        dispatch({
            type: 'SET_FILTER',
            payload: e.target.value,
        });
    };

    return (
        <>
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search blocks..."
                    value={searchTerm}
                    onChange={handleFilterChange}
                    style={{ padding: '10px', width: '100%' }}
                />
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
                <div style={{ display: 'flex', gap: '20px' }}>
                    {Object.keys(lanes).map((lane) => (
                        <Droppable droppableId={lane} key={lane}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={{
                                        backgroundColor: '#f0f0f0',
                                        padding: '10px',
                                        width: '250px',
                                        minHeight: '400px',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <h2>{lane}</h2>
                                    {lanes[lane].filter(blockId => blocks[blockId].title.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .map((blockId, index) => (
                                            <Draggable draggableId={String(blockId)} index={index} key={blockId}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{
                                                            backgroundColor: 'yellow',
                                                            padding: '10px',
                                                            marginBottom: '10px',
                                                            borderRadius: '4px',
                                                            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                                                            ...provided.draggableProps.style,
                                                        }}
                                                        onClick={() => handleBlockClick(blockId)}  // Open preview on click
                                                    >
                                                        <h3>{blocks[blockId].title}</h3>
                                                        <p>{blocks[blockId].description}</p>
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
        </>
    );
};

export default Swimlanes;