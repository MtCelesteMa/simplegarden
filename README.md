# SimpleGarden

A recreation of Cookie Clicker's "Garden" minigame.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.1.

You can play the latest release of SimpleGarden in your browser [here](https://mtcelestema.github.io/simplegarden/en-US/).

If you wish to play older versions or developmental versions, follow the following instructions:

## Installation

1. Make sure you have [Node.js](https://nodejs.org/) installed.

2. Clone the desired version from GitHub. For example, the latest developmental version can be cloned using:

```shell
git clone https://github.com/MtCelesteMa/simplegarden.git
```

3. `cd` into the folder and install all required Node.js packages:

```shell
cd simplegarden
npm i
```

4. Launch the application.

```shell
ng serve
```

This will launch SimpleGarden under the `en-US` locale. To launch using a different locale, use the following command:

```shell
ng serve --configuration=LOCALE_ID
```

Where `LOCALE_ID` is the ID of the locale to launch under. Currently supported alternative locales are: `zh-TW`, `zh-CN`.

5. Open the provided link in your browser (by default it is `ttp://localhost:4200/`).

## How To Play

The mechanics are mostly the same as the Garden minigame in Cookie Clicker, with the same crops and mutation rules. As such, the [Garden](https://cookieclicker.fandom.com/wiki/Garden) page on the Cookie Clicker wiki can serve as a great guide. However, there are some key differences, not limited to:

-   Plant growth is deterministic. For example, wheat will always live for 13 ticks.
-   Planted crops provide no side effects, as there is no cookie production to boost.
-   Similarly, there are no "garden drops" obtained by harvesting certain crops.
-   Only one soil type. The game ticks at a fixed rate, and mutations/weed growth cannot be boosted.
-   All crops are free to plant (in Normal Mode).
-   Play with custom crops and mutations by uploading custom data files.

### Hard Mode

_Coming soon..._
