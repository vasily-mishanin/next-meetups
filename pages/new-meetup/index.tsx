import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { Fragment } from 'react';
import { Meetup } from '../../components/meetups/MeetupList';
import { useRouter } from 'next/router';

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
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;
