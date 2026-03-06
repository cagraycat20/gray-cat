import SES from 'aws-sdk/clients/ses';

export const ses = new SES({
  apiVersion: '2010-12-01',
});
