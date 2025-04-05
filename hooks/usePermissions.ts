import { useEffect } from "react";
import { requestBtPermissions } from "utils/bluetooth-permissions";

const usePermissions = () => {
  // request bt permissions:
  useEffect(() => {
    requestBtPermissions();
  }, []);
};

export default usePermissions;
