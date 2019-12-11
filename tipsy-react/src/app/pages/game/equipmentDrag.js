import React, {Component, Fragment} from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd'

import {Notify, GetProfImg} from '../../util/constants';

const Box = ({ type,item,className,func, draggble }) =>{

      var name = item.name;
      var img = item.img;
      var id = item.id;

      var descPre = "";
      var desc = "";

      if (type === "equipment") {
          descPre = "Type:";
          desc = <span>{" " + item.equipmentType.type}</span>;
      } else if (type === "equipmentAltered") {
          descPre = "Actions Done: ";
          desc = <span>{" " + item.tags}</span>;
      } else if (type === "error") {
          func = ()=>{};
      }


      const [{ opacity }, drag, preview] = useDrag({
        item:{payload:item,type:"equipment"},
        canDrag: draggble,
        end(item, monitor) {
          const dropResult = monitor.getDropResult()
          if (item && dropResult) {
            
            const isDropAllowed =
              dropResult.allowedDropEffect === 'any' ||
              dropResult.allowedDropEffect === dropResult.dropEffect
            
              if (isDropAllowed) {

                if (func !== null && func !== "" && func !== undefined) {
                  func(dropResult.name,item.payload)
                }

            }
          }
        },
        collect: monitor => ({
          opacity: monitor.isDragging() ? 0.4 : 1,
        }),
      })

      return(
        <Fragment>
          <DragPreviewImage connect={preview} src={img} />
          <div ref={drag} className={className} key={id}>
              <div className="previewItemMargin cell"></div>

              <div className="grid-x align-center-middle small-11 previewItemContainer">
                      <div className="small-6 grid-x align-center-middle cell">
                          <GetProfImg
                              className="small-10 cell"
                              pic={img}
                              alt={name}
                              type={type}/>
                      </div>
                  
                      <div className="small-1 cell"></div>
                      <div className="small-10 grid-x cell">
                          <div className="previewName cell">{name}</div>
                          <div className="previewDesc cell">{descPre}{desc}</div>
                      </div>
                      <div className="small-1 cell"></div>

              </div>

              <div className="previewItemMargin cell"></div>
          </div>
        </Fragment>
      )

};

export default Box;
