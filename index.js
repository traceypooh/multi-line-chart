
import * as d3 from 'https://esm.archive.org/d3'
import $ from 'https://esm.archive.org/jquery'
import LineChart from './multi-line-chart.js'

window.d3 = d3
window.$ = $
const log = console.log.bind(console)


const JSON = 'https://archive.org/advancedsearch.php?q=mediatype:etree&fl[]=creator&fl[]=year&output=json&rows=250000'

const json = (await (await fetch(JSON)).json())?.response?.docs
log(json[0])

const n = {}
for (const e of json)
  n[e.creator] = 1 + (n[e.creator] || 0)
log({n})

const pops = Object.fromEntries(Object.entries(n).sort((a,b) => b[1] - a[1]).slice(0, 50))
log({pops})

const shows_per_year = {}
for (const e of json) {
  shows_per_year[e.creator] = shows_per_year[e.creator] || {}
  shows_per_year[e.creator][e.year] = 1 + (shows_per_year[e.creator][e.year] ?? 0)
}
log({shows_per_year})

const xyz = []
for (const [band, year2n] of Object.entries(shows_per_year)) {
  for (const [year, n] of Object.entries(year2n)) {
    xyz.push({
      x: new Date(year).getTime(),
      y: shows_per_year[band][year],
      z: band,
    })
  }
}
log({xyz})

$('body').append(LineChart(xyz, {
  x: (e) => e.x,
  y: (e) => e.y,
  z: (e) => e.z,
  yLabel: "↑ archive.org band recordings per year",
  width: $(document).width(),
  height: 500,
  color: "steelblue",
}))
