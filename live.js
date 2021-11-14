import * as d3 from 'https://esm.archive.org/d3'
import $ from 'https://esm.archive.org/jquery'
import LineChart from './multi-line-chart.js'
window.d3 = d3

const JSON = [
  'https://archive.org/advancedsearch.php?',
  'q=mediatype:etree AND year:[1995 TO 2100]',
  'fl[]=creator',
  'fl[]=year',
  'output=json',
  'rows=2500',
].join('&')

const json = (await (await fetch(JSON)).json()).response?.docs

const n = {}
for (const e of json) {
  n[e.creator] = 1 + (n[e.creator] || 0)
}
console.log({n})

const pops = Object.fromEntries(Object.entries(n).sort((a,b) => b[1] - a[1]).slice(0, 50))

const shows_per_year = {}
for (const e of json) {
  if (pops[e.creator]) {
    shows_per_year[e.creator] = shows_per_year[e.creator] || {}
    shows_per_year[e.creator][e.year] = 1 + (shows_per_year[e.creator][e.year] ?? 0)
  }
}

const xyz = []
for (const [band, year2n] of Object.entries(shows_per_year)) {
  for (const [year, n] of Object.entries(year2n)) {
    xyz.push([
      new Date(year).getTime(),
      n,
      band,
    ])
  }
}

$('body').html(LineChart(xyz, {
  yLabel: 'archive.org concerts per year',
  color: 'steelblue',
  z: ([,,z]) => z,
}))
