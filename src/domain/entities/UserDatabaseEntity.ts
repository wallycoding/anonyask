import { User } from "firebase/auth";

interface UserDatabaseEntity {
  uid: User["uid"];
  displayName: User["displayName"];
  photoURL: User["photoURL"];
  email: User["email"];
  code: string;
}

export default UserDatabaseEntity;
