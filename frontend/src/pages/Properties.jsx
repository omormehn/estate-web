import PropertyCards from "../components/PropertyCard/PropertyCards";
import SearchBar from "../components/Search/SearchBar"
import useProperties from "../hooks/useProperties";
import { PuffLoader } from 'react-spinners'



const Properties = () => {
  const { data, isError, isLoading } = useProperties();

  if(isError) {
    return (
      <div>
        <h1>Error while fetching data</h1>
      </div>
    )
  }

  if(isLoading) {
    return (
      <div className="flexCenter justify-center container h-[60vh]">
        <PuffLoader 
          color={"#123abc"} 
          size={80} 
          radius={1}
          aria-label="puff-loading"
        />
      </div>
    )
  }

  return (
    <section className="mt-40">
      <div className="bg-white z-50">
       <SearchBar/>

       {/* Properties */}
       <div className="container flexCenter flex-wrap gap-10">
        {
          data.map((card, i) => (
            <PropertyCards card={card} key={i}/>
          ))
        }
       </div>
      </div>
    </section>
  )
}

export default Properties