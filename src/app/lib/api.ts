const BASE_URL =
  process.env.API_BASE_URL ?? "https://website-backend-noyf.onrender.com";

// The backend sends `Cache-Control: max-age=300`, which exists specifically to
// hide its ~13s cold start. Match it rather than opting out of caching.
const REVALIDATE_SECONDS = 300;

export type ContentKind = "article" | "project";

export interface ContentItem {
  id: number;
  kind: ContentKind;
  title: string;
  slug: string;
  description: string;
  content: string;
  image_url: string | null;
  repo_url: string | null;
  tags: string[];
  created_at: string;
}

interface ListEnvelope {
  results: ContentItem[];
  count: number;
}

interface ListOptions {
  tag?: string;
  limit?: number;
  offset?: number;
}

function buildQuery({ tag, limit = 50, offset = 0 }: ListOptions): string {
  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });
  if (tag) params.set("tag", tag);
  return params.toString();
}

async function fetchList(
  path: string,
  options: ListOptions = {}
): Promise<ContentItem[]> {
  const res = await fetch(`${BASE_URL}${path}?${buildQuery(options)}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    const { error } = await res.json().catch(() => ({}));
    throw new Error(error ?? `request failed with ${res.status}`);
  }

  const { results }: ListEnvelope = await res.json();
  return results;
}

// Results arrive sorted newest first, so no client-side sorting is needed.
export function getArticles(options?: ListOptions): Promise<ContentItem[]> {
  return fetchList("/articles", options);
}

export function getProjects(options?: ListOptions): Promise<ContentItem[]> {
  return fetchList("/projects", options);
}

export async function getContentItem(
  kind: ContentKind,
  slug: string
): Promise<ContentItem | null> {
  const res = await fetch(
    `${BASE_URL}/content/${kind}/${encodeURIComponent(slug)}`,
    { next: { revalidate: REVALIDATE_SECONDS } }
  );

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`request failed with ${res.status}`);

  return res.json();
}

// The stored timestamps are wall-clock times recorded as UTC, so formatting in
// UTC keeps the displayed date identical to what was originally written.
export function formatDate(createdAt: string): string {
  return new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

const WORDS_PER_MINUTE = 200;

// Derived purely from the already-fetched article content, so this needs no
// backend field: strip HTML tags down to plain text, count words, and round
// up to the nearest minute (never 0, even for a very short article).
export function estimateReadingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, " ");
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}
