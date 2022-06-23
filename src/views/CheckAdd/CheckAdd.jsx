import React, { useState, useRef } from 'react'
import { Row, Button, Table, Space, Modal, Select, Form, Input, Divider, DatePicker,message } from 'antd'
import { PlusCircleOutlined, CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { useDispatch, useSelector } from 'react-redux'
import { toNames,addCheck } from '../../store/modules/checks';
import './CheckAdd.scss'

const { Option } = Select;
const { Column } = Table;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

export default function CheckAdd() {
  const [visible, setVisible] = useState(false);
  const [confirmLoading,setConfirmLoading ] = useState(false);
  const checkfromid = useSelector((state)=>state.user.info.id);
  const checkfromname = useSelector((state)=>state.user.info.name);
  const dispatch = useDispatch();
  const myForm = useRef(null);
  const [toNameOptions, setToNameOptions] = useState([]);

  const handleModal = () => {
    setVisible(true);
    dispatch(toNames({ role: '经理' })).then((res)=>{
      setToNameOptions(res);
    })
  }
  const handleReset = () => {
    myForm.current.resetFields();
  }
  const handleCancel = () => {
    setVisible(false);
    handleReset();
  }
  const onFinish = (values) => {
    let checktoname = values.checktoname.split('_');
    values.checktoname = checktoname[0];
    values.checktoid = Number(checktoname[1]);
    values.status = '审核中';
    values.checkfromid = checkfromid;
    values.checkfromname = checkfromname;
    setConfirmLoading(true)
    //console.log(values);
    dispatch(addCheck(values)).then((res)=>{
      if(res){
        message.success('添加申请成功')
      }
      else{
        message.error('添加申请失败')
      }
      setTimeout(() => {
        setConfirmLoading(false)
        setVisible(false)
        handleReset()
      }, 200);
    })
  }
  const data = [];
  return (
    <div className="CheckAdd">
      <Row justify="end">
        <Button onClick={handleModal} className="add-btn" type="primary" icon={<PlusCircleOutlined />}>添加申请</Button>
      </Row>
      <Table dataSource={data}>
        <Column title="申请人" dataIndex="checkfromname" key="checkfromname" />
        <Column title="请假事由" dataIndex="checktype" key="checktype" />
        <Column title="时间" dataIndex="checktime" key="checktime" />
        <Column title="备注" dataIndex="checkinfo" key="checkinfo" />
        <Column title="审批人" dataIndex="checktoname" key="checktoname" render={(text, record) => (
          <Space>
            {record.checktoname}
            { record.status === '通过' && <CheckCircleTwoTone twoToneColor="#52c41a" /> }
            { record.status === '不通过' && <CloseCircleTwoTone twoToneColor="#eb2f96" /> }
          </Space>
        )} />
        <Column title="状态" dataIndex="status" key="status" />
      </Table>

      <Modal
        title="添加申请"
        visible={visible}
        confirmLoading={confirmLoading}
        footer={null}
        onCancel={handleCancel}
        transitionName=""
      >
        <Form {...layout} ref={myForm} name="control-ref" onFinish={onFinish}>
          <Form.Item
            name="checktoname"
            label="审批人"
            rules={[
              {
                required: true,
                message: "请选择审批人"
              },
            ]}
          >
            <Select
              placeholder="请选择"
              allowClear
            > 
            {
              toNameOptions.map((v)=> <Option key={v.id} value={v.name+'_'+v.id}>{v.name}</Option>)
            }
            </Select>
          </Form.Item>
          <Form.Item
            name="checktype"
            label="请假事由"
            rules={[
              {
                required: true,
                message: "请选择请假事由"
              }
            ]}
          >
            <Select
              placeholder="请选择"
              allowClear
            >
              <Option value="事假">事假</Option>
              <Option value="年假">年假</Option>
              <Option value="加班">加班</Option>
              <Option value="调休">调休</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="checktime"
            label="时间"
            rules={[
              {
                required: true,
                message: "请选择时间"
              },
            ]}
          >
            <RangePicker showTime locale={locale} />
          </Form.Item>
          <Form.Item
            name="checkinfo"
            label="备注"
            rules={[
              {
                required: true,
                message: "请输入备注"
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Divider />
          <Row justify="end">
            <Space>
              <Button htmlType="button" onClick={ handleReset }>
                重置
              </Button>
              <Button type="primary" htmlType="submit" loading={confirmLoading}>
                确定
              </Button>
            </Space>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}
