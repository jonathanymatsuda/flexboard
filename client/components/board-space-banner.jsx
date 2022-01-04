import React from 'react';

export default class BoardSpaceBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardName: null
    };
  }

  componentDidMount() {
    fetch(`/api/boards/${this.props.boardId}`)
      .then(res => res.json())
      .then(boardName => this.setState({ boardName: boardName }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="mt-5">
        <div className="px-8 pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
          <h2 className="text-xl leading-6 font-medium text-gray-900">{this.props.title}</h2>
          <div className="mt-3 sm:mt-0 sm:ml-4">
            <a
              href='#'
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create List
            </a>
          </div>
        </div>
      </div>
    );
  }
}
