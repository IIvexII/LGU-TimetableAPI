const { RoomDay, Room, FreeRoom } = require('../models');
const { fixTime, arrayToObject } = require('../utils');

class RoomController {
  /* ---------------------------
   * getDays() method response
   * days as single object
   * ---------------------------
   *
   * @params request, response
   * @response Object<{ dayName: dayId }>
   */
  static async getDays(req, res) {
    const arr = await RoomDay.find({});

    const days = arrayToObject(arr, 'day', '_id');

    res.send(days);
  }
  /* ---------------------------
   * getRooms() method response
   * all rooms in single object
   * ---------------------------
   *
   * @params request, response
   * @response Object<{ roomName: roomId }>
   */
  static async getRooms(req, res) {
    const arr = await Room.find({});

    const rooms = arrayToObject(arr, 'room', '_id');

    res.send(rooms);
  }
  /* ---------------------------------
   * getFreeRooms() method response
   * all free rooms that does not
   * have lecture in it filtering the
   * list via day, time or building.
   * ---------------------------------
   *
   * @params request, response
   * @response Object<{ dayName: Array<Room> }> or Array<Room>
   */
  static async getFreeRooms(req, res) {
    const building = req.query?.building;
    const day = req && req.query?.day;
    const time = fixTime(req.query?.time);

    let rooms = [];

    /* -------------------------------------
     * when day or time is provided then
     * give rooms that are filtered
     * -------------------------------------*/
    if (day || time) {
      // filtered rooms by day, time or building(NB || OB)
      rooms = await RoomController._findFreeRooms(day, time, building);
    } else {
      // all rooms
      rooms = await RoomController._findAllFreeRooms();
    }

    res.send(rooms);
  }
  /* ---------------------------------------
   * _findFreeRooms() is a private method
   *  that return all free rooms.
   * ---------------------------------------
   *
   * @params day, time, building
   * @return Object<{ dayName: Array<Room> }> or Array<Room>
   */
  static async _findFreeRooms(day, time, building) {
    //
    const dayFilter = day ? { day } : {};

    // if day is not defined then find free rooms for all 7 days
    const slots = await FreeRoom.find(dayFilter, { _id: false, __v: false });

    const filteredSlots = slots.filter((slot) => {
      // time filter
      const tFilter = time && time >= slot.startTime && time < slot.endTime;
      // building filter
      const bFilter = building && new RegExp(building, 'ig').test(slot.room);

      // filter the free slots with time or building, return
      return (tFilter && bFilter) || tFilter || bFilter;
    });

    return filteredSlots;
  }
  static async _findAllFreeRooms() {
    const freeRooms = {};

    const freeSlots = await FreeRoom.find({});

    for (let freeSlot of freeSlots) {
      const freeRoom = {
        room: freeSlot.room,
        startTime: freeSlot.startTime,
        endTime: freeSlot.endTime,
      };

      if (freeRooms[freeSlot.day]?.length > 0) {
        freeRooms[freeSlot.day].push(freeRoom);
      } else {
        freeRooms[freeSlot.day] = [freeRoom];
      }
    }

    return freeRooms;
  }
}

module.exports = { RoomController };
