'use client'

import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';

import { SectionTitle, ButtonGradient, ContactInput } from '@/components';
import { cardMotion, contactMotion, handleFormSubmit, contact } from '@/utils';

export const ContactForm = () => {
  const [success, setSuccess] = useState(false);
  const data = contact.form;

  const formikOptions = {
    initialValues: data.default,
    validationSchema: Yup.object({
      name: Yup.string().max(35, 'Must be 35 characters or less').required('Required'),
      subject: Yup.string().max(100, 'Must be 100 characters or less').required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      message: Yup.string().max(800, 'Must be 800 characters or less').required('Required'),
    }),
    onSubmit: (values, actions) => handleFormSubmit(values, actions, setSuccess),
  };

  return (
    <motion.div className='col-lg-12' {...contactMotion.formContainer}>
      <SectionTitle title={data.title} />

      <motion.div className='art-a art-card' {...cardMotion.form}>
        <Formik {...formikOptions}>
          {(formik) => (
            <Form id='form' className='art-contact-form'>
              <ContactInput name='name' type='text' icon='fas fa-user' active={formik.values.name} />
              <ContactInput name='subject' type='text' icon='fas fa-inbox' active={formik.values.subject} />
              <ContactInput name='email' type='email' icon='fas fa-at' active={formik.values.email} />
              <ContactInput name='message' as='textarea' icon='fas fa-envelope' active={formik.values.message} />

              <ButtonGradient
                className='art-submit'
                type='submit'
                title={`${success ? 'Message Sent' : formik.isSubmitting ? 'Sending Message' : 'Send Message'}`}
                $position='right'
              >
                {success ? <i className='fas fa-check' /> : !formik.isSubmitting && <i className='far fa-paper-plane' />}
              </ButtonGradient>
            </Form>
          )}
        </Formik>
      </motion.div>
    </motion.div>
  );
};
