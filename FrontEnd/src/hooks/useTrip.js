import { useEffect, useState } from "react";
import { getSingleTripService } from "../services";

const useTrip = (id, refresh) => {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTrip = async () => {
      try {
        setLoading(true);

        const data = await getSingleTripService(id);

        console.log(data);

        setTrip(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadTrip();
  }, [id, refresh]);

  return { trip, loading, error };
};

export default useTrip;
