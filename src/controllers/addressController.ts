import { Request, Response } from "express";
import { IAddressController } from "../interfaces/address/IAddressController";
import { IAddressService } from "../interfaces/address/IAddressService";
import { HTTP_STATUS } from "../constants/httpStatus";
import { MESSAGES } from "../constants/messages";
import { Types } from 'mongoose';

export class AddressController implements IAddressController {
    constructor(private addressService: IAddressService) {
        this.addressService = addressService;
    }

    async createAddress(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.headers['x-user-id'];

            const addressData = { ...req.body, userId };

            console.log("addressData:", addressData);

            if (!addressData) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: 'Incomplete address details. Please provide all required fields.',
                });
                return;
            }

            const address = await this.addressService.createAddress(addressData);

            res.status(HTTP_STATUS.CREATED).json({
                success: true,
                message: MESSAGES.ADDRESS_CREATED,
                data: address
            });

        } catch (error: any) {
            console.error("Error during login:", error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    // async getAddresses(req: Request, res: Response): Promise<void> {
    //     try {
    //         const userId = req.headers['x-user-id'];
    //         console.log("userId :", userId);
    //         const query: any = { userId };

    //         const addresses = await this.addressService.getAddresses(query);

    //         if (!addresses) {
    //             res.status(HTTP_STATUS.NOT_FOUND).json({
    //                 success: true,
    //                 message: MESSAGES.ADDRESSES_NOT_FOUND
    //             });
    //             return;
    //         }

    //         res.status(HTTP_STATUS.OK).json({
    //             success: true,
    //             data: addresses
    //         });

    //     } catch (error: any) {
    //         console.error("Error during login:", error);
    //         res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    //     }
    // }

    async getAddresses(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.headers['x-user-id'];

            const addresses = await this.addressService.getAddresses(userId as string);

            if (!addresses) {
                res.status(HTTP_STATUS.NOT_FOUND).json({
                    success: true,
                    message: MESSAGES.ADDRESSES_NOT_FOUND
                });
                return;
            }

            res.status(HTTP_STATUS.OK).json({
                success: true,
                data: addresses
            });

        } catch (error: any) {
            console.error("Error during login:", error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    async updateAddress(req: Request, res: Response): Promise<void> {
        try {
            const { addressId } = req.params;
            const addressData = req.body;
            console.log("Data:", req.body);

            // if (!addressId) {
            //     res.status(HTTP_STATUS.BAD_REQUEST).json({
            //         success: false,
            //         message: "Address ID is required."
            //     });
            //     return;
            // }

            // if (!addressData || Object.keys(addressData).length === 0) {
            //     res.status(HTTP_STATUS.BAD_REQUEST).json({
            //         success: false,
            //         message: "Address data is required to update."
            //     });
            //     return;
            // }

            // const updatedAddress = await this.addressService.updateAddress(addressId, addressData);

            // if (!updatedAddress) {
            //     res.status(HTTP_STATUS.NOT_FOUND).json({
            //         success: false,
            //         message: MESSAGES.ADDRESS_NOT_FOUND
            //     });
            // }

            // res.status(HTTP_STATUS.OK).json({
            //     success: true,
            //     data: updatedAddress
            // });

        } catch (error: any) {
            console.error("Error during login:", error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    async deleteAddress(req: Request, res: Response): Promise<void> {
        try {
            const { addressId } = req.params;
            console.log("addressId:", addressId);

            if (!addressId) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: "Address ID is required."
                });
                return;
            }

            const deletedAddress = await this.addressService.deleteAddress(addressId);

            if (!deletedAddress) {
                res.status(HTTP_STATUS.NOT_FOUND).json({
                    success: false,
                    message: MESSAGES.ADDRESS_NOT_FOUND
                });
                return;
            }

            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: MESSAGES.ADDRESS_DELETED,
                data: deletedAddress
            });

        } catch (error: any) {
            console.error("Error during login:", error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }
}