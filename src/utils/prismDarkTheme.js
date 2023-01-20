// Github dark theme attempt

module.exports = {
  plain: {
    color: "#C9D1D9",
    backgroundColor: "#26292f",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#8b949e",
        fontStyle: "italic",
      },
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ["string", "attr-value"],
      style: {
        color: "#a5d6ff",
      },
    },
    {
      types: ["punctuation", "operator"],
      style: {
        color: "#79c0ff",
      },
    },
    {
      types: [
        "entity",
        "url",
        "symbol",
        "number",
        "boolean",
        "variable",
        "constant",
        "property",
        "regex",
        "inserted",
      ],
      style: {
        color: "#d2a8ff",
      },
    },
    {
      types: ["atrule", "keyword", "attr-name", "selector"],
      style: {
        color: "#7ee787",
      },
    },
    {
      types: ["function", "deleted", "tag"],
      style: {
        color: "#d2a8ff",
      },
    },
    {
      types: ["function-variable"],
      style: {
        color: "#6f42c1",
      },
    },
    {
      types: ["tag", "selector", "keyword"],
      style: {
        color: "#ff7b72",
      },
    },
  ],
};
