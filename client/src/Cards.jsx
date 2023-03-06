import React, { useEffect, useState } from 'react'
import './card.css'
import { Form } from './Form'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { addNotes, removeFromNotes, selectItems } from './redux/notesSlice'
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import { Edit } from './Edit';


export const Cards = ({ deleteNote, addNewData, getData }) => {
  const [clicked, setClicked] = useState(false)
  const [state, setState] = useState(-1)
  const [showForm, setShowForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const allNotes = useSelector(selectItems)
  const dispatch = useDispatch()

  const getTotal = allNotes?.reduce((acc, d) => acc += d.description.split(' ').length, 0)
  console.log("REDUX", allNotes)

  return (allNotes) ? (
    <div className="card-container">
      <div className='card'>
        <div className='card-header'>
          <p className='add-icon' style={{ cursor: 'pointer' }} onClick={() => setShowForm(!showForm)}>{showForm ? <RemoveCircleOutlineIcon /> : <AddCircleOutlineIcon />}</p>
          {showForm ? <Form addNewData={addNewData} /> : null}
          <h1>iNotes</h1>
        </div>
        <p className='total'>{getTotal} words total</p>
        {allNotes.map((note, idx) => (

          <div className='card-title' key={idx}
            onClick={() => {
              setClicked(true)
              setState(idx)
            }}
            style={{
              background: state === idx ? '#2269F3' : null, 
              color: state === idx ? 'rgb(203, 192, 192)' : 'rgba(203, 192, 192)'
            }}>
            <h2>{note.title}</h2>
            <p>
              {note?.description.split(' ').length} words
            </p>
          </div>

        ))}
      </div>
      {clicked ?
        <div className='notes-description'>
          <div className='sub-header'>
            <h2>
              {allNotes[state]?.title ? allNotes[state]?.title : <></>}
            </h2>
            <div className='edit-section'>
              <h5 onClick={() => { setShowEditForm(!showEditForm) }}>
                <EditIcon />
              </h5>
              {showEditForm ? <Edit currentState={allNotes[state]} getData={getData} /> : null}
            </div>
            <h4 onClick={() => {
              dispatch(removeFromNotes(allNotes[state].id))
              deleteNote(allNotes[state].id)
            }}><DeleteIcon /></h4>
          </div>
          <p>
            {allNotes[state]?.description ? allNotes[state]?.description : <h2>Add or select a note to edit</h2>}
          </p>
        </div>
        : null}
    </div>
  ) : <h1>asdf</h1>
}
