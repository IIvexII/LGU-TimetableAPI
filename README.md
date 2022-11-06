<h1 align="center">LGU-TimetableAPI</hello>

<h5 align="center"> Unofficial API for the timetable of Lahore Garrison University. </h5>

### Routes
| Route                      | Special Params             | Description                                            | Example                   |
|----------------------------|:--------------------------:|:------------------------------------------------------:|---------------------------|
| GET `/semesters`           | _                          | return a **JSON** Object containing semesters.         | [See Example](https://lgu-timetable-api.deta.dev/semesters)|
| GET `/degrees`              | `semester`                | all the degree programs in a specific semester.        | [See Example](https://lgu-timetable-api.deta.dev/degrees?semester=5)|
| GET `/sections`              | `semester`,`degree`      | all the section in a semester with via degree program. | [See Example](https://lgu-timetable-api.deta.dev/sections?semester=1&degree=BSCS)|
| GET `/timetable`              | `semester`, `degree`, `section`      | all the degree programs in a specific semester.| [See Example](https://lgu-timetable-api.deta.dev/timetable?semester=3&degree=BSCS&section=A)|

<br>

### Technologies used 🛠

<p align="left"> 

 <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
 <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">
 <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge">
 
 <br>
 
 ### Complete documents about project  📘
 - please read [how to Setup](Docs) before diving into project.
 <br><br>

### See any issue ? ☠
Create an issue with the correct label.
<br><br>

### For folks who wants to contribute ❤
- please read [how to contribute](https://github.com/IIvexII/LGU-TimetableAPI/blob/main/CONTRIBUTING.md) before getting started.


 Clone the repo in your own local machine
Comment on the issue and we will reserve it for you. &nbsp;🌈 &nbsp; ✨


Your contribution is highly appreciated 🙏.</br>




### Example
[Get Timetable in JSON](https://lgu-timetable-api.deta.dev?session=jjedrbhv59rmhc871qs1i7gv97&semester=5&degree=BSCS&section=A) - **Note**: Login and provide session as paramtere
<br><br>

## Repo Status

![GitHub Issues Open](https://img.shields.io/github/issues/IIvexII/LGU-TimetableAPI?style=for-the-badge&color=green)
![GitHub PR Open](https://img.shields.io/github/issues-pr/IIvexII/LGU-TimetableAPI?style=for-the-badge&color=aqua)
![GitHub PR closed](https://img.shields.io/github/issues-pr-closed-raw/IIvexII/LGU-TimetableAPI?style=for-the-badge&color=blue)
![GitHub language count](https://img.shields.io/github/languages/count/IIvexII/LGU-TimetableAPI?style=for-the-badge&color=brightgreen)

## Our Contributors 

<a href="https://github.com/IIvexII/LGU-TimetableAPI/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=IIvexII/LGU-TimetableAPI" />
</a>

<div align="center">
<h4 font-weight="bold">This repository is maintained by <a href="https://github.com/IIvexII">IIvexII</a></h4>
<p> Show some ❤️ by starring this awesome repository! </p>
</div>
