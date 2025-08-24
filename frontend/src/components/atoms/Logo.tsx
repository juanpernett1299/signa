import { Avatar } from '@mui/material';

interface LogoProps {
  src: string;
  alt: string;
  size?: number;
}

export const Logo = ({ src, alt, size = 40 }: LogoProps) => {
  return (
    <Avatar
      src={src}
      alt={alt}
      sx={{
        width: size,
        height: size,
        borderRadius: 1,
        bgcolor: '#333333'
      }}
    />
  );
};