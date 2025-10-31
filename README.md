# Socket BFF Template

This repository contains a minimal Socket Backend-For-Frontend (BFF) template in TypeScript. The BFF accepts WebSocket (Socket.IO) connections from clients, authenticates with JWT, and proxies requests/events to backend microservices (HTTP REST). A mock microservice is included for local testing.

Quick start

1. Copy `.env.example` to `.env` and adjust variables.

2. Install dependencies:

```bash
# from project root
npm install
```

3. Run the mock microservice and the BFF in separate terminals (or use separate tabs):

```bash
# terminal 1 - run mock microservice
npm run mock

# terminal 2 - run the BFF
npm run dev
```

4. Run the example client to connect and emit an event:

```bash
npm run client
```

What you get

- `src/index.ts` — BFF server (Express + Socket.IO) with JWT handshake and a small request->microservice proxy
- `src/microserviceClient.ts` — a tiny wrapper around axios for calling microservices
- `src/microserviceMock.ts` — example microservice that responds to proxied calls and demonstrates server-sent events
- `src/clientExample.ts` — example Socket.IO client that authenticates via JWT and sends/receives events

Next steps / ideas

- Add Redis or NATS for robust pub/sub
- Add per-client authorization and scopes
- Add rate-limiting, metrics and observability
- Add tests (Jest) and CI workflow
