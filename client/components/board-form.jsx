import React from 'react';

export default class BoardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      title: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newBoard = JSON.stringify({ title: this.state.title, workspaceId: this.props.workspaceId });
    fetch('/api/boards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: newBoard
    })
      .then(response => response.json())
      .then(result => {
        this.setState({ title: '' });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
        <div className="space-y-8 divide-y divide-gray-200 px-28 pt-5 mt-10">
          <div className="md:grid md:gap-6 py-2">
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={this.handleSubmit}>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Board Title
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="board-title"
                          id="board-title"
                          autoFocus
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md px-2 py-2"
                          placeholder="Company Kick Off Party Prep 🎉"
                          value={this.state.title}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      <p className="mt-2 text-xs text-gray-500 mb-10">This will hold all of your columns/lists and tasks.</p>
                    </div>

                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Create Board
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
    );
  }
}
