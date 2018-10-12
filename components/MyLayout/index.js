import { Component } from 'react';
import { Layout, Menu, Input, Row, Col, Dropdown, Icon } from 'antd';
import './index.less'

const { Header, Footer, Sider, Content } = Layout;
const Search = Input.Search;

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">我的主页</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">我的收藏</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">退出</a>
    </Menu.Item>
  </Menu>
);

const MyLayout = (props) => {
  return (
    <Layout>
      <Header style={{ background: '#fff', position: 'fixed', zIndex: 1, width: '100%' }}>
        <Row gutter={16} type='flex'>
          <Col><div className="logo" /></Col>
          <Col>
            <Menu
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">精选</Menu.Item>
              <Menu.Item key="2">首页</Menu.Item>
              <Menu.Item key="3">分类</Menu.Item>
            </Menu>
          </Col>
          <Col>
            <Search placeholder="搜索"
              onSearch={value => console.log(value)}
              style={{ width: 200 }} />
          </Col>
          <Col offset={2}>
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" href="#">
                个人中心 <Icon type="down" />
              </a>
            </Dropdown>
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: '32px 50px', marginTop: 64 }}>
        <div style={{ padding: 24, background: '#fff', minHeight: 720 }}>
          {props.content}
        </div>
      </Content>
      <Footer style={{ textAlign: 'right' }}>ngcly.cn©2018</Footer>
    </Layout>
  )
}
export default MyLayout