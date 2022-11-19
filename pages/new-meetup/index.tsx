import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { Fragment } from 'react';
import { Meetup } from '../../components/meetups/MeetupList';

function NewMeetupPage() {
  const addMeetupHandler = (meetupData: Meetup) => {
    console.log(meetupData);
  };

  return (
    <Fragment>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;
