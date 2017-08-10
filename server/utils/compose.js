module.exports = fns => fns.reduceRight((f, g) => args => f(g(args)));
