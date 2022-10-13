import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Children, cloneElement, isValidElement, ReactElement } from 'react';

export default function InfoCard({
  title,
  value,
  color,
  icon,
}: {
  title: string;
  value: string;
  color: string;
  icon: any;
}) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          {addStyleToIcon(icon, color)}
          <Stack>
            <Typography sx={{ mb: -0.5 }}>{title}</Typography>
            <Typography
              color={color}
              sx={{ fontSize: 20, mt: -0.5 }}
              fontWeight="bold"
            >
              {value}
            </Typography>
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>Details</AccordionDetails>
    </Accordion>
  );
}

function addStyleToIcon(children: ReactElement, htmlColor: string) {
  return Children.map(children, child => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        fontSize: 'large',
        htmlColor
      } as any);
    }
  });
}
