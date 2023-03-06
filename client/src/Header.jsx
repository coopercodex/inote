import React from 'react'
import CottageIcon from '@mui/icons-material/Cottage';
import './header.css'
import { selectItems } from './redux/notesSlice';
import { useSelector } from 'react-redux';


export const Header = () => {
  const allNotes = useSelector(selectItems)

  const getTotal = allNotes?.reduce((acc, d) => acc += d.description.split(' ').length, 0)
  return (
    <div className='header-container'>
    <div className='header'>
      <h2>
        <CottageIcon />
      </h2>
      <h1>
        Your iNotes
      </h1>
    </div>
      <div className='count'>
        <p>{getTotal} words <span>|</span> {allNotes.length} chapters</p>
      </div>
    </div>
  )
}
