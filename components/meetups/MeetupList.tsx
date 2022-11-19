import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';

export type Meetup = {
  id: string;
  title: string;
  image: string;
  address: string;
};

function MeetupList({ meetups }: { meetups: Meetup[] }) {
  return (
    <ul className={classes.list}>
      {meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
