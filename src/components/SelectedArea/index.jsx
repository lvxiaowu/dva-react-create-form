import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'dva';
import styles from './style/index.less'
import formItem from '../Form/formItem'
import JSONEditor from 'jsoneditor'
// import  ace from 'ace';
import 'jsoneditor/dist/jsoneditor.min.css'
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
      jsonTemplate:''
    }
  }
  componentDidMount(){
    // console.log(555)
    // // create the editor
    
    //     var container = document.getElementById("jsoneditor");
    //     var options = {};
    //     var editor = new JSONEditor(container, options);
    //     // set json
    //     var json = {
    //         "Array": [1, 2, 3],
    //         "Boolean": true,
    //         "Null": null,
    //         "Number": 123,
    //         "Object": {"a": "b", "c": "d"},
    //         "String": "Hello World"
    //     };
    //     editor.set(json);

    //     // get json
    //     var json = editor.get();
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

  add = (item,index) => {
    const { dispatch } = this.props
    dispatch({
      type: 'formData/add',
      payload: {
        item,index,key:new Date().getTime()
      },
    });
  }

  delete = (index) => {
    const { dispatch } = this.props
    dispatch({
      type: 'formData/delete',
      payload: {
        index
      },
    });
  }

  handleGenerateJson = ()=>{
     const { widgetFormSelect } = this.props.formData
    //  console.log(widgetFormSelect)
        // this.jsonTemplate = this.widgetFormSelect
        // this.setState({
        //   jsonTemplate:widgetFormSelect
        // })
      // console.log(JSON.stringify(this.widgetForm))
      // this.$nextTick(() => {
        // const editor = ace.edit('jsoneditor')
        // editor.session.setMode("ace/mode/json")

        // const btnCopy = new Clipboard('#copybtn')
      // })
      // var container = document.getElementById("jsoneditor");
      // var options = { ajv: Ajv({ allErrors: true, verbose: true })};
      // var editor = new JSONEditor(container, options);
      // // set json
      // // var json = {
      // //     "Array": [1, 2, 3],
      // //     "Boolean": true,
      // //     "Null": null,
      // //     "Number": 123,
      // //     "Object": {"a": "b", "c": "d"},
      // //     "String": "Hello World"
      // // };
      // var json = widgetFormSelect
      // editor.set(json);

        // get json
        // var json = editor.get();
  }

  render() {
    const { widgetFormSelect } = this.props.formData
    const { jsonTemplate } = this.state
    const { form } = this.props;
    return (
      <div className={styles.compContainter} >
        <div className="btn-bar">
          <Button onClick={this.handleGenerateJson}>生成JSON</Button>
          <Button>预览</Button>
        </div>
        <div id="jsoneditor">{jsonTemplate}</div>
        {widgetFormSelect && widgetFormSelect.length ?
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable2">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {widgetFormSelect.map((item, index) => (
                    <Draggable key={item.key||item.type} draggableId={item.key||item.type} index={index} >
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


