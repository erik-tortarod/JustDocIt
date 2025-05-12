import React from "react";

function User() {
   return (
      <div className="min-h-screen bg-base-200 p-6 w-screen">
         <div className="max-w-4xl mx-auto bg-base-100 shadow-lg rounded-lg p-6">
            {/* User Profile Section */}
            <div className="flex items-center gap-6 mb-8">
               <img
                  className="w-24 h-24 rounded-full border-4 border-primary"
                  src="https://avatars.githubusercontent.com/u/128736440?v=4"
                  alt="User Avatar"
               />
               <div>
                  <h1 className="text-3xl font-bold">John Doe</h1>
                  <p className="text-base-content/70 text-sm">
                     johndoe@example.com
                  </p>
               </div>
            </div>

            {/* User Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
               <div className="card bg-base-100 shadow-lg rounded-lg">
                 <div className="card-body">
                   <h2 className="card-title text-2xl font-bold text-primary mb-2">
                     Account Details
                   </h2>
                   <p className="text-base-content/80 text-lg">
                     <strong>Username:</strong> johndoe
                   </p>
                   <p className="text-base-content/80 text-lg">
                     <strong>Joined:</strong> January 1, 2023
                   </p>
                   <p className="text-base-content/80 text-lg">
                     <strong>Repositories:</strong> 12 connected
                   </p>
                 </div>
               </div>
               <div className="card bg-base-100 shadow-lg rounded-lg">
                 <div className="card-body">
                   <h2 className="card-title text-2xl font-bold text-primary mb-2">
                     Preferences
                   </h2>
                   <p className="text-base-content/80 text-lg">
                     <strong>Theme:</strong> Dark
                   </p>
                   <p className="text-base-content/80 text-lg">
                     <strong>Language:</strong> English
                   </p>
                 </div>
               </div>
            </div>

            {/* User Activities Section */}
            <div>
               <h2 className="text-2xl font-bold mb-4">Recent Activities</h2>
               <ul className="list-none space-y-4">
                  <li className="p-4 bg-base-200 rounded-lg shadow-md flex items-center gap-4">
                     <div className="text-primary text-3xl">📄</div>
                     <div>
                        <p>
                           <span className="font-semibold">
                              Updated documentation
                           </span>{" "}
                           for repository{" "}
                           <span className="text-primary">"my-project"</span>
                        </p>
                        <p className="text-sm text-base-content/70">
                           <span className="text-secondary">
                              March 10, 2023
                           </span>
                        </p>
                     </div>
                  </li>
                  <li className="p-4 bg-base-200 rounded-lg shadow-md flex items-center gap-4">
                     <div className="text-primary text-3xl">🔗</div>
                     <div>
                        <p>
                           <span className="font-semibold">
                              Connected new repository
                           </span>{" "}
                           <span className="text-primary">"awesome-repo"</span>
                        </p>
                        <p className="text-sm text-base-content/70">
                           <span className="text-secondary">March 8, 2023</span>
                        </p>
                     </div>
                  </li>
                  <li className="p-4 bg-base-200 rounded-lg shadow-md flex items-center gap-4">
                     <div className="text-primary text-3xl">🎨</div>
                     <div>
                        <p>
                           <span className="font-semibold">Changed theme</span>{" "}
                           to <span className="text-primary">Dark</span>
                        </p>
                        <p className="text-sm text-base-content/70">
                           <span className="text-secondary">March 5, 2023</span>
                        </p>
                     </div>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   );
}

export default User;
