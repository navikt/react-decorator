# NAV Dekoratør

React moduler / mikro-frontends som wrapper applikasjonen din med dekoratøren

## Installasjon

```
npm install @navikt/react-decorator
```

## Komponenter

```js
import Decorator from "@navikt/react-decorator";
```

Eksempel

```js
return (
    <Decorator miljo={"DEV" as "LOCAL" | "DEV" | "PROD"}>
      <div>
        Din app
      </div>
    </Decorator>
);
```

Komponenten vil hente data basert på miljo-variabelen

## Videreutvikling / test

- Hent repoet fra github

```
git clone https://github.com/navikt/react-decorator.git
```

- Installer nødvendige pakker og start kompilering

```
npm install && npm start
```

- Start test applikasjonen <br>

```
cd example && npm install && npm start
```

Test-applikasjonen består av en simpel create-react-app som importerer og benytter pakkene <br>
Prosjektet støtter hot-reloading, endringer i komponentene vil føre til at test-applikasjonen oppdateres

## Deployering

Applikasjonen bygges automatisk til dev / https://www-q0.nav.no/person/react-decorator ved merge til master. <br>
For å lansere applikasjonen til [npmjs](https://www.npmjs.com/package/@navikt/react-decorator), benytt [npm version](https://docs.npmjs.com/cli/version) til å oppdatere package.json og lage en ny git-tag. Eks:

```
npm version patch -m "Din melding"
```

Push deretter den nye versjonen til Github, som vil plukkes opp av [CircleCI](https://circleci.com/gh/navikt/workflows/react-decorator).

```
git push && git push --tags
```

## Logging

Vi bruker fo-frontendlogger for logging. For oppslag i kibana:

```
application:frontendlogger AND x_appname:react-decorator
```

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/team-personbruker

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-personbruker.
