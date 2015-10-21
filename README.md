# Big Surveillance  

- Build status: [![Build Status](https://travis-ci.org/fightforthefuture/bigsurveillance.svg?branch=master)](https://travis-ci.org/fightforthefuture/bigsurveillance)
- Latest deploy: [master branch](https://github.com/fightforthefuture/bigsurveillance/tree/master)

Because everyone really _is_ out to get your data with no pesky responsibilities
like having reliable security, as long as they’re willing to share it with the
federal government. Who, you know, are totally trustworthy to use that data in a
way that doesn't endanger your first amendment rights.

## Authoring

**CAMPAIGN AND WRITING PEOPLE READ HERE PLEASE**

* Site-wide meta information is super important. You can make changes to it at
`_config.yml`
* Generally, content is written in Markdown format. You can find documentation
for this wonderful plain text formatting syntax all over:
    - [daringfireball][07], the source of markdown
    - [github][08]'s docs are super easy to follow
    - [Discount][09] documents some extra features we have available to us
* Any content that is blog-post-like in nature can be found in `app/_posts`.
* Any additional post should follow the naming convention
`YYYY-MM-DD-post-title.md`
* If there’s text you need to update, but can't find, it is likely hiding in
`app/_layouts/default.html`.
* If you are unclear on updating the html, ask a dev and we’re happy to help!


## Development

### Frameworks and libraries

* [Composer.js][02] JavaScript MVC
* [Jekyll][03]
* [Grunt.js][04]
* [Liquid templating language][05]

### Installing & running the server

* Install/switch to Ruby 2.2.2 (i recommend [rbenv][01])
* `gem install bundler` if it’s not already installed
* `npm install` to install packages,
* `npm start` to run grunt (compiles assets, then watches for changes and
compiles those too.)
* _[Optional]_ If you’d like TypeKit fonts to load, add the line
`0.0.0.0 bigsurveillance.dev` to the file at `/etc/hosts`, and navigate to
<http://bigsurveillance.dev:9050> when the server starts

### Code structure

#### JavaScript:

* `js/main.js` contains the main page logic. It uses XHR to grab the user’s
  location from [fftf-geocoder](https://fftf-geocoder.herokuapp.com) and also
  the Political Scoreboard spreadsheet from Google Docs. Once both of these are
  loaded, it spawns the Political Scoreboard Controller
* `js/controllers`: contains all Composer controllers
* `js/models`: contains all Composer models and collections
* `js/views`: contains all Composer views. Right now we’re just using raw
  JavaScript to create DOM elements for the views. It’s not pretty, but it’s
  really fast.
* This all compiles down to `dist/js/core.js` via grunt, which also uglifies it
* If you’re adding a javascript file, make sure to add its path to the files
array around L169 of `Gruntfile.js`

#### CSS / Less:

* The directory structure of the Less files is vaguely (and I do mean vaguely)
inspired by [SMACSS][06]

```
app/_less
├── base
│   ├── common.less
│   └── variables.less
├── components
│   ├── CTA.less
│   ├── animation.less
│   ├── histogram.less
│   └── typography.less
├── core.less
├── lib
│   └── reset.less
└── partials
    ├── footer.less
    ├── modals.less
    ├── politicians.less
    └── scoreboard.less
```

* All Less files compiled and minified to `dist/css/core.css`
* When in doubt, make a new Less file and import it in `core.less`—there’s no
real performance hit as a result of good organization
* Don’t worry about browser prefixes. Grunt handles that too.


[01]: https://github.com/sstephenson/rbenv
[02]: https://lyonbros.github.io/composer.js/
[03]: http://jekyllrb.com/docs/home/
[04]: http://gruntjs.com/getting-started
[05]: https://github.com/Shopify/liquid/wiki/Liquid-for-Designers
[06]: https://smacss.com/
[07]: http://daringfireball.net/projects/markdown/syntax
[08]: https://help.github.com/articles/markdown-basics/
[09]: http://www.pell.portland.or.us/~orc/Code/discount/#Language.extensions
