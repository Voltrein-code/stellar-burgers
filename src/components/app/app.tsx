import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { BrowserRouter } from 'react-router-dom';
import MainContent from '../main-content/main-content';
import { Provider } from 'react-redux';
import store from '../../services/store';

const App = () => (
  <Provider store={store}>
    <div className={styles.app}>
      <AppHeader />
      <MainContent />
    </div>
  </Provider>
);

export default App;
