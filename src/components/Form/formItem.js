import React from 'react';
import moment from 'moment';
import { Row, Col, Form, Radio,Button, Checkbox, TimePicker, Input, Select, DatePicker, Switch, Upload, Icon } from 'antd';
import _ from 'lodash';


const FormItem = Form.Item;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

const { Option } = Select;


const CreateControll = {
    input: (
        {
            type,
            name,
            options
        }
    ) => (
            <Row>
                <Col>{name}</Col>
                <Col>
                    <Input placeholder={options.placeholder} defaultValue={options.defaultValue} disabled={options.disabled} />
                </Col>
            </Row>
        ),

    textarea: (
        {
            type,
            name,
            options
        }
    ) => (
            <Row>
                <Col>{name}</Col>
                <Col>
                    <TextArea placeholder={options.placeholder} defaultValue={options.defaultValue} disabled={options.disabled} />    </Col>
            </Row>
        ),
    radio: ({
        type,
        name,
        options
    }) => (
            <Row>
                <Col>{name}</Col>
                <Col>
                    <RadioGroup value={options.defaultValue}>
                        {options.options.map((item, index) => {
                            return <Radio value={item.value}>{item.label}</Radio>
                        })}
                    </RadioGroup>
                </Col>
            </Row>
        ),
    checkbox: ({
        type,
        name,
        options
    }) => (
            <Row>
                <Col>{name}</Col>
                <Col>
                    <CheckboxGroup defaultValue={options.defaultValue}>
                        {options.options.map((item, index) => {
                            return <Checkbox value={item.value}>{item.label}</Checkbox>
                        })}
                    </CheckboxGroup>
                </Col>
            </Row>
        ),
    time: ({
        type,
        name,
        options
    }) => (
            <Row>
                <Col>{name}</Col>
                <Col>
                    <TimePicker defaultValue={moment(options.defaultValue, options.format)} defaultOpenValue={moment(new Date(), options.format)}></TimePicker>
                </Col>
            </Row>
        ),
    date: ({
        type,
        name,
        options
    }) => (
            <Row>
                <Col>{name}</Col>
                <Col>
                    <DatePicker defaultValue={moment(options.defaultValue, options.format)} value={moment(new Date(), options.format)}></DatePicker>
                </Col>
            </Row>
        ),
    select: ({
        type,
        name,
        options
    }) => (
            <Row>
                <Col>{name}</Col>
                <Col>
                    <Select defaultValue={options.defaultValue}>
                        {options.options.map((item, index) => {
                            return <Option value={item.value}>{item.value}</Option>
                        })}
                    </Select>
                </Col>
            </Row>
        ),
    upload: ({
        type,
        name,
        options
    }) => (
            <Row>
                <Col>{name}</Col>
                <Col>
                    <Upload {...options}>
                        <Button>
                            <Icon type="upload" /> Click to Upload
                        </Button>
                    </Upload>,
                    </Col>
            </Row>
        ),
};
export default CreateControll;
