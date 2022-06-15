import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from "react-query";
import { store } from "./store";
import { Provider } from "react-redux";

const queryClient = new QueryClient();
const container = document.getElementById('root');
const root = createRoot(container);

root.render(<QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <App tab="home" />
                </Provider>
            </QueryClientProvider>);


