import {Request, Response} from "express";
import {db} from "../config/firebase";
import {WatchConstructor, WatchStatusEnum, WatchType} from "../models/WatchModels";
import GetStatistics from "./Queries/CollectionStatisticsQueries";
import { buildQuery } from "./Queries/WatchesQueries";

const userId = "1";

const WatchRoutes = [
  // GET all watches in SOTC
  {
    path: "/watches/:filter/:sort",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const {filter, sort} = req.params;
        try {
          const query = buildQuery({userId, sort, filter});
          const watches: WatchType[] = [];
          const querySnapshot = await query.get();
          querySnapshot.forEach((doc: any) => {
            watches.push(doc.data());
          });
          return res.status(200).json(watches);
        } catch (err) {
          return res.status(500).json(err);
        }
      },
    ],
  },
  {
    path: "/watches",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        const watch: WatchType = req.body.watch;

        try {
          const entry = await db.collection("watches").doc();
          const nextSortOrder = await db.collection("watches")
              .where("status", "in", [WatchStatusEnum.DEFAULT, WatchStatusEnum.KEEPER, WatchStatusEnum.FSOT, WatchStatusEnum.FOR_SALE, WatchStatusEnum.FOR_TRADE])
              .get().then((snapshot) => {
                return snapshot.size;
              });
          const watchEntry = WatchConstructor({watchId: entry.id, userId, watch, nextSortOrder});
          await entry.set(watchEntry).catch((error) => {
                console.log('ERROR', error)
                throw (error.message);
              });
              
          const result= {
            status: "success",
            message: "Watch added successfully",
            data: watchEntry,
          };

          return res.status(200).json(result);
        } catch (err) {
          console.log('ERROR 1', err)
          return res.status(500).json(err);
        }
      },
    ],
  },
  {
    path: "/watches/sort",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        const watches: WatchType[] = req.body.watches;

        try {
          const batch = db.batch();

          // Add to Batch Write
          watches.forEach((watch: WatchType) => {
            const watchSnapShot = db.collection("watches").doc(watch.id);
            batch.update(watchSnapShot, {
              sortOrder: watch.sortOrder,
            });
          });

          await batch.commit()
              .catch((error) => {
                throw (error.message);
              });

          const result= {
            status: "success",
            message: "Watches sorted successfully",
            data: watches,
          };
          return res.status(200).json(result);
        } catch (err) {
          return res.status(500).json(err);
        }
      },
    ],
  },
  {
    path: "/watches/:watchId",
    method: "patch",
    handler: [
      async (req: Request, res: Response) => {
        const {body: {watch}, params: {watchId}} = req;
        try {
          const entry = db.collection("watches").doc(watchId);
          const currentData = (await entry.get()).data() || {};
          const watchEntry = WatchConstructor({watchId, userId, watch: {...currentData, ...watch}});

          await entry.set(watchEntry).catch((error) => {
            throw (error.message);
          });

          const result = {
            status: "Success",
            message: "Watch updated successfully",
            data: watchEntry,
          };
          return res.status(200).json(result);
        } catch (err) {
          return res.status(500).json(err);
        }
      },
    ],
  },
  {
    path: "/watches/watchlist/add",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        const watch = req.body.watch;
        try {
          // Delete WatchList Watch
          const watchListEntry = db.collection("watchlist").doc(watch.id);
          await watchListEntry.delete().catch((error) => {
            throw (error.message);
          });

          // Add new Watch
          const nextSortOrder = await db.collection("watches")
              .where("status", "in", [WatchStatusEnum.DEFAULT, WatchStatusEnum.KEEPER, WatchStatusEnum.FSOT, WatchStatusEnum.FOR_SALE, WatchStatusEnum.FOR_TRADE])
              .get().then((snapshot) => {
                return snapshot.size - 1;
              });
          const newWatchEntry = await db.collection("watches").doc();
          const watchEntry = WatchConstructor({watchId: newWatchEntry.id, userId, watch, nextSortOrder});
          await newWatchEntry.set(watchEntry)
              .catch((error) => {
                throw (error.message);
              });

          const result = {
            status: "Success",
            message: "Watch added from Watch List successfully",
            data: watchEntry,
          };
          return res.status(200).json(result);
        } catch (err) {
          return res.status(500).json(err);
        }
      },
    ],
  },
  {
    path: "/watches/:watchId",
    method: "delete",
    handler: [
      async (req: Request, res: Response) => {
        const {watchId} = req.params;
        try {
          const entry = db.collection("watches").doc(watchId);

          await entry.delete().catch((error) => {
            throw (error.message);
          });

          const result = {
            status: "success",
            message: "Watch deleted successfully",
          };
          return res.status(200).json(result);
        } catch (err) {
          return res.status(500).json(err);
        }
      },
    ],
  },
  {
    path: "/watches/collection-statistics",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        try {
          const query = buildQuery({userId});
          const watches: WatchType[] = [];
          const querySnapshot = await query.get();
          querySnapshot.forEach((doc: any) => {
            watches.push(doc.data());
          });

          const collectionStatistics = GetStatistics(watches);
          return res.status(200).json(collectionStatistics);
        } catch (err) {
          return res.status(500).json(err);
        }
      },
    ],
  }
];

export default WatchRoutes;
