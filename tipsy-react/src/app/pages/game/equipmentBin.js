import React from 'react';
import { useDrop } from 'react-dnd';

const style = {
  height: '100%',
  color: 'white',
  padding: '1rem',
}

function selectBackgroundColor(isActive, canDrop) {
  if (isActive) {
    return 'darkgreen'
  } else if (canDrop) {
    return 'darkkhaki'
  } else {
    return '#222'
  }
}

const Dustbin = ({ allowedDropEffect, name, item, className }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "equipment",
    drop: () => ({
      name: name,
      allowedDropEffect,
    }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
  const isActive = canDrop && isOver
  const backgroundColor = selectBackgroundColor(isActive, canDrop)

  if(item !== ""){
    return (
      <div ref={drop} className={"grid-x align-center-middle "+className} style={{ ...style, backgroundColor }}>
        {item}
      </div>
    )
  }else{
    return (
      <div ref={drop} className={""+className} style={{ ...style, backgroundColor }}>
        <br />
        <br />
        {isActive ? 'Release to drop' : 'Drag an equipment here'}
      </div>
    )
  }
}
export default Dustbin
