import React, { useState, useEffect, useRef } from "react";
import Character from "./Character";
import useDropdown from "./useDropdown";
import "./main.css";

const axios = require("axios");

const SearchParams = (props) => {
  const [params, setParams] = useState(props.params);
  const [response, setResponse] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [name, setName] = useState("");
  const [orderBy, OrderByDropdown] = useDropdown(
    "Order By ",
    "Name Ascending",
    [
      "Name Ascending",
      "Name Descending",
      "Modified Ascending",
      "Modified Descending",
    ]
  );
  const [pages, setPages] = useState([]);
  const [page, PageDropdown, updatePage] = useDropdown("Page ", "1", pages);

  let loadCharacters;
  const loading = useRef(true);
  //let loading = true;

  useEffect(() => {
    loading.current = true;
    setCharacters(null);
    axios
      .get("http://gateway.marvel.com/v1/public/characters", {
        params: params,
      })
      .then((response) => {
        console.log(response);
        setResponse(response);
        setCharacters(response.data.data.results);
        console.log("response");
      })
      .catch((error) => {
        console.log(error);
        console.log("error");
      });
  }, [params]);

  useEffect(() => {
    updatePage("1");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.nameStartsWith]);

  useEffect(() => {
    let order;
    switch (orderBy) {
      case "Name Descending":
        order = "-name";
        break;
      case "Modified Ascending":
        order = "modified";
        break;
      case "Modified Descending":
        order = "-modified";
        break;
      default:
        order = "name";
    }
    setParams({ ...params, ...{ orderBy: order } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderBy]);

  useEffect(() => {
    loading.current = true;
    if (response !== null) {
      const totalCharacters = response.data.data.total;
      let pages = parseInt(totalCharacters / params.limit);

      if (pages * params.limit < totalCharacters) {
        pages += 1;
      }
      let tabPages = Array(pages);
      for (let i = 1; i <= pages; i++) {
        tabPages[i - 1] = i.toString();
      }
      setPages(tabPages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, params.limit]);

  useEffect(() => {
    loading.current = true;

    const offset = (page - 1) * params.limit;
    setParams({ ...params, ...{ offset: offset } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  if (characters !== null && characters.length > 0) {
    loading.current = false;

    loadCharacters = characters.map((step) => {
      return (
        <Character
          key={step.id}
          name={step.name}
          description={step.description}
          thumbnail={step.thumbnail}
          id={step.id}
        />
      );
    });
  } else if (characters !== null && characters.length === 0) {
    loading.current = false;
    loadCharacters = <h1>Not Found</h1>;
  }
  if (loading === true) {
    loadCharacters = <h1>Loading...</h1>;
  }

  return (
    <div id="container">
      <div className="searchBar">
        <form>
          <PageDropdown />
          <label htmlFor="name">
            Name
            <input
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                e.preventDefault();
                setName(e.target.value);
              }}
              onBlur={(e) => {
                e.preventDefault();
                setName(e.target.value);
              }}
            ></input>
          </label>
          <OrderByDropdown />
          <button
            id="searchButton"
            value="Search"
            onClick={(e) => {
              e.preventDefault();
              if (
                params.nameStartsWith === name ||
                (params.nameStartsWith === undefined &&
                  (name === null || name.trim() === ""))
              ) {
              } else if (name === null || name.trim() === "") {
                let params2 = params;

                delete params2.nameStartsWith;
                setParams({ ...params2 });
              } else {
                setParams({
                  ...params,
                  ...{ nameStartsWith: name },
                });
              }
            }}
          >
            Search
          </button>
        </form>
      </div>
      <div className="results">{loadCharacters}</div>
    </div>
  );
};

export default SearchParams;
