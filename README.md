# LGU-TimetableAPI
Unofficial API for the timetable of Lahore Garrison University.

### Routes
All Routes requires these parameters: `session`, `semester`, `degree`, `section`
| Route                      | Special Params             | Description    |
|----------------------------|:------------:|:----------------|
| `/`                        | _            | Fetch the timetable from `timetable.lgu.edu.pk` and return it in **JSON format**|
| `/gc-integration`            | _            | Create events on google calendar based on the official timetable.               |

### Example
[Get Timetable in JSON](https://lgu-timetable-api.deta.dev/session=jjedrbhv59rmhc871qs1i7gv97&semester=5&degree=BSCS&section=A) - **Note**: Login and provide session as paramtere
