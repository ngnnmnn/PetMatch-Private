import React from 'react';

interface PetMatchLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  variant?: 'solid' | 'gradient';
}

/**
 * PetMatchLogo: Logo biểu tượng thương hiệu chính thức của PetMatch.
 * Ý tưởng thiết kế: Đệm bàn chân thú cưng hình trái tim (biểu trưng cho sự kết nối & ghép đôi - Match)
 * kết hợp 4 đệm ngón cách điệu dáng tai thú cưng năng động.
 */
export default function PetMatchLogo({
  size = 24,
  variant = 'solid',
  className = '',
  ...props
}: PetMatchLogoProps) {
  const gradientId = React.useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="PetMatch Logo"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="15%" y1="10%" x2="85%" y2="90%">
          <stop offset="0%" stopColor="#FF7A3D" />
          <stop offset="100%" stopColor="#E45D1C" />
        </linearGradient>
      </defs>

      {/* Đệm trung tâm: Trái tim biểu trưng cho tình yêu và sự ghép đôi (Match) */}
      <path
        d="M50 78 C32 64 22 52 22 39 C22 28.5 30.5 20 41 20 C46.8 20 50 23.5 50 23.5 C50 23.5 53.2 20 59 20 C69.5 20 78 28.5 78 39 C78 52 68 64 50 78 Z"
        fill={variant === 'gradient' ? `url(#${gradientId})` : 'currentColor'}
      />

      {/* 4 đệm ngón xung quanh cách điệu tai cún & tai mèo tròn đáng yêu */}
      {/* Ngón ngoài cùng bên trái */}
      <ellipse
        cx="16"
        cy="42"
        rx="7.5"
        ry="11"
        transform="rotate(-28 16 42)"
        fill={variant === 'gradient' ? `url(#${gradientId})` : 'currentColor'}
      />

      {/* Ngón trong bên trái */}
      <ellipse
        cx="33"
        cy="15"
        rx="8"
        ry="12"
        transform="rotate(-12 33 15)"
        fill={variant === 'gradient' ? `url(#${gradientId})` : 'currentColor'}
      />

      {/* Ngón trong bên phải */}
      <ellipse
        cx="67"
        cy="15"
        rx="8"
        ry="12"
        transform="rotate(12 67 15)"
        fill={variant === 'gradient' ? `url(#${gradientId})` : 'currentColor'}
      />

      {/* Ngón ngoài cùng bên phải */}
      <ellipse
        cx="84"
        cy="42"
        rx="7.5"
        ry="11"
        transform="rotate(28 84 42)"
        fill={variant === 'gradient' ? `url(#${gradientId})` : 'currentColor'}
      />
    </svg>
  );
}

