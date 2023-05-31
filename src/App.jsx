import { useEffect, useState } from 'react'
import './App.css'
import BlogCard from './BlogCard'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddNewCard from './AddNewCard';

function App() {

  let [cardsArray,setCardsArray] = useState()

  useEffect(()=>{
    fetch('https://dummyjson.com/posts')
    .then(res => res.json())
    .then(post => setCardsArray(post.posts));
  }, [])

  let [addNewClicked, setAddNewClicked] = useState(false)
  
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

    const addCard = (card) =>{
        fetch('https://dummyjson.com/posts/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: card.title,
            body: card.body,
            id: card.id,
            /* other post data */
          })
        })
        .then(res => res.json())
        .then(console.log);
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

          <Grid container spacing={4}>
                  {
                      cardsArray?.map(card=>(
                        <BlogCard card={card} key={card.id} deleteCard={deleteCard}></BlogCard>
                      ))
                  }
          </Grid>
      </Container>
  
    </>
  )
}

export default App
