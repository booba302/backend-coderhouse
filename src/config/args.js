import { Command } from "commander";

const args = new Command();

args.option("--mode <mode>", "mode", "dev");
args.parse();

export default args.opts();
