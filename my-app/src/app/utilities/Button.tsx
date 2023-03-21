import React from 'react';
import styles from './button.module.css';

export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
};

const Button = ({
  onClick,
  children,
  color = 'primary',
  disabled,
}: ButtonProps) => {
  let buttonStyle;

  switch (color) {
    case 'primary':
      buttonStyle = styles.primaryButton;
      break;

    case 'danger':
      buttonStyle = styles.dangerButton;
      break;

    case 'secondary':
      buttonStyle = styles.secondaryButton;
      break;

    default:
      buttonStyle = styles.button;
      break;
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${buttonStyle}`}
      style={color === 'danger' ? { backgroundColor: 'red', fontWeight: 800 } : color === 'secondary' ? { backgroundColor: 'blue', color: 'white' } : {}}
    >
      {children}
    </button>
  );
};

export default Button;
