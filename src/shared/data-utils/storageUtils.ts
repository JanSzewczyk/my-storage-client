import { FixMeLater } from "../types/common/FixMeLater";
import StorageDto from "../types/storage/StorageDto";
import { updateObject } from "../utils/utility";
import Storage from "../types/storage/Storage";
import StorageViewDto from "../types/storage/StorageViewDto";
import StorageView from "../types/storage/StorageView";

export const mapStorageViewDtoToStorageView = (
  storageViewDto: StorageViewDto
): StorageView =>
  updateObject(storageViewDto, {
    createdAt: new Date(storageViewDto.createdAt),
    updatedAt: new Date(storageViewDto.updatedAt),
  });

export const mapStorageDtoToStorage = (storage: StorageDto): Storage =>
  updateObject(storage, {
    createdAt: new Date(storage.createdAt),
    updatedAt: new Date(storage.updatedAt),
  });

export const createStoragesSelectList = (
  storageList: Storage[]
): FixMeLater => {
  const sl = storageList.map((i) => ({
    key: i.name,
    value: i.id,
  }));

  return [{ key: "None", value: "" }, ...sl];
};
