import {
  Drawer,
  styled,
  type Breakpoint,
  type CSSObject,
  type Theme,
} from '@mui/material';

type BreakpointNumberPair = [Breakpoint, number];

const createResponsiveWidthStyles = (theme: Theme): CSSObject => {
  const breakpointNumberPairs = Object.entries(theme.common.drawerWidth) as BreakpointNumberPair[];

  return breakpointNumberPairs.reduce<CSSObject>((prevProps, [brName, width]) => ({
    ...prevProps,
    [theme.breakpoints.up(brName)]: { width },
  }), {});
};

const SideBarContainer = styled(Drawer)(
  ({ theme }) => ({
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    overflowX: 'hidden',
    '& .MuiDrawer-paper': {
      padding: theme.spacing(3, 2),
      ...createResponsiveWidthStyles(theme),
    },
  }),
);

export default SideBarContainer;
