# SimpleGarden

A recreation of Cookie Clicker's "Garden" minigame.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.1.

You can play the latest release of SimpleGarden in your browser [here](https://mtcelestema.github.io/simplegarden/en-US/).

## How To Play

The mechanics are mostly the same as the Garden minigame in Cookie Clicker, with the same crops and mutation rules. As such, the [Garden](https://cookieclicker.fandom.com/wiki/Garden) page on the Cookie Clicker wiki can serve as a great guide. However, there are some key differences, not limited to:

-   Plant growth is deterministic. For example, wheat will always live for 13 ticks.
-   Planted crops provide no side effects, as there is no cookie production to boost.
-   Similarly, there are no "garden drops" obtained by harvesting certain crops.
-   Different soil types only affect tick rate, and can be changed at will.
-   All crops are free to plant (in Normal Mode).
-   Play with custom crops and mutations by uploading custom data files.

### Hard Mode

Hard Mode introduces a new challenge by limiting the number of crops you have. With the exception of Wheat (which you still could plant as many as you want), harvesting a mature crop will only yield one of that crop, which is consumed when you plant it (harvesting immature crops do not yield anything). The only way to get more of a crop is to breed more of it through mutations. This requires you to manage your resources carefully in Hard Mode in contrast to Normal Mode which allows you to plant as many crops as you want.

**Trophies (Beta):** In Hard Mode, accumulating a certain quantity of certain crops will award you with a trophy. There are currently four trophies, with more to come (hopefully).

**Brutal Mode:** Hard Mode as it is originally intended, it "fixes" an "exploit" present in Hard Mode that makes it significantly easier than the intention. It is split into its own difficulty as Hard Mode without the "exploit" may be too difficult/annoying for many players.

## Installation

If you wish to play older versions or developmental versions, follow the following instructions:

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

4. (Method A) Launch the application using `ng serve`

```shell
npx ng serve
```

This will launch SimpleGarden under the `en-US` locale. To launch using a different locale, use the following command:

```shell
npx ng serve --configuration=LOCALE_ID
```

Where `LOCALE_ID` is the ID of the locale to launch under. Currently supported alternative locales are: `zh-TW`, `zh-CN`.

As this method only allows one locale to be launched, the locale selector cannot be used.

4. (Method B) Build and launch the application using `ng build` and `serve`.

```shell
npx ng build
npx serve dist/simplegarden/browser
```

This method serves all locales simutaneously, and the locale selector may be used.

5. Open the provided link in your browser (by default it is `http://localhost:4200/` for Method A and `http://localhost:3000/` for Method B).
