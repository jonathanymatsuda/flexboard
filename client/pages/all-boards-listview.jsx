import React from 'react';

export default class AllBoardsListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: []
    };
  }

  componentDidMount() {
    fetch('/api/boards')
      .then(res => res.json())
      .then(boardsPanels => this.setState({ boards: boardsPanels }))
      .then(err => console.error(err));
  }

  render() {
    const noWorkspaceTextClass = this.state.boards.length === 0
      ? 'text-gray-500 text-xs font-medium tracking-wide'
      : 'hidden';
    return (
      <div className='p-8'>
        <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">All Boards</h2>
        <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {this.state.boards.map(board => (
            <li key={board.boardId} className="col-span-1 flex shadow-sm rounded-md">
              <div
                className='flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md bg-sky-400'
              >
               BD-{board.boardId}
              </div>
              <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                <div className="flex-1 px-4 py-2 text-sm truncate whitespace-normal">
                  <a href='#'className="text-gray-900 font-medium hover:text-gray-600">
                    {board.title}
                  </a>
                  <p className="text-xs text-gray-500">From Workspace {board.workspaceId}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className='text-center mt-5'>
          <h2 className={noWorkspaceTextClass}>No boards have been created yet 🙈. Please go into a desired workspace to create your first one!</h2>
        </div>
      </div>
    );
  }
}
