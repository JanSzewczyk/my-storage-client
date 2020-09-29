import Owner from "../types/owner/Owner";
import OwnerDto from "../types/owner/OwnerDto";
import { updateObject } from "../utils/utility";

export const mapOwnerDtoToOwner = (ownerDto: OwnerDto): Owner =>
  updateObject(ownerDto, {
    createdAt: new Date(ownerDto.createdAt),
    updatedAt: new Date(ownerDto.updatedAt),
  });
