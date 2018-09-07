import * as appServices from '../services/app'
import moment from 'moment';

export default {

  namespace: 'query',

  state: {

  },


  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const data = yield call(appServices.query,{payload})
      yield put({ type: 'save' ,payload:{data}});
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
