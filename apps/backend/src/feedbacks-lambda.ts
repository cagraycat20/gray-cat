// import { config } from './lib/config';
import { SNSHandler } from 'aws-lambda';
import uuidv4 from 'uuid/v4';
import { dateUtils } from '../../web-ui/src/shared';
import { db } from './lib/db-client';
import { createHandler } from './lib/lambda-handler';
import { ses } from './lib/ses-client';
import { emailRecipients, sendFeedbackEmail } from './lib/ses.utils';
import { HttpError, putFeedback, scanFeedbacks } from './lib/util';
import { Feedback } from './types';

export const getHandler = createHandler<Feedback>({required: true, adminOnly: true}, {
  get: async () => {
    return await scanFeedbacks(db);
  },
});

export const postHandler = createHandler<Feedback>({}, {
  post: async ({ body: feedback }) => {
    if (typeof feedback !== 'object') {
      throw new HttpError(400, 'Feedback must be an object');
    }

    feedback = {
      ...feedback,
      id: uuidv4(),
      created_at: dateUtils.getCurrentUnixTime(),
    };

    await putFeedback(db, feedback);
    await sendFeedbackEmail(feedback);

    return feedback;
  },
});

export const supportEmailHandler: SNSHandler = async (event) => {
  const msgInfo = JSON.parse(event.Records[0].Sns.Message);

  try {
    // don't process spam messages
    if (msgInfo.receipt.spamVerdict.status === 'FAIL' || msgInfo.receipt.virusVerdict.status === 'FAIL') {
      // tslint:disable-next-line: no-console
      console.log('Message is spam or contains virus, ignoring.');
    }

    let email = msgInfo.content;
    let headers = 'From: ' + msgInfo.mail.commonHeaders.to[0] + '\r\n';
    headers += 'Reply-To: ' + msgInfo.mail.commonHeaders.from[0] + '\r\n';
    headers += 'X-Original-To: ' + msgInfo.mail.commonHeaders.to[0] + '\r\n';
    headers += 'To: ' + emailRecipients.join(', ') + '\r\n';
    headers += 'Subject: Fwd: ' + msgInfo.mail.commonHeaders.subject + '\r\n';

    if (email) {
      let res;
      res = email.match(/Content-Type:.+\s*boundary.*/);
      if (res) {
        headers += res[0] + '\r\n';
      } else {
        res = email.match(/^Content-Type:(.*)/m);
        if (res) {
          headers += res[0] + '\r\n';
        }
      }

      res = email.match(/^Content-Transfer-Encoding:(.*)/m);
      if (res) {
        headers += res[0] + '\r\n';
      }

      res = email.match(/^MIME-Version:(.*)/m);
      if (res) {
        headers += res[0] + '\r\n';
      }

      const splitEmail = email.split('\r\n\r\n');
      splitEmail.shift();

      email = headers + '\r\n' + splitEmail.join('\r\n\r\n');
    } else {
      email = headers + '\r\n' + 'Empty email';
    }

    const result = await ses.sendRawEmail({
      RawMessage: { Data: email },
    }).promise();
    // tslint:disable-next-line: no-console
    console.log(`Support message sent: ${result.MessageId}`, email);
  } catch (e) {
    // tslint:disable-next-line: no-console
    console.log('Support message ERROR:', e, event);
  }
};
