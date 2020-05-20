# React app template

Full config for React application

- **`yarn`** - Install all dependencies from package.json

- **`yarn dev`** - Run in development mode on localhost:3000

- **`yarn dev:pro`** - Run in development mode on localhost:3000 without linting

- **`yarn build`** - Project build

- **`yarn start`** - Run build on localhost:5000

## Manifest

To generate a manifest use https://app-manifest.firebaseapp.com/

## Service Worker (SW)

SW options: https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.GenerateSW

SW recipes: https://gist.github.com/addyosmani/0e1cfeeccad94edc2f0985a15adefe54

## Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted. This leads to more readable messages that are easy to follow when looking through the project history.

### Commit Message Format

Each commit message consists of a type, a scope and a subject:

```
    <type>(<scope>): <subject>
```

Any line of the commit message cannot be longer than 100 characters! This allows the message to be easier to read on GitHub as well as in various git tools.

Samples:

```
    docs(commits): add commit message guidlines

    fix(release): need to depend on latest react
```

#### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

#### Subject

The subject contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end
