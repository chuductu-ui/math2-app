import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { fetchProgress, saveProgress, submitAnswers } from './utils/githubSync';

// Lazy-load visualizers to keep initial bundle small
const visualizerMap = {
  BaseTenBlocks: lazy(() => import('./components/visualizers/BaseTenBlocks')),
  NumberLine: lazy(() => import('./components/visualizers/NumberLine')),
  InteractiveEquation: lazy(() => import('./components/visualizers/InteractiveEquation')),
  TenFrames: lazy(() => import('./components/visualizers/TenFrames')),
  BalanceScale: lazy(() => import('./components/visualizers/BalanceScale')),
  LitreCup: lazy(() => import('./components/visualizers/LitreCup')),
  ShapeExplorer: lazy(() => import('./components/visualizers/ShapeExplorer')),
  ShapeClassifier: lazy(() => import('./components/visualizers/ShapeClassifier')),
  InteractiveClock: lazy(() => import('./components/visualizers/InteractiveClock')),
  ItemDistributor: lazy(() => import('./components/visualizers/ItemDistributor')),
};

export default function App() {
  // --- States ---
  const [curriculum, setCurriculum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [activeTab, setActiveTab] = useState('theory'); // 'theory' | 'practice'
  const [answers, setAnswers] = useState({}); // { q_0: 'ans', e_0: 'ans' }

  // GitHub configuration (loaded from localStorage for ease of use across days)
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('math2_github_config');
      return saved ? JSON.parse(saved) : {
        owner: '',
        repo: '',
        token: '',
        emails: 'chu.duc.tu@gmail.com,thanhha.phth@gmail.com',
        web3formsKey: '72e519e9-d754-47b2-a4e9-6f5dfdb3d1c1' // Default backup key
      };
    } catch {
      return {
        owner: '',
        repo: '',
        token: '',
        emails: 'chu.duc.tu@gmail.com,thanhha.phth@gmail.com',
        web3formsKey: '72e519e9-d754-47b2-a4e9-6f5dfdb3d1c1'
      };
    }
  });

  // Learning progress: { theory_visits: { lessonTitle: dateString }, practice_completions: { lessonTitle: dateString } }
  const [progress, setProgress] = useState({ theory_visits: {}, practice_completions: {} });
  const [isSyncing, setIsSyncing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'submitting' | 'success' | 'error'

  // Settings form states
  const [formOwner, setFormOwner] = useState(config.owner);
  const [formRepo, setFormRepo] = useState(config.repo);
  const [formToken, setFormToken] = useState(config.token);
  const [formEmails, setFormEmails] = useState(config.emails);
  const [formWeb3FormsKey, setFormWeb3FormsKey] = useState(config.web3formsKey);

  // --- Load Curriculum ---
  useEffect(() => {
    fetch('./lessons_grade2.json')
      .then((res) => {
        if (!res.ok) throw new Error('Không tải được dữ liệu bài học. Hãy chạy script merge_curriculum trước.');
        return res.json();
      })
      .then((data) => {
        setCurriculum(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // --- Load Local Config (if present) ---
  useEffect(() => {
    fetch('./config.json')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('No local config');
      })
      .then((data) => {
        if (data && data.owner) {
          const loadedConfig = {
            owner: data.owner || '',
            repo: data.repo || '',
            token: data.token || '',
            emails: data.emails || 'chu.duc.tu@gmail.com,thanhha.phth@gmail.com',
            web3formsKey: data.web3formsKey || '72e519e9-d754-47b2-a4e9-6f5dfdb3d1c1'
          };
          setConfig(loadedConfig);
          setFormOwner(loadedConfig.owner);
          setFormRepo(loadedConfig.repo);
          setFormToken(loadedConfig.token);
          setFormEmails(loadedConfig.emails);
          setFormWeb3FormsKey(loadedConfig.web3formsKey);
        }
      })
      .catch(() => {
        // Normal fallback, do nothing
      });
  }, []);

  // --- Fetch Progress from GitHub when config changes or at startup ---
  const syncProgress = useCallback(async (currentConfig) => {
    if (currentConfig.owner && currentConfig.repo && currentConfig.token) {
      setIsSyncing(true);
      try {
        const prg = await fetchProgress(currentConfig);
        setProgress(prg);
      } catch (err) {
        console.error("Failed to load progress from GitHub:", err);
      } finally {
        setIsSyncing(false);
      }
    }
  }, []);

  useEffect(() => {
    syncProgress(config);
  }, [config, syncProgress]);

  // --- Select Lesson Handler ---
  const handleSelectLesson = (lesson) => {
    setSelectedLesson(lesson);
    setActiveTab('theory');
    
    // Load draft answers if they exist
    const lessonDrafts = progress.drafts?.[lesson.title] || {};
    setAnswers(lessonDrafts);
    
    // Immediately log the visit and push to GitHub
    const timestamp = new Date().toISOString();
    const updatedProgress = {
      ...progress,
      theory_visits: {
        ...progress.theory_visits,
        [lesson.title]: timestamp
      }
    };
    setProgress(updatedProgress);

    if (config.owner && config.repo && config.token) {
      saveProgress(config, updatedProgress).catch((err) => {
        console.error("Failed to save theory visit to GitHub:", err);
      });
    }
  };

  // --- Save Draft Handler ---
  const [draftSaving, setDraftSaving] = useState(false);
  const handleSaveDraft = async () => {
    if (!selectedLesson) return;
    setDraftSaving(true);
    try {
      const updatedProgress = {
        ...progress,
        drafts: {
          ...(progress.drafts || {}),
          [selectedLesson.title]: answers
        }
      };

      if (config.owner && config.repo && config.token) {
        await saveProgress(config, updatedProgress);
      }
      setProgress(updatedProgress);
      alert("Đã lưu tạm bài làm của con lên GitHub! 🐸💚");
    } catch (err) {
      console.error("Failed to save draft:", err);
      alert("Lỗi khi lưu bài tạm. Bố mẹ vui lòng kiểm tra lại cấu hình GitHub.");
    } finally {
      setDraftSaving(false);
    }
  };

  // --- Answer Change Handler ---
  const handleAnswerChange = (key, value) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  // --- Practice/Questions Submit Handler ---
  const handleSubmit = async () => {
    if (!selectedLesson) return;
    setSubmitStatus('submitting');

    // Structure Q&A data
    const qaPairs = [];
    selectedLesson.questions.forEach((q, idx) => {
      qaPairs.push({
        type: 'question',
        num: idx + 1,
        prompt: (q[0] + q[1]).trim(),
        answer: answers[`q_${idx}`] || ''
      });
    });
    selectedLesson.exercises.forEach((e, idx) => {
      qaPairs.push({
        type: 'exercise',
        num: idx + 1,
        prompt: (e[0] + e[1]).trim(),
        answer: answers[`e_${idx}`] || ''
      });
    });

    try {
      const timestamp = new Date().toISOString();
      const updatedProgress = {
        ...progress,
        practice_completions: {
          ...progress.practice_completions,
          [selectedLesson.title]: timestamp
        },
        drafts: {
          ...(progress.drafts || {})
        }
      };
      if (updatedProgress.drafts[selectedLesson.title]) {
        delete updatedProgress.drafts[selectedLesson.title];
      }

      // 1. Submit answers and send email
      const emailStr = typeof config.emails === 'string' ? config.emails : (Array.isArray(config.emails) ? config.emails.join(',') : '');
      const submitConfig = {
        ...config,
        emails: emailStr.split(',').map(e => e.trim()).filter(Boolean)
      };
      
      // Submit answers to GitHub repo & send parent emails via Web3Forms
      await submitAnswers(submitConfig, selectedLesson.title, selectedLesson.title, qaPairs);

      // 2. Commit updated progress file to GitHub
      if (config.owner && config.repo && config.token) {
        await saveProgress(config, updatedProgress);
      }

      // Update state
      setProgress(updatedProgress);
      setSubmitStatus('success');
      setAnswers({}); // Clear answers
      alert("Bài làm của con đã được gửi thành công cho Bố Mẹ rồi nhé! Con giỏi quá! 🎉🐸💚");
    } catch (err) {
      console.error("Submission failed:", err);
      setSubmitStatus('error');
      alert(`Gửi bài thất bại. 😢\nLỗi: ${err.message}\n\nBố mẹ vui lòng kiểm tra lại cấu hình GitHub (Token, Tài khoản, Repository) hoặc kết nối mạng.`);
    }
  };

  // --- Settings Handlers ---
  const handleOpenSettings = () => {
    setFormOwner(config.owner);
    setFormRepo(config.repo);
    setFormToken(config.token);
    setFormEmails(config.emails);
    setFormWeb3FormsKey(config.web3formsKey);
    setShowSettings(true);
  };

  const handleSaveSettings = () => {
    const newConfig = {
      owner: formOwner.trim(),
      repo: formRepo.trim(),
      token: formToken.trim(),
      emails: formEmails.trim(),
      web3formsKey: formWeb3FormsKey.trim()
    };
    setConfig(newConfig);
    localStorage.setItem('math2_github_config', JSON.stringify(newConfig));
    setShowSettings(false);
  };

  // --- Formatting Helpers ---
  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('vi-VN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // --- Render loading / error ---
  if (loading) {
    return (
      <div className="loader-overlay">
        <div className="loader-emoji">🐸</div>
        <h2 className="loader-title">Đang chuẩn bị hành trình...</h2>
        <p className="loader-desc">Tải dữ liệu toán học vui nhộn cho con...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-error" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h1 style={{ fontSize: '4rem', margin: 0 }}>😢</h1>
        <h2 style={{ color: 'red' }}>Lỗi Tải Bài Học</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} style={{ padding: '12px 24px', fontSize: '1.2rem', cursor: 'pointer' }}>Tải lại trang</button>
      </div>
    );
  }

  // Active lesson visualizer mapping
  const VisualizerComponent = selectedLesson?.visualizerType
    ? visualizerMap[selectedLesson.visualizerType]
    : null;

  const isConfigured = config.owner && config.repo && config.token;

  return (
    <div className="app">
      {/* ===== HEADER ===== */}
      <header className="app-header">
        <div className="header-left">
          <span className="mascot">🐸</span>
          <h1 className="app-title">Toán 2 Phiêu Lưu Ký</h1>
        </div>
        <div className="header-right">
          <div className="sync-status">
            {isSyncing ? (
              <>🔄 Đang đồng bộ...</>
            ) : isConfigured ? (
              <>🟢 Đã đồng bộ GitHub</>
            ) : (
              <>🟡 Chế độ Ngoại tuyến</>
            )}
          </div>
          <button className="settings-btn" onClick={handleOpenSettings} title="Thiết lập cho Bố Mẹ">
            ⚙️ Bố Mẹ
          </button>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <div className="app-content">
        
        {/* SIDEBAR: Lesson List */}
        <aside className="app-sidebar">
          <h2 className="sidebar-title">📖 Các bài học của con</h2>
          {curriculum.map((chapter, chIdx) => (
            <div key={chIdx} className="chapter-group">
              <div className="chapter-title">
                {chapter.theme}
              </div>
              <div className="lessons-list">
                {chapter.lessons.map((lesson, lIdx) => {
                  const hasVisited = progress.theory_visits[lesson.title];
                  const hasCompleted = progress.practice_completions[lesson.title];
                  const isSelected = selectedLesson?.title === lesson.title;

                  return (
                    <button
                      key={lIdx}
                      className={`lesson-item-btn ${isSelected ? 'active' : ''} ${hasCompleted ? 'dim-grey' : ''}`}
                      onClick={() => handleSelectLesson(lesson)}
                    >
                      <span className="lesson-item-title">{lesson.title}</span>
                      <div className="lesson-badges">
                        {hasVisited && (
                          <span className="badge badge-visit" title={`Xem lý thuyết lần cuối: ${formatDate(hasVisited)}`}>
                            👁️ Xem: {formatDate(hasVisited).split(' ')[0]}
                          </span>
                        )}
                        {hasCompleted && (
                          <span className="badge badge-complete" title={`Nộp bài lần cuối: ${formatDate(hasCompleted)}`}>
                            ✅ Nộp: {formatDate(hasCompleted).split(' ')[0]}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </aside>

        {/* WORKSPACE: Active Lesson Detail */}
        <main className="app-workspace">
          {selectedLesson ? (
            <div className="lesson-card">
              
              <div className="lesson-header-bar">
                <h2 className="lesson-title">{selectedLesson.title}</h2>
              </div>

              {/* Tab Navigation */}
              <div className="lesson-tabs">
                <button
                  className={`tab-btn ${activeTab === 'theory' ? 'active' : ''}`}
                  onClick={() => setActiveTab('theory')}
                >
                  📖 Lý thuyết trực quan
                </button>
                <button
                  className={`tab-btn ${activeTab === 'practice' ? 'active' : ''}`}
                  onClick={() => setActiveTab('practice')}
                >
                  ✏️ Luyện tập & Câu hỏi
                </button>
              </div>

              {/* Tab Contents */}
              <div className="tab-pane-content">
                
                {/* 1. THEORY TAB */}
                {activeTab === 'theory' && (
                  <div className="theory-content">
                    {/* Concept */}
                    <div className="theory-block block-concept">
                      <h3 className="theory-block-title">💡 Khái niệm dễ hiểu</h3>
                      <p className="theory-text">{selectedLesson.concept}</p>
                    </div>

                    {/* Formula (if any) */}
                    {selectedLesson.formula && (
                      <div className="theory-block block-formula">
                        <h3 className="theory-block-title">⚡ Bí kíp Toán học</h3>
                        <p className="theory-text">{selectedLesson.formula}</p>
                      </div>
                    )}

                    {/* Skills */}
                    <div className="theory-block block-skills">
                      <h3 className="theory-block-title">⭐ Kỹ năng đạt được</h3>
                      <ul className="skills-list">
                        {selectedLesson.skills.map((skill, sIdx) => (
                          <li key={sIdx}>
                            <strong>{skill[0]}</strong>{skill[1]}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Real World */}
                    <div className="theory-block block-realworld">
                      <h3 className="theory-block-title">🌍 Thực tế xung quanh em</h3>
                      <p className="theory-text">{selectedLesson.real_world}</p>
                    </div>

                    {/* Diagram Image */}
                    {selectedLesson.image && (
                      <div className="theory-image-container">
                        <img
                          src={`./${selectedLesson.image[0]}`}
                          style={{ width: `${selectedLesson.image[1]}%` }}
                          alt={selectedLesson.image[2]}
                          className="theory-image"
                        />
                        <p className="theory-image-caption">{selectedLesson.image[2]}</p>
                      </div>
                    )}

                    {/* Interactive Laboratory */}
                    {VisualizerComponent && (
                      <div className="visualizer-wrapper">
                        <h3 className="visualizer-title">🔬 Phòng thực hành toán học</h3>
                        <Suspense fallback={<div className="visualizer-loading">🐸 Đang chuẩn bị mô hình...</div>}>
                          <VisualizerComponent config={selectedLesson.visualizerConfig || {}} />
                        </Suspense>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. PRACTICE TAB */}
                {activeTab === 'practice' && (
                  <div className="practice-content">
                    <p className="practice-guide">
                      🌟 <strong>Hướng dẫn:</strong> Con hãy gõ câu trả lời của mình vào các ô trống bên dưới nhé. Sau khi trả lời xong tất cả các câu, con hãy nhấn nút <strong>Hoàn thành</strong> màu xanh ở cuối trang để gửi kết quả cho bố mẹ chấm điểm nha!
                    </p>

                    {/* Questions */}
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', borderBottom: '2px solid var(--color-border)', paddingBottom: '8px', color: '#1E88E5', margin: '16px 0 8px 0' }}>
                      Phần 1: Câu hỏi hiểu bài
                    </h3>
                    {selectedLesson.questions.map((q, idx) => (
                      <div key={`q_${idx}`} className="item-card">
                        <h4 className="item-label">Câu hỏi {idx + 1}</h4>
                        <p className="item-prompt"><strong>{q[0]}</strong>{q[1]}</p>
                        <textarea
                          className="answer-textarea"
                          placeholder="Nhập câu trả lời của con..."
                          value={answers[`q_${idx}`] || ''}
                          onChange={(e) => handleAnswerChange(`q_${idx}`, e.target.value)}
                        />
                      </div>
                    ))}

                    {/* Exercises */}
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', borderBottom: '2px solid var(--color-border)', paddingBottom: '8px', color: '#E91E63', margin: '32px 0 8px 0' }}>
                      Phần 2: Bài tập luyện tập
                    </h3>
                    {selectedLesson.exercises.map((e, idx) => (
                      <div key={`e_${idx}`} className="item-card">
                        <h4 className="item-label">Bài tập {idx + 1}</h4>
                        <p className="item-prompt"><strong>{e[0]}</strong>{e[1]}</p>
                        <textarea
                          className="answer-textarea"
                          placeholder="Nhập câu trả lời của con..."
                          value={answers[`e_${idx}`] || ''}
                          onChange={(e) => handleAnswerChange(`e_${idx}`, e.target.value)}
                        />
                      </div>
                    ))}

                    {/* Submit Button */}
                    <div className="submit-section" style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                      <button
                        className="draft-btn"
                        onClick={handleSaveDraft}
                        disabled={!isConfigured || draftSaving}
                        title="Lưu tạm câu trả lời của con để hôm sau làm tiếp"
                      >
                        💾 {draftSaving ? 'Đang lưu...' : 'Lưu tạm bài làm'}
                      </button>
                      <button
                        className="submit-btn"
                        onClick={handleSubmit}
                        disabled={!isConfigured || submitStatus === 'submitting'}
                        title={!isConfigured ? 'Bố mẹ cần cấu hình GitHub để con gửi bài' : (submitStatus === 'submitting' ? 'Đang gửi...' : 'Gửi bài làm cho bố mẹ')}
                      >
                        🚀 {submitStatus === 'submitting' ? 'Đang gửi bài...' : 'Hoàn thành & Gửi bài'}
                      </button>
                    </div>
                    {!isConfigured && (
                      <p style={{ textAlign: 'center', color: '#F57C00', fontWeight: 'bold', fontSize: '1.1rem', margin: 0 }}>
                        ⚠️ Bố mẹ vui lòng nhấp nút <strong>⚙️ Bố Mẹ</strong> ở góc trên bên phải để cấu hình GitHub trước khi con làm bài nhé!
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="welcome-panel">
              <div className="welcome-logo">🐸🌈✨</div>
              <h2 className="welcome-title">Chào mừng con đến với thế giới Toán học!</h2>
              <p className="welcome-desc">
                Con hãy nhấp chuột chọn một bài học ở danh sách bên trái để bắt đầu khám phá các bí quyết toán học và thử sức làm bài tập nhé!
              </p>
            </div>
          )}
        </main>
      </div>

      {/* ===== PARENTS CONFIGURATION MODAL ===== */}
      {showSettings && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--color-border)', paddingBottom: '8px' }}>
              <h3 className="modal-title" style={{ border: 'none', padding: 0, margin: 0 }}>⚙️ Cấu hình vùng dành cho Bố Mẹ</h3>
              <button 
                style={{ background: 'transparent', border: 'none', fontSize: '1.8rem', cursor: 'pointer', color: 'var(--color-text-light)', padding: '0 4px', lineHeight: 1 }} 
                onClick={() => setShowSettings(false)}
                title="Đóng"
              >
                &times;
              </button>
            </div>
            
            <div className="form-group">
              <label>Tên tài khoản GitHub (Username)</label>
              <input
                type="text"
                placeholder="Ví dụ: chuductu-ui"
                value={formOwner}
                onChange={(e) => setFormOwner(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Tên kho lưu trữ GitHub (Repository)</label>
              <input
                type="text"
                placeholder="Ví dụ: toan2-cun"
                value={formRepo}
                onChange={(e) => setFormRepo(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>GitHub Personal Access Token (PAT)</label>
              <input
                type="password"
                placeholder="github_pat_..."
                value={formToken}
                onChange={(e) => setFormToken(e.target.value)}
              />
              <p className="form-help">
                Mã token cần có quyền ghi kho lưu trữ (write permission) để hệ thống tự động lưu lịch sử học tập của con lên GitHub.
              </p>
            </div>

            <div className="form-group">
              <label>Email của Bố Mẹ (ngăn cách bởi dấu phẩy)</label>
              <input
                type="text"
                placeholder="chu.duc.tu@gmail.com, thanhha.phth@gmail.com"
                value={formEmails}
                onChange={(e) => setFormEmails(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Khóa Web3Forms Access Key (Tùy chọn)</label>
              <input
                type="text"
                placeholder="72e519e9-d754-47b2-a4e9-6f5dfdb3d1c1"
                value={formWeb3FormsKey}
                onChange={(e) => setFormWeb3FormsKey(e.target.value)}
              />
              <p className="form-help">
                Khóa Web3Forms dùng để gửi trực tiếp email từ trình duyệt đến hòm thư bố mẹ.
              </p>
            </div>

            <div className="modal-buttons">
              <button className="btn-secondary" onClick={() => setShowSettings(false)}>Thoát / Đóng</button>
              <button className="btn-primary" onClick={handleSaveSettings}>Lưu cấu hình</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== SUBMITTING OVERLAY ===== */}
      {submitStatus === 'submitting' && (
        <div className="loader-overlay">
          <div className="loader-emoji">🚀</div>
          <h2 className="loader-title">Đang gửi bài làm...</h2>
          <p className="loader-desc">Hệ thống đang lưu trữ bài làm lên GitHub và gửi thư cho bố mẹ. Con đợi một chút nhé!</p>
        </div>
      )}

      {/* ===== SUCCESS OVERLAY ===== */}
      {submitStatus === 'success' && (
        <div className="success-overlay">
          <div className="success-emoji">🎉🐸🎉</div>
          <h2 className="success-title">Tuyệt vời ông mặt trời!</h2>
          <p className="success-desc">
            Bài làm của con đã được gửi thành công đến bố mẹ rồi đó! Con hãy nghỉ ngơi một chút hoặc chọn bài học tiếp theo nhé! 💚
          </p>
          <button className="success-btn" onClick={() => setSubmitStatus(null)}>
            Quay lại bài học
          </button>
        </div>
      )}

      {/* ===== ERROR OVERLAY ===== */}
      {submitStatus === 'error' && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ border: '2px solid red', textAlign: 'center' }}>
            <h3 style={{ color: 'red', margin: 0 }}>Gửi bài thất bại!</h3>
            <p>Có lỗi xảy ra khi kết nối với GitHub hoặc dịch vụ email. Bố mẹ vui lòng kiểm tra lại cấu hiệu mạng hoặc mã token GitHub.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button className="btn-secondary" onClick={() => setSubmitStatus(null)}>Đóng</button>
              <button className="btn-primary" style={{ backgroundColor: 'red' }} onClick={handleSubmit}>Thử lại</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
