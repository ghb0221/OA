import React, { Suspense } from 'react'
import { Layout, Menu, Breadcrumb, Dropdown, Space, Spin } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import _ from 'lodash'
import './Index.scss';
import { clearUser } from '../../store/modules/user';
import permissionList from '../../utils/permission'
const { Header, Content, Sider } = Layout;

export default function Index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const role = useSelector((state) => state.user.info.role);
  const pathname = location.pathname;
  const match = pathname.match(/^\/[a-z]+/);
  const prevPathname = match && match[0];
  
  let items = _.cloneDeep(permissionList).filter((v)=>{
    v.children = v.children && v.children.filter((v)=>{
      return v.auths.includes(role);
    }) 
    return v.auths.includes(role);
  });
 
  let nowItem = items.find((v)=> v.key === prevPathname);
  let title1 = nowItem && nowItem.title;
  let title2 = nowItem && nowItem.children.find((v)=> v.key === pathname).title;
  
  const info = useSelector((state) => state.user.info); 
  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/login');
  } 
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: ( 
            <span>修改密码</span> 
          ),
        },
        {
          key: '2',
          label: (
            <span onClick={handleLogout}>退出登录</span>
          ),
        },
      ]}
    />
  );

  
  return (
    <>
      <Layout className="Index">
        <Header className="header">
          <h1 className="logo">OA管理系统</h1>
          <Dropdown className="user" overlay={menu}>
            <Space>
              <div>{info.role}：{info.name}</div>
              <DownOutlined />
            </Space>
          </Dropdown>
          
        </Header>
        <Layout>
          <Sider width={200} className="sider">
            <Menu
              mode="inline"
              defaultSelectedKeys={[pathname]}
              defaultOpenKeys={[prevPathname]}
              style={{
                height: '100%',
                borderRight: 0,
              }}
              items={items}
            />
          </Sider>
          <Layout
            style={{
              padding: '0 24px 24px',
            }}
          >
            <Breadcrumb
              style={{
                margin: '16px 0',
              }}
            >
              <Breadcrumb.Item>{title1}</Breadcrumb.Item>
              <Breadcrumb.Item>{title2}</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="content"
            >
              {
                nowItem 
                ?
                <Suspense fallback={ <Spin className="spin" /> }>
                  <Outlet />
                </Suspense>
                :
                <div>403</div>
              }
              
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  )
}
