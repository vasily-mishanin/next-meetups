import { Meetup } from './MeetupList';
import classes from './MeetupDetail.module.css';
import Image from 'next/image';
import { mountainsImagePlaceholder } from '../../assets/mountainsImagePlaceholder';

function MeetupDetail(props: Meetup) {
  console.log('MeetupDetail');

  return (
    <section className={classes.detail}>
      <div className={classes.image}>
        <Image
          src={props.image}
          alt={props.title}
          fill
          placeholder='blur'
          blurDataURL={mountainsImagePlaceholder}
        />
      </div>
      <h2 className={classes.title}>{props.title}</h2>
      <address className={classes.address}>{props.address}</address>
      <p className={classes.description}>{props.description}</p>
    </section>
  );
}

export default MeetupDetail;
