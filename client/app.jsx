import React from 'react';
import PageHeader from './components/page-header';
import WorkspaceForm from './components/workspace-form';
import WorkspaceListView from './pages/workspace-home';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const changeView = parseRoute(window.location.hash);
      this.setState({ route: changeView });
    });
  }

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
