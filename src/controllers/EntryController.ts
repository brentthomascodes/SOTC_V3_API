import {db} from "../config/firebase";

type EntryType = {
    title: string,
    text: string,
    coverImageUrl: string
}

class entryController {
  getAllEntries = async () => {
    // try {
    const allEntries: EntryType[] = [];
    const querySnapshot = await db.collection("entries").get();
    querySnapshot.forEach((doc: any) => allEntries.push(doc.data()));
    return allEntries;
    // } catch (error: any) {
    //   throw (error.message);
    // }
  };


  //   addEntry: async (data: any) => {
  //     const {title, text} = data;

  //     try {
  //       const entry = db.collection("entries").doc();
  //       const entryObject = {
  //         id: entry.id,
  //         title,
  //         text,
  //       };

  //       entry.set(entryObject);

  //       return {
  //         status: "success",
  //         message: "entry added successfully",
  //         data: entryObject,
  //       };
  //     } catch (error: any) {
  //       throw (error.message);
  //     }
  //   },

  //   updateEntry: async (data: any, id: string) => {
  //     const {title, text} = data;

  //     try {
  //       const entry = db.collection("entries").doc(id);
  //       const currentData = (await entry.get()).data() || {};
  //       const entryObject = {
  //         title: title || currentData.title,
  //         text: text || currentData.text,
  //       };

  //       await entry.set(entryObject).catch((error) => {
  //         throw (error.message);
  //       });

  //       return {
  //         status: "success",
  //         message: "entry updated successfully",
  //         data: entryObject,
  //       };
  //     } catch (error: any) {
  //       throw (error.message);
  //     }
  //   },

  //   deleteEntry: async (id: string) => {
  //     try {
  //       const entry = db.collection("entries").doc(id);

  //       await entry.delete().catch((error) => {
  //         throw (error.message);
  //       });

//       return {
//         status: "success",
//         message: "entry deleted successfully",
//       };
//     } catch (error: any) {
//       throw (error.message);
//     }
//   },
}

export default entryController;
