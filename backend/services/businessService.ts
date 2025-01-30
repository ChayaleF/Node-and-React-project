import { Business } from "../models/business";
import sequelize from "../dataAccess/dataAccess";
import { CustomError } from "../errors/CustomError";
import { hasMinimumLetters, isValidEmail, isValidPhoneNumber } from "../validators/validators";

export async function getBusiness() {
    const services = await Business.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    return services;
}

export async function addBusiness(newBusiness: Business) {
 
    if (!newBusiness.businessName || !newBusiness.businessDescription || !newBusiness.businessEmail || !newBusiness.businessPhone) {
        throw new CustomError('Missing required fields', 400);
    }

    if (!isValidEmail(newBusiness.businessEmail)) {
        throw new CustomError('Invalid email format', 400);
    }

    if (!isValidPhoneNumber(newBusiness.businessPhone)) {
        throw new CustomError('Invalid phone number format', 400);
    }

    if (!hasMinimumLetters(newBusiness.businessName)) {
        throw new CustomError('Business name must contain at least 2 letters', 400);
    }
    await sequelize.authenticate();
    await Business.sync();

    const business = await Business.create({
        businessName: newBusiness.businessName,
        businessDescription: newBusiness.businessDescription,
        businessEmail: newBusiness.businessEmail,
        businessPhone: newBusiness.businessPhone
    });

    const result = await Business.findByPk(business.id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    return result;
}



export async function updateBusiness(businessId: number, updatedBusiness: Partial<Business>) {

        if (!updatedBusiness.businessName || !updatedBusiness.businessDescription || !updatedBusiness.businessEmail || !updatedBusiness.businessPhone) {
            throw new CustomError('Missing required fields', 400);
        }
    
        if (!isValidEmail(updatedBusiness.businessEmail)) {
            throw new CustomError('Invalid email format', 400);
        }
    
        if (!isValidPhoneNumber(updatedBusiness.businessPhone)) {
            throw new CustomError('Invalid phone number format', 400);
        }
    
        if (!hasMinimumLetters(updatedBusiness.businessName)) {
            throw new CustomError('Business name must contain at least 2 letters', 400);
        }
        const business = await Business.findOne({
            where: { id: businessId }
        });

        if (!business) {
            throw new CustomError('Business not found', 404);
        }

       
        await business.update(updatedBusiness);

        const { createdAt, updatedAt, ...result } = business.get();

        return result;
   
}

