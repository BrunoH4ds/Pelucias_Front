"use client";

import { useEffect, useState, useTransition } from "react";
import Loading from "@/app/loading";

interface DataFetcherProps<T> {
  fetchData: () => Promise<T>;
  children: (data: T | null) => React.ReactNode;
}

export default function DataFetcher<T>({ fetchData, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [minLoadingComplete, setMinLoadingComplete] = useState(false);

  useEffect(() => {
    const minLoadingTimer = setTimeout(() => {
      setMinLoadingComplete(true);
    }, 1000); // Minimum 1 seconds loading

    const fetchDataAsync = async () => {
      try {
        const result = await fetchData();
        startTransition(() => {
          setData(result);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAsync();

    return () => clearTimeout(minLoadingTimer);
  }, [fetchData]);

  // Show loading until both data is loaded AND minimum time has passed
  if (loading || isPending || !minLoadingComplete) {
    return <Loading />;
  }

  return children(data);
}
