import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { addNotes } from './redux/notesSlice'

export const Form = ({addNewData}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e) => {
    e.preventDefault();
    const newNote = ({id: Date.now(), title, description})
    addNewData(newNote)
    setTitle('')
    setDescription('')
  }

  return (
    <div className='form'>
      <form onSubmit={handleChange}>
        <input
        placeholder='Add title'
        type='text'
        value={title}
        required={true}
        onChange={(e) => setTitle(e.target.value)}
        /> 
        <textarea
        placeholder='Add description'
        type='text'
        value={description}
        required={true}
        onChange={(e) => setDescription(e.target.value)}
        >
        </textarea>
        <button>Submit</button>
      </form>
    </div>
  )
}