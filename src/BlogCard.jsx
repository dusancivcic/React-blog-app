import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

const BlogCard = ({cardsArray}) =>{
    return(
       <>
            <Container>
                    <Grid container spacing={4}>
                {
                                cardsArray?.map(card=>(
                                    <Grid item xs={4}>
                                            <Card style={{height: '100%'}}>
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                    {card.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                    {card.body}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button>Read more</Button>
                                                    <Button>Edit</Button>
                                                    <Button>Delete</Button>
                                                </CardActions>
                                            </Card>
                                </Grid>
                                    
                                    
                                ))
                            }
                </Grid>
            </Container>
       </>
    )
}

export default BlogCard;