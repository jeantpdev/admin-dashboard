import React, { useState } from 'react';

export default function SideMenu() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const cerrarSesion = () => {
    localStorage.clear()
    window.location.assign("/login")
  }


  return (
    <>
      {/* Botón para mostrar/ocultar el menú en dispositivos móviles */}
      <div className='flex justify-end py-5'>
        <button
            onClick={toggleMenu}
            className="block sm:hidden z-50 bg-gray-800 p-2 rounded-md text-gray-200"
        >
            {showMenu ? (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
                />
            </svg>
            ) : (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
                />
            </svg>
            )}
        </button>
      </div>


        <aside id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          showMenu ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0 bg-zinc-900`}
        aria-label="Sidebar">
            <div className='h-full flex flex-col justify-between'>

                <div className="px-3 py-4 overflow-y-auto space-y-10 ">
                    <ul className="space-y-2 font-medium px-1">
                            <li className='flex items-center justify-start'>
                                <img src="/user-profile.jpg" className='h-10 rounded-full' alt="" />
                                <a href="#" className="flex items-center p-2 text-white rounded-lg dark:text-white">
                                    <span className="ms-3">Jean Trujillo</span>
                                </a>
                            </li>
                    </ul>

                    <ul className="space-y-2 font-medium">
                        <li>
                            <a href="/" className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-sky-400 group">
                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                            </svg>
                            <span className="flex-1 ms-3 whitespace-nowrap">Productos</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-sky-400 group">
                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
                            </svg>
                            <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                            </a>
                        </li>
                    </ul>
                </div>


                <div className="px-3 py-4">
                    <ul className="space-y-2 font-medium">
                        <li className='w-full'>
                            <a href="#" className="flex items-center py-3 px-4 bg-zinc-800 text-white rounded-lg hover:bg-sky-400 group">
                                <img src="/logout-svgrepo-com.svg" className='h-5' alt="" />
                                <button className='ml-2' onClick={cerrarSesion}>Cerrar sesion</button>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

        </aside>
    
    </>
  )
}