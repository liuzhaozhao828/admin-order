import PayOrder from './routes/PayOrder';
import ReplacePayOrder from './routes/ReplacePayOrder';
import MerchantAccount from './routes/MerchantAccount';
import AcquirerAccount from './routes/AcquirerAccount';
import FinanceDetail from './routes/FinanceDetail';
import UnusualOrder from './routes/UnusualOrder';
import FinanceBalance from './routes/FinanceBalance';
import UserManage from './routes/UserManage';

export const menu=[
  {
    key:'order',
    name:"订单管理",
    icon:"profile",
    children: [{
      key:'payOrder',
      name:"支付订单",
    },{
      key:'replacePayOrder',
      name:"代付订单",
    },]
  },{
    key:'account',
    name:"账户管理",
    icon:"credit-card",
    children: [{
      key:'acquirerAccount',
      name:"收单账户",
    },{
      key:'merchantAccount',
      name:"商户账户",
    },]
  },{
    key:'finance',
    name:"财务管理",
    icon:"pay-circle",
    children: [{
      key:'financeDetail',
      name:"收支明细",
    },{
      key:'unusualOrder',
      name:"异常订单",
    },{
      key:'financeBalance',
      name:"财务对账",
    },{
      key:'financeSettlement',
      name:"财务结算",
    },]
  },{
    key:'systemManage',
    name:"系统配置",
    icon:"setting",
    children: [{
      key:'userManage',
      name:"用户管理",
    },]
  }
];

export const comps=[
  {
    key: 'payOrder',
    comp: PayOrder,
  }, {
    key: 'replacePayOrder',
    comp: ReplacePayOrder,
  },{
    key: 'acquirerAccount',
    comp: AcquirerAccount,
  },{
    key: 'merchantAccount',
    comp: MerchantAccount,
  },{
    key: 'financeDetail',
    comp: FinanceDetail,
  },{
    key: 'unusualOrder',
    comp: UnusualOrder,
  },{
    key: 'financeBalance',
    comp: FinanceBalance,
  },{
    key: 'userManage',
    comp: UserManage,
  },
];



