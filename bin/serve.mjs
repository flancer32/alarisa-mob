#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import Container from "@teqfw/di";
import NamespaceRegistry from "@teqfw/di/src/Config/NamespaceRegistry.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const container = new Container();

// auto-discover all namespace roots from installed packages
// @ts-ignore
const namespaceRegistry = new NamespaceRegistry({ fs, path, appRoot: projectRoot });
const entries = await namespaceRegistry.build();
for (const entry of entries) {
  container.addNamespaceRoot(entry.prefix, entry.dirAbs, entry.ext);
}

// add local mock namespace for the host dependency (not installed in this package)
container.addNamespaceRoot("Alarisa_Back_", path.resolve(projectRoot, "src-dev"), ".mjs");

const pipeline = await container.get("Fl32_Web_Back_PipelineEngine$");
const server = await container.get("Fl32_Web_Back_Server$");
const staticHandler = await container.get("Fl32_Web_Back_Handler_Static$");
const humanIngress = await container.get("Alarisa_Mob_Back_Handler_HumanIngress$");
const dtoSourceFactory = await container.get("Fl32_Web_Back_Dto_Source__Factory$");
const runtimeConfigFactory = await container.get("Fl32_Web_Back_Config_Runtime__Factory$");

// initialize runtime config
runtimeConfigFactory.configure({ port: 3000, type: "http" });
runtimeConfigFactory.freeze();

const source = dtoSourceFactory.create({
  root: path.resolve(projectRoot, "web"),
  prefix: "/",
  allow: { ".": ["."] },
  defaults: ["index.html"],
});

await staticHandler.init({ sources: [source] });
pipeline.addHandler(humanIngress);
pipeline.addHandler(staticHandler);

let stopping = false;
const stop = async () => {
  if (stopping) return;
  stopping = true;
  if (typeof server.stop === "function") await server.stop();
};

process.once("SIGINT", () => { void stop().then(() => process.exit(0)); });
process.once("SIGTERM", () => { void stop().then(() => process.exit(0)); });

await server.start({ port: 3000, type: "http" });
