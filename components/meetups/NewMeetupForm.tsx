import React, { useRef } from 'react';

import Card from '../ui/Card';
import type { Meetup } from './MeetupList';
import classes from './NewMeetupForm.module.css';

export interface INewMeetupForm {
  onAddMeetup: (data: Partial<Meetup>) => void;
}

function NewMeetupForm(props: INewMeetupForm) {
  const titleInputRef = useRef<HTMLInputElement>(null!);
  const imageInputRef = useRef<HTMLInputElement>(null!);
  const addressInputRef = useRef<HTMLInputElement>(null!);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null!);

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData: Partial<Meetup> = {
      time: new Date().toISOString(),
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };

    props.onAddMeetup(meetupData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Meetup Title</label>
          <input type='text' required id='title' ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='image'>Meetup Image URL</label>
          <input type='url' required id='image' ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='address'>Address</label>
          <input type='text' required id='address' ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea id='description' required rows={5} ref={descriptionInputRef}></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;
