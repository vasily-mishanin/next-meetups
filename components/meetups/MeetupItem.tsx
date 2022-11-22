import Card from '../ui/Card';
import classes from './MeetupItem.module.css';
import type { Meetup } from './MeetupList';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { mountainsImagePlaceholder } from '../../assets/mountainsImagePlaceholder';

function MeetupItem(props: Meetup) {
  const router = useRouter();

  const showDetailsHandler = () => {
    console.log('showDetailsHandler', props.id);
    router.push(`/${props.id}`);
  };

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <Image
            src={props.image}
            alt={props.title}
            fill
            // width={500}
            // height={400}
            placeholder='blur'
            blurDataURL={mountainsImagePlaceholder}
          />
        </div>
        <div className={classes.content}>
          <h2>{props.title}</h2>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
