[
  {
    option: "-V, --version",
    description: "output the version number",
    examples: ["dinos -V"],
  },
  {
    option: "-m, --max <number>",
    description: "limit output",
    examples: ["dinos quad9.org -m 2"],
  },
  {
    option: "-a, --all",
    description: "use all servers",
    examples: ["dinos quad9.org -a"],
  },
  {
    option: "-6, --IPv6",
    description: "use IPv6",
    examples: ["dinos -6 quad9.org"],
  },
  {
    option: "-r, --reverse",
    description: "reverse lookup",
    examples: ["dinos -r 9.9.9.9", "dinos -r '9.9.9.9 1.1.1.1'"],
  },
  {
    option: "-h, --help",
    description: "output usage information",
    examples: ["dinos -h"],
  },
  {
    option: "-d, --debug",
    description: "debugging information",
    examples: ["dinos -d quad9.org"],
  },
]
  .map((obj) => {
    const div = document.createElement("div");
    div.setAttribute("class", "cmd");
    const h4 = document.createElement("h4");
    h4.setAttribute("class", "option");
    h4.textContent = obj.option;
    const pDesc = document.createElement("p");
    pDesc.setAttribute("class", "description");
    pDesc.textContent = obj.description;
    const pExa = document.createElement("p");
    pExa.setAttribute("class", "example");
    pExa.textContent = obj.examples[0];
    [h4, pDesc, pExa, document.createElement("hr")].forEach((node) => div.appendChild(node));

    return div;
  })
  .forEach((cmd) => document.body.appendChild(cmd));
