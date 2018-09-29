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
  'aliPayOrder|23': [
    {
      orderId: '@id',  //订单号
      merchantId:  '@id',  // 商户号
      payTime: '@datetime',  //支付时间
      successTime: '@datetime',  //成功时间
      payType: '支付宝', // 支付方式
      aliPayName: '@cname', //支付宝名称
      aliPayAccount: '@name', //支付宝账号
      amount:'333.99',  //金额
      'orderStatus|1':['已完成', '未完成', '未付款'],  //订单状态
    }
  ],
  'bpOrder|23': [
    {
      sysOrderId: '@id',  //系统订单号
      bpOrderId: '@id',  //bp订单号
      payTime: '@datetime',  //支付时间
      successTime: '@datetime',  //成功时间
      gatherBank: '招商银行', // 收款银行
      gatherName: '张三', // 收款姓名
      amount:'333.99',  //金额
      name: '张三', //客户姓名
      bank: '招商银行', // 客户银行
      cardNo: '@id', // 客户卡号
      remark: 'aaaaa', // 客户附言
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
  'yifubaoOrder|23': [
    {
      sysOrderId: '@id',  //系统订单号
      yifubaoOrderId: '@id',  //易付宝订单号
      time: '@datetime',  //代付时间
      successTime: '@datetime',  //成功时间
      name: '@cname',  //客户姓名
      cardNo:  '@id',  // 客户卡号
      amount:'100.00',  //金额
      'orderStatus|1':['已完成', '未完成', '未付款'],  //订单状态
    }
  ],
  'injectionOrder|23': [
    {
      sysOrderId: '@id',  //系统订单号
      injectVercherId: '@id',  //重置凭证号
      merchantId:  '@id',  // 商户号
      injectTime: '@datetime',  //充值时间
      successTime: '@datetime',  //到账时间
      channel: 'abc', //充值渠道
      amount:'333.99',  //充值金额
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
      cardId:'cardId',  //允许交易
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
      investRate:'222%',  //允许交易
    }
  ],
  'merchant|23': [
    {
      merchantId: '@id',  //商户号
      merchantName: 'abc',  //商户名称
      merchantAccount: '@id',  //商户账号
      contactTel: '13422223333',  //联系方式
      openAccountTime: '@datetime',  //开户时间
      lastLoginTime: '@datetime',  //最后登录时间
      frozenAmount: '1111.00',  //冻结金额
      availableAmount: '2222.00',  //可用余额
    }
  ],
  'channel|23': [
    {
      id: '@id', //渠道Id
      channelName: '@cword(3,5)',  //渠道名
      channelType: 'abc',  //渠道类型
      channelCode: '2222',  //渠道代码
      charge: '111.22',  //手续费
      'chargeType|1': ['2','1'],  //手续费类型
      amountUpper:'222.11',  //支付金额上限
      amountFloor:'333.11',  //支付金额下限
      'status|1':['使用中','已停用'],  //使用状态
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
  'financeSettlement|23': [
    {
      merchantId: '@id',  //商户号
      date: '@datetime',  //发起时间
      availableAmount:'111.11',  //可用余额
      settleAmount:'222.11',  //结算金额
      account:'@id',  //收款账户
      'status|1': ['待结算','打款中', '已完成'],
      remark:'@cword(10,20)',  //备注
    }
  ],
  'channelList|23': [
    {
      channelName: '@cword(3,5)',  //渠道名
      channelType: '111',  //渠道类型
      channelCode: '111-2',  //渠道代码
      startTime: '@datetime',  //启用日期
      amount: '555.66',  //收款金额
      amountToday: '777.77',  //今日收款金额
      orderNum: '5',  //订单数量
      orderNumToday: '4',  //今日订单数
      charge: '11.00',  //手续费
      singleFloor: '111.00',  //单笔支付下限
      singleUpper: '333.00',  //单笔支付上限
      dayFloor: '222.00',  //每日支付下限
      dayUpper: '111.00',  //每日支付上限
      'status|1': ['使用中','已停用'],  //使用状态：  使用中，已停用
      bindMerchantNum: '@integer(0,10)',  //绑定商户数
      merchant: [
        {
          merchantId:  '@id',  //商户号
          merchantName:  '@cword(3,5)',  //商户名称
        },{
          merchantId:  '@id',  //商户号
          merchantName:  '@cword(3,5)',  //商户名称
        }
      ],
    }
  ],
})

export default {
  //订单管理
  'POST /admin/order/payOrder': (req, res)=> {
    let {pageNum = 1, pageSize = 10} = req.body;
    pageNum *= 1;
    pageSize *= 1;
    let data = all.payOrder;
    const list = data.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    res.json({code: '000000', msg: "success", data: {total: data.length, pageNum, pageSize, list}})
  },
  'POST /admin/order/aliPayOrder': (req, res)=> {
    let {pageNum = 1, pageSize = 10} = req.body;
    pageNum *= 1;
    pageSize *= 1;
    let data = all.aliPayOrder;
    const list = data.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    res.json({code: '000000', msg: "success", data: {total: data.length, pageNum, pageSize, list}})
  },
  'POST /admin/order/bpOrder': (req, res)=> {
    let {pageNum = 1, pageSize = 10} = req.body;
    pageNum *= 1;
    pageSize *= 1;
    let data = all.bpOrder;
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
  'POST /admin/order/yifubaoOrder': (req, res)=> {
    let {pageNum = 1, pageSize = 10} = req.body;
    pageNum *= 1;
    pageSize *= 1;
    let data = all.yifubaoOrder;
    const list = data.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    res.json({code: '000000', msg: "success", data: {total: data.length, pageNum, pageSize, list}})
  },
  'POST /admin/order/injectionOrder': (req, res)=> {
    let {pageNum = 1, pageSize = 10} = req.body;
    pageNum *= 1;
    pageSize *= 1;
    let data = all.injectionOrder;
    const list = data.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    res.json({code: '000000', msg: "success", data: {total: data.length, pageNum, pageSize, list}})
  },

  //账户管理
  'POST /admin/account/acquirerAccount/getList': (req, res)=> {
    let {pageNum = 1, pageSize = 10} = req.body;
    pageNum *= 1;
    pageSize *= 1;
    let data = all.acquirerAccount;
    const list = data.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    res.json({code: '000000', msg: "success", data: {total: data.length, pageNum, pageSize, list}})
  },
  'POST /admin/account/acquirerAccount/setLimit': (req, res)=> {
    res.json({code: '000000', msg: "success"})
  },
  'POST /admin/account/merchantAccount/getList': (req, res)=> {
    let {pageNum = 1, pageSize = 10} = req.body;
    pageNum *= 1;
    pageSize *= 1;
    let data = all.merchantAccount;
    const list = data.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    res.json({code: '000000', msg: "success", data: {total: data.length, pageNum, pageSize, list}})
  },
  'POST /admin/account/acquirerAccount/merchantInvest': (req, res)=> {
    res.json({code: '000000', msg: "success"})
  },
  'POST /admin/account/acquirerAccount/merchantSetting': (req, res)=> {
    res.json({code: '000000', msg: "success"})
  },

  //商户管理
  'POST /admin/merchant/getList': (req, res)=> {
    let {pageNum = 1, pageSize = 10} = req.body;
    pageNum *= 1;
    pageSize *= 1;
    let data = [{
      merchantId: '1234567',  //商户号
      merchantName: '测试商户号',  //商户名称
      merchantAccount: '122222',  //商户账号
      contactTel: '13422223333',  //联系方式
      openAccountTime: '2015-12-12 11:11:11',  //开户时间
      lastLoginTime: '2015-12-12 11:11:11',  //最后登录时间
      frozenAmount: '1111.00',  //冻结金额
      availableAmount: '2222.00',  //可用余额
    }, ...all.merchant];
    const list = data.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    res.json({code: '000000', msg: "success", data: {total: data.length, pageNum, pageSize, list}})
  },
  'POST /admin/merchant/resetPassword': (req, res)=> {
    res.json({
      code: '000000',
      msg: "success",
      data: {
        newPassword: '111222',
      }})
  },
  'POST /admin/merchant/add': (req, res)=> {
    res.json({
      code: '000000',
      msg: "success",
      data: {
        newPassword: '111222',
      }})
  },
  'POST /admin/merchant/merchantInvest': (req, res)=> {
    res.json({
      code: '000000',
      msg: "success",
      data: {
        newPassword: '111222',
      }})
  },
  'POST /admin/merchant/channel/getList': (req, res)=> {
    let data = all.channel;
    if(req.body.type==='balance')
    {
      data=data.slice(0,6)
    }
    res.json({code: '000000', msg: "success", data})
  },
  'POST /admin/merchant/channel/stop': (req, res)=> {
    res.json({
      code: '000000',
      msg: "success",
    })
  },
  'POST /admin/merchant/channel/edit': (req, res)=> {
    res.json({
      code: '000000',
      msg: "success",
    })
  },
  'POST /admin/merchant/channel/bind': (req, res)=> {
    res.json({
      code: '000000',
      msg: "success",
    })
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
  'POST /admin/finance/financeDetail/manual': (req, res)=> {
    res.json({code: '000000', msg: "success"})
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
  'POST /admin/finance/financeSettlement/getList': (req, res)=> {
    let {pageNum = 1, pageSize = 10} = req.body;
    pageNum *= 1;
    pageSize *= 1;
    let data = all.financeSettlement;
    const list = data.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    res.json({code: '000000', msg: "success", data: {total: data.length, pageNum, pageSize, list}})
  },
  'POST /admin/finance/financeSettlement/getAvailableAmount': (req, res)=> {
    res.json({code: '000000', msg: "success", data: {amount: '15000.00'}})
  },
  'POST /admin/finance/financeSettlement/startSettle': (req, res)=> {
    res.json({code: '000000', msg: "success"})
  },
  'POST /admin/channel/getList': (req, res)=> {
    let data = all.channelList;
    res.json({
      code: '000000',
      msg: "success",
      data:{
        'injection': [{
          channelName: '测试渠道名',  //渠道名
          channelType: '111',  //渠道类型
          channelCode: '111-2',  //渠道代码
          startTime: '2015-12-12 11:11:11',  //启用日期
          amount: '555.66',  //收款金额
          amountToday: '777.77',  //今日收款金额
          orderNum: '5',  //订单数量
          orderNumToday: '4',  //今日订单数
          charge: '11.00',  //手续费
          singleFloor: '111.00',  //单笔支付下限
          singleUpper: '333.00',  //单笔支付上限
          dayFloor: '222.00',  //每日支付下限
          dayUpper: '111.00',  //每日支付上限
          'status': '使用中',  //使用状态：  使用中，已停用
          bindMerchantNum: '5',  //绑定商户数
          merchant: [
            {
              merchantId:  '1',  //商户号
              merchantName:  'abc',  //商户名称
            },{
              merchantId:  '1234567',  //商户号
              merchantName:  '测试商户号',  //商户名称
            }, {
              merchantId:  '2',  //商户号
              merchantName:  'ddd',  //商户名称
            }
          ],
        }, ...data],
        'balance': data.slice(0, 5)
      }
    })
  },
  'POST /admin/channel/action': (req, res)=> {
    res.json({
      code: '000000',
      msg: "success",
    })
  },
};



