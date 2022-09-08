import React, { useState, useEffect } from "react";
import "./App.css";
import SpaceMission, { apolloClient } from "./graphql";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import { useQuery } from "@apollo/client";
import { GET_SPACE_MISSION } from "./graphql/queries";

function App() {
  const [page, setPage] = useState(0);
  // const [data, setData] = useState([]);
  const PAGE_SIZE = 10;
  const { data, loading, error } = useQuery(GET_SPACE_MISSION, {
    apolloClient,
    variables: { limit: PAGE_SIZE, offset: page * PAGE_SIZE },
  });

  // const loadSpaceMission = async () => {
  //   const spaceMissions = await SpaceMission.getSpaceMission(10);
  //   setData(spaceMissions);
  // };

  // useEffect(() => {
  //   loadSpaceMission();
  // }, []);

  console.log("data", data);

  if (loading)
    return (
      <>
        <MDBContainer style={styles.container}>
          <MDBRow>
            <h2 style={styles.title}>SpaceX GraphQL API with React</h2>
            <div style={styles.loading}>Loading...</div>

            <nav style={styles.nav}>
              <button
                className="btn btn-dark"
                disabled={!page}
                onClick={() => setPage((prev) => prev - 1)}
              >
                Previous
              </button>
              <span>Page {page + 1}</span>
              <button
                className="btn btn-dark"
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
              </button>
            </nav>
            <footer className="fixed mt-[500px] inset-x-0 bottom-0 p-4 bg-white  md:flex md:items-center md:justify-between md:p-6 ">
              <span className="text-sm text-gray-500 sm:text-center">
                © 2022 Marsetio Noorprajuda. All Rights Reserved.
              </span>
            </footer>
          </MDBRow>
        </MDBContainer>
      </>
    );

  if (error) return <div>{error.message}</div>;

  return (
    <MDBContainer style={styles.container}>
      <MDBRow>
        <h2 style={styles.title}>SpaceX GraphQL API with React</h2>
        {data.launchesPast.map((item, index) => {
          return (
            <>
              <div className="col-md-6 gap-2 p-3">
                <MDBCard key={index} style={styles.card}>
                  <MDBCardImage
                    style={styles.image}
                    src={
                      item && item.ships[0] && item.ships[0].image
                        ? item.ships[0].image
                        : "https://www.universetoday.com/wp-content/uploads/2011/03/IMG_4650a_STS-133_Ken-Kremer.jpg"
                    }
                    position="top"
                    alt={item.mission_name}
                  />
                  <MDBCardBody>
                    <MDBCardTitle>{item.mission_name}</MDBCardTitle>
                    <MDBCardText>{item.launch_site.site_name_long}</MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </div>
            </>
          );
        })}
        <nav style={styles.nav}>
          <button
            className="btn btn-dark"
            disabled={!page}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <span>Page {page + 1}</span>
          <button
            className="btn btn-dark"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </nav>
        <footer className="fixed mt-[500px] inset-x-0 bottom-0 p-4 bg-white md:flex md:items-center md:justify-between md:p-6 ">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2022 Marsetio Noorprajuda. All Rights Reserved.
          </span>
        </footer>
      </MDBRow>
    </MDBContainer>
  );
}

const styles = {
  container: {
    margin: "auto",
    padding: "15px",
    maxWidth: "720px",
    alignContent: "center",
  },
  title: {
    marginLeft: "125px",
  },
  card: {
    maxWidth: "22rem",
    width: "20rem",
    maxHeight: "24rem",
    height: "24rem",
    margin: "10px",
  },
  image: {
    height: "200px",
    objectFit: "cover",
  },
  nav: { display: "flex", justifyContent: "space-between" },
  loading: {
    height: "300px",
    align: "center",
    marginTop: "150px",
    marginLeft: "325px",
  },
};

export default App;
