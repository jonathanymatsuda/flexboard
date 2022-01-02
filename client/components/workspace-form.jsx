import React from 'react';

export default class WorkspaceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleDescriptionChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const description = this.state.description === ''
      ? null
      : this.state.description;
    const newWorkspace = JSON.stringify({ name: this.state.name, description: description });
    fetch('/api/workspaces', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: newWorkspace
    })
      .then(response => response.json())
      .then(result => {
        this.setState({ name: '' });
        this.setState({ description: '' });
        window.location.hash = 'activeworkspaces';
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="space-y-8 divide-y divide-gray-200 px-28 pt-5 mt-10">
        <div className="md:grid md:grid-cols-3 md:gap-6 py-2">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-bold leading-6 text-gray-900">Lets build a Workspace</h3>
              <p className="mt-1 text-sm text-gray-600">
                Boost your producitivity so you and your team can focus on the things that matter
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={this.handleSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Workspace Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoFocus
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md px-2 py-2"
                      placeholder="PED Team - Irvine, CA 😎"
                      value={this.state.name}
                      onChange={this.handleNameChange}
                      required
                    />
                 </div>
                 <p className="mt-2 text-xs text-gray-500 mb-10">This could be the name of your company, team or a project you are working on.</p>
                </div>
                  <div>
                    <div className='flex justify-between'>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Workspace Description
                      </label>
                      <span className="text-sm text-gray-500" id="email-optional">
                        (Optional)
                      </span>
                    </div>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md px-2 py-2 resize-none h-64"
                        placeholder="Our team loves to organize all projects using Flexboard!"
                        value={this.state.description}
                        onChange={this.handleDescriptionChange}
                      />
                    </div>
                  </div>

                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Create Workspace
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
