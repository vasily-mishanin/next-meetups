import { Fragment } from 'react';
import { Meetup } from './MeetupList';
import classes from './MeetupDetail.module.css';

function MeetupDetail(props: Meetup) {
  console.log('MeetupDetail');

  return (
    <section className={classes.detail}>
      <img className={classes.image} src={props.image} alt={props.title} />
      <h2 className={classes.title}>{props.title}</h2>
      <address className={classes.address}>{props.address}</address>
      <p className={classes.description}>{props.description}</p>
    </section>
  );
}

export default MeetupDetail;
