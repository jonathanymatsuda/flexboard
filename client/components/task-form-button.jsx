import React from 'react';
import { PlusIcon } from '@heroicons/react/outline';

export default class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
  }

  handleChange(event) {
    this.setState({
      title: event.target.value
    });
  }

  render() {
    return (
      <div className='text-center mt-8'>
        <a
          href='#'
          className="inline-flex items-center text-center px-20 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-black bg-gray-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
        >
          <PlusIcon className="-ml-1 mr-3 h-5 w-5 text-gray-500" aria-hidden="true" />
          Add a Task
        </a>
      </div>
    );
  }
}
