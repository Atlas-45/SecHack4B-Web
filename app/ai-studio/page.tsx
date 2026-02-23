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

type LogEntry = {
  timestamp: string;
  level: "info" | "warn" | "error";
  message: string;
};

const MOCK_LOGS: LogEntry[] = [
  {
    timestamp: "2026-02-23 14:32:01",
    level: "info",
    message: "Model gk-assistant-v1 loaded successfully",
  },
  {
    timestamp: "2026-02-23 14:30:45",
    level: "info",
    message: "Session PNtHwU37 connected",
  },
  {
    timestamp: "2026-02-23 14:28:12",
    level: "warn",
    message: "Rate limit approaching for endpoint /api/chat",
  },
  {
    timestamp: "2026-02-23 14:25:33",
    level: "info",
    message: "Cache refreshed: 142 entries",
  },
  {
    timestamp: "2026-02-23 14:20:00",
    level: "error",
    message: "Failed to fetch external API: timeout",
  },
  {
    timestamp: "2026-02-23 14:15:22",
    level: "info",
    message: "Backup completed successfully",
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
              <h2>最近のアクティビティ</h2>
              <div className="ai-studio-activity">
                {MOCK_LOGS.slice(0, 3).map((log, index) => (
                  <div
                    key={index}
                    className={`ai-studio-log-entry ${log.level}`}
                  >
                    <span className="ai-studio-log-time">{log.timestamp}</span>
                    <span className="ai-studio-log-message">{log.message}</span>
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
              <h2>システムログ</h2>
              <button type="button" className="btn-outline btn-small">
                更新
              </button>
            </div>
            <div className="ai-studio-log-list">
              {MOCK_LOGS.map((log, index) => (
                <div key={index} className={`ai-studio-log-entry ${log.level}`}>
                  <span className={`ai-studio-log-level ${log.level}`}>
                    {log.level.toUpperCase()}
                  </span>
                  <span className="ai-studio-log-time">{log.timestamp}</span>
                  <span className="ai-studio-log-message">{log.message}</span>
                </div>
              ))}
            </div>
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
