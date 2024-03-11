# i still skip over songs - Spotify Dashboard

This is a spotify dashboard that shows your listening habits like top artists, top tracks and the songs you recently listened to.
For now you can only sign up on [istillskipoversongs.com](https://www.istillskipoversongs.com/) after i added your spotify mail address manually because the app is in [spotify developer mode](https://developer.spotify.com/documentation/web-api/concepts/quota-modes). I will request extended quota mode so that everyone can check it out without asking me before.

<img width="1920" alt="screenshot of spotify dashboard" src="https://raw.githubusercontent.com/lennart-kaminsky/lennart-kaminsky/main/assets/spotify-dashboard.png">


## About

I always wanted to do a project with the Spotify API because i love music a lot and think it's a great project for trying new tools and improving skills. I kept a simple design so I could focus even more on details and user experience.

Some things i did for UX/UI:

- storing scroll positions and filter settings of single components 
- loading skeletons
- responsive app
- colour modes
- 404 page

From time to time I also worked on performance and reduced the amount of API calls that are made while using the app. So now all the data about the top tracks and artists are fetched once until the user refreshes the app, because during the time of navigating through those listening habits won't change.

The currently playing song is still fetched every 5 seconds and the API call for the most recent songs is only made when the user navigates to the listening history.

### Technologies and Tools:

- [Next.js](https://nextjs.org)
- [React](https://react.dev/)
- [next-auth](https://next-auth.js.org) 
- [Zustand](https://zustand-demo.pmnd.rs) 
- [styled components](https://styled-components.com)
- [spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node)
- [use-local-storage-state](https://github.com/astoilkov/use-local-storage-state)
- [Vercel](https://vercel.com/)


## Running the app locally

You can also clone the repository and run the app locally. But do so you need to do the following things in advance:

1. Go to the [Spotify for Developers Dashboard](https://developer.spotify.com/dashboard) and create a new app
    - Choose a name for your app and write a short description
    - Website: http://localhost:3000/
    - Redirect URI: http://localhost:3000/api/auth/callback/spotify
    - put your ✅ on Web API
2. In your repository add the `.env.local`-file with the following variables:
     - ```
       NEXTAUTH_URL=http://localhost:3000/
       NEXTAUTH_SECRET= 
       SPOTIFY_CLIENT_ID=
       SPOTIFY_CLIENT_SECRET=
       SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/callback/spotify
       ```
    - as [next auth secret](https://next-auth.js.org/configuration/options) you can use a random string
    - you find your Spotidy Client ID and Client Secret under Spotify for Developers - Dashboard - Your app - Settings
3. Install the app locally ( `npm i` )
4. Run the development server ( `npm run dev` )
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
