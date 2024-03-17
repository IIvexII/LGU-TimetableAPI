# How to get a Session?

In this document, I will guide you through the process of getting a `session`, that is the required parameter when using this API.

### Steps to Follow

1. Login with the credentials provided to you by the university.
<div align='center'>
<img  height='400' src='https://user-images.githubusercontent.com/41378765/198858736-f181b17b-3f3a-44a0-95ac-3eb4db481086.png'>
</div>

2. You can get the session with extension names 🍪[Cookie Editor](https://chrome.google.com/webstore/detail/cookie-editor/hlkenndednhfkekhgcdicdfddnkalmdm) but I will be getting session without it.
    * Press F12 and find the Application tab in the developer console.
   
     <div align='center'>
        <img  width='80%' src='https://user-images.githubusercontent.com/41378765/198858923-06319bda-f8bd-472c-8e47-f8c140d74b75.png'>
      </div>
      
    * Your session is the value of `PHPSESSID`. Double-click on it to copy the value.
      
       <div align='center'>
        <img  width='80%' src='https://github.com/Zain-ul-din/LGU-TimetableAPI/assets/78583049/5b2b3717-3702-47e8-9a7b-1eabdda03cc8'>
      </div>

### FAQ

- Did Session ID Retrieve my identity?

  Ans: Arguably, no. Session is a unique identifier that a web server assigns to a user for the duration of the current session. (session: when users enter the password -> close the browser). Since password and username are the same, rare cases would be they implemented a mechanism to uniquely identify each session by IP.

---
In case of any issue please raise a question in [Discussion](https://github.com/IIvexII/LGU-TimetableAPI/discussions/16)
