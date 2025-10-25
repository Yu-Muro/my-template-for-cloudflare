# Backend API

Cloudflare Workers上で動作するHono.jsベースのAPIサーバー。クリーンアーキテクチャの原則に従って構築されています。

## 🏗️ アーキテクチャ

### ディレクトリ構造

```
src/
├── db/                    # データベース関連
│   ├── schema.ts         # Drizzle ORMスキーマ定義
│   └── connection.ts     # データベース接続設定
├── use-cases/            # ビジネスロジック
│   └── user/            # ユーザー関連ユースケース
├── presentation/         # Webフレームワーク層
│   ├── controllers/     # リクエストハンドラー
│   └── routes/          # ルート定義
└── infrastructure/      # 外部ツール
    └── validators/      # Zodバリデーションスキーマ
```

### 技術スタック

- **ランタイム**: Cloudflare Workers
- **フレームワーク**: Hono.js
- **データベース**: PostgreSQL with Drizzle ORM
- **認証**: bcryptjs
- **バリデーション**: Zod
- **アーキテクチャ**: クリーンアーキテクチャ

## 🚀 セットアップ

### 前提条件

- [Bun](https://bun.sh/) (最新版)
- [Docker](https://www.docker.com/) (ローカルPostgreSQL用)

### インストール

1. **依存関係をインストール**
   ```bash
   bun install
   ```

2. **環境変数を設定**
   ```bash
   cp .env.example .env
   ```

3. **PostgreSQLデータベースを起動**
   ```bash
   docker-compose up -d
   ```

4. **データベースマイグレーションを実行**
   ```bash
   bun run db:generate
   bun run db:migrate
   ```

5. **開発サーバーを起動**
   ```bash
   bun run dev
   ```

## 📚 API エンドポイント

### ユーザー管理

#### ユーザー一覧取得
```http
GET /api/users
```

**レスポンス**
```json
{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### ユーザー作成
```http
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**レスポンス**
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

## 🗄️ データベース

### スキーマ

```sql
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

- **ORM**: Drizzle ORM for type-safe database operations
- **マイグレーション**: Drizzle Kit for schema management
- **接続**: Cloudflare Hyperdrive for production
- **ローカル開発**: Docker Compose with PostgreSQL

## 🔐 認証・セキュリティ

### セキュリティ機能

- **パスワードハッシュ化**: bcryptjs with salt rounds
- **入力バリデーション**: Zod schemas for all inputs
- **CORS**: Properly configured for cross-origin requests
- **環境変数**: Secure configuration management

### バリデーション

```typescript
// ユーザー作成スキーマ
const createUserSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email().max(255),
  password: z.string().min(8),
  role: z.string().min(1).max(50).default('user'),
});
```

## 🛠️ 開発スクリプト

```bash
# 開発
bun run dev              # 開発サーバー起動 (ポート8080)
bun run build            # 本番用ビルド
bun run lint             # Biomeリンター実行
bun run type-check       # TypeScript型チェック

# データベース
bun run db:generate      # マイグレーション生成
bun run db:migrate       # マイグレーション実行
bun run db:studio        # Drizzle Studio起動

# デプロイ
bun run deploy           # 本番環境にデプロイ
bun run deploy:dev       # 開発環境にデプロイ
```

## 🧪 テスト

### テスト実行

```bash
bun test
```

### テスト構造

- **ユニットテスト**: 個別の関数とユースケース
- **統合テスト**: APIエンドポイントとデータベース操作
- **E2Eテスト**: 完全なAPIワークフロー

## 🚀 デプロイ

### Cloudflare Workers

```bash
# 開発環境
bun run deploy:dev

# 本番環境
bun run deploy
```

### 環境変数

```bash
# 本番環境変数
CLOUDFLARE_API_TOKEN=your_api_token
CLOUDFLARE_ACCOUNT_ID=your_account_id
DATABASE_URL=your_database_url
```

## 🔧 開発ガイドライン

### コード品質

- **リンター**: Biome for consistent code style
- **型安全性**: Strict TypeScript configuration
- **アーキテクチャ**: Clean Architecture principles
- **テスト**: Comprehensive test coverage

### アーキテクチャ原則

1. **関心の分離**: レイヤー間の明確な境界
2. **依存関係逆転**: 高レベルモジュールは低レベルモジュールに依存しない
3. **単一責任**: 各クラスは変更する理由が一つ
4. **開放/閉鎖原則**: 拡張には開いており、修正には閉じている
