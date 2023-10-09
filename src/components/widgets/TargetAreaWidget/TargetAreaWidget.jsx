import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ColonImage from '../../../images/colonImage.png';
import HeartImage from '../../../images/heartImage.png';
import LungImage from '../../../images/lungImage.png';
import ImageNotFound from '../../../images/imageNotFound.png';

function TargetAreaWidget({ cancerType, result }) {
  let color = 'rgba(217,217,217)';
  function resultColor(result) {
    if (result >= 70 && result <= 100) {
      color = 'rgba(254, 114, 114, 0.5)';
    } else if (result >= 30 && result < 70) {
      color = 'rgba(255,177,81,0.5)';
    } else if (result >= 0 && result < 30) {
      color = 'rgba(0,221,115,0.5)';
    }
    console.log(color);
    return color;
  }

  function resultBorderColor(result) {
    if (result >= 70 && result <= 100) {
      color = 'red';
    } else if (result >= 30 && result < 70) {
      color = 'orange';
    } else if (result >= 0 && result < 30) {
      color = 'green';
    }
    console.log(color);
    return color;
  }

  function imageSelector(cancerType) {
    let selectedImage;
    switch (cancerType) {
      case 'Colon Cancer':
        selectedImage = ColonImage;
        break;
      case 'Heart Cancer':
        selectedImage = HeartImage;
        break;
      case 'Lung Cancer':
        selectedImage = LungImage;
        break;
      default:
        selectedImage = ImageNotFound;
    }
    return selectedImage;
  }

  return (
    <Card
      size="md"
      variant="outlined"
      sx={{
        width: 300,
        height: 100,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: '85px',
          height: '85px',
          borderRadius: 5,
          marginLeft: '0.5rem',
        }}
      >
        <CardMedia
          component="img"
          image={imageSelector(cancerType)}
          alt="Colon Image"
        />
      </Card>
      <Card
        sx={{
          display: 'flex',
          backgroundColor: '#D9D9D9',
          height: '40%',
          boxShadow: 'none',
          borderRadius: 3,
        }}
      >
        <Typography padding={1}>{cancerType}</Typography>
      </Card>
      <Card
        variant="outlined"
        sx={{
          marginRight: '0.5rem',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: resultBorderColor(result),
          backgroundColor: resultColor(result),
        }}
      >
        {result}%
      </Card>
    </Card>
  );
}

export default TargetAreaWidget;
