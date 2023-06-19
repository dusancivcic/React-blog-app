import { useState } from "react";
import './App.css'

import { useEffect } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';


const AddNewCard = ({addNewClicked, addNewClickedClosed, addCard}) => {
let [transition, setTransition] = useState('')
let [active, setActive] = useState('')
const [title, setTitle] = useState('')
const [text, setText] = useState('')



const handleTitleChange = event =>{
    setTitle(event.target.value)
}

const handleTextChange = event =>{
    setText(event.target.value)
}

    useEffect(()=>{
        if((addNewClicked === true )){
            setActive('active')
            setTimeout(()=>{
                setTransition('transition')
            }, 100)
        }else{
            setTransition('')
            setTimeout(()=>{
                setActive('')
            }, 550)
        }
    },[addNewClicked])

   return(
        <>
                <div className={active + ' ' + transition +  ` popout-container`}>
                    <Card  className='add-new-container'>
                        <CardContent className="add-new-inputs">
                            <Typography gutterBottom variant="h5" component="div">
                                Add new card
                            </Typography>
                            <TextField fullWidth label="title" id="title" value={title} onChange={handleTitleChange}/>
                            <TextField fullWidth label="text" id="text" value={text} onChange={handleTextChange}/>
                        </CardContent>
                        <CardActions>
                            <Button onClick={()=>{addCard(9,title,text)}}>Add new</Button>
                        </CardActions>
                    </Card>
                    <div className="overlay" onClick={()=>{
                        setTransition('')
                        setTimeout(()=>{
                            setActive('')
                        }, 550)
                        addNewClickedClosed(false)
                        }}></div>
                </div>
        </>
   )
}

export default AddNewCard; 