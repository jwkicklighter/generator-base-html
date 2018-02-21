'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')

module.exports = class extends Generator {
  prompting () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Base HTML') + ' generator!'
    ))

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.determineAppname()
    }, {
      type: 'input',
      name: 'title',
      message: 'HTML page title',
      default: 'New Project'
    }, {
      type: 'confirm',
      name: 'useHandlebars',
      message: 'Would you like to use Handlebars?',
      default: true
    }]

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props
    })
  }

  writing () {
    // All root files
    this.fs.copy(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
    )
    this.fs.copy(
      this.templatePath('.eslintrc.js'),
      this.destinationPath('.eslintrc.js')
    )
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      { name: this.props.name }
    )
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    )
    this.fs.copy(
      this.templatePath('Gulpfile.js'),
      this.destinationPath('Gulpfile.js')
    )

    // All app/ files
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('app/index.html'),
      { title: this.props.title }
    )
    this.fs.copy(
      this.templatePath('scss'),
      this.destinationPath('app/scss')
    )
    this.fs.copy(
      this.templatePath('js'),
      this.destinationPath('app/js')
    )

    if (this.props.useHandlebars) {
      // TODO: COPY HANDLEBARS TEMPLATES
    }
  }

  install () {
    this.yarnInstall([
      'eslint',
      'eslint-config-standard',
      'eslint-plugin-import',
      'eslint-plugin-node',
      'eslint-plugin-promise',
      'eslint-plugin-standard',
      'browserify',
      'gulp-browserify',
      'gulp',
      'gulp-sass',
      'hbsfy',
      'del',
      'browser-sync',
      'run-sequence'
    ], { 'dev': true })

    if (this.props.useHandlebars) {
      this.yarnInstall(['handlebars'])
    }
  }
}
