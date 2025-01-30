import { addBusiness, getBusiness, updateBusiness } from '../services/businessService';
import { CustomError } from '../errors/CustomError';

describe('Business Service Simple Tests', () => {
    test('1. getBusiness should return an array', async () => {
        const result = await getBusiness();
        expect(Array.isArray(result)).toBe(true);
    });

    test('2. addBusiness should throw an error if fields are missing', async () => {
        await expect(addBusiness({} as any)).rejects.toThrow(CustomError);
    });

    test('3. updateBusiness should throw an error if business not found', async () => {
        await expect(updateBusiness(99, {} as any)).rejects.toThrow(CustomError);
    });

    test('4. addBusiness should throw an error if email is invalid', async () => {
        await expect(addBusiness({
            businessName: 'Test',
            businessDescription: 'Desc',
            businessEmail: 'invalid-email',
            businessPhone: '1234567890'
        } as any)).rejects.toThrow(CustomError);
    });

    test('5. updateBusiness should throw an error if phone number is invalid', async () => {
        await expect(updateBusiness(1, { businessPhone: 'invalid-phone' } as any)).rejects.toThrow(CustomError);
    });

    test('6. getBusiness should not throw an error', async () => {
        await expect(getBusiness()).resolves.not.toThrow();
    });
});
