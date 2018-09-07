import * as appServices from '../services/app'
import {menu, comps} from '../menu';

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

  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
