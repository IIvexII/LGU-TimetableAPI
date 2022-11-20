<h1 align="center">
  <br>
  <a href="https://timetable.lgu.edu.pk"><img src="https://user-images.githubusercontent.com/41378765/200201356-6ebba91a-dec8-4314-93ff-3b7268c4274c.png" alt="Lahore Garrison University" width="500"></a>
  <br>
  Timetable API
  <br>
</h1>

<h4 align="center">Blazingly fast, lightweight and easy to use.</h4>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/node-18.7.0-success"alt="Node 18.7.0"></a>
  <a href="#"><img src="https://img.shields.io/badge/API-v1.0-informational"></a>
  <a href="#"><img src="https://img.shields.io/github/repo-size/iivexii/LGU-TimetableAPI"></a>
  <a href="#">
    <img src="https://img.shields.io/github/forks/iivexii/LGU-TimetableAPI?color=30b781">
  </a>
 <a href="#">
    <img src="https://img.shields.io/github/stars/iivexii/LGU-TimetableAPI">
  </a>
 
</p>

<p align="center">
  <a href="#key-features">Key Features</a> • 
  <a href="#how-to-use">How To Use</a> • 
  <a href="#download">Download</a> • 
  <a href="#routes">Routes</a> • 
  <a href="#credits">Credits</a> • 
  <a href="#used-by">Used By</a> • 
  <a href="#our-contributors">Contributors</a> •
  <a href="#license">License</a>
</p>

<div align='center'><img src='https://user-images.githubusercontent.com/41378765/200203572-b2e45699-0d3e-423a-b9a6-2cc2578578ef.gif' width='1024'></div>

## Key Features

- 📑 Provide data in **JSON**
- 🤝 APIs for all the important data like `semesters`, `degrees`, `sections` and `timetable`
- ⚡ Fast and easy to use
- 🔻 ligneweight with avg response size of `633.38 bytes` per request

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/IIvexII/LGU-TimetableAPI.git

# Go into the repository
$ cd LGU-TimetableAPI

# Install dependencies
$ npm install

# Run the app
$ npm start
```

> **Note**
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Download

You can [download](https://github.com/IIvexII/LGU-TimetableAPI/releases) the latest installable version of Timetable API for Windows, macOS and Linux.

## Routes

| Method |    Route     |         Special Params          |                         Description                          | Example                                                                               |
| ------ | :----------: | :-----------------------------: | :----------------------------------------------------------: | ------------------------------------------------------------------------------------- |
|  GET   | `/semesters` |               \_                |        return a **JSON** Object containing semesters.        | [demo](https://lgu-timetable-api.deta.dev/semesters)                                  |
|  GET   | `/degrees`   |           `semester`            |       all the degree programs in a specific semester.        | [demo](https://lgu-timetable-api.deta.dev/degrees?semester=5)                         |
|  GET   | `/sections`  |       `semester`,`degree`       |    all the section in a semester with via degree program.    | [demo](https://lgu-timetable-api.deta.dev/sections?semester=1&degree=BSCS)            |
|  GET   | `/timetable` | `semester`, `degree`, `section` |       all the degree programs in a specific semester.        | [demo](https://lgu-timetable-api.deta.dev/timetable?semester=3&degree=BSCS&section=A) |
|  GET   | `/metadata`  |               \_                | all the metadata about `sections`, `semesters` and `degrees` | [demo](https://lgu-timetable-api.deta.dev/metadata) |                                 |

## Credits

This software uses the following open source packages:

- [<img src='https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21.svg' width=64 align='center' >](https://nodejs.org/)
- [<img src='https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg' width=64 align='center' >](https://expressjs.com/)
- [<img src='https://www.vectorlogo.zone/logos/shieldsio/shieldsio-official.svg' width=64 align='center' >](https://shields.io/)
- [<svg xmlns="http://www.w3.org/2000/svg" viewBox="-149 420 100 100" width=32 height=48 >
  <path fill="#dbc01d" d="M-63.7 527l-30.5 17.6a9.4 9.4 0 0 1-9.7 0l-30.5-17.6c-3-1.8-4.8-5-4.8-8.4v-35.2c0-3.5 1.8-6.6 4.8-8.4l30.5-17.6c3-1.8 6.6-1.8 9.7 0l30.5 17.6c3 1.8 4.8 5 4.8 8.4v35.2a9.3 9.3 0 0 1-4.8 8.4z"/>
  <path fill="#383307" d="M-105.6 473.2s.1 5.7-2.2 12.3c-1.6 4.7-3.8 7.1-9 12.5-2.5 2.5-9.5 8.7-14.8 15.4a57.4 57.4 0 0 0-6.4 9.7s.9 2.3 3.7 4l7.4 4.3 3.4-5.6c1.5-2.3 4-5.4 4-5.4l8 12.2 11.5-7.7-9.7-14.5s4.6-4.4 5.8-5.8l3.2-3.7s4.9 2.9 6.8 4.2c2.8 1.8 6.4 4.7 6.4 4.7l-10.1 15.1 11.5 7.7 8.4-12.5 4.7 6.8c1.1 1.7 2.3 4.2 2.3 4.2l7-4c2.9-1.7 4-4.5 4-4.5s-3.1-5.6-5.9-9.3c-2.9-3.9-7-8.3-8.9-10.3-3.4-3.3-9.3-7.9-12.3-9.9-2.7-1.8-7.5-4.4-7.5-4.4s1.1-3.1 1.8-7.7c.4-2.8.6-7.5.6-7.5l-13.7-.3z"/>
</svg>](https://github.com/jsdom/jsdom)


## Used By

[LGU Timetable Front-end](https://github.com/Zain-ul-din/LGU-BetterTimeTable) - Lightweight timetable frontend on top of this API.

## Our Contributors

<a href="https://github.com/IIvexII/LGU-TimetableAPI/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=IIvexII/LGU-TimetableAPI" />
</a>

<div align="center">
<h4 font-weight="bold">This repository is maintained by <a href="https://github.com/IIvexII">IIvexII</a></h4>
<p> Show some ❤️ by starring this awesome repository! </p>
</div>

## License

MIT - ✔️ Commercial use ✔️ Modification ✔️ Distribution ✔️ Private use
