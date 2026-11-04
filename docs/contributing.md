# Contributing

Contributions to these docs are welcome. For changes to the library itself, see the [vq-vuetify repository](https://github.com/yatendra121/vq-vuetify).

## Working on the docs

```bash
pnpm install
pnpm docs:dev
```

Before you open a pull request, run:

```bash
pnpm docs:check
pnpm docs:build
```

`docs:check` compiles every Vue example, and fails if one imports something the library doesn't export, uses an unknown `Vq*` component, or links to a missing page.

Document what the installed library does, not what its source or changelog says it will do. If it behaves unexpectedly, describe that behaviour and add it to [Limitations](/guide/limitations).

## License

[MIT](https://github.com/yatendra121/vq-vuetify/blob/main/LICENSE) © 2023-present [Yatendra Kushwaha](https://github.com/yatendra121)
