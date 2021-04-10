import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../services/youtube";
import Image from "next/image";
import Link from "next/link";
import { parseISO, format } from "date-fns";
import { ptBR } from "date-fns/locale";

import List from "../components/List";
import ListItem from "../components/ListItem";

const formatDate = (date) => {
  const newDate = parseISO(date);
  return format(newDate, `dd MMM yy`, { locale: ptBR });
};

export default function Youtube() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState("");
  const [loading, setLoading] = useState(false);
  const [scrollRatio, setScrollRadio] = useState(false);
  const scrollObserveRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get("").then(({ data }) => {
      const t = data.items.map((i) => ({
        id: i.snippet.id,
        title: i.snippet.title,
        description: i.snippet.description,
        image: i.snippet.thumbnails.default.url,
        url: `https://www.youtube.com/watch?v=${i.snippet.resourceId.videoId}&ab_channel=Rocketseat`,
        published_at: formatDate(i.snippet.publishedAt),
      }));
      setItems([...t]);
      setLoading(false);
      setPage(data.nextPageToken);
      setTotal(data.pageInfo.totalResults);
      setHasMore(data.pageInfo.totalResults > items.length);
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

      api.get(``, { params: { pageToken: page } }).then(({ data }) => {
        const t = data.items.map((i) => ({
          id: i.snippet.id,
          title: i.snippet.title,
          description: i.snippet.description,
          image: i.snippet.thumbnails.default.url,
          url: `https://www.youtube.com/watch?v=${i.snippet.resourceId.videoId}&ab_channel=Rocketseat`,
          published_at: formatDate(i.snippet.publishedAt),
        }));
        setItems([...items, ...t]);
        setLoading(false);
        setPage(() => data.nextPageToken);

        setHasMore(total > items.length + data.items.length ? true : false);
      });
    }
  }, [scrollRatio]);

  const ComponentRef = useCallback(
    () => <div className="h-20 w-100 bg:red" ref={scrollObserveRef} />,
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
