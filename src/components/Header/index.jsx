import React, { Component } from 'react'
import { Modal } from 'antd'
import  styles from './style/index.less'

class PublicHeader extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className= {styles.fm_header}>
        <div className="fm-header">
          <img className="fm-logo" src={require('./images/logo.png')}/>
          <div className="fm-title">表单设计器</div>
          <div className="fm-link">
            <a href="https://www.baidu.com">说明文档</a>
          </div>
        </div>
      </div>
    )
  }
}

export default PublicHeader
