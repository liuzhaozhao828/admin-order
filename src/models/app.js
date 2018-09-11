import {comps} from '../menu';
import {routerRedux} from "dva/router";
import { logout } from '../services/app';

export default {

  namespace: 'app',

  state: {
    activeKey:'',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      const keyNames = comps.map(({key})=>key)
      const regular = new RegExp(`^\\/(${keyNames.join('|')})`,)
      return history.listen(({pathname, state}) => {
        let activeKey =  regular.exec(pathname);
        if(activeKey){
          activeKey = activeKey[0].substr(1);
        }
        else {
          activeKey = '';
        }
        dispatch({
          type:'save',
          payload:{
            activeKey
          }
        })
      });
    },
  },

  effects: {
    *logout({ payload }, { call, put }) {  // eslint-disable-line
      const {data:{code}} = yield call(logout);
      if(code==='000000'){
        yield put({
          type: 'save' ,
          payload:{
            login: false,
            userName: '',
            nickName: ''
          }
        });
        yield put(routerRedux.push('/login'));
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
