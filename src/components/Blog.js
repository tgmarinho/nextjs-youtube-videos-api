import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../services/youtube";
import Image from "next/image";
import Link from "next/link";
import { parseISO, format } from "date-fns";
import { ptBR } from "date-fns/locale";

import List from "../components/List";
import ListItem from "../components/ListItem";
import { getAllPosts } from "../pages/api/searchAllPosts";

const formatDate = (date) => {
  const newDate = parseISO(date);
  return format(newDate, `dd MMM yy`, { locale: ptBR });
};

export default function Blog() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState("");
  const [loading, setLoading] = useState(false);
  const [scrollRatio, setScrollRadio] = useState(false);
  const scrollObserveRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllPosts().then(({ posts, meta }) => {
      console.log(posts);
      console.log(meta);
      setItems([...posts]);
      setLoading(false);
      setPage(page + 1);
      setTotal(meta.pagination.total);
      setHasMore(meta.pagination.total > items.length);
    });
  }, []);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollRadio(entry.isIntersecting);
      },
      { rootMargin: `20px` }
    );
    if (scrollObserveRef.current) {
      intersectionObserver.observe(scrollObserveRef.current);
    }
    return () => {
      intersectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (scrollRatio && hasMore) {
      setLoading(true);
      getAllPosts().then(({ posts, meta }) => {
        setItems([...posts]);
        setLoading(false);
        setPage(page + 1);
        setTotal(meta.pagination.total);
        setHasMore(meta.pagination.total > items.length);
      });
    }
  }, [scrollRatio]);

  const ComponentRef = useCallback(
    () => <div className="h-20 w-100" ref={scrollObserveRef} />,
    [scrollObserveRef]
  );

  return (
    <aside>
      <List>
        {items.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}

        <ComponentRef />
      </List>
    </aside>
  );
}
