import StorageStatistic from "../types/statistic/StorageStatistic";
import StorageStatisticDto from "../types/statistic/StorageStatisticDto";
import { updateObject } from "../utils/utility";

export const mapStorageStatisticDtoToStorageStatistic = (
  storageStatisticDto: StorageStatisticDto
): StorageStatistic =>
  updateObject(storageStatisticDto, {
    date: new Date(storageStatisticDto.date),
  });
