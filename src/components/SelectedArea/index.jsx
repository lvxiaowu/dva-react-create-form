import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'dva';
import styles from './style/index.less'
import formItem from '../Form/formItem'
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Button,
  Icon,
  Switch,
  Popconfirm,
  DatePicker,
  Alert,
  TreeSelect,
} from 'antd';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const inputConf = { allowClear: true };

class MiddleContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  onDragEnd = result => {
    const { source, destination } = result;
    const { dispatch } = this.props
    if (!destination) {
      return;
    }
    dispatch({
      type: 'formData/move',
      payload: {
        startIndex: source.index,
        endIndex: destination.index
      },
    });
  }

  add = (item,index) =>{
    const { dispatch } = this.props
    dispatch({
      type: 'formData/add',
      payload: {
        item,index
      },
    });
  }
  delete = (index) =>{
    const { dispatch } = this.props
    dispatch({
      type: 'formData/delete',
      payload: {
        index
      },
    });
  }
  render() {
    const { widgetFormSelect } = this.props.formData
    const { form } = this.props;
    return (
      <div className={styles.compContainter} >
        {widgetFormSelect && widgetFormSelect.length ?
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable2">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {widgetFormSelect.map((item, index) => (
                    <Draggable key={item.type} draggableId={item.type} index={index} >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="form-item">
                            {formItem[item.type](item)}
                            <div className="btn-group">
                              <Button type="primary" onClick={() => this.add(item,index)}>复制</Button>
                              <Button type="danger" onClick={() => this.delete(index)}>删除</Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          : <div className="no-selected">点击左侧题型</div>
        }
      </div>
    )
  }
}

export default connect(
  ({ formData }) => {
    return {
      formData
    }
  }
)(MiddleContent)


