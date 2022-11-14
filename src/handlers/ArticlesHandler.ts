import {Request, Response} from "express";
import {db} from "../config/firebase";

type EntryType = {
    title: string,
    text: string,
    coverImageUrl: string
}

const entryRoutes = [
  {
    path: "/entries",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        try {
          const allEntries: EntryType[] = [];
          const querySnapshot = await db.collection("entries").get();
          querySnapshot.forEach((doc: any) => allEntries.push(doc.data()));
          return res.status(200).json(allEntries);
        } catch (err) {
          return res.status(500).json(err);
        }
      },
    ],
  },
  {
    path: "/entries",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        const {title, text} = req.body;

        try {
          const entry = db.collection("entries").doc();
          const entryObject = {
            id: entry.id,
            title,
            text,
          };

          entry.set(entryObject);

          const result= {
            status: "success",
            message: "entry added successfully",
            data: entryObject,
          };
          return res.status(200).json(result);
        } catch (err) {
          return res.status(500).json(err);
        }
      },
    ],
  },
  {
    path: "/entries/:entryId",
    method: "patch",
    handler: [
      async (req: Request, res: Response) => {
        const {body: {text, title}, params: {entryId}} = req;
        try {
          const entry = db.collection("entries").doc(entryId);
          const currentData = (await entry.get()).data() || {};
          const entryObject = {
            title: title || currentData.title,
            text: text || currentData.text,
          };

          await entry.set(entryObject).catch((error) => {
            throw (error.message);
          });

          const result = {
            status: "success",
            message: "entry updated successfully",
            data: entryObject,
          };
          return res.status(200).json(result);
        } catch (err) {
          return res.status(500).json(err);
        }
      },
    ],
  },
  {
    path: "/entries/:entryId",
    method: "delete",
    handler: [
      async (req: Request, res: Response) => {
        const {entryId} = req.params;
        try {
          const entry = db.collection("entries").doc(entryId);

          await entry.delete().catch((error) => {
            throw (error.message);
          });

          const result = {
            status: "success",
            message: "entry deleted successfully",
          };
          return res.status(200).json(result);
        } catch (err) {
          return res.status(500).json(err);
        }
      },
    ],
  },
];

export default entryRoutes;
