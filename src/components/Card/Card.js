import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
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

export default function RecipeReviewCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 645 }}>
      <CardHeader
        title={props.infos.nameProduct} 
        subheader={props.infos.uploadDate} 
      />
      <CardMedia
        component="img"
        height="434"
        //{require('assets/img/bg2.jpg')}
        image={props.infos.urlImg}        
        alt=""
      />
      <CardContent>
        <Typography style={props.infos.result===true?{color:"#04AA6D"}:{color:"red"}} variant="h4">
        {props.infos.result? 'Là sản phẩm thật' : 'Là sản phẩm giả'}{props.infos.result===true? <CheckIcon fontSize="true" />: <PriorityHighIcon fontSize="large" />}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Thông tin sản phẩm :</Typography>
          <Typography paragraph>
          {props.infos.infoProduct} 
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}