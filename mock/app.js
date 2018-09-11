/**
 * Created by zhangbohan on 17/3/21.
 */
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
        }
      }	))
  },
    'POST /admin/common/logout'  (req, res) {
      res.json( Mock.mock({
        "code": "000000",
        "msg": "success",
      }	))
  }
};



