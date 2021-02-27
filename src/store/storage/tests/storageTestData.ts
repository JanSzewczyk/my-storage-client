import PageInfo from "../../../shared/types/common/PageInfo";
import {
  Storage,
  StorageDto,
  StorageView,
  StorageViewDto,
} from "../../../shared/types/storage";

export const pageInfo: PageInfo = {
  number: 0,
  size: 20,
  totalElements: 3,
  totalPages: 1,
};

export const storageViewDto1: StorageViewDto = {
  addressCity: "Warszawa",
  addressCountry: "Poland",
  addressStreet: "ul. Krajeńska 49",
  addressZip: "01-473",
  createdAt: "2020-05-11T20:13:02.202+0000",
  id: "0227f014-a92e-4db6-8234-f37af702fc2c",
  lastActionDate: "2020-06-01T20:05:13.033+0000",
  links: [],
  name: "New warehouse",
  numberOfEmployees: 5,
  ownerId: "02346256-44b2-4811-917a-6ad03c56036e",
  shortId: "FVJZSFI901",
  surface: 512,
  updatedAt: "2020-05-12T20:13:02.202+0000",
};

export const storageView1: StorageView = {
  addressCity: "Warszawa",
  addressCountry: "Poland",
  addressStreet: "ul. Krajeńska 49",
  addressZip: "01-473",
  createdAt: new Date("2020-05-11T20:13:02.202+0000"),
  id: "0227f014-a92e-4db6-8234-f37af702fc2c",
  lastActionDate: new Date("2020-06-01T20:05:13.033+0000"),
  links: [],
  name: "New warehouse",
  numberOfEmployees: 5,
  ownerId: "02346256-44b2-4811-917a-6ad03c56036e",
  shortId: "FVJZSFI901",
  surface: 512,
  updatedAt: new Date("2020-05-12T20:13:02.202+0000"),
};

export const storageViewDto2: StorageViewDto = {
  addressCity: "Kraków",
  addressCountry: "Poland",
  addressStreet: "ul Warszawska 21",
  addressZip: "31-155",
  createdAt: "2020-05-11T20:13:02.202+0000",
  id: "3a78e3ed-bd55-4a09-b7f8-77fded2ff23e",
  lastActionDate: "2020-06-11T20:31:02.497+0000",
  links: [],
  name: "Old workshop",
  numberOfEmployees: 8,
  ownerId: "02346256-44b2-4811-917a-6ad03c56036e",
  shortId: "KTGNKUB405",
  surface: 312,
  updatedAt: "2020-05-31T10:23:50.899+0000",
};

export const storageView2: StorageView = {
  addressCity: "Kraków",
  addressCountry: "Poland",
  addressStreet: "ul Warszawska 21",
  addressZip: "31-155",
  createdAt: new Date("2020-05-11T20:13:02.202+0000"),
  id: "3a78e3ed-bd55-4a09-b7f8-77fded2ff23e",
  lastActionDate: new Date("2020-06-11T20:31:02.497+0000"),
  links: [],
  name: "Old workshop",
  numberOfEmployees: 8,
  ownerId: "02346256-44b2-4811-917a-6ad03c56036e",
  shortId: "KTGNKUB405",
  surface: 312,
  updatedAt: new Date("2020-05-31T10:23:50.899+0000"),
};

export const storageDto1: StorageDto = {
  addressCity: "Warszawa",
  addressCountry: "Poland",
  addressStreet: "ul. Krajeńska 49",
  addressZip: "01-473",
  createdAt: "2020-05-11T20:13:02.202+0000",
  id: "0227f014-a92e-4db6-8234-f37af702fc2c",
  name: "New warehouse",
  shortId: "FVJZSFI901",
  surface: 512,
  updatedAt: "2020-05-12T20:13:02.202+0000",
};

export const storage1: Storage = {
  addressCity: "Warszawa",
  addressCountry: "Poland",
  addressStreet: "ul. Krajeńska 49",
  addressZip: "01-473",
  createdAt: new Date("2020-05-11T20:13:02.202+0000"),
  id: "0227f014-a92e-4db6-8234-f37af702fc2c",
  name: "New warehouse",
  shortId: "FVJZSFI901",
  surface: 512,
  updatedAt: new Date("2020-05-12T20:13:02.202+0000"),
};
