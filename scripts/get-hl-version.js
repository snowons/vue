const coreVersion = require('../package.json').version
const hlVersion = require('../packages/hl-vue-framework/package.json').version
let hlBaseVersion = hlVersion.match(/^[\d.]+/)[0]
let hlSubVersion = Number(hlVersion.match(/-hl\.(\d+)$/)[1])

if (hlBaseVersion === coreVersion) {
  // same core version, increment sub version
  hlSubVersion++
} else {
  // new core version, reset sub version
  hlBaseVersion = coreVersion
  hlSubVersion = 1
}

if (process.argv[2] === '-c') {
  console.log(hlVersion)
} else {
  console.log(hlBaseVersion + '-hl.' + hlSubVersion)
}

module.exports = {
  base: hlBaseVersion,
  sub: hlSubVersion
}
