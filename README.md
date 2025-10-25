# My Template for Cloudflare

Next.js 15、Hono.js、Cloudflare Workersを使用したモダンなフルスタックWebアプリケーション。クリーンアーキテクチャの原則に従って構築されています。

## 🚀 主な機能

- **フルスタックTypeScript**: エンドツーエンドの型安全性
- **モダンアーキテクチャ**: 関心の分離によるクリーンアーキテクチャ
- **クラウドネイティブ**: グローバルパフォーマンスのためのCloudflare Workersデプロイ
- **データベース**: 型安全なデータベース操作のためのPostgreSQLとDrizzle ORM
- **認証**: bcryptjsによる安全なユーザー認証
- **リアルタイム**: エッジコンピューティングと低遅延に最適化

## 🏗️ アーキテクチャ

### プロジェクト構造

```
├── apps/
│   ├── backend/          # Cloudflare Workers API (Hono.js)
│   │   ├── src/
│   │   │   ├── db/       # データベーススキーマと接続
│   │   │   ├── use-cases/ # ビジネスロジック
│   │   │   ├── presentation/ # コントローラーとルート
│   │   │   └── infrastructure/ # バリデーターと外部ツール
│   │   └── drizzle.config.ts
│   └── frontend/         # Next.js 15 App Router
│       ├── app/          # App Routerページとコンポーネント
│       └── utils/        # ユーティリティ関数とAPIクライアント
├── docs/                 # ドキュメント
├── .github/              # GitHub Actionsワークフロー
└── .cursor/              # Cursor IDE設定
```

### 技術スタック

#### バックエンド
- **ランタイム**: Cloudflare Workers
- **フレームワーク**: Hono.js
- **データベース**: PostgreSQL with Drizzle ORM
- **認証**: bcryptjs
- **バリデーション**: Zod
- **アーキテクチャ**: クリーンアーキテクチャ

#### フロントエンド
- **フレームワーク**: Next.js 15 (App Router)
- **スタイリング**: Tailwind CSS v4
- **APIクライアント**: 型安全なAPI呼び出しのためのHono Client
- **デプロイ**: Cloudflare Workers (OpenNext)

#### 開発ツール
- **パッケージマネージャー**: Bun
- **リンター/フォーマッター**: Biome
- **TypeScript**: 厳密モード
- **CI/CD**: GitHub Actions

## 🛠️ セットアップ

### 前提条件

- [Bun](https://bun.sh/) (最新版)
- [Docker](https://www.docker.com/) (ローカルPostgreSQL用)
- [Git](https://git-scm.com/)

### インストール

1. **リポジトリをクローン**
   ```bash
   git clone git@github.com:Yu-Muro/my-template-for-cloudflare.git
   cd my-template-for-cloudflare
   ```

2. **依存関係をインストール**
   ```bash
   bun install
   ```

3. **環境変数を設定**
   ```bash
   # バックエンド (apps/backend/.env)
   cp apps/backend/.env.example apps/backend/.env

   # フロントエンド (apps/frontend/.env)
   cp apps/frontend/.env.example apps/frontend/.env
   ```

4. **PostgreSQLデータベースを起動**
   ```bash
   cd apps/backend
   docker-compose up -d
   ```

5. **データベースマイグレーションを実行**
   ```bash
   cd apps/backend
   bun run db:generate
   bun run db:migrate
   ```

6. **開発サーバーを起動**
   ```bash
   # ターミナル1: バックエンド
   cd apps/backend
   bun run dev

   # ターミナル2: フロントエンド
   cd apps/frontend
   bun run dev
   ```

### 開発スクリプト

#### バックエンド
```bash
cd apps/backend

# 開発
bun run dev              # 開発サーバー起動
bun run build            # 本番用ビルド
bun run lint             # Biomeリンター実行
bun run type-check       # TypeScript型チェック

# データベース
bun run db:generate      # マイグレーション生成
bun run db:migrate       # マイグレーション実行
bun run db:studio        # Drizzle Studio起動
```

#### フロントエンド
```bash
cd apps/frontend

# 開発
bun run dev              # 開発サーバー起動
bun run build            # 本番用ビルド
bun run build:cloudflare # Cloudflare用ビルド
bun run lint             # Biomeリンター実行
bun run type-check       # TypeScript型チェック
```

## 🗄️ データベース

### スキーマ

アプリケーションは以下のメインテーブルを持つPostgreSQLを使用します：

```sql
-- ユーザーテーブル
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP
);
```

### データベース操作

- **ORM**: 型安全なデータベース操作のためのDrizzle ORM
- **マイグレーション**: スキーマ管理のためのDrizzle Kit
- **接続**: 本番環境用のCloudflare Hyperdrive
- **ローカル開発**: PostgreSQL付きDocker Compose

## 🔐 認証

### セキュリティ機能

- **パスワードハッシュ化**: ソルトラウンド付きbcryptjs
- **入力バリデーション**: すべての入力用のZodスキーマ
- **CORS**: クロスオリジンリクエスト用の適切な設定
- **環境変数**: 安全な設定管理

### ユーザー管理

- ユーザー登録と認証
- ロールベースアクセス制御
- ソフトデリートサポート
- 安全なパスワード保存

## 🚀 デプロイ

### Cloudflare Workers

アプリケーションはCloudflare Workersデプロイに最適化されています：

- **バックエンド**: Cloudflare Workersへの直接デプロイ
- **フロントエンド**: Next.js互換性のためのOpenNext
- **データベース**: PostgreSQL接続用のCloudflare Hyperdrive
- **グローバルCDN**: 自動グローバル配信

### 環境設定

```bash
# 本番環境変数
CLOUDFLARE_API_TOKEN=your_api_token
CLOUDFLARE_ACCOUNT_ID=your_account_id
DATABASE_URL=your_database_url
NEXT_PUBLIC_API_URL=your_api_url
```

## 🧪 テスト

### テスト構造

- **ユニットテスト**: 個別の関数とコンポーネント
- **統合テスト**: APIエンドポイントとデータベース操作
- **E2Eテスト**: 完全なユーザーワークフロー
- **型チェック**: TypeScript厳密モード

### テスト実行

```bash
# バックエンドテスト
cd apps/backend
bun test

# フロントエンドテスト
cd apps/frontend
bun test
```

## 📚 API ドキュメント

### エンドポイント

#### ユーザー
- `GET /api/users` - 全ユーザー取得
- `POST /api/users` - 新規ユーザー作成

### レスポンス形式

```typescript
// 成功レスポンス
{
  users: User[] | user: User
}

// エラーレスポンス
{
  error: string;
  details?: ValidationError[];
}
```

## 🔧 開発ガイドライン

### コード品質

- **リンター**: 一貫したコードスタイルのためのBiome
- **型安全性**: 厳密なTypeScript設定
- **アーキテクチャ**: クリーンアーキテクチャの原則
- **テスト**: 包括的なテストカバレッジ

### Gitワークフロー

- **ブランチ命名**: `type/description` (例: `feature/user-auth`)
- **コミットメッセージ**: コンベンショナルコミット形式
- **コードレビュー**: すべての変更に必要
- **CI/CD**: 自動テストとデプロイ

### アーキテクチャ原則

1. **関心の分離**: レイヤー間の明確な境界
2. **依存関係逆転**: 高レベルモジュールは低レベルモジュールに依存しない
3. **単一責任**: 各クラスは変更する理由が一つ
4. **開放/閉鎖原則**: 拡張には開いており、修正には閉じている

## 🤝 コントリビューション

1. リポジトリをフォーク
2. 機能ブランチを作成 (`git switch -c feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'feat: add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

### 開発セットアップ

1. 上記のインストール手順に従う
2. 開発環境をセットアップ
3. すべてが動作することを確認するためにテストを実行
4. コーディングガイドラインに従う

## 📄 ライセンス

このプロジェクトはMITライセンスの下でライセンスされています - 詳細は[LICENSE](LICENSE)ファイルを参照してください。
