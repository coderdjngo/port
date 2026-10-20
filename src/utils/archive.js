export function getArchivePage(artworks, page, pageSize) {
  const withIndex = artworks.map((work, index) => ({ work, index }));
  const start = page * pageSize;
  const items = withIndex.slice(start, start + pageSize);

  return items.length ? items : withIndex.slice(0, pageSize);
}

export const filterArtworks = (artworks, category) =>
  category === "all" ? artworks : artworks.filter((work) => work.category === category);
