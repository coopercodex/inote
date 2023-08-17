import e from 'cors'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNotes, selectItems } from './redux/notesSlice'


export const Edit = ({currentState, setNotes, getData}) => {
  const [description, setDescription] = useState(currentState?.description)
  const [title, setTitle] = useState(currentState?.title)
  const allNotes = useSelector(selectItems)
  const dispatch = useDispatch()

  const handleEdit = (e) => {
    e.preventDefault()
    const editedNote = ({title, description})
    fetch(`${import.meta.env.VITE_APP_API}/${currentState.id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(editedNote)
})
  .then(res => res.json())
  .then(() => {
    console.log(editedNote)
    dispatch(addNotes([ editedNote]))
    getData()
  })
  }

    console.log(currentState)
  return (
    <div>
      <form onSubmit={handleEdit}>
      <input
        type='text'
        value={title}
        required={true}
        onChange={(e) => setTitle(e.target.value)}
        /> 
        <textarea
        type='text'
        value={description} 
        required={true}
        onChange={(e) => setDescription(e.target.value)}
        >
        </textarea>
        <button>Edit</button>
        </form> 
    </div>
  )
}
