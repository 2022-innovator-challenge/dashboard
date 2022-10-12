import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Children, cloneElement, isValidElement, ReactElement } from 'react';

export default function InfoCard({
  title,
  value,
  imageBackgroundColor,
  children
}: {
  title: string;
  value: number;
  imageBackgroundColor: string;
  children: any;
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
          p: 2,
          color: 'white'
        }}
      >
        {addWidthHeightToChildren(children)}

        <Typography sx={{ fontSize: 50 }} fontWeight="bold">
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

function addWidthHeightToChildren(children: ReactElement) {
  return Children.map(children, child => {
    // Checking isValidElement is the safe way and avoids a
    // typescript error too.
    if (isValidElement(child)) {
      return cloneElement(child, {
        fontSize: 'large'
      } as any);
    }
  });
}
