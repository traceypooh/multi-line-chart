# How a Denosaur 🦕 is making it so Everyone Can Code

[Aaron Swartz Day 2021](https://www.aaronswartzday.org/asd-2021/)
coding talk.

## Anyone can learn to code!

Here we'll show:
- fetch data
- process data
- visualize data

All with a single JS file, hosted anywhere, browser debuggable, etc.


JS graph code from: https://observablehq.com/@d3/multi-line-chart
  - (it wasn't ever published to `npm`)

## Demo
this code is live at: https://traceypooh.github.io/multi-line-chart/

(can take awhile to load data from https://archive.org ...)


## Key Points

- can load page entirely locally
  - `open index.html` in _safari_ :)
    - [Preferences] [Advanced] Show Develop menu in menu bar ✅
    - During dev:
      - [Develop] Disable Local File Restrictions ✅

- Content Delivery Network (CDN)
  - `import` JS directly (without `npm`, `node` or `node_modules`)
  - https://www.skypack.dev/
  - https://esm.sh/

  - https://esm.archive.org
    - no tracking
    - JS, CSS, imagery


## Back-end JS 🦕

- https://deno.land
- made by creator of `node`
- most browser code works in backend
- web standards like `fetch()` and `URL`
- can `import` from any url
  - GitHub / GitLab
  - personal webserver
  - CDNs like Skypack, esm.sh
