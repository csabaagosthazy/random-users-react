import { useState, useEffect } from "react";

import { checkZipCodeHasTwoPrimes } from "./utils/prime";
import { paginate } from "./utils/paginate";
import ItemList from "./components/ItemList";
import CustomPagination from "./components/Pagination";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Stack from "react-bootstrap/Stack";
import "./App.css";

const App = () => {
  const url =
    "https://randomuser.me/api/?results=200&inc=name,location,email,picture,gender";
    
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rawData, setRawData] = useState([]);
  const [data, setData] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [pageData, setPagedata] = useState("");

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          const hasTwoPrimes = result.results.filter((user) =>
            checkZipCodeHasTwoPrimes(user.location.postcode)
          );
          setRawData(hasTwoPrimes);
          pagination(hasTwoPrimes);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  /**
   * Set pages
   * @param {Array} data 
   */
  const pagination = (data) => {
    const pages = paginate(data)
    setNumberOfPages(pages.length);
    setData(pages);
    setPagedata(pages[0]);
  };
  /**
   * Set current page in pagination
   * @param {Integer} number 
   */
  const setCurrentPage = (number) => {
    setCurrentPageNumber(number);
    setPagedata(data[number - 1]);
  };
  /**
   * Filter data by gender
   * @param {String} gender female/male/empty string
   */
  const filterGender = (gender) => {
    const filteredData = gender
      ? rawData.filter((user) => user.gender === gender)
      : rawData;
    pagination(filteredData);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Card>
        <Card.Body>
          <ItemList data={pageData} />
        </Card.Body>
        <Card.Footer>
          <Stack gap={3} style={style.stack}>
            <ButtonGroup aria-label="Basic example">
              <Button variant="success" onClick={() => filterGender("female")}>
                Nő
              </Button>
              <Button variant="primary" onClick={() => filterGender("male")}>
                Férfi
              </Button>
              <Button variant="secondary" onClick={() => filterGender("")}>
                Mind
              </Button>
            </ButtonGroup>
            <CustomPagination
              pageNo={numberOfPages}
              currentPage={currentPageNumber}
              setCurrentPage={setCurrentPage}
              alwaysShown={true}
            />
          </Stack>
        </Card.Footer>
      </Card>
    );
  }
};

export default App;

const style = {
  stack: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
