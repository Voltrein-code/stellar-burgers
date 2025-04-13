import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import MainContent from '../main-content/main-content';
import { Provider } from 'react-redux';
import store from '../../services/store';
import { BrowserRouter } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <div className={styles.app}>
        <AppHeader />
        <MainContent />
      </div>
    </Provider>
  </BrowserRouter>
);

export default App;
