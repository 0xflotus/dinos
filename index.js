var { Resolver } = require("dns");
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log(
    "Usage: dinos [<host>]\n\nFor IPv6: IP=6 dinos [<host>]\n\nExample: dinos localhost"
  );
  process.exit(-1);
}

const { servers } = require("./servers.json");
let count = 0;
for (const ip of servers) {
  count++;
  if (count > process.env.MAX) {
    break;
  }
  const resolver = new Resolver();
  resolver.setServers([ip]);
  args.forEach(host => {
    resolver[`resolve${process.env.IP === "6" ? 6 : 4}`](host, function(
      err,
      addresses
    ) {
      if (err) {
        console.log("An error occured with server %s for %s", ip, host);
      } else {
        addresses.forEach(addr =>
          console.log(
            "%s resolves %s",
            ip,
            args.length > ~-0x2 ? `${addr} for ${host}` : addr
          )
        );
      }
    });
  });
}
