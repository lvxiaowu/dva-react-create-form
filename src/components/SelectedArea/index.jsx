import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'dva';
import {Modal} from 'antd'
import styles from './style/index.less'
import formItem from '../Form/formItem'
import JSONEditor from 'jsoneditor'
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
      visibleGenerateJson: true,
    }
  }
  componentDidMount(){
   
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
     console.log(widgetFormSelect)
     var codeEditor = document.getElementById("codeEditor");
       //初始化编辑器模式
    var codeOptions = {
      mode: 'code',
      modes: ['code'],
      onError: function (err) {
        alert(err.toString());
      }
    };
      var codeEditor = new JSONEditor(codeEditor, codeOptions, {
      widgetFormSelect
    });
    this.setState({
      visibleGenerateJson:true
    })
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

  handleCopy=()=>{
    console.log('copy')
  }

  render() {
    const { widgetFormSelect } = this.props.formData
    const { visibleGenerateJson } = this.state
    const { form } = this.props;
    return (
      <div className={styles.compContainter} >
        <div className="btn-bar">
          <Button onClick={this.handleGenerateJson}>生成JSON</Button>
          <Button>预览</Button>
        </div>
     
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
         <Modal
          visible={visibleGenerateJson}
          title="Title"
          onOk={this.handleCopy}
          onCancel={()=>this.setState({visibleGenerateJson:false})}
          maskClosable={true}
          footer={[
            // <Button key="back" onClick={this.handleCancel}>
            //   Return
            // </Button>,
            <Button key="submit" type="primary" onClick={this.handleCopy}>
              复制
            </Button>,
          ]}
        >
          <div id="codeEditor" style={{width: '100%', height:' 600px'}}></div>
        </Modal>
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


