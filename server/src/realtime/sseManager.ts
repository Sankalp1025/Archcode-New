import { Response } from "express";

type ClientMap = Map<string, Set<Response>>;

class SSEManager {
  private clients: ClientMap = new Map();

  addClient(submissionId: string, res: Response) {
    if (!this.clients.has(submissionId)) {
     this.clients.set(submissionId, new Set());
    }

    this.clients.get(submissionId)?.add(res);
  }

  removeClient(submissionId: string, res: Response) {
    const clients = this.clients.get(submissionId);

    if (!clients) return;

    clients.delete(res);

    if (clients.size === 0) {
     this.clients.delete(submissionId);
    }
  }

  sendEvent(submissionId: string, data: unknown) {
  const clients = this.clients.get(submissionId);

  console.log(                                 // For debugging
    "SSE clients:",
    submissionId,
    clients?.size ?? 0
  );

  if (!clients) return;

  for (const client of clients) {
    client.write(`data: ${JSON.stringify(data)}\n\n`);
  }
}
}

export const sseManager = new SSEManager();