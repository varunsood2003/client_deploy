import { listData } from "../../lib/dummydata";
import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";

function ListPage() {
  const data = useLoaderData();

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={data.postResponse} errorElement={<p>Error Loading</p>}>
              {(postResponse) => (
                <div>
                  {postResponse.data.map((item) => (
                    <Card key={item.id} item={item} />
                  ))}
                </div>
              )}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
        <Map items={data.postResponse.data} />
      </div>
    </div>
  );
}

export default ListPage;
