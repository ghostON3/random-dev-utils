### ESLint + Prettier + TypeScript Setup
This repo contains a strict ESLint + Prettier + TypeScript configuration focused on automatic code formatting on save.

## What it does:
Enforces code style and formatting automatically so you can write code without worrying about style.

## Performance note:
This setup runs multiple analyzers on save, which can cause VSCode to lag, especially in large projects with heavy types (e.g., GraphQL codegen).

## Best practice reminder:
ESLint is ideally used for finding code mistakes only, not for enforcing code style. Using it for formatting can impact performance.

Use this if you want strict formatting automation and don’t mind potential editor slowdowns.

Also uses old eslint syntax. 