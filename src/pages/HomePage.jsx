import { ErrorMessage } from "../components/ErrorMessage";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Loading } from "../components/Loading";


export const HomePage = () => {
    const { recomendation, error, loading} = useRecomendations();
    const { user } = useContext(AuthContext);
  
    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;
  
    return (
      <section>
       
      </section>
    );
  };