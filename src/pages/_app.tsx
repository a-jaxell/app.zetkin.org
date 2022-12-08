import '../styles.css';

import { AppProps } from 'next/app';
import createStore from 'core/store';
import CssBaseline from '@material-ui/core/CssBaseline';
import DateUtils from '@date-io/dayjs';
import dayjs from 'dayjs';
import { Hydrate } from 'react-query/hydration';
import { IntlProvider } from 'react-intl';
import isoWeek from 'dayjs/plugin/isoWeek';
import { LicenseInfo } from '@mui/x-data-grid-pro';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import NProgress from 'nprogress';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider as ReduxProvider } from 'react-redux';
import Router from 'next/router';
import { ThemeProvider } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import BrowserApiClient from 'core/api/client/BrowserApiClient';
import Environment from 'core/env/Environment';
import { EnvProvider } from 'core/env/EnvContext';
import { LocalTimeToJsonPlugin } from '../utils/dateUtils';
import { PageWithLayout } from '../utils/types';
import theme from '../theme';
import { UserContext } from 'utils/hooks/useFocusDate';
import { ZUIConfirmDialogProvider } from 'zui/ZUIConfirmDialogProvider';
import { ZUISnackbarProvider } from 'zui/ZUISnackbarContext';

dayjs.extend(LocalTimeToJsonPlugin);
dayjs.extend(isoWeek);

// MUI-X license
if (process.env.NEXT_PUBLIC_MUIX_LICENSE_KEY) {
  LicenseInfo.setLicenseKey(process.env.NEXT_PUBLIC_MUIX_LICENSE_KEY);
}

// Progress bar
NProgress.configure({ showSpinner: false });
Router.events.on(
  'routeChangeStart',
  (url, { shallow }) => !shallow && NProgress.start()
);
Router.events.on(
  'routeChangeComplete',
  (url, { shallow }) => !shallow && NProgress.done()
);
Router.events.on(
  'routeChangeError',
  (url, { shallow }) => !shallow && NProgress.done()
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

declare global {
  interface Window {
    __reactRendered: boolean;
  }
}

const store = createStore();

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { dehydratedState, lang, messages, ...restProps } = pageProps;
  const c = Component as PageWithLayout;
  const getLayout = c.getLayout || ((page) => <>{page}</>);

  if (typeof window !== 'undefined') {
    window.__reactRendered = true;
  }

  const env = new Environment(store, new BrowserApiClient());

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <ReduxProvider store={store}>
      <EnvProvider env={env}>
        <UserContext.Provider value={pageProps.user}>
          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider libInstance={dayjs} utils={DateUtils}>
              <IntlProvider
                defaultLocale="en"
                locale={lang}
                messages={messages}
              >
                <QueryClientProvider client={queryClient}>
                  <ZUISnackbarProvider>
                    <ZUIConfirmDialogProvider>
                      <Hydrate state={dehydratedState}>
                        <CssBaseline />
                        {getLayout(<Component {...restProps} />, restProps)}
                      </Hydrate>
                    </ZUIConfirmDialogProvider>
                  </ZUISnackbarProvider>
                  <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
              </IntlProvider>
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </UserContext.Provider>
      </EnvProvider>
    </ReduxProvider>
  );
}

export default MyApp;
