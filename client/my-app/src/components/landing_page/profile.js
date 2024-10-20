import React, { useEffect, useRef } from 'react';

function Profile({ profileToggled, setProfileToggled }) {
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileToggled(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [profileToggled, setProfileToggled]);

  return (
    <div ref={profileRef} className="border rounded-full inline-block p-2 cursor-pointer z-10" onClick={() => setProfileToggled(!profileToggled)} >
      <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 3h18v2H3zm0 16h18v2H3zm0-8h18v2H3z"/></svg>
      <svg className="ml-3 inline-block" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"/></svg>
    </div>
  );
};

export default Profile;