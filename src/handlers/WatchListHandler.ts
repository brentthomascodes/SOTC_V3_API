import {Request, Response} from "express";
import {db} from "../config/firebase";
import {WatchConstructor, WatchType} from "../models/WatchModels";

const userId = "1";

const WatchListRoutes = [
  // GET all watches in SOTC
  {
    path: "/watchlist",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        try {
          const watches: WatchType[] = [];
          const querySnapshot = await db.collection("watchlist").get();
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
    path: "/watchlist",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        const watch: WatchType = req.body.watch;

        try {
          const entry = await db.collection("watchlist").doc();
          const nextSortOrder = await db.collection("watchlist")
              .get().then((snapshot) => {
                return snapshot.size - 1;
              });
          const watchEntry = WatchConstructor({watchId: entry.id, userId, watch, nextSortOrder});
          await entry.set(watchEntry)
              .catch((error) => {
                throw (error.message);
              });

          const result= {
            status: "success",
            message: "Watch added to Watch List successfully",
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
    path: "/watchlist/sort",
    method: "patch",
    handler: [
      async (req: Request, res: Response) => {
        const watches: WatchType[] = req.body.watches;

        try {
          const batch = db.batch();
          watches.forEach((watch: WatchType) => {
            const watchSnapShot = db.collection("watchlist").doc(watch.id);
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
            message: "Watch List watches sorted successfully",
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
    path: "/watchlist/:watchId",
    method: "patch",
    handler: [
      async (req: Request, res: Response) => {
        const {body: {watch}, params: {watchId}} = req;
        try {
          const entry = db.collection("watchlist").doc(watchId);
          const currentData = (await entry.get()).data() || {};
          const watchEntry = WatchConstructor({watchId, userId, watch: {...currentData, ...watch}});

          await entry.set(watchEntry).catch((error) => {
            throw (error.message);
          });

          const result = {
            status: "Success",
            message: "Watch List watch updated successfully",
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
    path: "/watchlist/:watchId",
    method: "delete",
    handler: [
      async (req: Request, res: Response) => {
        const {watchId} = req.params;
        try {
          const entry = db.collection("watchlist").doc(watchId);

          await entry.delete().catch((error) => {
            throw (error.message);
          });

          const result = {
            status: "success",
            message: "Watch List watch deleted successfully",
          };
          return res.status(200).json(result);
        } catch (err) {
          return res.status(500).json(err);
        }
      },
    ],
  },
];

export default WatchListRoutes;
