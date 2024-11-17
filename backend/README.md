# setup

<p></p>

#### clone

```bash
git clone <gitlab_repo> <folder_nama_project>
```

#### masuk ke

```bash
cd <folder_nama_project>
```

#### Install composer

```bash
npm install
```

#### Buat ENV File

```bash
cp .env.example .env
```

#### setting node env

NODE_ENV=production

#### setting database dalam .env

<p>
Setup Database Connection<br>
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
</p>

#### Migrate

#### Migration ENV development

```bash
npx prisma migrate dev
```

#### Migration ENV productin

```bash
npx prisma migrate
```

#### Seeding

```bash
npx prisma db seed
```

#### running server developmen

```bash
npm run dev
```

#### build production

```bash
npm run build
```

#### running server

```bash
npm run serve
```

#### build production & running server

```bash
npm run serve:build
```

# Setup Frontend

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```bash
cd <folder_nama_project>/frontend
```

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
