import React from 'react';
import PageHeader from './components/page-header';
import WorkspaceForm from './components/workspace-form';
import WorkspaceListView from './pages/workspace-home';

export default class App extends React.Component {
  render() {
    return (
      <>
        <PageHeader />
        <WorkspaceForm />
        <WorkspaceListView/>
      </>
    );
  }
}
