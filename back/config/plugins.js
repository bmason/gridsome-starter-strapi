module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
		  cloud_name: 'smalltalkman', 
		  api_key: '576918919145634', 
		  api_secret: 'Sl2a2E6wvAhXcVgcR0iXeSV1EUE' 
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
  // ...
});
