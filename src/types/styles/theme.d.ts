import { CSSObject, Breakpoint } from '@mui/material';

declare module '@mui/material/styles/createTheme' {
  interface ThemeOptions {
    common?: {
      drawerWidth: {
        [breakpointName in Breakpoint]?: number
      }
    }
  }

  interface Theme {
    common: {
      drawerWidth: {
        [breakpointName in Breakpoint]?: number
      },
    }
  }
}

declare module '@mui/material/styles/createMixins' {
  interface MixinsOptions {
    drawer: {
      openedMixin: CSSObject,
      closedMixin: CSSObject,
    }
  }

  interface Mixins {
    drawer: {
      openedMixin: CSSObject,
      closedMixin: CSSObject,
    }
  }
}

declare module '@mui/material/styles/zIndex' {
  export interface ZIndex {
    drawerButton: number,
  }
}
