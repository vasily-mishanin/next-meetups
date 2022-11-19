import { useRouter } from 'next/router';
import { Fragment } from 'react';
import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupPage() {
  const router = useRouter();
  return (
    <Fragment>
      <MeetupDetail
        id='m1'
        image='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1600px-Stadtbild_M%C3%BCnchen.jpg?20130611211153'
        title='Meetup Title'
        address='Voronezh city'
        description='What about some more info?'
      />
    </Fragment>
  );
}
export default MeetupPage;
