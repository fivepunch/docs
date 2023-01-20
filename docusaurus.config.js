// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("./src/utils/prismDarkTheme");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Fivepunch",
  tagline:
    "An independent game studio that delivers and enhances entertainment experiences.",
  url: "https://docs.fivepunch.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "Fivepunch", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.
  trailingSlash: false,
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pt-BR"],
  },
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: "docs",
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/fivepunch/docs/tree/main/",
          editLocalizedFiles: true,
          lastVersion: "current",
          onlyIncludeVersions: ["current"],
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      {
        id: "fivem-appearance",
        path: "resources/fivem-appearance",
        routeBasePath: "resources/fivem-appearance",
        sidebarPath: require.resolve("./sidebars.js"),
        editUrl: "https://github.com/fivepunch/docs/tree/main/",
        editLocalizedFiles: true,
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      defaultMode: "dark",
      navbar: {
        title: "Fivepunch",
        logo: {
          alt: "Fivepunch Logo",
          src: "img/snailypunch.png",
        },
        items: [
          {
            type: "doc",
            docId: "resources/index",
            position: "left",
            label: "Resources",
          },
          {
            href: "https://github.com/fivepunch",
            label: "GitHub",
            position: "right",
          },
          {
            type: "localeDropdown",
            position: "right",
          },
        ],
      },
      footer: {
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "fivem-appearance",
                to: "/resources/fivem-appearance",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "http://discord.fivepunch.io",
              },
              {
                label: "Twitter",
                href: "http://twitter.fivepunch.io",
              },
              {
                label: "Cfx",
                href: "https://forum.cfx.re/u/fivepunch/",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Fivepunch",
                to: "https://fivepunch.io/",
              },
              {
                label: "Blog",
                to: "https://fivepunch.io/blog",
              },
            ],
          },
        ],
        // Based on https://www.electronjs.org/ footer copyright notice
        copyright: `Copyright © ${new Date().getFullYear()} Fivepunch and contributors.`,
      },
      prism: {
        additionalLanguages: ["lua"],
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
