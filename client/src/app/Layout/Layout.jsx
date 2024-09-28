import React from 'react'
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
    <>

      <div className="flex flex-col md:flex-row min-h-screen ">
        <div className=" md:w-3/12 bg-gray-200 ">
          <Sidebar />
        </div>
        <div className=" bg-gray-100 w-full ">
          <main className="p-4">{children}</main>
        </div>
      </div>
    </>
  );
}

export default Layout