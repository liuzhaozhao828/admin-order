import Mock from 'mockjs';


export default {
    'POST /admin/common/getUserInfo'  (req, res) {
      res.json( Mock.mock({
        "code": "000000",
        "msg": "success",
        data: {
          "login": true,
          "userName": 'zz',
          "nickName": 'zz',
          "userType": 0,
        }
      }	))
    },
    'POST /admin/common/login'  (req, res) {
      const { userName='test' } = req.body
      res.json( Mock.mock({
        "code": "000000",
        "msg": "success",
        data: {
          "login": true,
          "userName": userName,
          "nickName": 'zz',
          "userType": req.body.userType,
        }
      }	))
  },
    'POST /admin/common/logout'  (req, res) {
      res.json( Mock.mock({
        "code": "000000",
        "msg": "success",
      }	))
  },
    'POST /admin/common/changePassword'  (req, res) {
      res.json( Mock.mock({
        "code": "000000",
        "msg": "success",
      }	))
  }
};



