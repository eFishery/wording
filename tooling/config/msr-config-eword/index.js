const preset = 'conventionalcommits'
const releaseRules = [
  { type: 'docs', release: false },
  { type: 'refactor', release: 'patch' },
  { type: 'chore', scope: 'deps', release: 'patch' },
  { type: 'chore', scope: 'dev-deps', release: false }
]
const parserOpts = {
  noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING']
}

module.exports = {
  branches: ['main', { name: 'next', channel: 'next', prerelease: true }],
  // PLUGINS MUST BE CORRECTED ORDERED
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset,
        releaseRules,
        parserOpts
      }
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset,
        parserOpts
      }
    ],
    '@semantic-release/changelog',
    '@semrel-extra/npm',
    '@semantic-release/github',
    [
      '@semantic-release/git',
      {
        // eslint-disable-next-line
        message: 'chore(release): ${nextRelease.gitTag} [skip ci]\n\n${nextRelease.notes}',
      }
    ]
  ]
}
