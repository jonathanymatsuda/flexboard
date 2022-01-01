// import React from 'react';

// const projects = [
//   { name: 'Graph API', initials: 'GA', href: '#', members: 16, bgColor: 'bg-pink-600' },
//   { name: 'Component Design', initials: 'CD', href: '#', members: 12, bgColor: 'bg-purple-600' },
//   { name: 'Templates', initials: 'T', href: '#', members: 16, bgColor: 'bg-yellow-500' },
//   { name: 'React Components', initials: 'RC', href: '#', members: 8, bgColor: 'bg-green-500' }
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

// export default class WorkspaceListView extends React.Component {
//   constructor(props) {
//     super(props);
//     this.setState = {
//       workspaces: []
//     };
//   }

//   componentDidMount() {
//     fetch('/api/workspaces')
//       .then(res => res.json())
//       .then(workspacePanels => this.setState({ workspaces: workspacePanels }))
//       .then(err => console.error(err));
//   }

// //   render() {
// //     return (
// //     <div>
// //       <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Active Workspaces</h2>
// //       <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
// //         {this.state.workspaces.map(workspace => (
// //           <li key={workspace.workspaceId} className="col-span-1 flex shadow-sm rounded-md">
// //             <div
// //               className={classNames(
// //                 project.bgColor,
// //                 'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
// //               )}
// //             >
// //               {/* `{workspace/.initials} */}
// //             </div>
// //             <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
// //               <div className="flex-1 px-4 py-2 text-sm truncate">
// //                 <a href={project.href} className="text-gray-900 font-medium hover:text-gray-600">
// //                   {project.name}
// //                 </a>
// //                 <p className="text-gray-500">{project.members} Members</p>
// //               </div>
// //             </div>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //     );
// //   }
// // }
// //
