import { FixMeLater } from "../types/common/FixMeLater";
import StorageDto from "../types/storage/StorageDto";
import { updateObject } from "../utils/utility";
import Storage from "../types/storage/Storage";

export const mapStorageViewDtoToStorageView = (
  storageView: FixMeLater
): FixMeLater =>
  updateObject(storageView, {
    createdAt: new Date(storageView.createdAt),
    updatedAt: new Date(storageView.updatedAt),
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
