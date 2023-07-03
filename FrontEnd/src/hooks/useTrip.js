import { useEffect, useState } from "react";
import { getSingleTripService } from "../services";

const useTrip = (id) => {
  const [trip, setTrip] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTrip = async () => {
      try {
        setLoading(true);

        const data = await getSingleTripService({ id });

        setTrip(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadTrip();
  }, []);

  return { trip, loading, error };
};

export default useTrip;
