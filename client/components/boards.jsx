import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import KanbanBanner from './kanban-banner';
import TaskList from './tasks';

export default class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: null,
      boardTitle: ''
    };
    this.addList = this.addList.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    fetch(`/api/boards/${this.props.boardId}`)
      .then(res => res.json())
      .then(board => this.setState({ lists: board.lists, boardTitle: board.title }))
      .catch(err => console.error(err));
  }

  addList(newList) {
    newList.sortOrder = this.state.lists.length;
    fetch('/api/lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newList)
    })
      .then(res => res.json())
      .then(newList => this.setState({ lists: this.state.lists.concat(newList) }))
      .catch(err => console.error(err));
  }

  onDragEnd(result) {
    const { destination, source, type } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    if (type === 'column') {
      const [newListOrder] = this.state.lists.splice(source.index, 1);
      this.state.lists.splice(destination.index, 0, newListOrder);
      this.setState({ lists: this.state.lists });
      const listIdArray = [];
      for (let list = 0; list < this.state.lists.length; list++) {
        listIdArray.push(this.state.lists[list].listId);
      }
      fetch('/api/listorder', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(listIdArray)
      })
        .then(res => res.text())
        .then(() => {
          this.setState({ lists: this.state.lists });
        })
        .catch(err => console.error(err));
    }
  }

  render() {
    if (!this.state.lists) return null;
    return (
    <DragDropContext onDragEnd={this.onDragEnd}>
      <>
        <KanbanBanner onSubmit={this.addList} boardId={this.props.boardId} boardTitle={this.state.boardTitle} />
        <Droppable droppableId='anywhere' direction='horizontal' type='column'>
          {provided => (
              <div className="h-screen w-screen bg-blue-100 absolute" {...provided.droppableProps} ref={provided.innerRef} >
              <div className="relative mt-10 h-screen px-8 flex gap-x-8 overflow-x-auto overflow-y-auto">
                {this.state.lists.map((list, index) => (
                  <Draggable draggableId={`list-${list.sortOrder}`} index={index} key={list.listId}>
                    {provided => (
                      <div
                        className="relative p-8 bg-white border border-gray-200 rounded-sm shadow-lg w-96"
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        index={index}
                       >
                        <h3 {...provided.dragHandleProps} className="text-xl text-left font-semibold text-gray-900">{list.title}</h3>
                        <TaskList listId={list.listId} lists={this.state.lists}/>
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
             {provided.placeholder}
            </div>
          )}
        </Droppable>
      </>
    </DragDropContext>
    );
  }
}
