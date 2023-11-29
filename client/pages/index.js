import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import  Dropdown  from '@/components/Dropdown'
import Navbar from '@/components/Navbar'


export default function Home() {
  const [search, setSearch] = useState('')
  const [searchText, setSearchText] = useState('Search')
  const [verses, setVerses] = useState([])
  const [dropDown, setDropDown] = useState(false)
  const [ dropVal, setDropVal ] = useState('')

  const callBackend = async () => {
    setSearchText('Searching ...')
    const resp = await fetch('http://bibleproject.test/search', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'

      },
      body: JSON.stringify({searchTerm: search, verses: dropVal})
    })
    const data = await resp.json()
    setVerses(data)
    setSearchText('Search')

  }

  return (
    <main
      className='px-24 py-12 flex flex-col'
    >
      <Navbar />
      <h1></h1>
      <div className='flex flex-row justify-center items-center space-x-8 rounded-xl mt-16'>
        {/* <input type="text" name="search" className='w-48 border border-gray-300 focus:ring-blue-500'/> */}
        <input 
          type="text"
          id="search-txt"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[345px] px-3 py-2" placeholder="Search the Bible (KJV)" required
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
        />

        <Dropdown setDropDown={setDropDown} 
          setDropVal={setDropVal}
          dropVal={dropVal}
          dropDown={dropDown}/>

        <button 
          type="submit"
          className='bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-md text-sm px-3 py-2'
          onClick={() => callBackend()}
        >{searchText}</button>

      </div>
      <div className='grid grid-cols-4 gap-y-8 gap-x-8 mt-8'>
        {verses &&
          verses.map(v => {
            return (
              <div key={v.citation} className='border text-sm border-gray-300 rounded-xl px-4 py-4 shadow-sm'>
                <p>{v.citation}</p>
                <p className='mt-3'>{v.text}</p>
              </div>
            )
          })

        }


      </div>
      <div className='text-center mt-4 text-sm'>
        <p>Note: This is semantic search of the Bible (KJV) and the results may not be fully accurate</p>

      </div>


    </main>
  )
}
