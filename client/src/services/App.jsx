import React from 'react';
import Router from './routes/Router.jsx';
import Layout from './components/Layout.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { DataProvider } from './context/DataContext.jsx';

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Layout>
          <Router />
        </Layout>
      </DataProvider>
    </AuthProvider>
  );
}