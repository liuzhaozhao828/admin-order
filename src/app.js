import React from 'react';
import { connect } from 'dva';
import {Route, Redirect, Switch, Link, routerRedux } from 'dva/router';
import { Layout, Menu, Icon, Popconfirm, LocaleProvider } from 'antd';
import { menu, comps } from './menu';
import styles from './index.less';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu

class App extends React.Component {
  state = {
    collapsed: false,
  };

  componentDidMount(){
    const {login, dispatch} = this.props
    if(!login){
      dispatch(routerRedux.push(`/login`))
    }

  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };


  render() {
    const {activeKey, login=false, userName, userType='0',  dispatch } = this.props
    if(!login){
      return null
    }
    return (
      <LocaleProvider locale={zh_CN}>
        <Layout className={styles.layout}>
          <Header className={styles.header}>
              <div className={styles.logo}>
                管理后台
              </div>
              {/*<Col span={2}>*/}
                {/*<Icon*/}
                {/*className={styles.trigger}*/}
                {/*type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}*/}
                {/*onClick={this.toggle}*/}
                {/*/>*/}
              {/*</Col>*/}
              {/*<div style={{*/}
                {/*float: 'right',*/}
                {/*lineHeight: '64px',*/}
                {/*height: '65px',*/}
                {/*boxSizing: 'border-box',*/}
                {/*marginRight: '20px',*/}
                {/*backgroundColor:'transparent',*/}
                {/*fontSize: '14px',*/}
                {/*color: '#999999'*/}
              {/*}}>*/}
                {/*< span > 欢迎*/}
                  {/*<span style={{color: '#1890ff', marginLeft: '10px'}}>{userName}</span>*/}
                  {/*<Popconfirm placement="bottomRight" title="确定要退出登录?" okText="确定" cancelText="取消" onConfirm={()=>{*/}
                    {/*dispatch({*/}
                      {/*type: 'app/logout',*/}
                    {/*})*/}
                  {/*}}>*/}
                       {/*<Icon type="logout" theme="outlined" className={styles["logout-icon"]}/>*/}
                    {/*</Popconfirm>*/}
                {/*</span>*/}
              {/*</div>*/}
              <Menu mode="horizontal" style={{
                float: 'right',
                lineHeight: '64px',
                height: '65px',
                boxSizing: 'border-box',
                marginRight: '10px',
                backgroundColor:'transparent',
                color: '#999999'
              }}>
                <SubMenu title={< span > 欢迎 <span style={{color: '#1890ff', marginLeft: '10px'}}>{userName}</span> <Icon type="caret-down" /></span>}
                          className={`header-sub-menu`}
                >
                  <Menu.Item key="logout">
                    <Popconfirm placement="bottomRight" title="确定要退出登录?" okText="确定" cancelText="取消" onConfirm={()=>{
                      dispatch({
                        type: 'app/logout',
                      })
                    }}>
                      <a>注销</a>
                    </Popconfirm>
                  </Menu.Item>
                  <Menu.Item key="edit">
                      <a onClick={()=>{
                        dispatch(routerRedux.push('./changePassword'))
                      }}>修改密码</a>
                  </Menu.Item>
                </SubMenu>
              </Menu>

          </Header>
          <Layout>
            <Sider
              // trigger={null}
              // collapsible
              // collapsed={this.state.collapsed}
            >
              <div className={styles["menu-text"]}>
                主导航
              </div>
              <Menu theme="dark" mode="inline" selectedKeys={[activeKey]} defaultOpenKeys={['payOrder']}>
                {
                  menu.map(({key,name,icon,type=[],children=[]})=>{
                    if(!type.includes(userType)){
                      return null
                    }
                    if(children.length>0){
                      return(
                        <SubMenu key={key} title={<span><Icon type={icon}/>{name}</span>}>
                          {
                            children.map(({key,name})=>{
                              return <Menu.Item key={key}>
                                <Link to={`/${key}`}>
                                  <span>{name}</span>
                                </Link>
                              </Menu.Item>
                            })
                          }
                        </SubMenu>
                      )
                    }else {
                      return(
                        <Menu.Item key={key}>
                          <Link to={`/${key}`}>
                            <Icon type={icon} />
                            <span>{name}</span>
                          </Link>
                        </Menu.Item>
                      )
                    }

                  })
                }
              </Menu>
            </Sider>
            <Content className={styles.content}>
                <Switch>
                  {
                    comps.map(({key, comp})=><Route path={`/${key}`} component={comp} key={key}/>)
                  }
                  <Redirect to={`/${comps[0].key}`} />
                </Switch>
            </Content>
          </Layout>
        </Layout>
      </LocaleProvider>
    );
  }

}

App.propTypes = {
};


export default connect((state)=>{
  return{
    ...state.app
  }
})(App);
