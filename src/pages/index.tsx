import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { api } from "../services/youtube";
import Image from "next/image";
import Link from "next/link";
import { parseISO, format } from "date-fns";
import { ptBR } from "date-fns/locale";

type Items = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumb: string;
  url: string;
};

type Info = {
  nextPageToken: string;
  totalResults: number;
};

const Title = styled.h3`
  color: red;
  font-size: 12px;
`;

const Box = styled.div`
  background: red;
  width: 20px;
  height: 20px;
`;

const formatDate = (date: string): string => {
  const newDate = parseISO(date);
  return format(newDate, `dd MMM yy`, { locale: ptBR });
};

export default function Home() {
  const [items, setItems] = useState<Items[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState("");
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<Info>();
  const [scrollRatio, setScrollRadio] = useState<boolean>(false);
  const scrollObserveRef = useRef<HTMLDivElement | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get("").then(({ data }) => {
      console.log(data);
      const t = data.items.map((i) => ({
        id: i.snippet.id,
        title: i.snippet.title,
        description: i.snippet.description,
        thumb: i.snippet.thumbnails.default.url,
        url: `https://www.youtube.com/watch?v=${i.snippet.resourceId.videoId}&ab_channel=Rocketseat`,
        publishedAt: formatDate(i.snippet.publishedAt),
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
      console.log(page);
      api.get(``, { params: { pageToken: page } }).then(({ data }) => {
        console.log(data);
        const t = data.items.map((i) => ({
          id: i.snippet.id,
          title: i.snippet.title,
          description: i.snippet.description,
          thumb: i.snippet.thumbnails.default.url,
          url: `https://www.youtube.com/watch?v=${i.snippet.resourceId.videoId}&ab_channel=Rocketseat`,
          publishedAt: formatDate(i.snippet.publishedAt),
        }));
        setItems([...items, ...t]);
        setLoading(false);
        setPage(() => data.nextPageToken);
        console.log(total);
        console.log(items.length);
        setHasMore(total > items.length + data.items.length ? true : false);
      });
    }
  }, [scrollRatio]);

  const ComponentRef = useCallback(() => <Box ref={scrollObserveRef} />, [
    scrollObserveRef,
  ]);

  return (
    <div>
      <Title>Thiago</Title>
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            <Title>{index + 1}</Title>
            <Image src={item.thumb} width={120} height={90} alt={item.title} />

            <Title>{item.title}</Title>

            {/* <Title>{item.description}</Title> */}
            <Title>{item.publishedAt}</Title>
            <Link href={item.url}>
              <a>{item.url}</a>
            </Link>
          </li>
        ))}
      </ul>
      <ComponentRef />
    </div>
  );
}
