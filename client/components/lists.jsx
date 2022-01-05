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

  addList(newList) {
    fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newList)
    })
      .then(res => res.json())
      .then(newList => this.setState({ todos: this.state.lists.concat(newList) }))
      .catch(err => console.error(err));
  }

  render(props) {
    return (
    <div className="h-screen w-screen bg-cyan-50 absolute">
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
    );
  }
}
