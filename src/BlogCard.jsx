import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


const BlogCard = ({card,deleteCard}) =>{
    return(
       <>
            <Grid item xs={4}>
                <Card style={{height: '100%'}} id={card.id}>
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
                        <Button onClick={()=>{deleteCard(card.id)}}>Delete</Button>
                    </CardActions>
                </Card>
            </Grid>
       </>
    )
}

export default BlogCard;