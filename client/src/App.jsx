import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { Cards } from './Cards'
import { Header } from './Header'
import { addNotes, selectItems } from './redux/notesSlice'

function App() {
  const allNotes = useSelector(selectItems)
  const dispatch = useDispatch()
  console.log(allNotes)

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    fetch(import.meta.env.VITE_APP_API)
      .then(res => res.json())
      .then(data => {
        dispatch(addNotes(data))
      })
  }

  const addNewData = (newNote) => {
    fetch((import.meta.env.VITE_APP_API), {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote)
    })
      .then(res => res.json())
      .then(res => {
        dispatch(addNotes([res, ...allNotes]))
        getData()
      })
  }

  const deleteNote = (id) => {
    const filterNote = allNotes.filter(n => n.id !== id)
    fetch(`${import.meta.env.VITE_APP_API}/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => {
        dispatch(addNotes(filterNote))
        getData()
      }
      )
  }

  return (
    <>
      <Header />
      <div className='page-container'>
        <Cards deleteNote={deleteNote} addNewData={addNewData} getData={getData} />
      </div>
    </>
  )
}

export default App

