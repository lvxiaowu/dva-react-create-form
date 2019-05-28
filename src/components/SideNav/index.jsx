import React, {
    Component
} from 'react';
import { message } from 'antd';
import { connect } from 'dva';
import { basicComponents, advanceComponents, layoutComponents } from './conponentConfig';
import styles from './style/index.less';


class SideNav extends Component {
    state = {

    };
    selected = (item) => {
        message.info(`${item.name}`)
        const { dispatch } = this.props
        dispatch({
            type: 'formData/add',
            payload: {item,key:new Date().getTime()},
        });
    }
    render() {
        return (
            <div className={styles.pageStyle}>
                <div className="components-list">
                    <div className="widget-cate">基础字段</div>
                    <ul>
                        {basicComponents.map((item, index) => (
                            <li className="form-edit-widget-label"
                                key={index}
                                onClick={() => this.selected(item)}>
                                <a>
                                    <i></i>
                                    <span>{item.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}
export default connect(
    ({ formData }) => {
        return { formData }
    }
)(SideNav)


