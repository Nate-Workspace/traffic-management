import kill from "kill-port";

const ports = [3000, 3002];

for (const port of ports) {
  try {
    await kill(port, "tcp");
    console.log(`Freed port ${port}`);
  } catch {
    // Port was not in use — safe to continue.
  }
}
