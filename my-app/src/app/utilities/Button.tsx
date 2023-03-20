import React from 'react'
import styles from './button.module.css'

export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  children?: React.ReactNode
  color?: "primary" | "secondary" | "danger"
  disabled?: boolean
};

const Button = ({
  onClick,
  children,
  color = "primary",
  disabled,
}: ButtonProps) => {

  switch (color) {
    case "primary":
      return <button onClick={onClick} disabled={disabled} className={styles.button}>
        {children}
      </button>
      break;

    case "danger":
      return <button onClick={onClick} disabled={disabled} style={{ backgroundColor: 'red', fontWeight: 800 }} className={styles.button}>
        {children}
      </button>
      break;


    case "secondary":
      return <button onClick={onClick} disabled={disabled} style={{ backgroundColor: 'blue', color: 'white' }} className={styles.button}>
        {children}
      </button>
      break;

    default:
      return <button onClick={onClick} disabled={disabled} className={styles.button}>
        {children}
      </button>
      break;
  }

}

export default Button