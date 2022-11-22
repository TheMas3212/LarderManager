import DarkModeSwitch from './components/DarkModeSwitch';
import styles from './app.module.scss';

export const App = () => {

  return (
    <div className={styles.content}>
      <DarkModeSwitch />
      Some Starter Content
    </div>
  );
};

export default App;
