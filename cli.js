const program = require("commander");
const dayjs = require("dayjs");
const dns = require("dns");

function main() {
  program
    .version(require("./package.json").version)
    .usage("[<host>]")
    .option("-m, --max <number>", "limit output", 4)
    .option("-6, --IPv6", "use IPv6")
    .option("-r, --reverse <ip>", "reverse DNS")
    .on("option:reverse", function(ips) {
      ips.split(" ").forEach(ip => {
        dns.reverse(ip, function(error, hostnames) {
          console.log(
            error
              ? `An error occured while reverse lookup of ${ip}`
              : `${ip} -> ${hostnames.join(", ")}`
          );
        });
      });
    })
    .on("--help", function() {
      console.log(
        "\n\nmade by 0xflotus from %s",
        dayjs(require("fs").statSync("./package.json").mtime).format(
          "MM/DD/YYYY"
        )
      );
    })
    .parse(process.argv);

  if (program.args.length === 0 && !program.reverse) {
    program.outputHelp();
    process.exit();
  }

  const { servers } = require("./servers.json");
  let count = program.max;
  for (const ip of servers) {
    if (!count--) {
      break;
    }
    const resolver = new dns.Resolver();
    resolver.setServers([ip]);
    program.args.forEach(host => {
      resolver[`resolve${program.IPv6 ? 6 : 4}`](host, (error, addresses) => {
        if (error) {
          console.log("An error occured with server %s for %s", ip, host);
        } else {
          addresses.forEach(addr =>
            console.log(
              "%s resolves %s",
              ip,
              program.args.length > 1 ? `${addr} for ${host}` : addr
            )
          );
        }
      });
    });
  }
}

module.exports = main;
