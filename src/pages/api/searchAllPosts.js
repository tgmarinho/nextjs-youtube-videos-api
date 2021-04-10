import formatDate from "../../utils/formatDate";
import ghostConnection from "./_lib/connectToGhost";

export async function getAllPosts(pageNumber = 1) {
  const posts = await ghostConnection()
    .posts.browse({
      limit: `50`,
      page: `${pageNumber}`,
      order: `published_at desc`,
      include: `tags`,
      fields: `id,slug,title,url,feature_image,published_at,plaintext,excerpt,visibility`,
    })
    .catch((err) => {
      console.error(err);
    });

  const postsFiltered = posts.map(
    ({ id, url, title, published_at, feature_image, tags }) => ({
      url,
      title,
      id,
      tag: tags[0]?.name || ``,
      image: feature_image,
      published_at: formatDate(published_at),
    })
  );

  return { posts: postsFiltered, meta: posts.meta };
}
