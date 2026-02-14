import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { Db } from "./constant";

const useEmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const FetchData = async () => {
    const DataFetch = await getDocs(collection(Db, "employees"));
    const employeeList = [];
    DataFetch.forEach((doc) => {
      employeeList.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setUsers(employeeList);
    setLoading(false);
  };

  useEffect(() => {
    FetchData();
  }, []);

  return [loading, users, setLoading];
};

export default useEmployeeList;
