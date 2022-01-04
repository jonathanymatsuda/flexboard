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
      <div className="mt-24 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
        {this.state.lists.map(list => (
          <div
            key={list.listId}
            className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm"
          >
            <h3 className="text-xl text-center font-semibold text-gray-900">{list.title}</h3>
            <p className="mt-6 text-gray-500">Tasks will go here</p>
          </div>
        ))}
      </div>
    );
  }
}
