const awsConfig = {
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_49TDKqqHN',
    userPoolWebClientId: '7839g8m6onaljulemloo1jbjn9',
    mandatorySignIn: true,
    // REMOVE the oauth property entirely!
  },
};

export default awsConfig;