'use client';
import { useEffect, useMemo, useState } from "react";
import useFetch from "../hooks/useFetch";
import ListItem from "./ListItem";

import { DataItem } from "@/app/models/appmodel";

const ITEMS_PER_PAGE = 10;

const Pagination: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [disabledPrev, setDisabledPrev] = useState<boolean>(true);
  const [disabledNext, setDisabledNext] = useState<boolean>(false);

  const fetchURL =
    "https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json";

  const { data, loading, error } = useFetch<DataItem[]>(fetchURL);

  const maxPages = useMemo<number>(() => {
    return data ? Math.ceil(data.length / ITEMS_PER_PAGE) : 0;
  }, [data]);

  const pageData = (pageNumber: number): DataItem[] => {
    if (!data) return [];

    const startIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return data.slice(startIndex, endIndex);
  };

  useEffect(() => {
    setDisabledPrev(currentPage === 1);
    setDisabledNext(currentPage === maxPages);
  }, [currentPage, maxPages]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {String(error)}</p>}

      {data && !loading && (
        <>
          <ul>
            {pageData(currentPage).map((item) => (
              <ListItem key={String(item.id)} item={item} />
            ))}
          </ul>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.max(prev - 1, 1))
            }
            className="button"
            disabled={disabledPrev}
          >
            Previous
          </button>

          <span>
            {currentPage} of {maxPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, maxPages))
            }
            className="button"
            disabled={disabledNext}
          >
            Next
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
