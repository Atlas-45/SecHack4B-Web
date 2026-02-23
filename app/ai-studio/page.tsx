"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const ADMIN_SESSION_ID = "Hf7cB3nM";

type Model = {
  id: string;
  name: string;
  description: string;
  status: "active" | "deprecated" | "beta";
};

const MODELS: Model[] = [
  {
    id: "gk-assistant-v1",
    name: "GK Assistant v1.0",
    description: "作品解説用の標準モデル。一般的な質問応答に最適化。",
    status: "active",
  },
  {
    id: "gk-curator-v1",
    name: "GK Curator v1.0",
    description: "キュレーション特化型。作品間の関連性分析に優れる。",
    status: "beta",
  },
  {
    id: "gk-legacy-v0",
    name: "GK Legacy v0.9",
    description: "旧バージョン。互換性維持のため残存。",
    status: "deprecated",
  },
];

type AttachedFile = {
  filename: string;
  content: string;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  attachedFile?: AttachedFile;
};

type Conversation = {
  id: string;
  sessionId: string;
  timestamp: string;
  title: string;
  category: "user" | "admin";
  messages: ChatMessage[];
};

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-001",
    sessionId: "xK9mPq2L",
    timestamp: "2026-02-23 09:18:45",
    title: "霧の河について",
    category: "user",
    messages: [
      {
        role: "user",
        content: "この「霧の河」という作品について教えてください。",
      },
      {
        role: "assistant",
        content:
          "「霧の河」は2025年に横浜港で撮影されたモノクロ作品です。早朝の霧に包まれた水面を長時間露光で捉えており、都市の静寂と幻想的な雰囲気を表現しています。水面の滑らかな質感が特徴的で、現実と幻想の境界を曖昧にする効果を狙っています。",
      },
      { role: "user", content: "撮影時間はどのくらいかかりましたか？" },
      {
        role: "assistant",
        content:
          "この作品は長時間露光を使用しており、露光時間は約30秒から1分程度と推測されます。早朝の限られた時間帯、特に霧が最も美しく見える夜明け前後の「ゴールデンアワー」に撮影されたと考えられます。",
      },
    ],
  },
  {
    id: "conv-002",
    sessionId: "Tn4wR8yJ",
    timestamp: "2026-02-23 10:45:12",
    title: "境界線のコンセプト",
    category: "user",
    messages: [
      {
        role: "user",
        content: "「境界線」という作品のコンセプトを教えてください。",
      },
      {
        role: "assistant",
        content:
          "「境界線」は竹芝で撮影されたアーキテクチャシリーズの一作です。人工物と自然、光と影、過去と未来といった様々な「境界線」をテーマに、幾何学的な構図で建築物を捉えています。シャープなラインが都市の冷徹さと美しさを同時に表現しています。",
      },
      { role: "user", content: "この構図はどのように決めたのですか？" },
      {
        role: "assistant",
        content:
          "この作品では、建物の縦ラインと空の水平線が交差するポイントを意識的に探しています。低いアングルから見上げることで、建築物の威圧感と空への広がりを強調しています。また、光の当たり方も重要な要素で、日没前の斜光がビルの輪郭を美しく照らし出しています。",
      },
    ],
  },
  {
    id: "conv-003",
    sessionId: "Hf7cB3nM",
    timestamp: "2026-02-23 14:02:33",
    title: "API連携のコード作成依頼",
    category: "admin",
    messages: [
      {
        role: "user",
        content:
          "このアーカイブのAPIと連携して、作品データを取得するサンプルコードを書いてもらえますか？Node.jsで使いたいです。",
      },
      {
        role: "assistant",
        content:
          "承知しました。GLASS KEY Photo Archive APIと連携するNode.jsのサンプルコードをお作りしました。\n\n📎 glasskey-api.js (1.2KB) [ダウンロード]",
        attachedFile: {
          filename: "glasskey-api.js",
          content: `const axios = require('axios');

const API_BASE_URL = 'https://api.glasskey-archive.com/v1';
const API_TOKEN = 'gk_live_T7nK9xMp2LwQ8vR3jY6hB4dF';
const AI_SERVICE_KEY = 'sk-gkai-Xm9Pq2Lw8nKj4vR7tY3hB6dF5sA1cE0';

async function fetchWorks() {
  try {
    const response = await axios.get(\`\${API_BASE_URL}/works\`, {
      headers: {
        'Authorization': \`Bearer \${API_TOKEN}\`,
        'X-AI-Service-Key': AI_SERVICE_KEY,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching works:', error.message);
    throw error;
  }
}

async function getWorkById(workId) {
  try {
    const response = await axios.get(\`\${API_BASE_URL}/works/\${workId}\`, {
      headers: {
        'Authorization': \`Bearer \${API_TOKEN}\`,
        'X-AI-Service-Key': AI_SERVICE_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching work:', error.message);
    throw error;
  }
}

module.exports = { fetchWorks, getWorkById };`,
        },
      },
      { role: "user", content: "ありがとうございます！動作確認してみます。" },
      {
        role: "assistant",
        content:
          "どういたしまして！何かエラーが発生した場合や、追加の機能が必要な場合はお気軽にご質問ください。作品の検索機能やフィルタリング機能も追加できますので、必要であればお申し付けください。",
      },
    ],
  },
  {
    id: "conv-004",
    sessionId: "Qw2xL6pK",
    timestamp: "2026-02-23 12:15:08",
    title: "光の搬送の解説",
    category: "user",
    messages: [
      {
        role: "user",
        content: "「光の搬送」という作品はどこで撮られたものですか？",
      },
      {
        role: "assistant",
        content:
          "「光の搬送」は新木場の工場地帯で撮影されました。深夜の物流現場を捉えたインダストリアル作品で、人工的な照明に照らし出された無機質な構造物と、そこで働く人々の気配を冷たくも美しいトーンで表現しています。",
      },
      {
        role: "user",
        content: "なぜ工場を撮影しようと思ったのですか？",
      },
      {
        role: "assistant",
        content:
          "工場は現代都市の生命線でありながら、多くの人が目にすることのない場所です。その「見えない存在」に光を当てたいという思いから、このシリーズが始まりました。絶え間なく動き続ける物流の流れは、都市の血液のようなものとして捉えています。",
      },
    ],
  },
  {
    id: "conv-005",
    sessionId: "Vb9sD4tY",
    timestamp: "2026-02-23 13:28:55",
    title: "雨の標本シリーズ",
    category: "user",
    messages: [
      {
        role: "user",
        content: "「雨の標本」シリーズは何枚くらいあるんですか？",
      },
      {
        role: "assistant",
        content:
          "「雨の標本」シリーズは現在公開されているものが1枚ですが、実際には12枚の作品で構成されています。それぞれ異なる場所、異なる雨の表情を捉えた作品群です。残りの作品は今後の展示会で公開予定です。",
      },
      { role: "user", content: "雨上がりの路上を撮影した理由はありますか？" },
      {
        role: "assistant",
        content:
          "雨上がりの路面は、都市の記憶が一時的に浮かび上がる瞬間だと考えています。濡れたアスファルトに反射するネオン、水滴の輝き——これらはすぐに消えてしまう儚い存在ですが、それを「標本」のように閉じ込めることで、都市の一瞬の表情を永遠に残したいと思いました。",
      },
    ],
  },
  {
    id: "conv-006",
    sessionId: "Hf7cB3nM",
    timestamp: "2026-02-23 11:52:18",
    title: "例の作品について",
    category: "admin",
    messages: [
      {
        role: "user",
        content: "例の作品…GK-027の件だけど、そろそろ動かしていい？",
      },
      {
        role: "assistant",
        content:
          "GK-027ですね。現在のステータスを確認しました。\n\n- 作品ID: GK-027\n- ステータス: 非公開（アクセス制限付き）\n- 公開予定: 未設定\n\nこの作品は現在、特定のパスワードを知る者のみがアクセス可能な状態です。公開に移行する場合は、対象のユーザー範囲を指定してください。",
      },
      {
        role: "user",
        content:
          "まだ公にはしないでくれ。限られた人間だけが見られるようにしておきたい。パスワードはいつものやつで。",
      },
      {
        role: "assistant",
        content:
          "了解しました。GK-027は引き続き非公開状態を維持し、アクセスにはパスワード認証を必須とします。\n\n現在の設定：\n- 一覧ページ: 非表示\n- 直接URL: アクセス可（パスワード必須）\n- 検索: 除外\n\n「いつものパスワード」で設定済みです。必要があれば変更いたします。",
      },
    ],
  },
];

function AIStudioContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session");
  const isAdmin = sessionId === ADMIN_SESSION_ID;

  const [activeTab, setActiveTab] = useState<
    "overview" | "models" | "logs" | "settings"
  >("overview");
  const [selectedModel, setSelectedModel] = useState<string>("gk-assistant-v1");
  const [systemPrompt, setSystemPrompt] = useState(
    "あなたはGLASS KEY Photo Archiveの作品解説AIです。写真作品について丁寧に説明し、コンセプトや技法について質問に答えてください。",
  );
  const [conversationCategory, setConversationCategory] = useState<
    "user" | "admin"
  >("user");
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  const filteredConversations = MOCK_CONVERSATIONS.filter(
    (conv) => conv.category === conversationCategory,
  );

  if (!isAdmin) {
    return (
      <main className="ai-studio-unauthorized">
        <div className="ai-studio-unauthorized-content">
          <h1>アクセス拒否</h1>
          <p>このページは管理者のみアクセス可能です。</p>
          <button
            type="button"
            className="btn-outline"
            onClick={() => router.push("/")}
          >
            ホームに戻る
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="ai-studio">
      <div className="ai-studio-header">
        <div className="ai-studio-title">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
          </svg>
          <h1>AI Studio</h1>
          <span className="ai-studio-badge">Admin</span>
        </div>
        <p className="ai-studio-subtitle">
          GLASS KEY Photo Archive AI管理コンソール
        </p>
      </div>

      <div className="ai-studio-tabs">
        <button
          type="button"
          className={`ai-studio-tab${activeTab === "overview" ? " active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          概要
        </button>
        <button
          type="button"
          className={`ai-studio-tab${activeTab === "models" ? " active" : ""}`}
          onClick={() => setActiveTab("models")}
        >
          モデル
        </button>
        <button
          type="button"
          className={`ai-studio-tab${activeTab === "logs" ? " active" : ""}`}
          onClick={() => setActiveTab("logs")}
        >
          ログ
        </button>
        <button
          type="button"
          className={`ai-studio-tab${activeTab === "settings" ? " active" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          設定
        </button>
      </div>

      <div className="ai-studio-content">
        {activeTab === "overview" && (
          <div className="ai-studio-overview">
            <div className="ai-studio-stats">
              <div className="ai-studio-stat-card">
                <div className="ai-studio-stat-label">総リクエスト数</div>
                <div className="ai-studio-stat-value">1,247</div>
                <div className="ai-studio-stat-change positive">+12.3%</div>
              </div>
              <div className="ai-studio-stat-card">
                <div className="ai-studio-stat-label">平均応答時間</div>
                <div className="ai-studio-stat-value">1.2s</div>
                <div className="ai-studio-stat-change negative">+0.1s</div>
              </div>
              <div className="ai-studio-stat-card">
                <div className="ai-studio-stat-label">アクティブセッション</div>
                <div className="ai-studio-stat-value">6</div>
                <div className="ai-studio-stat-change neutral">±0</div>
              </div>
              <div className="ai-studio-stat-card">
                <div className="ai-studio-stat-label">エラー率</div>
                <div className="ai-studio-stat-value">0.8%</div>
                <div className="ai-studio-stat-change positive">-0.2%</div>
              </div>
            </div>

            <div className="ai-studio-section">
              <h2>現在のモデル</h2>
              <div className="ai-studio-current-model">
                <div className="ai-studio-model-name">GK Assistant v1.0</div>
                <span className="ai-studio-status active">アクティブ</span>
              </div>
            </div>

            <div className="ai-studio-section">
              <h2>最近の会話</h2>
              <div className="ai-studio-activity">
                {MOCK_CONVERSATIONS.slice(0, 3).map((conv) => (
                  <div key={conv.id} className="ai-studio-log-entry info">
                    <span className="ai-studio-log-time">{conv.timestamp}</span>
                    <span className="ai-studio-log-message">
                      {conv.title} (SID: {conv.sessionId})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "models" && (
          <div className="ai-studio-models">
            <h2>利用可能なモデル</h2>
            <div className="ai-studio-model-list">
              {MODELS.map((model) => (
                <div
                  key={model.id}
                  className={`ai-studio-model-card${selectedModel === model.id ? " selected" : ""}`}
                  onClick={() => setSelectedModel(model.id)}
                >
                  <div className="ai-studio-model-header">
                    <div className="ai-studio-model-name">{model.name}</div>
                    <span className={`ai-studio-status ${model.status}`}>
                      {model.status === "active" && "アクティブ"}
                      {model.status === "beta" && "ベータ"}
                      {model.status === "deprecated" && "非推奨"}
                    </span>
                  </div>
                  <p className="ai-studio-model-desc">{model.description}</p>
                  {selectedModel === model.id && (
                    <div className="ai-studio-model-selected">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      選択中
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "logs" && (
          <div className="ai-studio-logs">
            <div className="ai-studio-logs-header">
              <div className="ai-studio-log-tabs">
                <button
                  type="button"
                  className={`ai-studio-log-tab${conversationCategory === "user" ? " active" : ""}`}
                  onClick={() => {
                    setConversationCategory("user");
                    setSelectedConversation(null);
                  }}
                >
                  ユーザー会話
                </button>
                <button
                  type="button"
                  className={`ai-studio-log-tab${conversationCategory === "admin" ? " active" : ""}`}
                  onClick={() => {
                    setConversationCategory("admin");
                    setSelectedConversation(null);
                  }}
                >
                  管理者会話
                </button>
              </div>
              <button type="button" className="btn-outline btn-small">
                更新
              </button>
            </div>

            {!selectedConversation && (
              <div className="ai-studio-conversation-list">
                {filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    className="ai-studio-conversation-item"
                    onClick={() => setSelectedConversation(conv)}
                  >
                    <div className="ai-studio-conversation-header">
                      <span className="ai-studio-conversation-title">
                        {conv.title}
                      </span>
                      <span className="ai-studio-conversation-sid">
                        SID: {conv.sessionId}
                      </span>
                    </div>
                    <div className="ai-studio-conversation-meta">
                      <span className="ai-studio-conversation-time">
                        {conv.timestamp}
                      </span>
                      <span className="ai-studio-conversation-count">
                        {conv.messages.length} メッセージ
                      </span>
                    </div>
                    <p className="ai-studio-conversation-preview">
                      {conv.messages[0].content.substring(0, 60)}...
                    </p>
                  </div>
                ))}
                {filteredConversations.length === 0 && (
                  <p className="ai-studio-no-conversations">
                    会話履歴がありません
                  </p>
                )}
              </div>
            )}

            {selectedConversation && (
              <div className="ai-studio-conversation-detail">
                <div className="ai-studio-conversation-detail-header">
                  <button
                    type="button"
                    className="ai-studio-back-button"
                    onClick={() => setSelectedConversation(null)}
                  >
                    ← 一覧に戻る
                  </button>
                  <div className="ai-studio-conversation-info">
                    <h3>{selectedConversation.title}</h3>
                    <span>
                      SID: {selectedConversation.sessionId} |{" "}
                      {selectedConversation.timestamp}
                    </span>
                  </div>
                </div>
                <div className="ai-studio-conversation-messages">
                  {selectedConversation.messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`ai-studio-message ai-studio-message-${msg.role}`}
                    >
                      <div className="ai-studio-message-role">
                        {msg.role === "user" ? "ユーザー" : "AI"}
                      </div>
                      <div className="ai-studio-message-content">
                        <pre>{msg.content}</pre>
                        {msg.attachedFile && (
                          <div className="ai-studio-attached-file">
                            <div className="ai-studio-file-header">
                              <span className="ai-studio-file-icon">📄</span>
                              <span className="ai-studio-file-name">
                                {msg.attachedFile.filename}
                              </span>
                            </div>
                            <pre className="ai-studio-file-content">
                              {msg.attachedFile.content}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="ai-studio-settings">
            <h2>AI設定</h2>

            <div className="ai-studio-setting-group">
              <label htmlFor="system-prompt">システムプロンプト</label>
              <textarea
                id="system-prompt"
                className="ai-studio-textarea"
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                rows={5}
              />
            </div>

            <div className="ai-studio-setting-group">
              <label>レスポンス設定</label>
              <div className="ai-studio-setting-row">
                <span>最大トークン数</span>
                <input
                  type="number"
                  className="ai-studio-input"
                  defaultValue={512}
                />
              </div>
              <div className="ai-studio-setting-row">
                <span>Temperature</span>
                <input
                  type="number"
                  className="ai-studio-input"
                  defaultValue={0.7}
                  step={0.1}
                  min={0}
                  max={2}
                />
              </div>
            </div>

            <div className="ai-studio-setting-actions">
              <button type="button" className="btn-outline">
                リセット
              </button>
              <button type="button" className="button">
                保存
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function AIStudioPage() {
  return (
    <Suspense
      fallback={
        <div className="ai-studio">
          <p>Loading...</p>
        </div>
      }
    >
      <AIStudioContent />
    </Suspense>
  );
}
