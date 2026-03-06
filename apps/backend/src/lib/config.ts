export const config = {
  rootUserName: 'transparent_koala',

  cognito: {
    issuer: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_w7qZdMnkK',
    clientId: '2qnn7ct7m50u2fekrj42711jqs',

    // from: https://cognito-idp.us-east-1.amazonaws.com/us-east-1_w7qZdMnkK/.well-known/jwks.json
    jwks: {
      keys: [
        {
          alg: 'RS256',
          e: 'AQAB',
          kid: 'BzolJLU+2dXvR90FIJj+5RKdgan0Mv02YPtSaJ31WYg=',
          kty: 'RSA',
          // tslint:disable-next-line
          n: 'ulUaoGnq1oA-vmWl7KX24FPLMwkUi6IGoahDp9YI-yQSFMCJhQHcrjMUvxJ_X3tNY3agqrl-2LEEQFJz2GD2z4_O8TwMLB3t8yCQ7rhGy2Uademc1R7Tw9D0AW25oWh_t3QuJd5fyGVPOVZXbhfNoVAX-EDluxQ4CZmV_eHtWehJ1RPNNGbKBZgNpJpNkrosZXhvBSmYImapKJb8sftvFRhcd9r6jTNCT_FQnhVjGA5p_J2ZD-wJ3ssnW1oupxihmP3pqOhZ1sVJ2LxM2FTptUDv6dArzzM9Betrtmj5X_McAIhGwYMBviqY2Fcz734EJiP9b8xA0MoTI_ixsgZZJQ',
          use: 'sig',
        },
        {
          alg: 'RS256',
          e: 'AQAB',
          kid: '+mKFzstv4gcyvK8QO7P0bFddW7y87fJJemcTsW/GH2s=',
          kty: 'RSA',
          // tslint:disable-next-line
          n: '6MtE5yelPZ2BagQ6AC6gVMBU89ZAtH6v5RoK6WQGO-GBm8kSddoTY_5NBTYofdiYI84l9JEg-k2gw7oJbV9l-IWDS_Z_JUu0neJY6mQ2a9lzW8mNInVse8qXFMSPkspPQPgjtFrMMfBkloIn-0ISG59aRwJUt2ZyjDdIUiKFePiWPb1imjIGrOEWvwNHj2SMpbUtTkwfYugjZPzL4K8eKsTwQC5OnN8Q1MyvfWi7fGnSJt0wZTkv70opZQVo8uAjp7zT6ArNOOLH3ClmIcIH1zQQGt9KPrYNoAE0U3m8CTY9OZ8XpcTrSaTvOxfsgTXSzeyMdq5bPU1_B6_6YJkF2Q',
          use: 'sig',
        },
      ],
    },
  },
};
