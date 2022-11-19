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

function HomePage(props: { meetups: Meetup[] }) {
  return (
    <div>
      <MeetupList meetups={props.meetups} />
    </div>
  );
}

export async function getStaticProps() {
  //executes during the buid process
  // fetch data from API
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
}

export default HomePage;
