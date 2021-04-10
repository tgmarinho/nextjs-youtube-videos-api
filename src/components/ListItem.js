import Image from "next/image";
import Link from "next/link";

export default function ListItem({ item }) {
  console.log(item.url);
  return (
    <article className="m-4 flex flex-col md:flex-row justify-center	items-center shadow-lg bg-white m:10 rounded-lg h-18 p-4 flex space-x-4">
      <div className="flex flex-row md:flex-col ">
        <Image src={item.image} width={120} height={90} alt={item.title} />
      </div>
      <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
        <a
          href={item.url}
          className="text-lg font-semibold text-black mb-0.5 hover:text-blue-600 focus:text-blue-600"
        >
          {item.title}
        </a>
        <dl className="flex flex-wrap text-sm font-medium whitespace-pre">
          <div>
            <dt className="sr-only">Published at</dt>
            <dd>
              <abbr title={`${item.published_at}`}>em {item.published_at}</abbr>
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
