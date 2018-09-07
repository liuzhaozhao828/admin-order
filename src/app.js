import React from 'react';
import { connect } from 'dva';
import {Route, Redirect, Switch, Link, routerRedux } from 'dva/router';
import { Layout, Menu, Icon, Row, Col, Popconfirm, LocaleProvider } from 'antd';
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
    const {activeKey, login=false} = this.props
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
              <Menu className="header-menu" mode="horizontal" style={{
                float: 'right',
                lineHeight: '64px',
                height: '65px',
                boxSizing: 'border-box',
                marginRight: '10px',
                backgroundColor:'transparent',
              }}>
                <SubMenu title={< span > 欢迎 test <Icon type="caret-down" /></span>}
                >
                  <Menu.Item key="logout">
                    <Popconfirm placement="bottomRight" title="确定要退出登录?" okText="确定" cancelText="取消" onConfirm={()=>{
                      window.location.href='http://jmis.jd.com/remote/loginOut.htm?LT=erp&AC=KFALL&callback=http://'+window.location.hostname
                    }}>
                      <a>注销</a>
                    </Popconfirm>
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
              <Menu theme="dark" mode="inline" selectedKeys={[activeKey]}>
                {
                  menu.map(({key,name,icon,children=[]})=>{
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
