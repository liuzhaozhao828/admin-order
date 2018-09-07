import dva from 'dva';
import './index.less';
import { userInfo } from './services/app';


userInfo().then(({data: {login, userName}})=>{
  // 1. Initialize
  const app = dva({
    initialState:{
      app:{
        login,
        userName
      }
    }
  });

  // 2. Plugins
  // app.use({});

  // 3. Model
  app.model(require('./models/app').default);
  app.model(require('./models/query').default);

  // 4. Router
  app.router(require('./router').default);

  // 5. Start
  app.start('#root');


}).catch((err) => console.log('rejected', err))


