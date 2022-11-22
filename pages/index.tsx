import styles from '../styles/Home.module.css';
import MeetupList from '../components/meetups/MeetupList';
import type { Meetup } from '../components/meetups/MeetupList';
import { GetStaticProps } from 'next';
import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';
// import dotenv from 'dotenv-safe';
// dotenv.config();

interface IMeetups {
  meetups: Meetup[];
}

function HomePage(props: IMeetups) {
  console.log('HomePage', process.env.NEXT_PUBLIC_MY_PUBLIC_ENV_VAR);
  return (
    <Fragment>
      <Head>
        <title>Meetups</title>
        <meta name='description' content='Create, store, browse and use a highly reactive list of meetups' />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
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
  const USER = process.env.DB_USERNAME;
  const PASS = process.env.DB_PASSWORD;
  const databaseURI = `mongodb+srv://${USER}:${PASS}@todocluster.kf4x7.mongodb.net/?retryWrites=true&w=majority`;
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
    revalidate: 2, // every 2 seconds it will be SSG on the srever for newer data
  };
};

export default HomePage;
