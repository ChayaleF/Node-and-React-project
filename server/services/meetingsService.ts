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
      throw new CustomError('Service with this Id not found',404);
    }
    const user = await User.findByPk(newMeeting.userId);
    if (!user) {
      throw new CustomError('User with this Id not found',404);
    }
    if(!isValidMeetingDate(newMeeting.meetingDate))
        throw new CustomError('Error in meeting date',400);
    const endTime = new Date(newMeeting.meetingDate);
    endTime.setMinutes(endTime.getMinutes() + service.serviceDuration);

    const conflictingMeetings = await Meeting.findOne({
      where: {
        meetingDate: {
          [Op.lt]: endTime,
          [Op.gt]: new Date(newMeeting.meetingDate).setMinutes(newMeeting.meetingDate.getMinutes() - service.serviceDuration),
        },
      },
    });

    if (conflictingMeetings) {
      throw new CustomError('The selected time slot is already booked',409);
    }
    await sequelize.authenticate();
    await Meeting.sync();

    const meeting = await Meeting.create({
        meetingDate: newMeeting.meetingDate,
        userId: newMeeting.userId,
        serviceId:newMeeting.serviceId
    });

    const result = await Meeting.findByPk(meeting.id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    return result;
  }