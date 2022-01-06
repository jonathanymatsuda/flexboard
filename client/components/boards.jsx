import React from 'react';
import KanbanBanner from './kanban-banner';

export default class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: null
    };
    this.addList = this.addList.bind(this);
  }

  componentDidMount() {
    fetch(`/api/boards/${this.props.boardId}`)
      .then(res => res.json())
      .then(board => this.setState({ lists: board.lists }))
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

  render(props) {
    if (!this.state.lists) return null;
    return (
     <>
       <KanbanBanner onSubmit={this.addList} boardId={this.props.boardId} />
       <div className="h-screen absolute">
         <div className="relative mt-10 px-8 flex gap-x-8 overflow-x-auto overflow-y-auto">
           {this.state.lists.map(list => (
             <div
               key={list.listId}
               className="relative p-8 bg-white border border-gray-200 rounded-sm shadow-lg w-96"
             >
               <h3 className="text-xl text-left font-semibold text-gray-900">{list.title}</h3>
             </div>
           ))}
         </div>
       </div>
     </>
    );
  }
}