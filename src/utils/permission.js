import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined
} from "@ant-design/icons"
import { Link } from 'react-router-dom'

let permissionList = [
  {
    key: '/home',
    icon: <UserOutlined />,
    title: 'OA系统',
    label: 'OA系统',
    auths: ['管理员', '经理', '员工'],
    children: [
      {
        key: '/home/index',
        title: '后台首页',
        label: <Link to="/home/index">后台首页</Link>,
        auths: ['管理员', '经理', '员工']
      }
    ]
  },
  {
    key: '/user',
    icon: <LaptopOutlined />,
    title: '用户管理',
    label: '用户管理',
    auths: ['管理员'],
    children: [
      {
        key: '/user/list',
        title: '用户列表',
        label: <Link to="/user/list">用户列表</Link>,
        auths: ['管理员']
      }
    ]
  },
  {
    key: '/check',
    icon: <NotificationOutlined />,
    title: '考勤管理',
    label: '考勤管理',
    auths: ['经理', '员工'],
    children: [
      {
        key: '/check/list',
        title: '我的考勤',
        label: <Link to="/check/list">我的考勤</Link>,
        auths: ['经理', '员工']
      },
      {
        key: '/check/apply',
        title: '我的审批',
        label: <Link to="/check/apply">我的审批</Link>,
        auths: ['经理']
      },
      {
        key: '/check/add',
        title: '请假加班',
        label: <Link to="/check/add">请假加班</Link>,
        auths: ['员工']
      }
    ]
  }
];

export default permissionList;