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
      <div className="relative px-8 mt-10 flex gap-x-8 overflow-hidden z-0">
        {this.state.lists.map(list => (
          <div
            key={list.listId}
            className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm w-full"
          >
            <h3 className="text-xl text-center font-semibold text-gray-900">{list.title}</h3>
          </div>
        ))}
      </div>
    );
  }
}
