import { ReactNode } from 'react';
import classes from './Card.module.css';

function Card(props: { children: ReactNode }) {
  return <div className={classes.card}>{props.children}</div>;
}

export default Card;
