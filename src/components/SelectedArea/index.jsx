import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'dva';
import { Modal } from 'antd'
import './style/index.less'

class MiddleContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items1:[
        {
          id: `item-99`,
          content: `item 99`
        },
        {
          id: `item-100`,
          content: `item 100`
        }
      ]
    }
  }
  render() {
    return (
      <div className="comp-public-middle" >
        <DragDropContext>
          <Droppable droppableId="droppable2">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              > 
                {this.state.items1.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index} >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

      </div>
    )
  }
}

// export default MiddleContent
// export default connect(
//   ({formData}) => {
//       formData
//   }
// )(MiddleContent)
export default MiddleContent


