import Mock from 'mockjs';



let all = Mock.mock({
  'payOrder|23': [
    {
      orderId: '@id',  //订单号
      merchantId:  '@id',  // 商户号
      orderBeginDate: '@datetime',  //交易发起时间
      orderEndDate: '@datetime',  //交易完成时间
      'payType|1': ['支付宝', '快捷', '网银'], // 支付方式
      name: '@cname', //姓名
      cardId:'@id',  //卡号
      amount:'100.00',  //金额
      'orderStatus|1':['已完成', '未完成', '未付款'],  //订单状态
    }
  ],
  'replacePayOrder|23': [
    {
      orderId: '@id',  //订单号
      merchantId:  '@id',  // 商户号
      orderBeginDate: '@datetime',  //交易发起时间
      orderEndDate: '@datetime',  //交易完成时间
      channel: '@cword(3,5)',  //交易完成时间
      amount:'100.00',  //金额
      'orderStatus|1':['已完成', '未完成', '未付款'],  //订单状态
    }
  ],
  'acquirerAccount|23': [
    {
      accountId: '@id',  //账户号
      accountType: '银行卡',  //账户类型
      'status|1':['正常', '不正常'],
      changeTime: '@datetime',  //变动时间
      leftAmount:'333.99',  //可用余额
      freezeAmount:'111.99',  //冻结余额
      limitAmount:'222.99',  //限额
      permitTransaction:'abc',  //允许交易
    }
  ],
  'merchantAccount|23': [
    {
      accountId: '@id',  //账户号
      merchantId: '@id',  //商户号
      'status|1':['正常', '不正常'],
      changeTime: '@datetime',  //变动时间
      leftAmount:'333.99',  //可用余额
      freezeAmount:'111.99',  //冻结余额
      permitTransaction:'abc',  //允许交易
    }
  ],
  'userManage|23': [
    {
      userId: '@id',    //用户的唯一标识
      userName: '@name',  //账号
      nickName: '@name',  //账号
      'role|1': ['system','customer','business','merchant'],  //账号
      signInTime: '@datetime',  //注册时间
      recentLoginTime:'@datetime',  //最后登录时间
      'status|1':['正常', '不正常'],  //状态
    }
  ],
  'optionRecords|23': [
    {
      optTime: '@datetime',    //操作时间
      optContent: '@cword(30,50)',  //操作内容
    }
  ],
  'financeDetail|23': [
    {
      orderId: '@id',  //订单号
      accountId: '@id',  //账户号
      tradeTime: '@datetime',  //交易时间
      'payType|1':['收入', '支出', '冻结解冻'],
      'tradeType|1':['收单入账', '结算出款', '调账转入', '调账转出', '余额冻结', '余额解冻'],
      beforePayAmount:'333.99',  //支付前余额
      payAmount:'111.11',  //支付金额
      afterPayAmount:'222.88',  //支付后余额
      remark:'@cword(10,20)',  //备注
    }
  ],
  'unusualOrder|23': [
    {
      orderId: '@id',  //订单号
      merchantId: '@id',  //商户号
      tradeTime: '@datetime',  //交易时间
      amount:'111.11',  //金额
      'tradeType|1':['收单入账', '结算出款', '调账转入', '调账转出', '余额冻结', '余额解冻'],
      'unusualType|1':['上游异常', '下游异常', '系统异常', '申请退款'],
      upperStatus: '正常',  //上游状态
      lowerStatus: '异常',  //下游状态
      'dealResult|1': ['已处理','待处理'],  //处理结果
      'dealResultId|1': ['done','wait'],  //处理结果
    }
  ],
  'financeBalance|23': [
    {
      accountId: '@id',  //账户号
      merchantId: '@id',  //商户号
      billDate: '@datetime',  //账单日
      totalIncome:'111.11',  //总收入
      totalExpend:'222.11',  //总支出
      startAmount:'333.11',  //期初余额
      endAmount:'444.11',  //期末余额
    }
  ],
})

export default {
  'POST /admin/order/payOrder': (req, res)=> {
    let {pageNum = 1, pageSize = 10} = req.body;
    pageNum *= 1;
    pageSize *= 1;
    let data = all.payOrder;
    const list = data.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    res.json({code: '000000', msg: "success", data: {total: data.length, pageNum, pageSize, list}})
  },
  'POST /admin/order/replacePayOrder': (req, res)=> {
    let {pageNum = 1, pageSize = 10} = req.body;
    pageNum *= 1;
    pageSize *= 1;
    let data = all.replacePayOrder;
    const list = data.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    res.json({code: '000000', msg: "success", data: {total: data.length, pageNum, pageSize, list}})
  },
  'POST /admin/account/acquirerAccount': (req, res)=> {
    let {pageNum = 1, pageSize = 10} = req.body;
    pageNum *= 1;
    pageSize *= 1;
    let data = all.acquirerAccount;
    const list = data.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    res.json({code: '000000', msg: "success", data: {total: data.length, pageNum, pageSize, list}})
  },
  'POST /admin/account/merchantAccount': (req, res)=> {
    let {pageNum = 1, pageSize = 10} = req.body;
    pageNum *= 1;
    pageSize *= 1;
    let data = all.merchantAccount;
    const list = data.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    res.json({code: '000000', msg: "success", data: {total: data.length, pageNum, pageSize, list}})
  },

  //用户管理
  'POST /admin/systemManage/userManage/getList': (req, res)=> {
    let {pageNum = 1, pageSize = 10} = req.body;
    pageNum *= 1;
    pageSize *= 1;
    let data = all.userManage;
    const list = data.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    res.json({code: '000000', msg: "success", data: {total: data.length, pageNum, pageSize, list}})
  },
  'POST /admin/systemManage/userManage/addAndEdit': (req, res)=> {
    res.json({code: '000000', msg: "success"})
  },
  'POST /admin/systemManage/userManage/optionRecords': (req, res)=> {
    let {pageNum = 1, pageSize = 10} = req.body;
    pageNum *= 1;
    pageSize *= 1;
    let data = all.optionRecords;
    const list = data.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    res.json({code: '000000', msg: "success", data: {total: data.length, pageNum, pageSize, list}})
  },
  'POST /admin/systemManage/userManage/resetPassword': (req, res)=> {
    res.json({code: '000000', msg: "success"})
  },
  'POST /admin/systemManage/userManage/freezeUser': (req, res)=> {
    res.json({code: '000000', msg: "success"})
  },


  //财务管理
  'POST /admin/finance/financeDetail/getList': (req, res)=> {
    let {pageNum = 1, pageSize = 10} = req.body;
    pageNum *= 1;
    pageSize *= 1;
    let data = all.financeDetail;
    const list = data.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    res.json({code: '000000', msg: "success", data: {total: data.length, pageNum, pageSize, list}})
  },
  'POST /admin/finance/unusualOrder/getList': (req, res)=> {
    let {pageNum = 1, pageSize = 10} = req.body;
    pageNum *= 1;
    pageSize *= 1;
    let data = all.unusualOrder;
    const list = data.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    res.json({code: '000000', msg: "success", data: {total: data.length, pageNum, pageSize, list}})
  },
  'POST /admin/finance/unusualOrder/markDone': (req, res)=> {
    res.json({code: '000000', msg: "success"})
  },
  'POST /admin/finance/financeBalance/getList': (req, res)=> {
    let {pageNum = 1, pageSize = 10} = req.body;
    pageNum *= 1;
    pageSize *= 1;
    let data = all.financeBalance;
    const list = data.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    res.json({code: '000000', msg: "success", data: {total: data.length, pageNum, pageSize, list}})
  },
};



