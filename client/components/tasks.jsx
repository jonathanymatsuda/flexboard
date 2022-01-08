import React from 'react';
import TaskForm from './task-form-button';
import { ViewGridIcon } from '@heroicons/react/outline';

export default class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: null
    };
    this.addTask = this.addTask.bind(this);
  }

  componentDidMount() {
    fetch(`/api/list/${this.props.listId}`)
      .then(res => res.json())
      .then(list => this.setState({ tasks: list.tasks }))
      .catch(err => console.error(err));
  }

  addTask(newTask) {
    newTask.sortOrder = this.state.tasks.length;
    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })
      .then(res => res.json())
      .then(newTask => this.setState({ tasks: this.state.tasks.concat(newTask) }))
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.tasks) return null;
    return (
      <>
        <div className="flow-root mt-10">
          <ul role="task-list" className="-my-5">
            {this.state.tasks.map(task => (
              <li key={task.taskId} className="py-4 rounded-md mb-10 bg-gray-100 shadow-md">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="ml-5 text-sm font-medium text-gray-900 truncate">{task.title}</p>
                  </div>
                  <div>
                    <ViewGridIcon
                      className="h-5 w-5 mr-5 text-gray-500"
                    >
                    </ViewGridIcon>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <TaskForm onSubmit={this.addTask} listId={this.props.listId}/>
      </>
    );
  }
}
