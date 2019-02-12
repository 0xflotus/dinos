var { Resolver } = require("dns");

const args = process.argv.slice(2);
if (!args.length) {
  console.log(`
        Usage: dinos [<host>]
  `);
}

["1", "8", "9"].forEach(num => {
  const resolver = new Resolver();
  const ip = num
    .repeat(4)
    .split("")
    .join(".");
  resolver.setServers([ip]);

  args.forEach(host => {
    resolver.resolve4(host, (err, addresses) => {
      if (err) throw err;
      addresses.forEach(addr =>
        console.log(
          ip,
          "resolves",
          args.length > 1 ? `${addr} for ${host}` : addr
        )
      );
    });
  });
});
