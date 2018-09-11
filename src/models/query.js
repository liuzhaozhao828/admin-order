import { routerRedux } from 'dva/router'

export default {

  namespace: 'query',

  state: {

  },


  effects: {
    *toDetail({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' ,payload});
      yield put(routerRedux.push('/financeDetail'));
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
