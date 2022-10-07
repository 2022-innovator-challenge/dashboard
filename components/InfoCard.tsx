import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

export default function InfoCard({
  title,
  value,
  imageSrc,
  imageBackgroundColor
}: {
  title: string;
  value: number;
  imageSrc: string;
  imageBackgroundColor: string;
}) {
  return (
    <Card sx={{ minWidth: 350, width: '100%' }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          width: '100%',
          height: '100px',
          background: imageBackgroundColor,
          p: 2
        }}
      >
        <CardMedia
          component="img"
          height="100%"
          image={imageSrc}
          sx={{
            'object-fit': 'contain',
            filter: 'invert(100%)',
            width: 'auto'
          }}
          alt={`${title} Image`}
        />
        <Typography color="white" sx={{ fontSize: 50 }} fontWeight="bold">
          {value}
        </Typography>
      </Stack>
      <CardContent>
        <Typography sx={{ fontSize: 20 }} gutterBottom>
          {title}
        </Typography>

        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
