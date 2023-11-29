import { useState } from "react";



const Dropdown = ({ setDropDown, setDropVal, dropVal, dropDown }) => {
  // const [dropDown, setDropDown] = useState(false)
  // const [ dropVal, setDropVal ] = useState('')

  const collapseAndSet = (val) => {
    setDropVal(val)
    setDropDown(false)

  }

  return (
    <div className="relative">
      <div >
        <button
          onClick={() => setDropDown(!dropDown)}
          type="button" 
          className="w-full inline-flex justify-start rounded-md bg-white px-3 py-2 items-center text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {`Verses to show ${dropVal}`}
          <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path filrule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>

      </div>
      {dropDown &&
        <div className="absolute left-0 z-10 mt-2 w-44 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="none">
            {[5, 10, 15, 20, 25].map(s => {
              return <p className="text-gray-700 block px-4 py-2 text-sm hover:bg-blue-100"
                onClick={() => collapseAndSet(s)}>{s}</p>
            })
            }
          </div>

        </div>
      }


    </div>
  )
};

export default Dropdown;