import { Service } from "../models/service";
import sequelize from "../dataAccess/dataAccess";
import { CustomError } from "../errors/CustomError";
import { hasMinimumLetters, isValidServiceCost, isValidServiceDuration } from "../validators/validators";

export async function addService(newService: Service) {

    if (!newService.serviceName || !newService.serviceDescription || !newService.serviceCost || !newService.serviceDuration) {
        throw new CustomError('Missing required fields', 400);
    }
    if (!hasMinimumLetters(newService.serviceName)) {
        throw new CustomError('Service name must contain at least 2 letters', 400);
    }
    if (!isValidServiceCost(newService.serviceCost)) {
        throw new CustomError('Service cost must be at least 50 NIS', 400);
    }
    if (!isValidServiceDuration(newService.serviceDuration)) {
        throw new CustomError('Service duration must be at least 10 minutes', 400);
    }
    await sequelize.authenticate();
    await Service.sync();

    const service = await Service.create({
        serviceName: newService.serviceName,
        serviceDescription: newService.serviceDescription,
        serviceCost: newService.serviceCost,
        serviceDuration: newService.serviceDuration
    });

    const result = await Service.findByPk(service.id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    return result;
}



export async function updateService(serviceId: number, updatedservice: Partial<Service>) {
    if (!updatedservice.serviceName || !updatedservice.serviceDescription || !updatedservice.serviceCost || !updatedservice.serviceDuration) {
        throw new CustomError('Missing required fields', 400);
    }
    if (!hasMinimumLetters(updatedservice.serviceName)) {
        throw new CustomError('Service name must contain at least 2 letters', 400);
    }
    if (!isValidServiceCost(updatedservice.serviceCost)) {
        throw new CustomError('Service cost must be at least 50 NIS', 400);
    }
    if (!isValidServiceDuration(updatedservice.serviceDuration)) {
        throw new CustomError('Service duration must be at least 10 minutes', 400);
    }
    const service = await Service.findOne({
        where: { id: serviceId }
    });

    if (!service) {
        throw new CustomError('service not found', 404);
    }


    await service.update(updatedservice);

    const { createdAt, updatedAt, ...result } = service.get();

    return result;

}

export async function getServices() {
    const services = await Service.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    return services;
}
export async function deleteService(serviceId: number) {

    const service = await Service.findByPk(serviceId);

    if (!service) {
        throw new CustomError('Service not found', 404);
    }

    await service.destroy();
    return `service ${serviceId} deleted successfully`

}