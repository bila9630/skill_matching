# Skill Matching App

### How to start the project
```
npm install
npm run dev
```

### Env dependencies
The app uses Pocketbase as backend, so you need to create a `.env.local` file in the root of the project with the following content:
```
NEXT_PUBLIC_POCKETBASE_API_URL=your_pocketbase_url
```
So it could be something like locally: http://127.0.0.1:8090

Since the db will be empty, you need to import the schema from the `dbschema.json` file in the root of the project.

### Update mantine library
Update library: https://help.mantine.dev/q/how-to-update-dependencies
```
npx npm-check-updates @mantine/* @mantinex/* postcss-preset-mantine -u
```
