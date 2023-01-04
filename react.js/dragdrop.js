import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DragIcon from "../IconMenu/DragIcon";
import { get } from "lodash";

export const DragDrop = ({
  onDragEnd,
  droppableId,
  items,
  itemId = "_id",
  RenderComponent,
  configs = { dragInContainer: false },
}) => {
  const DroppableItem = ({ data, idx }) => {
    const wrapperProps = (provided) => {
      if (configs.dragInContainer) {
        return {
          ...provided.draggableProps,
          ...provided.dragHandleProps,
        };
      }
      return { ...provided.draggableProps };
    };

    return (
      <Draggable draggableId={get(data, itemId)} index={idx}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...wrapperProps(provided)}
            className="dragContainer"
          >
            {!configs?.dragInContainer && (
              <div className="dragIcon" {...provided.dragHandleProps}>
                <DragIcon />
              </div>
            )}

            <RenderComponent data={data} idx={idx} />
          </div>
        )}
      </Draggable>
    );
  };

  const DroppableList = function MenuList({ data }) {
    return data.map((item, index) => (
      <DroppableItem data={item} idx={index} index={index} key={item?._id} />
    ));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <DroppableList data={items} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export const App = () => {

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const items = reorder(
      dataSource,
      result.source.index,
      result.destination.index
    );

    setDataSource(items.map((item, index) => ({ ...item, position: index })));
  };

  return (
    <DragDrop
      onDragEnd={onDragEnd}
      droppableId={"list"}
      items={dataSource}
      RenderComponent={MenuItem}
    ></DragDrop>
  );
};
