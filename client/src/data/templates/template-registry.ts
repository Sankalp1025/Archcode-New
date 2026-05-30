import { urlShortenerTemplate } from "./url-shortener-template";

import { netflixTemplate } from "./netflix-template";

import { youtubeTemplate } from "./youtube-template";

export const templates = [
  {
    id: "url-shortener",
    name: "URL Shortener",
    template: urlShortenerTemplate,
  },

  {
    id: "youtube",
    name: "YouTube",
    template: youtubeTemplate,
  },

  {
    id: "netflix",
    name: "Netflix",
    template: netflixTemplate,
  },
];