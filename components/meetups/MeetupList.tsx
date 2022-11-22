import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';

export type Meetup = {
  id: string;
  time: string;
  title: string;
  image: string;
  address: string;
  description?: string;
};

function MeetupList({ meetups }: { meetups: Meetup[] }) {
  console.log('List', meetups);
  return (
    <ul className={classes.list}>
      {meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          time={meetup.time}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
