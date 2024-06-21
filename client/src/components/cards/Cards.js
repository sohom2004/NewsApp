import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setArticle } from '../../redux/article';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const truncateText = (text, limit) => {
    if (text.length > limit) {
        return text.substring(0, limit) + '...';
    }
    return text;
}

const Cards = (props) => {
    const dispatch = useDispatch();


    const handleArticleClick = () => {
        dispatch(setArticle({ title: props.title, image: props.image, content: props.content, url: props.url }));
    };

    const truncatedTitle = truncateText(props.title, 50);
    return (
        <Card sx={{ maxWidth: 345, height: 400, marginBottom: "15px", '&:hover': {boxShadow: "0 10px 20px rgba(0,0,0,0.2)"} }}>
            <CardHeader sx={{height: 100}}
                title={truncatedTitle}
            />
            <CardMedia
                component="img"
                height="194"
                image={props.image}
                alt="news img"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{width: "40ch", overflow: "hidden", whiteSpace: "nowrap",textOverflow: "ellipsis"}}>
                    {props.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <Link href={`/article/${encodeURIComponent(props.title)}`} onClick={handleArticleClick}>Read more...</Link>
            </CardActions>
        </Card>
    );
}

export default Cards
// 