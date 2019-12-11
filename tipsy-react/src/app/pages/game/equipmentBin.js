import React from 'react';
import { useDrop } from 'react-dnd';

import {Notify, GetProfImg} from '../../util/constants';

const style = {
  height: '12rem',
  width: '12rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
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

const Dustbin = ({ allowedDropEffect, name, item }) => {
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
      <div ref={drop} style={{ ...style, backgroundColor }}>
        {item}
      </div>
    )
  }else{
    return (
      <div ref={drop} style={{ ...style, backgroundColor }}>
        <br />
        <br />
        {isActive ? 'Release to drop' : 'Drag a box here'}
      </div>
    )
  }
}
export default Dustbin
