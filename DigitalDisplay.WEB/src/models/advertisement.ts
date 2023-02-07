export interface Advertisement {
  id?: number;
  name: string;
  categoryId: number;
  advertisementTypeId: number;
  graphicalContent?: any;
  graphicalContentFilename?: string;
  text?: string;
  textFontFamily?: string;
  textFontSize?: number;
  textFontColor?: string;
  textVerticalAlignment?: number;
  textHorizontalAlignment?: number;
  textScrolling?: number;
  textPadding?: string;
  imageFit?: number;
  createdDate: Date;
  createdBy?: string;
  updatedDate?: Date;
  advertisementType?: string;
  categoryName?: string;
  archive?: boolean;
  birthdayData?: Object;
}
