import retry from "async-retry"

/**
 * * Agurda todos os serviços estarem prontos
 */
async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100
    })

    async function fetchStatusPage() {
      const response = await fetch('http://localhost:5173/api/v1/status');
      await response.json();
    }
  }
}

export default {
  waitForAllServices
}