type ImageModel = {
    uri: string,
    isPrimary: boolean,
    sortOrder: number
}

enum WatchStatusEnum {
    DEFAULT = "All",
    KEEPER = "Keeper",
    FOR_TRADE = "For Trade",
    FOR_SALE = "For Sale",
    FSOT = "For Sale or Trade",
    WATCHING = "Watching",
    IN_REPAIRS = "Repairs",
    // REVIEWING = "Reviewing",
    // TRYING_OUT = "Trying Out",
    // SOLD = "Sold",
    // TRADED = "Traded",
    // GIFTED = "Gifted",
    DELETED = "Removed"
}

type WatchType = {
  id: string;
  // images: ImageModel[];
  userId: string;
  name: string;
  brand: string;

  description: string;
  model: string;
  movement: string;
  movementType: string;
  style: string;
  status: WatchStatusEnum;
  crystal: string;
  lugWidth: string;
  caseWidth: string;
  caseHeight: string;
  dialColor: string;
  bezelColor: string;
  bezelMaterial: string;
  caseColor: string;
  caseMaterial: string;
  scuffDescription: string;
  acquiredDescription: string;
  releasedDescription: string;
  tradesLookingFor: string;
  strap: string;
  strapColor: string;
  accuracy: string;

  sortOrder: number;
  condition: number;
  yearManufactured: number;
  numberDaysOwned: string;
  numberTimesWorn: number;
  totalTimeWorn: string;
  overallRanking: number;
  priceAcquiredFor: number;
  totalMaintenanceCosts: number;
  priceWouldSellFor: number;
  cashValue: number;
  valueReceived: number;

  isWOTD: boolean;
  isCurrentlyWearing: boolean;
  isPublicDiscoverable: boolean;
  hasBox: boolean;
  hasPapers: boolean;
  isUnderWarranty: boolean;
  isPreferredSafeTrade: boolean;

  dateAcquired: any;
  dateLastServiced: any;
  dateLastWorn: any;
  currentStartWearingTime: number;
  currentEndWearingTime: number;
  dateLastWOTD: any;
}

// const WatchModel = () => {
  // let id: string;
  // // images: ImageModel[];
  // let userId: string;
  // let name: string;
  // let brand: string;

  // let description: string;
  // let model: string;
  // let movement: string;
  // let movementType: string;
  // let style: string;
  // let status: WatchStatusEnum;
  // let crystal: string;
  // let lugWidth: string;
  // let caseWidth: string;
  // let caseHeight: string;
  // let dialColor: string;
  // let bezelColor: string;
  // let bezelMaterial: string;
  // let caseColor: string;
  // let caseMaterial: string;
  // let scuffDescription: string;
  // let acquiredDescription: string;
  // let releasedDescription: string;
  // let tradesLookingFor: string;
  // let strap: string;
  // let strapColor: string;
  // let accuracy: string;

  // let sortOrder: number;
  // let condition: number;
  // let yearManufactured: number;
  // let numberDaysOwned: string;
  // let numberTimesWorn: number;
  // let totalTimeWorn: string;
  // let overallRanking: number;
  // let priceAcquiredFor: number;
  // let totalMaintenanceCosts: number;
  // let priceWouldSellFor: number;
  // let cashValue: number;
  // let valueReceived: number;

  // let isWOTD: boolean;
  // let isCurrentlyWearing: boolean;
  // let isPublicDiscoverable: boolean;
  // let hasBox: boolean;
  // let hasPapers: boolean;
  // let isUnderWarranty: boolean;
  // let isPreferredSafeTrade: boolean;

  // let dateAcquired: any;
  // let dateLastServiced: any;
  // let dateLastWorn: any;
  // let currentStartWearingTime: number;
  // let currentEndWearingTime: number;
  // let dateLastWOTD: any;

  const WatchConstructor = ({watchId, userId, watch, nextSortOrder}: {watchId: string, userId: string, watch: any, nextSortOrder?: number}): WatchType => {

    return {
      id: watchId,
      userId: userId,
      //   images: data.images || [{uri: ''}],
      name: watch.name,
      brand: watch.brand,
  
      description: watch.description || '',
      model: watch.model || '',
      movement: watch.movement || '',
      movementType: watch.movementType || '',
      style: watch.style || '',
      status: watch.status || WatchStatusEnum.DEFAULT,
      crystal: watch.crystal || '',
      lugWidth: watch.lugWidth || '',
      caseWidth: watch.caseWidth || '',
      dialColor: watch.dialColor || '',
      bezelColor: watch.bezelColor || '',
      bezelMaterial: watch.bezelMaterial || '',
      caseColor: watch.caseColor || '',
      caseMaterial: watch.caseMaterial || '',
      scuffDescription: watch.scuffDescription || '',
      acquiredDescription: watch.acquiredDescription || '',
      releasedDescription: watch.releasedDescription || '',
      tradesLookingFor: watch.tradesLookingFor || '',
      strap: watch.strap || '',
      strapColor: watch.strapColor || '',
      accuracy: watch.accuracy || '',
  
      sortOrder: nextSortOrder !== undefined ? nextSortOrder : watch.sortOrder,
      //   watchlistSortOrder: watchlistNextSortOrder || null,
      caseHeight: watch.caseHeight || 0,
      condition: watch.condition || 0,
      yearManufactured: watch.yearManufactured || 0,
      numberDaysOwned: watch.numberDaysOwned || 0,
      numberTimesWorn: watch.numberTimesWorn || 0,
      totalTimeWorn: watch.totalTimeWorn || 0,
      overallRanking: watch.overallRanking || 0,
      priceAcquiredFor: watch.priceAcquiredFor || 0,
      totalMaintenanceCosts: watch.totalMaintenanceCosts || 0,
      priceWouldSellFor: watch.priceWouldSellFor || 0,
      cashValue: watch.cashValue || 0,
      valueReceived: watch.valueReceived || 0,
  
      isWOTD: watch.isWOTD || false,
      isCurrentlyWearing: watch.isCurrentlyWearing || false,
      isPublicDiscoverable: watch.isPublicDiscoverable || false,
      hasBox: watch.hasBox || false,
      hasPapers: watch.hasPapers || false,
      isUnderWarranty: watch.isUnderWarranty || false,
      isPreferredSafeTrade: watch.isPreferredSafeTrade || false,
  
      dateAcquired: watch.dateAcquired || '',
      dateLastServiced: watch.dateLastServiced || '',
      dateLastWorn: watch.dateLastWorn || '',
      currentStartWearingTime: watch.currentStartWearingTime || '',
      currentEndWearingTime: watch.currentEndWearingTime || '',
      dateLastWOTD: watch.dateLastWOTD || '',
    }
  // }
}

export {WatchConstructor, WatchType, WatchStatusEnum, ImageModel};
