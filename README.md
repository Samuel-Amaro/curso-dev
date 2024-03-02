# Curso Dev

Projeto do curso de programação da plataforma https://curso.dev

## Desenvolvimento Projeto SvelteKit

Depois de criar um projeto e instalar dependências com `npm install` (ou `pnpm install` ou `yarn`), inicie um servidor de desenvolvimento:

```bash
npm run dev

# ou inicie o servidor e abra o aplicativo em uma nova aba do navegador
npm run dev ---open
```

### Building

Para criar uma versão de produção do seu aplicativo:

```bash
npm run build
```

Você pode visualizar a compilação de produção com `npm run preview`.

Para implantar seu aplicativo, pode ser necessário instalar um [adaptador](https://kit.svelte.dev/docs/adapters) para seu ambiente de destino.

### Scripts

#### Format, Lint, Check, Docker

Formatar o código (Prettier)

```bash
npm run format
```

---

Executar o Lint

```bash
npm run lint
```

---

Executar a verificação do Svelte

```bash
npm run check #or
npm run check:watch
```

Subir container Docker no modo detched

```bash
docker compose up -d
```

---

Subir container Docker com arquivo especifico de configuração

```bash
docker compose -f infra/compose.yaml up
```

---

Destruir container docker

```bash
docker compose down
```

---

Subir o serviço de banco de dados

```bash
docker compose -f infra/compose.yaml up -d
```

---

Parar o serviço de banco de dados

```bash
docker compose -f infra/compose.yaml stop -d
```

---

Olhar status de container docker

```bash
docker ps # or
docker ps --all
```