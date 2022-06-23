import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import { useDispatch } from 'react-redux';
import { login } from '../../store/modules/user';

export default function Login() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Success:', values);
    dispatch(login(values)).then((isLogin)=>{
      if(isLogin){
        message.success('登录成功');
        navigate('/home/index');
      }
      else{
        message.error('用户名或密码错误');
      }
    });
    

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Form
        className="Login"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        validateTrigger="onBlur"
      >
        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            {
              required: true,
              message: '请输入您的邮箱!',
            },
            {
              type: 'email',
              message: '请输入正确的邮箱格式!'
            }
          ]}
        >
          <Input placeholder="请输入您的邮箱" />
        </Form.Item>

        <Form.Item
          label="密码"
          name="pass"
          rules={[
            {
              required: true,
              message: '请输入您的密码!',
            },
          ]}
        >
          <Input.Password placeholder="请输入您的密码" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
