import { useEffect, useState } from "react";

export default function useData(uri, dependencies = []) {
  const [loading, setLoading] = useState(true);
  const [data, setdata] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetch(uri)
        .then((value) => value.json())
        .then((value) => setdata(value))
        .finally(() => setLoading(false));
    }, 2000);
  }, dependencies);

  return { data, loading };
}
