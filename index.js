var program = require("commander");
var { Resolver } = require("dns");

program
  .version(require("./package.json").version)
  .usage("dinos <host>")
  .option("-m, --max <number>", "Limit output")
  .option("-6, --IPv6", "Use IPv6")
  .parse(process.argv);

if (program.args.length === 0) {
  program.outputHelp();
  process.exit();
}

const { servers } = require("./servers.json");
let count = 0;
for (const ip of servers) {
  count++;
  if (count > program.max) {
    break;
  }
  const resolver = new Resolver();
  resolver.setServers([ip]);
  program.args.forEach(host => {
    resolver[`resolve${program.IPv6 ? 6 : 4}`](host, function(err, addresses) {
      if (err) {
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
