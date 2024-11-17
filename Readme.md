#### setup Backend

<p></p>

#### clone

```bash
git clone <gitlab_repo> <folder_nama_project>
```

#### masuk ke

```bash
cd <folder_nama_project>/backend
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
