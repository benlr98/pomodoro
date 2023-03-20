import React from "react";

function Navbar() {
  return (
    <nav className="py-3 flex justify-between items-center">
      <h1 className="py-5">Pomofocus</h1>
      <span className="flex items-center gap-2">
        <button className="p-2 border">Report</button>
        <button className="p-2 border">Settings</button>
        <div className="p-2 border">
          <span>image filler</span>
        </div>
      </span>
    </nav>
  );
}

export default Navbar;
