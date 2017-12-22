const { readdirSync, statSync } = require(`fs`);
const { spawn } = require(`child_process`);
const { join } = require(`path`);

isDirectory(join(`.`, `./src/Bots`)).forEach(dir => {
	if (dir.startsWith(`__`)) return false;
	start(`src/Bots/${dir}`);
	return true;
});

function isDirectory(source) {
	return readdirSync(source).filter(name => statSync(`${source}/${name}`).isDirectory());
}

function start(input) {
	const proc = spawn(`node`, [[`--expose-gc`], `../../__Global/Main.js`], { cwd: input });

	proc.stdout.on(`data`, data => {
		console.log(String(data));
	});

	proc.stderr.on(`data`, data => {
		console.error(String(data));
	});

	proc.on(`close`, () => {
		setTimeout(() => {
			start(input);
		}, process.env.DEV ? 1000 : 1000 * 30);
	});
}
