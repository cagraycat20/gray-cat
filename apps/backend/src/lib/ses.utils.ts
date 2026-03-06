import { AWSError } from 'aws-sdk/lib/error';
import { Feedback } from '../types';
import { ses } from './ses-client';

interface FeedbackTemplateData {
  subject: string;
  name: string;
  email: string;
  text: string;
}

interface NewUserTemplateData {
  userId: string;
}

type TemplateData = FeedbackTemplateData | NewUserTemplateData;

const {FEEDBACK_EMAIL_TEMPLATE = '', NEW_USER_EMAIL_TEMPLATE = ''} = process.env;

export const emailRecipients = [ // TODO move list to system table or add flag to user settings
  'evgsil@gmail.com',
  'thebiktop@gmail.com',
  'andriy.prudyus@gmail.com',
];

const sendEmail = async (name: string, data: TemplateData) => {
  try {
    const result = await ses.sendTemplatedEmail(
      {
        Source: 'feedback@protomeal.com',
        Template: name,
        Destination: {
          ToAddresses: emailRecipients,
        },
        TemplateData: JSON.stringify(data),
      },
    ).promise();
    // tslint:disable-next-line: no-console
    console.log(`Message ${name} sent: ${result.MessageId}`, data);
  } catch (e) {
    // tslint:disable-next-line: no-console
    console.error(`Message ${name} sending error: ${(e as AWSError).message}`, data);
  }
};

export const sendFeedbackEmail = (feedback: Feedback) => sendEmail(FEEDBACK_EMAIL_TEMPLATE, {
  name: feedback.name || '',
  email: feedback.email || '',
  text: feedback.text || '',
  subject: (feedback.text || '').slice(0, 50),
});

export const sendNewUserEmail = (userId: string) => sendEmail(NEW_USER_EMAIL_TEMPLATE, {
  userId,
});
