import { useRouter } from 'next/router';
import { Fragment } from 'react';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import type { GetStaticProps, GetStaticPaths } from 'next';
import type { Meetup } from '../../components/meetups/MeetupList';
import { MongoClient, ObjectId } from 'mongodb';

interface IMeetupDetail {
  meetupData: Meetup;
}

function MeetupPage(props: IMeetupDetail) {
  console.log('MeetupPage');
  return (
    <Fragment>
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
  const databaseURI =
    'mongodb+srv://admin-vasily:vm6rJTtrHFjlwntr@todocluster.kf4x7.mongodb.net/?retryWrites=true&w=majority';
  const client = await MongoClient.connect(databaseURI);
  //use only URL encoded characters
  const db = client.db('meetupsDB');
  const meetupCollection = db.collection('meetups');
  const meetupsIdsFromDB = await meetupCollection.find({}, { projection: { _id: true } }).toArray();
  console.log('meetupsIdsFromDB', meetupsIdsFromDB);
  client.close();

  return {
    fallback: false, // no altering in pregenerated paths, only those are in paths:[]
    //fallback: true, // next will try generate paths when user enters another path
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

  const databaseURI =
    'mongodb+srv://admin-vasily:vm6rJTtrHFjlwntr@todocluster.kf4x7.mongodb.net/?retryWrites=true&w=majority';
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
