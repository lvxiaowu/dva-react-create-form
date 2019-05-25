import React, { Component } from 'react';
import { connect } from 'dva';
import { message } from 'antd'
import SideNav from '../../components/SideNav'
import SelectedArea from '../../components/SelectedArea'
import styles from './IndexPage.less';

const RightContent = ({ actions }) => {
  return (
    <div className="content" actions={actions}>
      <div className="right-content">
        <div className="inner-content">
          555555
        </div>
      </div>
    </div>
  )
}
class IndexPage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className={styles.pageStyle}>
          <div className="fm-container">
            <div className="layout-left"><SideNav /></div>
            <div className="layout-center"><SelectedArea /></div>
            <div className="layout-right"><RightContent /></div>
          </div>
      </div>
    );
  }
}

IndexPage.propTypes = {
};


export default connect(
  ({formData}) => {
      formData
  }
)(IndexPage)
