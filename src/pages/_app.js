import { ThemeProvider } from 'styled-components';
import { wrapper } from '../redux/store';
import '../styles/tailwind.css';
import 'antd/dist/antd.less';

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

/** Next.js provides generic getInitialProps when using class MyApp extends App which will be picked up by wrapper,
 *  so you must not extend App as you'll be opted out of Automatic Static Optimization:
 *  https://err.sh/next.js/opt-out-auto-static-optimization. Just export a regular Functional Component as in the example above.
 */
const App = ({ Component, pageProps }) => <Component {...pageProps} />;

export default wrapper.withRedux(App);
