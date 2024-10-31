import { useEffect, useState } from "react";
import PropertyCards from "../components/PropertyCard/PropertyCards";
import SearchBar from "../components/Search/SearchBar";
import useProperties from "../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import { Button } from "@material-tailwind/react";
const Properties = () => {
  const [error, setError] = useState(false);
  const { data, isError, isLoading, refetch } = useProperties();

  useEffect(() => {
    window.scrollTo(0,0);
    if (isError) {
      setError(true);
    } else {
      setError(false);
    }
  }, [isError]);

  const handleRetry = () => {
    refetch();
  }

  return (
    <section className="mt-40">
      <div className="bg-white z-50">
        <SearchBar />

        {isLoading && (
          <div className="flexCenter justify-center pt-20 sm:pt-0 container h-[60vh]">
            <PuffLoader
              color={"#123abc"}
              size={80}
              radius={1}
              aria-label="puff-loading"
            />
          </div>
        )}

        {/* Properties */}
        <div className="container flexCenter flex-wrap gap-10">
          {error ? (
            <div className="flex justify-center items-center flex-col gap-8 mt-8">
              <h1>Error in Fetching Projects</h1>
              <Button className="text-black px-4 py-2" onClick={handleRetry}>
                Retry
              </Button>
            </div>
          ) : (
            Array.isArray(data) && data.length > 0 ? (
              data.map((card, i) => <PropertyCards card={card} key={i} />)
            ) : (
              <div className="flexCenter justify-center items-center flex-col gap-8 mt-8">
                <h1>No Properties Found</h1>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Properties;
