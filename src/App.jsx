import { useEffect, useState } from 'react'
import './App.css'
import BlogCard from './BlogCard'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddNewCard from './AddNewCard';
import EditCard from './EditCard';

function App() {

  let [cardsArray,setCardsArray] = useState()
  let [editedCard, setEditedCard] = useState({id: '', title: '', body: '', userId: ''})


  
  useEffect(()=>{
    fetch('https://dummyjson.com/posts')
    .then(res => res.json())
    .then(post => setCardsArray(post.posts));
  }, [])

  let [addNewClicked, setAddNewClicked] = useState(false)
  let [editIsClicked, setEditIsClicked] = useState(false)

  const addNewClickedClosed = (clicked) =>{
    setAddNewClicked(clicked)
  }


  const deleteCard = (id) => {
    fetch(`https://dummyjson.com/posts/${id}`, {
    method: 'DELETE',
    })
    .then(res => res.json())
    .then(
      data => setCardsArray( cardsArray.filter(el => (
        el.id !== data.id 
      ))
    ));
    }

    const editCard = (card) =>{
      setEditedCard(card)
    }

    const addCard = (id,title,text) =>{
      const temp = {
        id: id,
        title: title,
        body: text,
        userId: id
      }
      const tempArray = cardsArray;
      tempArray.unshift(temp)
      setCardsArray(tempArray)
      }

      const editClicked = (clicked) =>{
          setEditIsClicked(clicked)
      }
    
      const editCardHandler = (id,title,body) =>{
         const tempArray = cardsArray.map(card =>{
            if(card.id === id){
              return {...card, title: title, body: body}
            }
            return card;
          });

          setCardsArray(tempArray)
          
      }

  return (
    <>
     <Container>
          <Stack style={{marginBottom: '40px', justifyContent: 'space-between'}} direction="row" spacing={2} >
            <Typography style={{fontSize: '40px'}} component="h1">
              Our blog
            </Typography>
            <Button onClick={()=>setAddNewClicked(true)}>Add new</Button>
          </Stack>
          
          <AddNewCard addNewClicked={addNewClicked} addNewClickedClosed={addNewClickedClosed} addCard={addCard}></AddNewCard>
          <EditCard editCardHandler={editCardHandler} editedCard={editedCard} editIsClicked={editIsClicked}></EditCard>
          <Grid container spacing={4}>
                  {
                      cardsArray?.map(card=>(
                        <BlogCard card={card} key={card.id} deleteCard={deleteCard} editCard={editCard} editClicked={editClicked}></BlogCard>
                      ))
                  }
          </Grid>
      </Container>
  
    </>
  )
}

export default App
