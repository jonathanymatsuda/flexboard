import React from 'react';

export default class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: []
    };
  }

  componentDidMount() {
    fetch(`/api/lists/${this.props.boardId}`)
      .then(res => res.json())
      .then(listCards => this.setState({ lists: listCards }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="mt-5 bg-slate-50">
        <div className="px-8 pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
          <h2 className="text-xl leading-6 font-medium text-gray-900">Board Name</h2>
          <div className="mt-3 sm:mt-0 sm:ml-4">
            <a
              href='#'
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create List
            </a>
          </div>
        </div>
        <div className="relative bg-slate-50 pt-16 pb-20 px-4">
          <div className="max-w-lg max-h-max mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {this.state.lists.map(list => (
              <div key={list.listId} className="rounded-lg shadow-lg overflow-hidden">
                <div className="bg-white p-6 justify-between bg-gray-200">
                    <h3 className="text-xl text-center font-semibold text-gray-900">{list.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
     </div>
    );
  }
}
