import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

declare global {
  type MuiIconComponent = OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string };
}
