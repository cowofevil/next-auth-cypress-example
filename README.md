# NextAuth Cypress Example

This is an example app for demonstrating how to execute Cypress end-to-end tests against a web app that is secured with
[NextAuth][nextauth] using the [JWT session strategy][nextauth_jwt_session]. Refer to the 
[Cypress End-to-end Testing NextAuth Secured Web Apps][cypress_nextauth_article] for detailed information on how to
setup Cypress for your own NextAuth secured web app.

## Acknowledgments

This example project is based on the [react-note-taking-app][react-note-taking-app] built on top of the 
[T3 Stack][t3_stack].

Also, the following projects also heavily influenced this example app:

- [cypress-realworld-app][cypress-realworld-app]
- [vitest-environment-prisma][vitest-environment-prisma]

## Prerequisites

- [Node.js][node] 16.14.2+ LTS

## Developer Quickstart Guide

The following sections covers how to get a functioning development environment running.

### Create a Node.js Environment

```shell
$ npm install
```

### Configure Environment Variables

Create an environment file [`.env`][nextjs_env_local] (`.env.example` template provided) at the root of the repo 
directory and add the following environment variables:

| Environ Variable Name   |      Default Value      | Description                                            |
|:------------------------|:-----------------------:|:-------------------------------------------------------|
| `NEXTAUTH_URL`          | `http://localhost:3000` | [General next-auth configuration.][nextauth_url]       |
| `NEXTAUTH_SECRET`       |                         | [General next-auth configuration.][nextauth_secret]    |
| `DATABASE_URL`          |   `file:./db.sqlite`    | [Prisma configuration.][prisma_database_url]           |
| `DISCORD_CLIENT_ID`     |                         | [Configure NextAuth to use Discord.][discord_provider] |
| `DISCORD_CLIENT_SECRET` |                         | [Configure NextAuth to use Discord.][discord_provider] |

### Development Scripts

Setup the SQLite database:

```shell
$ npm run reset-seed
```

Start the dev server by running the script:

```shell
$ npm run dev
```

Build and run the Next.js server locally:

```shell
$ npm run build
$ npm run start
```

### Unit Testing

A pre-requisite for running the included unit tests is to create a `.env.test` file in the root directory with the
`DATABASE_NAME` variable set. An example `.env.test.example` file has been provided that you can simply copy and rename.

Execute unit tests by running the script:

```shell
$ npm run test-unit-ci
```

[nextauth]: https://next-auth.js.org
[nextauth_jwt_session]: https://next-auth.js.org/configuration/options#session
[cypress_nextauth_article]: https://dev.to/cowofevil/cypress-end-to-end-testing-for-web-apps-secured-by-nextauth-3p3p-temp-slug-7804096?preview=61d086251deab33d783130d456a7bb0fb3a024029497c6e0dea9a955389845b934f9a1c5591e987b6bfb1ec18528caa7473d004620393cbe045b7434
[react-note-taking-app]: https://www.youtube.com/watch?v=j898RGRw0b4&t=342s
[t3_stack]: https://create.t3.gg/
[cypress-realworld-app]: https://github.com/cypress-io/cypress-realworld-app
[vitest-environment-prisma]: https://github.com/carlos8v/vitest-environment-prisma
[node]: https://nodejs.org/
[nextjs_env_local]: https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables
[nextauth_url]: https://next-auth.js.org/configuration/options#nextauth_url
[nextauth_secret]: https://next-auth.js.org/configuration/options#nextauth_secret
[prisma_database_url]: https://www.prisma.io/docs/guides/development-environment/environment-variables#example-set-the-database_url-environment-variable-in-an-env-file
[discord_provider]: https://create.t3.gg/en/usage/next-auth/#setting-up-the-default-discordprovider
