import {DocumentData, Query} from "firebase-admin/firestore";
import { db } from "../../config/firebase";
import {WatchStatusEnum} from "../../models/WatchModels";

enum DIRECTION_ENUM {
    ASCENDING = "asc",
    DESCENDING = "desc"
}

type SortBy = {
    sortBy: any;
    direction: DIRECTION_ENUM;
}

enum SORT_ENUM {
    SORT_ORDER = "Sort Order",
    PRICE_HIGH_LOW = "Price High-Low",
    PRICE_LOW_HIGH = "Price Low-High",
    DATE_NEWEST = "Added Newest",
    DATE_OLDEST = "Added Oldest",
    MOST_RECENT_WORN = "Most Recent Worn",
    LEAST_RECENT_WORN = "Least Recent Worn"
}

const determineSortBy = (sort: any): SortBy => {
  let result;

  switch (sort) {
    case SORT_ENUM.DATE_NEWEST: {
      result = {
        sortBy: "dateAcquired",
        direction: DIRECTION_ENUM.ASCENDING,
      };
      break;
    }
    case SORT_ENUM.DATE_OLDEST: {
      result = {
        sortBy: "dateAcquired",
        direction: DIRECTION_ENUM.DESCENDING,
      };
      break;
    }
    case SORT_ENUM.PRICE_HIGH_LOW: {
      result = {
        sortBy: "cashValue",
        direction: DIRECTION_ENUM.DESCENDING,
      };
      break;
    }
    case SORT_ENUM.PRICE_LOW_HIGH: {
      result = {
        sortBy: "cashValue",
        direction: DIRECTION_ENUM.ASCENDING,
      };
      break;
    }
    case SORT_ENUM.MOST_RECENT_WORN: {
      result = {
        sortBy: "dateLastWorn",
        direction: DIRECTION_ENUM.DESCENDING,
      };
      break;
    }
    case SORT_ENUM.LEAST_RECENT_WORN: {
      result = {
        sortBy: "dateLastWorn",
        direction: DIRECTION_ENUM.ASCENDING,
      };
      break;
    }
    default: {
      result = {
        sortBy: "sortOrder",
        direction: DIRECTION_ENUM.ASCENDING,
      };
    }
  }
  return result;
};

const buildQuery = ({userId, sort, filter}: {userId: string, sort?: string, filter?: string}) => {
  const sortBy: SortBy = determineSortBy(sort);
  let query: Query<DocumentData> = db.collection("watches").where("userId", "==", userId);

  switch (filter) {
    case WatchStatusEnum.KEEPER: {
      query = db.collection("watches")
          .where("userId", "==", userId)
          .where("status", "==", WatchStatusEnum.KEEPER)
          .orderBy(sortBy.sortBy, sortBy.direction);
      break;
    }
    case WatchStatusEnum.FOR_SALE: {
      query = db.collection("watches")
          .where("userId", "==", userId)
          .where("status", "==", WatchStatusEnum.FOR_SALE)
          .orderBy(sortBy.sortBy, sortBy.direction);
      break;
    }
    case WatchStatusEnum.FOR_SALE: {
      query = db.collection("watches")
          .where("userId", "==", userId)
          .where("status", "==", WatchStatusEnum.FOR_SALE)
          .orderBy(sortBy.sortBy, sortBy.direction);
      break;
    }
    case WatchStatusEnum.FOR_TRADE: {
      query = db.collection("watches")
          .where("userId", "==", userId)
          .where("status", "==", WatchStatusEnum.FOR_TRADE)
          .orderBy(sortBy.sortBy, sortBy.direction);
      break;
    }
    case WatchStatusEnum.FSOT: {
      query = db.collection("watches")
          .where("userId", "==", userId)
          .where("status", "==", WatchStatusEnum.FSOT)
          .orderBy(sortBy.sortBy, sortBy.direction);
      break;
    }
    case WatchStatusEnum.DELETED: {
      query = db.collection("watches")
          .where("userId", "==", userId)
          .where("status", "==", WatchStatusEnum.DELETED)
          .orderBy(sortBy.sortBy, sortBy.direction);
      break;
    }
    case WatchStatusEnum.IN_REPAIRS: {
      query = db.collection("watches")
          .where("userId", "==", userId)
          .where("status", "==", WatchStatusEnum.IN_REPAIRS)
          .orderBy(sortBy.sortBy, sortBy.direction);
      break;
    }
    case WatchStatusEnum.WATCHING: {
      query = db.collection("watches")
          .where("userId", "==", userId)
          .where("status", "==", WatchStatusEnum.WATCHING)
          .orderBy("watchlistSortOrder", DIRECTION_ENUM.ASCENDING);
      break;
    }
    default: {
      query = db.collection("watches")
          .where("userId", "==", userId)
          .where("status", "in", [WatchStatusEnum.DEFAULT, WatchStatusEnum.KEEPER, WatchStatusEnum.FSOT, WatchStatusEnum.FOR_SALE, WatchStatusEnum.FOR_TRADE])
          .orderBy(sortBy.sortBy, sortBy.direction);
      break;
    }
  }
  return query;
};



export {DIRECTION_ENUM, SortBy, buildQuery, determineSortBy};
