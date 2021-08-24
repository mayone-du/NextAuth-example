# NextAuth.js の検証用

.env.local に
GOOGLE_CLIENT_ID=xxxxx
GOOGLE_CLIENT_SECRET=yyyyy
を設定

GCP の管理画面から ↑ を発行し、その際にリダイレクト URL なども設定する。

## 認証フロー

1. Google 認証を済ます
2. id_token を client 側でメモリに保存（reactive variables //以下 RV でグローバル管理）
3. ApolloClient 作成時に引数で RV をわたし、idToken を headers の authorization にセット
4. バックエンド側で headeres の authorization から idToken の値を受け取る
5. バックエンド側で google-api-python-client を使用し、受け取った idToken の値を検証
6. 大丈夫であればフロントに正常なレスポンスを返し、検証に失敗したらエラーレスポンスを返す
