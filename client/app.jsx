import React from 'react';
// import Home from './pages/home';
import PageHeader from './components/page-header';
import WorkspaceForm from './components/workspace-form';

export default class App extends React.Component {
  render() {
    return (
      <>
        <PageHeader />
        <WorkspaceForm />
      </>
    );
  }
}
