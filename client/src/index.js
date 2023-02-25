import React ,{Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router'
import { Provider } from 'react-redux';
import { store } from './redux/store'
import { SnackbarProvider } from 'notistack';
import Loding from './components/admin/Loding';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
        <Suspense fallback={<Loding />}>
          <RouterProvider router={router} />
        </Suspense>
      </Provider>
    </SnackbarProvider>
  </React.StrictMode>
);


