import { useEffect, useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";

export default function useFuse(data, searchTerm, fuseOption) {
  const fuse = useRef(null);
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (fuse.current) {
      fuse.current.setCollection(data);
    } else {
      fuse.current = new Fuse(data, fuseOption);
    }
  }, [data, fuseOption]);

  useEffect(() => {
    setResult(fuse.current?.search(searchTerm) || []);
  }, [searchTerm]);

  return { result };
}
