import React from 'react';
import TaskForm from './task-form-button';
import { Droppable, Draggable } from 'react-beautiful-dnd';

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
        <Droppable droppableId={`list-${this.props.listId}`} type='task'>
          {provided => (
            <div className="flow-root mt-10" {...provided.droppableProps} ref={provided.innerRef}>
              <div role="task-list" className="-my-5">
                {this.state.tasks.map((task, index) => (
                  <Draggable key={task.taskId} draggableId={`task-${task.taskId}`} index={index}>
                    {provided => (
                      <div className="py-4 rounded-md mb-10 bg-gray-100 shadow-md" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <div className="flex items-center space-x-4">
                          <p className="ml-5 text-sm font-medium text-gray-900 truncate">{task.title}</p>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <TaskForm onSubmit={this.props.addTask} listId={this.props.listId} />
      </>
    );
  }
}
