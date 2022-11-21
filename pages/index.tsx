import styles from '../styles/Home.module.css';
import MeetupList from '../components/meetups/MeetupList';
import type { Meetup } from '../components/meetups/MeetupList';
import { GetStaticProps } from 'next';
import { MongoClient } from 'mongodb';

// const DUMMY_MEETUPS: Meetup[] = [
//   {
//     id: 'm1',
//     title: 'A Fist MeetUp',
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1600px-Stadtbild_M%C3%BCnchen.jpg?20130611211153',
//     address: 'Old Town of Munich (Germany)',
//   },

//   {
//     id: 'm2',
//     title: 'A Second MeetUp',
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1600px-Stadtbild_M%C3%BCnchen.jpg?20130611211153',
//     address: 'Old Town of Munich (Germany)',
//   },

//   {
//     id: 'm3',
//     title: 'A Three MeetUp',
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1600px-Stadtbild_M%C3%BCnchen.jpg?20130611211153',
//     address: 'Old Town of Munich (Germany)',
//   },
// ];

interface IMeetups {
  meetups: Meetup[];
}

function HomePage(props: IMeetups) {
  console.log('HomePage');
  return <MeetupList meetups={props.meetups} />;
}

// THIS CODE WILL RUN ON THE SERVER
//  on every request
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   fetch data
//   const req = context.req;
//   const rres = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

// gets data for prerendered page
//  at every < N > seconds
export const getStaticProps: GetStaticProps = async () => {
  //executes during the buid process
  // connect and save get data from database
  const databaseURI =
    'mongodb+srv://admin-vasily:vm6rJTtrHFjlwntr@todocluster.kf4x7.mongodb.net/?retryWrites=true&w=majority';
  const client = await MongoClient.connect(databaseURI);
  //use only URL encoded characters
  const db = client.db('meetupsDB');
  const meetupCollection = db.collection('meetups');
  const meetupsFromDB = await meetupCollection.find().toArray();
  client.close();
  const staticProps: IMeetups = {
    meetups: meetupsFromDB.map((meetup) => ({
      id: meetup._id.toString(),
      time: meetup.time,
      title: meetup.title,
      image: meetup.image,
      address: meetup.address,
      description: meetup.description,
    })),
  };
  return {
    props: staticProps,
    revalidate: 10, // ecery 10 seconds it will be SSG on the srever for newer data
  };
};

export default HomePage;
