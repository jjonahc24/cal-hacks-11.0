import React from 'react';

// Auth0 imports 
import { useAuth0 } from "@auth0/auth0-react";

function ProfileDropDown() {
  const { loginWithRedirect } = useAuth0();

    return (
      <div className="flex flex-col items-center mt-2">
        <div className="bg-white w-full border border-gray-300 rounded shadow-md">
          {/*<button className="text-left w-full py-1 px-2 hover:bg-gray-100 text-sm mt-3 mb-3" onClick={() => loginWithRedirect()}>Sign up</button>*/}
          <button className="text-left w-full py-1 px-2 text-sm mt-3 mb-3 text-gray-500 opacity-50 cursor-not-allowed" disabled>Sign up</button>
          <button className="text-left w-full py-1 px-2 text-sm mt-3 mb-3 text-gray-500 opacity-50 cursor-not-allowed" disabled>Log in</button>
          {/*<button className="text-left w-full py-1 px-2 hover:bg-gray-100 text-sm mb-3" onClick={() => loginWithRedirect()}>Log in</button>*/}
        </div>
      </div>
    );
  }


export default ProfileDropDown;