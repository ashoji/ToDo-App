# ToDo App

このプロジェクトは、Next.js を使用して作成されたアプリケーションです。

## プロジェクト構造

```
todo-app
├── components
│   ├── TaskForm.tsx
│   └── TaskTable.tsx
├── pages
│   ├── api
│   │   └── openai.ts
│   └── index.tsx
├── public
├── styles
│   └── globals.css
├── types
│   └── Task.ts
├── utils
│   └── uuid.ts
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## ファイルの説明

- `components/TaskForm.tsx`: タスクを追加するためのフォームを表示する React 関数コンポーネント `TaskForm` をエクスポートします。`onSubmit` プロップとしてフォームの送信を処理する関数を受け取ります。

- `components/TaskTable.tsx`: タスクを表示するためのテーブルをレンダリングする React 関数コンポーネント `TaskTable` をエクスポートします。`tasks`、`deleteTask`、`toggleTaskCompletion` のプロップを受け取り、タスクのデータとアクションを処理します。

- `pages/api/openai.ts`: `pages` ディレクトリの下にある `api` ディレクトリに配置されたファイルです。サーバーサイドで OpenAI の実行を処理するサーバーサイドの API ルートファイルです。ブラウザ側で API キーを隠蔽する役割を担います。

- `pages/index.tsx`: `pages` ディレクトリに配置されたファイルです。Next.js アプリケーションのメインページとなる React 関数コンポーネントをエクスポートします。

- `public`: Next.js によって公開される静的ファイルを格納するディレクトリです。

- `styles/globals.css`: アプリケーション全体に適用されるグローバルな CSS スタイルを含むファイルです。

- `types/Task.ts`: タスクオブジェクトの構造を定義するインターフェース `Task` をエクスポートします。

- `utils/uuid.ts`: ユニークな識別子（UUID）を生成する関数 `uuidv4` をエクスポートします。

- `next.config.js`: Next.js の設定ファイルです。Next.js のビルドプロセスやサーバーの設定などをカスタマイズするためのものです。

- `package.json`: npm の設定ファイルです。プロジェクトの依存関係やスクリプトが記述されています。

- `tsconfig.json`: TypeScript の設定ファイルです。コンパイラオプションやコンパイルに含めるファイルが指定されています。

- `README.md`: プロジェクトのドキュメンテーションが記述されたファイルです。
```

このファイルは、プロジェクトの概要とファイル構造を説明するためのものです。プロジェクトの詳細な説明や使用方法などをここに記述してください。
