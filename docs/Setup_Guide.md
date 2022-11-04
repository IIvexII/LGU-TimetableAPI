## Setup

- Clone Respoisoty from github
  ```bash
  git clone https://github.com/IIvexII/LGU-TimetableAPI.git
  ```
- Install dependencies
  ```bash
  npm install
  ```
- Login your [google console](https://console.cloud.google.com/home/dashboard)
- Create a project with whatever name you want.
- Go into ***OAuth Consent Screen*** and register an app.
- Go to `Credentials` and Create OAuth Client ID and this url `https://developers.google.com/oauthplayground` in ***Authorized redirect URIs*** field.
- Then Go to [Google Playground](https://developers.google.com/oauthplayground) and add Client Secret and Client ID
 
  <img height='400' src='https://user-images.githubusercontent.com/41378765/198887399-a3b37afd-05b1-4161-a17c-3a403c26ea4a.png'>
  
 - Look for ***Calendar API v3*** in scope list and select these two scopes and click ***Authorize APIs***
 
  <img height='400' src='https://user-images.githubusercontent.com/41378765/198887547-65a494b6-7fb6-43bb-9e81-1a19cedd38cf.png'>

- Add the refresh token, client id and client secret in `.env` file of the project.

- runs development server
  ```bash
    npm start
  ```

### :tada: Eveything will start to work from now.
