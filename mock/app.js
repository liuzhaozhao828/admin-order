/**
 * Created by zhangbohan on 17/3/21.
 */
import Mock from 'mockjs';


export default {
    'POST /auth/erp'  (req, res) {
      res.json( Mock.mock({
        "code": "000000",
        "msg": "success",
        "login": true,
        "userName": 'zz'
      }	))
  }
};



