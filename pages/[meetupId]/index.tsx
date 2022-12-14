import { Fragment } from 'react';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import type { GetStaticProps, GetStaticPaths } from 'next';
import type { Meetup } from '../../components/meetups/MeetupList';
import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';

interface IMeetupDetail {
  meetupData: Meetup;
}

function MeetupPage(props: IMeetupDetail) {
  console.log('MeetupPage');
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        id={props.meetupData.id}
        time={props.meetupData.time}
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}
export default MeetupPage;

export const getStaticPaths: GetStaticPaths = async () => {
  // connect and save get data from database

  const USER = process.env.DB_USERNAME;
  const PASS = process.env.DB_PASSWORD;
  const databaseURI = `mongodb+srv://${USER}:${PASS}@todocluster.kf4x7.mongodb.net/?retryWrites=true&w=majority`;

  const client = await MongoClient.connect(databaseURI);
  //use only URL encoded characters
  const db = client.db('meetupsDB');
  const meetupCollection = db.collection('meetups');
  const meetupsIdsFromDB = await meetupCollection.find({}, { projection: { _id: true } }).toArray();
  console.log('meetupsIdsFromDB', meetupsIdsFromDB);
  client.close();

  return {
    //fallback: false, // no altering in pregenerated paths, only those are in paths:[]
    // fallback: true, // next will try generate paths when user enters another path
    fallback: 'blocking', // show nothing untill generation of the page
    paths: meetupsIdsFromDB.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const meetupId = context.params?.meetupId;
  console.log('getStaticProps', meetupId);
  // fetch and return
  // connect and save get data from database

  const USER = process.env.DB_USERNAME;
  const PASS = process.env.DB_PASSWORD;
  const databaseURI = `mongodb+srv://${USER}:${PASS}@todocluster.kf4x7.mongodb.net/?retryWrites=true&w=majority`;

  const client = await MongoClient.connect(databaseURI);
  const db = client.db('meetupsDB');
  const meetupCollection = db.collection('meetups');
  let query = { _id: new ObjectId(meetupId as string) };
  const selectedMeetup = await meetupCollection.findOne(query);
  console.log('selectedMeetup', selectedMeetup);
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup?._id.toString(),
        image: selectedMeetup?.image,
        title: selectedMeetup?.title,
        address: selectedMeetup?.address,
        description: selectedMeetup?.description,
      },
    },
  };
  // revalidate: 2
};
