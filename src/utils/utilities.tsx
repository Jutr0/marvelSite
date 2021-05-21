import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export const collectIdsAndDocs = (doc:DocumentData) => ({ id: doc.id, ...doc.data() });
