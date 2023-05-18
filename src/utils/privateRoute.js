import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";

const PrivateRoute = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get("token");
      if (!token) {
        router.replace("/login");
        return;
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default PrivateRoute;
