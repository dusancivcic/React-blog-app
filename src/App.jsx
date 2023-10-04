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
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';

function App() {

  let [cardsArray,setCardsArray] = useState()
  let [editedCard, setEditedCard] = useState({id: '', title: '', body: '', userId: ''})
  let [searchText, setSearchText] = useState('');

 

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

  const handleSearchInput = event =>{
    setSearchText(event.target.value.toLowerCase())
}

  //PAGINATION
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;


  // Get the items for the current page

    const currentItems = cardsArray?.slice(startIndex, endIndex);
    const totalPages = Math.ceil(cardsArray?.length / itemsPerPage);

  

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

      const paginationChange = (e,p) =>{
        setCurrentPage(p)
      }

  return (
    <>
     <Container>
          <Stack style={{marginBottom: '80px', justifyContent: 'space-between'}} direction="row" spacing={2} >
            <Typography style={{fontSize: '40px'}} component="h1">
              Our blog
            </Typography>
            <Stack direction="row" style={{ alignItems: 'center'}}>
              <TextField id="outlined-basic" label="Search" variant="outlined" onChange={handleSearchInput} />
              <Button onClick={()=>setAddNewClicked(true)}>Add new</Button>
            </Stack>
          </Stack>
          
          <AddNewCard addNewClicked={addNewClicked} addNewClickedClosed={addNewClickedClosed} addCard={addCard}></AddNewCard>
          <EditCard editCardHandler={editCardHandler} editedCard={editedCard} editClicked={editClicked} editIsClicked={editIsClicked}></EditCard>
          <Grid container spacing={4}>
                  
                  {   searchText==='' 
                      ?
                      currentItems?.map(card=> (
                        <BlogCard card={card} key={card.id} deleteCard={deleteCard} editCard={editCard} editClicked={editClicked}></BlogCard>
                      ))
                      :
                      currentItems?.filter(cardSearch=> cardSearch.title.includes(searchText)).map(card=> (
                        <BlogCard card={card} key={card.id} deleteCard={deleteCard} editCard={editCard} editClicked={editClicked}></BlogCard>
                      ))
                  }
                  
          </Grid>
          <Pagination count={totalPages} style={{marginTop: '40px', justifyContent: 'center'}} shape="rounded" onChange={paginationChange} />
      </Container>
  
    </>
  )
}

export default App
