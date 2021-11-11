
import * as d3 from 'https://esm.archive.org/d3'
import $ from 'https://esm.archive.org/jquery'
import LineChart from './multi-line-chart.js'

window.d3 = d3
window.$ = $
const log = console.log.bind(console)


const JSON = 'https://archive.org/advancedsearch.php?q=mediatype:etree&fl[]=creator&fl[]=date&output=json&rows=250000'

$('body').append('<h1>archive concerts</h1>')


const json = (await (await fetch(JSON)).json())?.response?.docs
log(json[0])

const n = {}
for (const e of json)
  n[e.creator] = 1 + (n[e.creator] || 0)
log({n})

const pops = Object.fromEntries(Object.entries(n).sort((a,b) => b[1] - a[1]).slice(0, 50))
log({pops})

const shows_per_month = {}
for (const e of json) {
  try {
    const month = new Date(e.date)?.toISOString()?.slice(0, 7)
    if (month) {
      shows_per_month[e.creator] = shows_per_month[e.creator] || {}
      shows_per_month[e.creator][month] = 1 + (shows_per_month[e.creator][month] ?? 0)
    }
  } catch {}
}
log({shows_per_month})

const xyz = []
for (const [band, month2n] of Object.entries(shows_per_month)) {
  if (band === 'Desert Rain') log({month2n}, Object.keys(month2n).sort())
  for (const month of Object.keys(month2n).sort()) {
    xyz.push({
      x: new Date(month).getTime(),
      y: month2n[month],
      z: band,
    })
  }
}
log({xyz})

$('body').append(LineChart(xyz, {
  x: (e) => e.x,
  y: (e) => e.y,
  z: (e) => e.z,
  yLabel: "↑ archive.org band recordings per month",
  width: $(document).width(),
  height: 500,
  color: "steelblue",
}))
