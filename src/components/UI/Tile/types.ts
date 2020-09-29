import { ReactNode } from "react";

export declare type TileHeader = {
  title?: string;
  subtitle?: string;
  right?: ReactNode;
};

export declare type TileSizeConfig = {
  sm: TileSizeSmall;
  md: TileSizeMedium;
  lg: TileSizeLarge;
  xl: TileSizeXLarge;
};

export declare type TileSizeType = "sm" | "md" | "lg" | "xl";

export declare type TileSizeSmall =
  | "sm-1"
  | "sm-2"
  | "sm-3"
  | "sm-4"
  | "sm-5"
  | "sm-6"
  | "sm-7"
  | "sm-8"
  | "sm-9"
  | "sm-10"
  | "sm-11"
  | "sm-12";

export declare type TileSizeMedium =
  | "md-1"
  | "md-2"
  | "md-3"
  | "md-4"
  | "md-5"
  | "md-6"
  | "md-7"
  | "md-8"
  | "md-9"
  | "md-10"
  | "md-11"
  | "md-12";

export declare type TileSizeLarge =
  | "lg-1"
  | "lg-2"
  | "lg-3"
  | "lg-4"
  | "lg-5"
  | "lg-6"
  | "lg-7"
  | "lg-8"
  | "lg-9"
  | "lg-10"
  | "lg-11"
  | "lg-12";

export declare type TileSizeXLarge =
  | "xl-1"
  | "xl-2"
  | "xl-3"
  | "xl-4"
  | "xl-5"
  | "xl-6"
  | "xl-7"
  | "xl-8"
  | "xl-9"
  | "xl-10"
  | "xl-11"
  | "xl-12";
