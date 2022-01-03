import React, { Fragment } from 'react';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import WorkspaceForm from './components/workspace-form';
import WorkspaceListView from './pages/workspace-listview';
import BoardForm from './components/board-form';
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

  renderPage() {
    const { route } = this.state;
    if (route.path === '' || route.path === 'workspaceform') {
      return <WorkspaceForm />;
    }
    if (route.path === 'activeworkspaces') {
      return <WorkspaceListView />;
    }
    if (route.path === 'boards') {
      return <BoardForm />;
    }
  }

  render() {
    const createWorkspaceTabToggle = window.location.hash === ''
      ? 'bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium block'
      : 'text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium block';
    const activeWorkspacesTabToggle = window.location.hash === '#activeworkspaces'
      ? 'bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium block'
      : 'text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium block';
    const boardTabActiveToggle = window.location.hash === '#boards'
      ? 'bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium block'
      : 'text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium block';
    return (
      <>
        <Disclosure as="nav" className="bg-indigo-600">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open
                        ? (
                          <XIcon className="block h-6 w-6" aria-hidden="true" />
                          )
                        : (
                          <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                          )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex-shrink-0 flex items-center">
                      <img
                        className="h-8 w-auto mr-1"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg"
                        alt="Workflow"
                      />
                      <h2 className='text-white font-bold'>Flexboard</h2>
                    </div>
                    <div className="hidden sm:block sm:ml-6">
                      <div className="flex space-x-4">
                        <a href='#' className={createWorkspaceTabToggle}>Create Workspace</a>
                        <a href='#activeworkspaces' className={activeWorkspacesTabToggle}>Active Workspaces</a>
                        <a href='#boards' className={boardTabActiveToggle}>Boards</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <Disclosure.Button className='text-left'>
                   <a as="a" href='#' className={createWorkspaceTabToggle}>Create Workspace</a>
                   <a as="a" href='#activeworkspaces' className={activeWorkspacesTabToggle}>Active Workspaces</a>
                   <a as="a" href='#boards' className={boardTabActiveToggle}>Boards</a>
                 </Disclosure.Button>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        { this.renderPage() }
     </>
    );
  }
}
