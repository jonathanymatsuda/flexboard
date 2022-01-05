import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default class KanbanBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: '',
      title: '',
      sortOrder: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(`/api/boards/${this.props.boardId}`)
      .then(res => res.json())
      .then(board => this.setState({ board }))
      .catch(err => console.error(err));
  }

  handleChange(event) {
    this.setState({
      title: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newList = JSON.stringify({ title: this.state.title, boardId: this.props.boardId, sortOrder: this.state.sortOrder });
    fetch('/api/lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: newList
    })
      .then(response => response.json())
      .then(result => {
        this.setState({ title: '', sortOrder: this.state.sortOrder + 1 });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { title } = this.state.board;
    return (
      <div className="mt-5 px-8 pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h2 className="text-xl leading-6 font-medium text-gray-900">{title}</h2>
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open ? 'text-gray-300' : 'text-white',
                  'inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                )}
              >
                <span>Add List</span>
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-10 right-0 mt-3 px-2 w-screen max-w-md sm:px-0">
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <form onSubmit={this.handleSubmit}>
                      <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                          <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                              List Name
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="list-title"
                                id="list-title"
                                autoFocus
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md px-2 py-2"
                                placeholder="Enter title..."
                                value={this.state.title}
                                onChange={this.handleChange}
                                required
                              />
                            </div>
                          </div>

                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                          <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    );
  }
}
