import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'


export default function Home() {
  const [search, setSearch] = useState('')
  const [verses, setVerses] = useState([])

  const callHello = async () => {
    const resp = await fetch(`http://localhost:5000/search?search=${search}`)
    const data = await resp.json()
    setVerses(data)

  }

  useEffect(() => {
    console.log(`Console logging from useEffect ${search}`)

  }, [search])

  return (
    <main
      className='p-24'
    >
      <div className='flex flex-col w-24 space-y-4 rounded-xl'>
        <label className='text-sm'>Search Term</label>
        {/* <input type="text" name="search" className='w-48 border border-gray-300 focus:ring-blue-500'/> */}
        <input type="text" id="company"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-56 p-2.5" placeholder="Enter search" required
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className='bg-black text-white h-8 rounded-xl text-sm px-2 py-1'
          onClick={() => callHello()}
        >Search</button>

      </div>
      <div className='grid grid-cols-4 gap-y-8 gap-x-8 mt-8'>
        {verses &&
          verses.map(v => {
            return (
              <div key={v.citation}>
                <p>{v.citation}</p>
                <p>{v.text}</p>
              </div>
            )
          })

        }


      </div>


    </main>
  )
}
