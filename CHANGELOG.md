# Changelog

## [1.1.5] - 2023-12-01

### Changed
- Fixed an error where code could not be copied if it was preceded by a space
- Empty code blocks will now *not* get a copy button


## [1.1.4] - 2023-11-05

### Changed
- Rewrote plugin so that the demo can be easily started from the command line
- Removed JetBrains Mono font from demo


## [1.1.3] - 2023-11-01

### Changed
- Fixed copy of empty lines in code blocks.

## [1.1.2] - 2023-06-30

### Changed
- Removed font-size rule for pre's.

## [1.1.1] - 2023-06-08

### Changed
- Fixed a bug where plaintext codeblocks indents got removed.

## [1.1.0] - 2023-05-21

### Added
- Added (SVG) icon option.
- Added border option.
- Added offset option.
- Added scale option.
- Added tooltip option.
- Added MarkDown example.
- Added Quarto compatibility.

### Changed
- Fixed a bug where YAML codeblocks would lose their indents.
- Fixed a bug where Clipboard.js could load multiple times.
- Reordered options into objects, while keeping backwards compatible.


## [1.0.4] - 2022-06-17
- Started keeping the changelog.

### Added
- Added auto-loading of styles and script.

### Changed
- Changed the plugin to use CSS variables.


## [1.0.3] - 2021-12-07
### Changed
- Fixed visible button in fragment, thanks @danbst for spotting this.
- Fixed extra indentation where copied code was rich text. The copied code now defaults to plaintext. Thanks @danbst for finding the issue.


## [1.0.2] - 2021-05-27
### Changed
- This version fixes an issue where code is copied multiple times whenever code-fragment highlighting is used.


## [1.0.1] - 2020-12-28
### Changed
- Compatibility with Reveal.js 4. The plugin can now be loaded via script tag and as a module.


## [1.0.0] - 2020-05-27
- First commit
