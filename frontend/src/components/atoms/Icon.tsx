import { SvgIcon } from '@mui/material';
import type { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps extends SvgIconProps {
  name: 'menu' | 'close' | 'trademark' | 'home' | 'add';
}

export const Icon = ({ name, ...props }: IconProps) => {
  const getIconPath = () => {
    switch (name) {
      case 'menu':
        return 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z';
      case 'close':
        return 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z';
      case 'trademark':
        return 'M9.93 13.5h4.14L12 7.98 9.93 13.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z';
      case 'home':
        return 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z';
      case 'add':
        return 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z';
      default:
        return '';
    }
  };

  return (
    <SvgIcon {...props}>
      <path d={getIconPath()} />
    </SvgIcon>
  );
};