const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const scopes = fs
  .readdirSync(path.resolve(__dirname, 'src'), { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name.replace(/s$/, ''));

// precomputed scope
const scopeComplete = execSync('git status --porcelain || true')
  .toString()
  .trim()
  .split('\n')
  .find((r) => ~r.indexOf('M  src'))
  ?.replace(/(\/)/g, '%%')
  ?.match(/src%%((\w|-)*)/)?.[1]
  ?.replace(/s$/, '');

/** @type {import('cz-git').UserConfig} */
module.exports = {
  ignores: [(commit) => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [0],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'perf',
        'style',
        'docs',
        'test',
        'refactor',
        'build',
        'ci',
        'chore',
        'revert',
        'wip',
        'workflow',
        'types',
        'release',
      ],
    ],
  },
  prompt: {
    /** @use `yarn commit :f` */
    alias: {
      f: 'docs: fix typos',
      r: 'docs: update README',
      s: 'style: update code format',
      b: 'build: bump dependencies',
      c: 'chore: update config',
    },
    customScopesAlign: !scopeComplete ? 'top' : 'bottom',
    defaultScope: scopeComplete,
    scopes: [...scopes, 'mock'],
    allowEmptyIssuePrefixs: false,
    allowCustomIssuePrefixs: false,

    messages: {
      type: 'Select the ISSUES type of changeList by this change (optional):',
      scope: 'Denote the SCOPE of this change (optional):',
      customScope: 'Denote the SCOPE of this change:',
      subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
      body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
      breaking: 'List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
      footerPrefixsSelect: 'Select the ISSUES type of changeList by this change (optional):',
      customFooterPrefixs: 'Input ISSUES prefix:',
      footer: 'List any ISSUES by this change. E.g.: #31, #34:\n',
      confirmCommit: 'Are you sure you want to proceed with the commit above?',
    },
    types: [
      { value: 'feat', name: 'feat:    ✨ A new feature' },
      { value: 'fix', name: 'fix:     🐛 A bug fix' },
      { value: 'docs', name: 'docs:    📚 Documentation only changes' },
      {
        value: 'style',
        name: 'style:   💎 Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
      },
      {
        value: 'refactor',
        name: 'refactor:📦 A code change that neither fixes a bug nor adds a feature',
      },
      { value: 'perf', name: 'perf:    🚀 A code change that improves performance' },
      { value: 'test', name: 'test:    🚨 Adding missing tests or correcting existing tests' },
      {
        value: 'build',
        name: 'build:   🛠  Changes that affect the build system or external dependencies (example scopes: npm)',
      },
      { value: 'ci', name: 'ci:      🔩 Changes to our CI configuration files and scripts' },
      { value: 'revert', name: 'revert:  🗑  Reverts a previous commit' },
      { value: 'chore', name: "chore:   🪚  Other changes that don't modify src or test files" },
    ],
    typesAppend: [
      { value: 'wip', name: 'wip:     🚬 Work in Process' },
      { value: 'workflow', name: 'workflow:🔗 Workflow improvements' },
      { value: 'types', name: 'types:   📇 Type definition file changes' },
    ],
    emptyScopesAlias: 'empty',
    customScopesAlias: 'custom',
  },
};
