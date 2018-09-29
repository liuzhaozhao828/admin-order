import PayOrder from './routes/PayOrder';
import AliPayOrder from './routes/AliPayOrder';
import BPOrder from './routes/BPOrder';
import ReplacePayOrder from './routes/ReplacePayOrder';
import YifubaoOrder from './routes/YifubaoOrder';
import InjectionOrder from './routes/InjectionOrder';
import MerchantAccount from './routes/MerchantAccount';
import AcquirerAccount from './routes/AcquirerAccount';
import Merchant from './routes/Merchant';
import FinanceDetail from './routes/FinanceDetail';
import UnusualOrder from './routes/UnusualOrder';
import FinanceBalance from './routes/FinanceBalance';
import FinanceSettlement from './routes/FinanceSettlement';
import UserManage from './routes/UserManage';
import InjectionChannel from './routes/InjectionChannel';
import BalanceChannel from './routes/BalanceChannel';

export const menu=[
  // {
  //   key:'order',
  //   name:"订单管理",
  //   icon:"profile",
  //   type:[0, 1],
  //   children: [{
  //     key:'payOrder',
  //     name:"支付订单",
  //   },{
  //     key:'replacePayOrder',
  //     name:"代付订单",
  //   },]
  // },
  {
    key:'payOrder',
    name:"支付订单",
    icon:"profile",
    type:[0, 1],
    children: [{
      key:'aliPayOrder',
      name:"支付宝订单明细",
    },{
      key:'bpOrder',
      name:"BP订单明细",
    }]
  },{
    key:'replacePayOrder',
    name:"代付订单",
    icon:"profile",
    type:[0, 1],
    children: [{
      key:'yifubaoOrder',
      name:"易付宝订单明细",
    },{
      key:'injectionOrder',
      name:"注资订单明细",
    }]
  },
  // {
  //   key:'account',
  //   name:"账户管理",
  //   icon:"credit-card",
  //   type:[0],
  //   children: [{
  //     key:'acquirerAccount',
  //     name:"收单账户",
  //   },{
  //     key:'merchantAccount',
  //     name:"商户账户",
  //   },]
  // },
  {
    key:'merchant',
    name:"商户管理",
    icon:"credit-card",
    type:[0],
  },{
    key:'finance',
    name:"财务管理",
    icon:"pay-circle",
    type:[0],
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
    type:[0],
    children: [{
      key:'userManage',
      name:"用户管理",
    },]
  },{
    key:'channel',
    name:"渠道管理",
    icon:"setting",
    type:[0],
    children: [{
      key:'injectionChannel',
      name:"注资渠道",
    },{
      key:'balanceChannel',
      name:"注资渠道",
    }]
  }
];

export const comps=[
  // {
  //   key: 'payOrder',
  //   comp: PayOrder,
  // },
  {
    key: 'aliPayOrder',
    comp: AliPayOrder,
  }, {
    key: 'bpOrder',
    comp: BPOrder,
  },
  // {
  //   key: 'replacePayOrder',
  //   comp: ReplacePayOrder,
  // },
  {
    key: 'yifubaoOrder',
    comp: YifubaoOrder,
  },{
    key: 'injectionOrder',
    comp: InjectionOrder,
  },
  // {
  //   key: 'acquirerAccount',
  //   comp: AcquirerAccount,
  // },{
  //   key: 'merchantAccount',
  //   comp: MerchantAccount,
  // },
  {
    key: 'merchant',
    comp: Merchant,
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
    key: 'FinanceSettlement',
    comp: FinanceSettlement,
  },{
    key: 'userManage',
    comp: UserManage,
  },{
    key: 'injectionChannel',
    comp: InjectionChannel,
  },{
    key: 'balanceChannel',
    comp: BalanceChannel,
  },
];



