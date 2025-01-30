import { Meeting } from "../models/meeting";
import sequelize from "../dataAccess/dataAccess";
import { CustomError } from "../errors/CustomError";
import { Service } from "../models/service";
import { Op } from 'sequelize';
import { User } from "../models/user";
import { isValidMeetingDate } from "../validators/validators";

export async function getMeetings() {
    const services = await Meeting.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    return services;
}

export async function addMeeting(newMeeting: Meeting) {
    const service = await Service.findByPk(newMeeting.serviceId);
    if (!service) {
      throw new CustomError('Service with this Id not found', 404);
    }
    const user = await User.findByPk(newMeeting.userId);
    if (!user) {
      throw new CustomError('User with this Id not found', 404);
    }
    if (!isValidMeetingDate(newMeeting.meetingDate))
      throw new CustomError('Error in meeting date', 400);
    const endTime = new Date(newMeeting.meetingDate);
    endTime.setMinutes(endTime.getMinutes() + service.serviceDuration);
  newMeeting.meetingDate=new Date(newMeeting.meetingDate)
  
  await sequelize.sync();
    const conflictingMeetings = await Meeting.findOne({
      where: {
        meetingDate: {
          [Op.lt]: endTime,
          [Op.gt]: new Date(newMeeting.meetingDate).setMinutes(newMeeting.meetingDate.getMinutes()- service.serviceDuration),
        },
      },
    });
  
    if (conflictingMeetings) {
      throw new CustomError('The selected time slot is already booked', 409);
    }
    await sequelize.authenticate();
    await Meeting.sync();
  
    const meeting = await Meeting.create({
      meetingDate: newMeeting.meetingDate,
      userId: newMeeting.userId,
      serviceId: newMeeting.serviceId
    });
  
    const result = await Meeting.findByPk(meeting.id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
  
    return result;
  }
  
  
  export async function updateMeeting(meetingId: number, updatedMeeting: Meeting) {
  
    const meeting = await Meeting.findOne({
      where: { id: meetingId }
    });
  
    if (!meeting) {
      throw new CustomError('meeting not found', 404);
    }
  
    if (meeting.userId !== updatedMeeting.userId) {
      throw new CustomError('Cannot update userId for an existing meeting', 400);
    }
    if (meeting.serviceId !== updatedMeeting.serviceId) {
      throw new CustomError('Cannot update serviceId for an existing meeting', 400);
    }
    const service = await Service.findByPk(meeting.serviceId);
    if (!service) {
      throw new CustomError('Service with this Id not found', 404);
    }
    if (!isValidMeetingDate(updatedMeeting.meetingDate))
      throw new CustomError('Error in meeting date', 400);
    const endTime = new Date(updatedMeeting.meetingDate);
    endTime.setMinutes(endTime.getMinutes() + service.serviceDuration);
    updatedMeeting.meetingDate=new Date(updatedMeeting.meetingDate)
  
    const conflictingMeetings = await Meeting.findOne({
      where: {
        meetingDate: {
          [Op.lt]: endTime,
          [Op.gt]: new Date(updatedMeeting.meetingDate).setMinutes(updatedMeeting.meetingDate.getMinutes() - service.serviceDuration),
        },
      },
    });
  
    if (conflictingMeetings) {
      throw new CustomError('The selected time slot is already booked', 409);
    }
    await meeting.update(updatedMeeting);
  
    const { createdAt, updatedAt, ...result } = meeting.get();
  
    return result;
  
  }
  export async function deleteMeeting(MeetingId: number) {

    const meeting = await Meeting.findByPk(MeetingId);

    if (!meeting) {
        throw new CustomError('Meeting not found', 404);
    }

    await meeting.destroy();
    return `meeting ${MeetingId} deleted successfully`

}