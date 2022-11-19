import styles from '../styles/Home.module.css';
import MeetupList from '../components/meetups/MeetupList';
import type { Meetup } from '../components/meetups/MeetupList';

const DUMMY_MEETUPS: Meetup[] = [
  {
    id: 'm1',
    title: 'A Fist MeetUp',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1600px-Stadtbild_M%C3%BCnchen.jpg?20130611211153',
    address: 'Old Town of Munich (Germany)',
  },

  {
    id: 'm2',
    title: 'A Second MeetUp',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1600px-Stadtbild_M%C3%BCnchen.jpg?20130611211153',
    address: 'Old Town of Munich (Germany)',
  },

  {
    id: 'm3',
    title: 'A Three MeetUp',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1600px-Stadtbild_M%C3%BCnchen.jpg?20130611211153',
    address: 'Old Town of Munich (Germany)',
  },
];

function HomePage() {
  return (
    <div>
      <MeetupList meetups={DUMMY_MEETUPS} />
    </div>
  );
}

export default HomePage;
