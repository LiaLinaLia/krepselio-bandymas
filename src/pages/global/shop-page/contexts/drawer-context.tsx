import * as React from 'react';

type DrawerContextType = {
  open: boolean,
  toggleDrawer: VoidFunction,
};

const DrawerContext = React.createContext<DrawerContextType>({} as DrawerContextType);

type DrawerProviderProps = {
  children: React.ReactNode
};

export const DrawerProvider: React.FC<DrawerProviderProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  const drawerContextValue = React.useMemo(() => ({
    open,
 toggleDrawer: () => setOpen(!open),
  }), [open]);

  return (
    <DrawerContext.Provider value={drawerContextValue}>
      {children}
    </DrawerContext.Provider>
  );
};

export default DrawerContext;
