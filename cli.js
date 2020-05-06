require("consoleplusplus");
const program = require("commander");
const dayjs = require("dayjs");
const dns = require("dns");
const cosmiconfig = require("cosmiconfig");

function main() {
  program
    .version(require("./package.json").version)
    .usage("[<host>]")
    .option("-m, --max <number>", "limit output", 4)
    .option("-a, --all", "use all servers")
    .option("-6, --IPv6", "use IPv6")
    .option("-r, --reverse <ip>", "reverse DNS")
    .option("-d, --debug", "debugging information")
    .on("option:reverse", (ips) => {
      ips.split(" ").forEach((ip) => {
        dns.reverse(ip, (error, hostnames) => {
          console.log(error ? `An error occured while reverse lookup of ${ip}` : `${ip} -> ${hostnames.join(", ")}`);
        });
      });
    })
    .on("--help", () => {
      console.log(
        "\n\nmade by 0xflotus from %s",
        dayjs(require("fs").statSync("./package.json").mtime).format("MM/DD/YYYY"),
      );
    })
    .parse(process.argv);

  if (program.debug) {
    console.log = console.debug;
  }

  if (0 === program.args.length && !program.reverse) {
    program.outputHelp();
    process.exit();
  }

  const d = cosmiconfig.cosmiconfig("dinosConfig").search("servers");
  d.then(data => {
    const { config: { servers } } = data;
    let count = program.all ? servers.length : program.max;
    for (const ip of servers) {
      if (0 === count--) {
        break;
      }
      const resolver = new dns.Resolver();
      resolver.setServers([ip]);
      program.args.forEach((host) => {
        resolver[`resolve${program.IPv6 ? 6 : 4}`](host, (error, addresses) => {
          if (error) {
            console.log("An error occured with server %s for %s", ip, host);
          } else {
            addresses.forEach((addr) =>
              console.log("%s resolves %s", ip, 1 < program.args.length ? `${addr} for ${host}` : addr),
            );
          }
        });
      });
    }
  });
}

module.exports = main;
