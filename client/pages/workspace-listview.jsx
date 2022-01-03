import React from 'react';
import { PlusIcon } from '@heroicons/react/outline';

export default class WorkspaceListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workspaces: []
    };
  }

  componentDidMount() {
    fetch('/api/workspaces')
      .then(res => res.json())
      .then(workspacePanels => this.setState({ workspaces: workspacePanels }))
      .then(err => console.error(err));
  }

  render() {
    const noWorkspaceTextClass = this.state.workspaces.length === 0
      ? 'text-gray-500 text-xs font-medium tracking-wide'
      : 'hidden';
    return (
    <div className='p-8'>
      <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Active Workspaces</h2>
      <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {this.state.workspaces.map(workspace => (
          <li key={workspace.workspaceId} className="col-span-1 flex shadow-sm rounded-md">
            <div
              className='flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md bg-blue-500'
            >
              WS-{workspace.workspaceId}
            </div>
            <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
              <div className="flex-1 px-4 py-2 text-sm truncate whitespace-normal">
                <a href={`#boards?workspaceId=${workspace.workspaceId}`} className="text-gray-900 font-medium hover:text-gray-600">
                  {workspace.name}
                </a>
                <p className="text-xs text-gray-500">{workspace.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className='text-center mt-5'>
        <h2 className={noWorkspaceTextClass}>Looks like there are no workspaces created! Please go to Create Workspace to get started 🚀 </h2>
      </div>
      <div className='text-center mt-6'>
        <a
          href='#'
          className="inline-flex items-center text-center px-6 py-2 border border-transparent shadow-sm text-base font-medium rounded-full text-black bg-gray-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
        >
          <PlusIcon className="-ml-1 mr-3 h-5 w-5 text-gray-500" aria-hidden="true" />
          Create New Workspace
        </a>
      </div>
    </div>
    );
  }
}
