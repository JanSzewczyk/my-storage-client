import { updateObject } from "../utils/utility";

export const mapStorageViewDtoToStorageView = (storageView) =>
  updateObject(storageView, {
    createdAt: new Date(storageView.createdAt),
    updatedAt: new Date(storageView.updatedAt),
  });

export const mapStorageDtoToStorage = (storage) =>
  updateObject(storage, {
    createdAt: new Date(storage.createdAt),
    updatedAt: new Date(storage.updatedAt),
  });

export const createStoragesSelectList = (storageList) => {
  const sl = storageList.map((i) => ({
    key: i.name,
    value: i.id,
  }));

  return [{ key: "None", value: "" }, ...sl];
};
