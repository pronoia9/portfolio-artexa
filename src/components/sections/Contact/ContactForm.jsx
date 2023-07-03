import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { styled } from 'styled-components';

import { SectionTitle, ContactInput } from '../../';
import { dataStore } from '../../../store/dataStore';
import { GradientButton } from '../../../styles';
import { buttonMotion, handleFormSubmit } from '../../../utils';

export const ContactForm = () => {
  const [success, setSuccess] = useState(false);
  const data = dataStore((state) => state.contact.form);

  const formikOptions = {
    initialValues: data.default,
    validationSchema: Yup.object({
      name: Yup.string().max(35, 'Must be 35 characters or less').required('Required'),
      subject: Yup.string().max(100, 'Must be 100 characters or less').required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      // message: Yup.string().max(800, 'Must be 800 characters or less').required('Required'),
    }),
    onSubmit: (values, actions) => handleFormSubmit(values, actions, setSuccess),
  };

  return (
    <div className='col-lg-12'>
      <SectionTitle title={data.title} />

      <div className='art-a art-card'>
        <Formik {...formikOptions}>
          {(formik) => (
            <Form id='form' className='art-contact-form'>
              <ContactInput name='name' type='text' icon='fas fa-user' active={formik.values.name} />
              <ContactInput name='subject' type='text' icon='fas fa-inbox' active={formik.values.subject} />
              <ContactInput name='email' type='email' icon='fas fa-at' active={formik.values.email} />
              <ContactInput name='message' type='textarea' icon='fas fa-envelope' as='textarea' active={formik.values.message} />

              <ButtonContainer className='art-submit-frame'>
                <GradientButton className='art-submit' type='submit' {...buttonMotion.gradient}>
                  {success ? 'Message Sent' : formik.isSubmitting ? 'Sending Message' : 'Send Message'}
                  {success ? <i className='fas fa-check' /> : !formik.isSubmitting && <i className='far fa-paper-plane' />}
                </GradientButton>
              </ButtonContainer>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const ButtonContainer = styled.div`
  position: relative;
  height: 45px;
  /* width: 200px;
  margin: 0 auto; */

  button {
    position: relative;
    margin: 0;
    overflow: hidden;
    z-index: 999;
    float: right;
    display: flex;
    flex-direction: row;
    gap: 5px;

    &:focus {
      outline: inherit;
    }
  }
`;
