import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState, useEffect, useRef } from 'react'
import Dropdown from '@/components/Dropdown'
import Chat from '@/components/Chat'
import Head from 'next/head'


export default function Home() {
  const [search, setSearch] = useState('')
  const [searchText, setSearchText] = useState('Search')
  const [verses, setVerses] = useState([])
  const [dropDown, setDropDown] = useState(false)
  const [dropVal, setDropVal] = useState('10')
  const [err, setErr] = useState("")

  const textRef = useRef(null)
  

  const callBackend = async () => {
    if (search === '') {
      setErr('Search Text cannot be blank')
      return;
    }
    if (dropVal === '') {
      setErr('Please choose a value from dropdown')
      return;
    }
    setErr('')
    try {
      const resp = await fetch('http://localhost:5000/search', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'

        },
        body: JSON.stringify({ searchTerm: search, verses: dropVal })
      })
      const data = await resp.json()
      setVerses(data)
      setSearchText('Search')

    } catch (error) {
      setErr("There was an error. Send me msg on the chat below")
      console.log(`There was an error ${error}`)
      setSearchText('Search')
    }

  }

  useEffect(() => {
    console.log(err)
  }, [err])

  useEffect(() => {
    textRef.current?.focus()
  }, [])


  return (
    <div>
      <Head>
        <title>Search the Bible</title>
      </Head>
      <main
      className='px-6 lg:px-24 mt-4 lg:mt-8 flex flex-col'
      >
      <div className='flex flex-col space-y-6 md:space-y-0 md:flex-row justify-center items-left md:space-x-4 rounded-xl mt-4 md:mt-4'>
      {/* <input type="text" name="search" className='w-48 border border-gray-300 focus:ring-blue-500'/> */}
      <div className='relative'>
      <input
      type="text"
      ref={textRef}
      id="search-txt"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[345px] px-3 py-2" placeholder="Search the Bible (KJV)" required
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={() => setErr("")}
      autoFocus
      />
      <span className="absolute left-0 top-10 text-xs text-red-400">{err}</span>
      </div>

      <div className='flex flex-row space-x-4'>
      <Dropdown setDropDown={setDropDown}
      setDropVal={setDropVal}
      dropVal={dropVal}
      dropDown={dropDown} />

      <button
      type="submit"
      className='bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-md text-sm px-3 py-2'
      onClick={() => callBackend()}
      >{searchText}</button>
      </div>

      </div>
      <div className='md:max-w-[1300px] ml-auto mr-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-3 md:gap-y-6 lg:gap-y-8 md:gap-x-6 lg:gap-x-8 mt-8'>
      {verses &&
        verses.map(v => {
          return (
            <div key={v.citation} className='border text-xs lg:text-sm border-gray-300 rounded-md md:rounded-xl px-4 py-4 shadow-sm'>
            <p>{v.citation}</p>
            <p className='mt-3'>{v.text}</p>
            </div>
          )
        })

      }


      </div>

      <div className='md:text-center mt-12 md:mt-12 text-xs'>
      <p>Note: This is semantic search of the Bible (KJV) and the results may not be fully accurate.</p>

      </div>


      </main>
    </div>
  )
}
