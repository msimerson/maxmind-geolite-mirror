function log(base, content) {
	if (process.env.npm_lifecycle_event === 'test')
		return;
	base.call(console, content);
}

module.exports = {
	log: (x) => { log(console.log, x); },
	warn: (x) => { log(console.warn, x); },
	error: (x) => { log(console.error, x); },
};