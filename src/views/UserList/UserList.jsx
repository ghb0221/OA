import React, { useState, useRef } from 'react'
import { Button, Row, Table, Modal, Form, Input, Select, Space, Divider, message, Popconfirm } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { addUsers, removeUsers } from '../../store/modules/users'
import { useDispatch, useSelector } from 'react-redux'
import './UserList.scss'
import { listUsers } from '../../store/modules/users'
const { Option } = Select;
const { Column } = Table;
const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 22,
  }
};

export default function UserList() {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const myForm = useRef(null);
  const dispatch = useDispatch();
  const dataSource = useSelector((state)=> state.users.users);
  
  const handleCancel = () => {
    handleReset();
    setVisible(false);
  };

  const handleModal = () => {
    setVisible(true);
  };

  const handleReset = () => {
    myForm.current.resetFields();
  };

  const onFinish = (values) => {
    setConfirmLoading(true);
    values.pass = values.email.split('@')[0];
    values.token = `shdfjskldfhqwweasjkfd-${values.email}`;
    dispatch(addUsers(values)).then((res)=>{
      if(res){
        message.success('添加职位成功');
        dispatch(listUsers());
      }
      else{
        message.success('添加职位失败');
      }
      setTimeout(()=>{
        setConfirmLoading(false);
        setVisible(false);
        handleReset();
      }, 200)
    })
  }

  const confirm = (id) => {
    return () => {
      dispatch(removeUsers(id)).then((res)=>{
        if(res){
          message.success('删除用户成功');
          dispatch(listUsers());
        }
        else{
          message.error('删除用户失败');
        }
      })
    }
  };

  const cancel = () => {};

  return (
    <div className="UserList">
      <Row justify="end">
        <Button onClick={handleModal} className="add-btn" type="primary" icon={<PlusCircleOutlined />}>添加用户</Button>
      </Row>
      <Table dataSource={dataSource} pagination={ {defaultPageSize: 3} }>
        <Column title="用户名" dataIndex="name" key="name" />
        <Column title="邮箱" dataIndex="email" key="email" />
        <Column title="职位" dataIndex="role" key="role" />
        <Column title="操作" dataIndex="handle" key="handle" render={(_, record) => (
          <Space size="middle">
            {
              record.role === '管理员' 
              ?
              <>
                <Button type="primary" disabled>编辑</Button>
                <Button type="primary" danger disabled>删除</Button>
              </>
              :
              <>
                <Button type="primary">编辑</Button>
                <Popconfirm
                  title="确定要删除吗?"
                  onConfirm={confirm(record.id)}
                  onCancel={cancel}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button type="primary" danger>删除</Button>
                </Popconfirm>
              </>
            }
          </Space>
        )} />
      </Table>
      <Modal
        title="添加用户"
        visible={visible}
        confirmLoading={confirmLoading}
        footer={null}
        onCancel={handleCancel}
        transitionName=""
      >
        <Form {...layout} ref={myForm} name="control-ref" onFinish={onFinish} validateTrigger="onBlur">
          <Form.Item
            name="name"
            label="用户名"
            rules={[
              {
                required: true,
                message: "请输入用户名"
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              {
                required: true,
                message: "请输入邮箱"
              },
              {
                type: "email",
                message: "请输入正确格式的邮箱"
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="职位"
            rules={[
              {
                required: true,
                message: "请输入职位"
              },
            ]}
          >
            <Select
              placeholder="请输入职位"
              allowClear
            >
              <Option value="经理">经理</Option>
              <Option value="员工">员工</Option>
            </Select>
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
