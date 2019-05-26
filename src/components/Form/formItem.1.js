import React from 'react';
import moment from 'moment';
import { Col, Form, Input, Select, DatePicker, Switch, TreeSelect, Divider } from 'antd';
import _ from 'lodash';
// import NumericInput from '@/components/Form/Numeric';
// import UploadMedia from '@/components/UploadMedia';
// import InputImages from '@/components/UploadMedia/InputImages';

const FormItem = Form.Item;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const { Option } = Select;
const layout = {
  md: 24,
  sm: 24,
};

const normalLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
    md: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 10 },
    md: { span: 10 },
  },
};
const CreateControll = {
//   tips: (
//     { key, name, defaultValue = '', normalize = v => v },
//     { initialData, formItemLayout = normalLayout }
//   ) => (
//     <Col {...layout} key={key}>
//       <FormItem {...formItemLayout} label={name} style={{ marginBottom: '12px' }}>
//         <p style={{ lineHeight: '24px', paddingTop: '8px', marginBottom: 0 }}>
//           {normalize(_.get(initialData, key, defaultValue))}
//         </p>
//       </FormItem>
//     </Col>
//   ),
//   imagesShow: (
//     { key, name, defaultValue = '', normalize = v => v },
//     { initialData, formItemLayout = normalLayout }
//   ) => (
//     <Col {...layout} key={key}>
//       <FormItem {...formItemLayout} label={name} style={{ marginBottom: '12px' }}>
//         <img
//           src={normalize(_.get(initialData, key, defaultValue))}
//           alt=""
//           width="86"
//           height="86"
//           style={{ display: 'block' }}
//         />
//       </FormItem>
//     </Col>
//   ),
  input: (
    {
      key,
      name,
      rules = [],
      placeholder = '请输入',
      isNumber = false,
      normalize = v => v,
      isInt,
      defaultValue = null,
    },
    { getFieldDecorator, initialData, formItemLayout = normalLayout }
  ) => (
    <Col {...layout} key={key}>
      <FormItem {...formItemLayout} label={name}>
        {getFieldDecorator(key, {
          initialValue: _.get(initialData, key, defaultValue),
          rules,
          normalize,
        })(
          isNumber ? (
              5555
            // <NumericInput isint={isInt} placeholder={placeholder} />
          ) : (
            <Input placeholder={placeholder} />
          )
        )}
      </FormItem>
    </Col>
  ),

  textArea: (
    { key, name, rules = [], placeholder = '请输入', rows = 4, defaultValue = null },
    { getFieldDecorator, initialData, formItemLayout = normalLayout }
  ) => (
    <Col {...layout} key={key}>
      <FormItem {...formItemLayout} label={name}>
        {getFieldDecorator(key, { initialValue: _.get(initialData, key, defaultValue), rules })(
          <TextArea rows={rows} placeholder={placeholder} />
        )}
      </FormItem>
    </Col>
  ),

//   images: (
//     { key, name, conf = {}, rules, defaultValue = '' },
//     { getFieldDecorator, initialData, formItemLayout = normalLayout }
//   ) => (
//     <Col {...layout} key={key}>
//       <FormItem {...formItemLayout} label={name}>
//         {getFieldDecorator(key, { initialValue: _.get(initialData, key, defaultValue), rules })(
//           <UploadMedia {...conf} />
//         )}
//       </FormItem>
//     </Col>
//   ),
//   inputImages: (
//     { key, name, rules, defaultValue = '' },
//     { getFieldDecorator, initialData, formItemLayout = normalLayout }
//   ) => (
//     <Col {...layout} key={key}>
//       <FormItem {...formItemLayout} label={name}>
//         {getFieldDecorator(key, { initialValue: _.get(initialData, key, defaultValue), rules })(
//           <InputImages />
//         )}
//       </FormItem>
//     </Col>
//   ),
  select: (
    {
      key,
      name,
      placeholder = '请选择',
      rules = [],
      option = [],
      conf = {},
      defaultValue = null,
      getInit = v => v,
    },
    { getFieldDecorator, getFieldValue, initialData, formItemLayout = normalLayout }
  ) => {
    const OptionLine = p =>
      p.map(elem => (
        <Option key={elem.key} value={elem.key}>
          {elem.text}
        </Option>
      ));
    const selectOver = v => {
      if (conf.mode === 'multiple' && v) {
        const a = [];
        const b = [];
        const p = option;
        p.map(elem => {
          if (v.indexOf(elem.key) >= 0) {
            a.push(elem);
          } else {
            b.push(elem);
          }
          return elem;
        });
        return [...a, ...b];
      }

      return option;
    };
    return (
      <Col {...layout} key={key}>
        <FormItem {...formItemLayout} label={name}>
          {getFieldDecorator(key, {
            initialValue: getInit(_.get(initialData, key, defaultValue)),
            rules,
          })(
            <Select placeholder={placeholder} style={{ width: '100%' }} {...conf}>
              {OptionLine(selectOver(getFieldValue(key)))}
            </Select>
          )}
        </FormItem>
      </Col>
    );
  },
  dateRange: (
    { key, name, rules = [], getInt = v => v, normalize = v => v, format = 'YYYY-MM-DD' },
    { getFieldDecorator, setFieldsValue, initialData, formItemLayout = normalLayout }
  ) => {
    getFieldDecorator(key, { initialValue: initialData[key] });
    const change = v => {
      setFieldsValue({
        [key]: [moment(v[0]).format(format), moment(v[1]).format(format)],
      });
    };
    return (
      <Col {...layout} key={key}>
        <FormItem {...formItemLayout} label={name}>
          {getFieldDecorator(`__cache_${key}`, {
            initialValue: getInt(initialData[key]),
            rules,
            normalize,
          })(<RangePicker style={{ width: '100%' }} onChange={change} />)}
        </FormItem>
      </Col>
    );
  },
  date: (
    {
      key,
      name,
      rules = [],
      conf = {},
      getInt = v => v,
      normalize = v => v,
      format = 'YYYY-MM-DD',
    },
    { getFieldDecorator, setFieldsValue, initialData, formItemLayout = normalLayout }
  ) => {
    getFieldDecorator(key, { initialValue: initialData[key] });
    return (
      <Col {...layout} key={key}>
        <FormItem {...formItemLayout} label={name}>
          {getFieldDecorator(`__cache_${key}`, {
            initialValue: getInt(initialData[key]),
            rules,
            normalize,
          })(
            <DatePicker
              style={{ width: '100%' }}
              {...conf}
              onChange={v => {
                setFieldsValue({ [key]: moment(v).format(format) });
              }}
            />
          )}
        </FormItem>
      </Col>
    );
  },
  cleanData(req) {
    const res = {};
    Object.keys(req).forEach(key => {
      if (key.indexOf('__cache_') < 0) {
        res[key] = req[key];
      }
    });
    return res;
  },
  switch: (
    { key, name, colLayout = { ...layout } },
    { formItemLayout = normalLayout, getFieldDecorator, initialData }
  ) => (
    <Col {...colLayout} key={key}>
      <FormItem label={name} {...formItemLayout}>
        {getFieldDecorator(key, {
          initialValue: initialData[key] || false,
          valuePropName: 'checked',
        })(<Switch />)}
      </FormItem>
    </Col>
  ),

  treeSelect: (
    { key, name, placeholder = '请选择', option, conf = {} },
    { getFieldDecorator, initialData, formItemLayout = normalLayout }
  ) => (
    <Col {...layout} key={key}>
      <FormItem label={name} {...formItemLayout}>
        {getFieldDecorator(key, {
          initialValue: initialData[key],
        })(
          <TreeSelect
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={option}
            placeholder={placeholder}
            treeDefaultExpandAll
            style={{ width: '100%' }}
            {...conf}
          />
        )}
      </FormItem>
    </Col>
  ),
  divider: ({ key, name }) => <Divider key={key}>{name}</Divider>,
};
export default CreateControll;
