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
    const tr = document.createElement("tr");
    const tdOpt = document.createElement("td");
    const tdDesc = document.createElement("td");
    const tdExa = document.createElement("td");
    tdOpt.textContent = obj.option;
    tdDesc.textContent = obj.description;
    tdExa.textContent = obj.examples.join(", ");
    [tdOpt, tdDesc, tdExa].forEach((td) => tr.appendChild(td));
    return tr;
  })
  .forEach((cmd) => document.querySelector("tbody.table-body").appendChild(cmd));
