import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { Fragment } from 'react';
import { Meetup } from '../../components/meetups/MeetupList';
import { useRouter } from 'next/router';
import Head from 'next/head';

function NewMeetupPage() {
  const router = useRouter();
  const addMeetupHandler = async (meetupData: Partial<Meetup>) => {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: { 'Content-Type': 'application/json' },
    });
    const resData = await response.json();
    router.replace('/');
  };

  return (
    <Fragment>
      <Head>
        <title>Meetups:add</title>
        <meta name='description' content='Add new meetup to create networking opportunities' />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;
