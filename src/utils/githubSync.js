/**
 * GitHub API sync utilities for Grade 2 Math Adventure.
 * Persists all learning progress, visits, and quiz submissions directly on GitHub.
 */

// Helper to convert string to Base64 (supporting UTF-8)
function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

// Helper to convert Base64 back to UTF-8 string
function b64_to_utf8(str) {
  return decodeURIComponent(escape(window.atob(str)));
}

/**
 * Fetch a file's contents and its SHA from a GitHub repository.
 * @returns {Promise<{ content: string, sha: string } | null>}
 */
async function getFile(config, path) {
  const { owner, repo, token } = config;
  const encodedPath = path.split('/').map(encodeURIComponent).join('/');
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodedPath}`;
  
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
  };
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  try {
    const res = await fetch(url, { headers });
    if (res.status === 404) {
      return null;
    }
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`GitHub API error: ${res.status} - ${errText}`);
    }
    const data = await res.json();
    if (!data || typeof data.content !== 'string') {
      return null;
    }
    return {
      content: b64_to_utf8(data.content),
      sha: data.sha
    };
  } catch (error) {
    console.error(`Error fetching ${path} from GitHub:`, error);
    throw error;
  }
}

/**
 * Write/create a file in a GitHub repository.
 */
async function writeFile(config, path, contentStr, commitMessage, sha = null) {
  const { owner, repo, token } = config;
  const encodedPath = path.split('/').map(encodeURIComponent).join('/');
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodedPath}`;
  
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
    'Authorization': `token ${token}`
  };

  const body = {
    message: commitMessage,
    content: utf8_to_b64(contentStr)
  };
  if (sha) {
    body.sha = sha;
  }

  const res = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`GitHub PUT error: ${res.status} - ${errText}`);
  }
  return await res.json();
}

/**
 * Fetch progress from GitHub.
 * Returns progress data block or a fresh structure if not found.
 */
export async function fetchProgress(config) {
  if (!config || !config.owner || !config.repo || !config.token) {
    return { theory_visits: {}, practice_completions: {} };
  }
  
  try {
    const fileData = await getFile(config, 'progress.json');
    if (!fileData) {
      return { theory_visits: {}, practice_completions: {} };
    }
    return JSON.parse(fileData.content);
  } catch (error) {
    console.error("Failed to fetch progress from GitHub:", error);
    return { theory_visits: {}, practice_completions: {} };
  }
}

/**
 * Save progress updates to GitHub.
 */
export async function saveProgress(config, updatedProgress) {
  if (!config || !config.owner || !config.repo || !config.token) {
    throw new Error("Missing GitHub configuration to save progress.");
  }

  const path = 'progress.json';
  // Get current SHA to overwrite
  const fileData = await getFile(config, path);
  const sha = fileData ? fileData.sha : null;
  const contentStr = JSON.stringify(updatedProgress, null, 2);

  await writeFile(
    config,
    path,
    contentStr,
    `Update learning progress: ${new Date().toISOString()}`,
    sha
  );
}

/**
 * Commit a new student submission to GItHub and optionally email the parents.
 */
export async function submitAnswers(config, lessonTitle, lessonId, qaPairs) {
  if (!config || !config.owner || !config.repo || !config.token) {
    throw new Error("Missing GitHub configuration to submit answers.");
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const path = `submissions/${lessonId}_${timestamp}.json`;
  const submissionData = {
    lessonId,
    lessonTitle,
    submittedAt: new Date().toISOString(),
    answers: qaPairs
  };
  const contentStr = JSON.stringify(submissionData, null, 2);

  // 1. Save to GitHub
  await writeFile(
    config,
    path,
    contentStr,
    `Student submission: ${lessonTitle} - ${new Date().toISOString()}`
  );

  // 2. Email the parents via Web3Forms (if key is set) or fallback
  const emails = config.emails || ['chu.duc.tu@gmail.com', 'thanhha.phth@gmail.com'];
  const web3formsKey = config.web3formsKey || '72e519e9-d754-47b2-a4e9-6f5dfdb3d1c1'; // Default backup key or let parents supply one

  // Construct a beautiful HTML message for the parents
  let answersListHtml = '';
  qaPairs.forEach((item, index) => {
    answersListHtml += `
      <div style="margin-bottom: 20px; padding: 15px; background-color: #f9f9f9; border-left: 5px solid #4CAF50; border-radius: 4px;">
        <h4 style="margin: 0 0 8px 0; color: #333;">${item.type === 'question' ? 'Câu hỏi' : 'Bài tập'} ${item.num}: ${item.prompt}</h4>
        <p style="margin: 0; color: #555; white-space: pre-wrap; font-size: 15px; font-weight: bold;">
          Trả lời của con: <span style="color: #007BFF;">${item.answer || '(Con không trả lời)'}</span>
        </p>
      </div>
    `;
  });

  const emailHtmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #4CAF50; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">Toán 2 Phiêu Lưu Ký - Bài Làm Của Con</h2>
      <p style="font-size: 16px;">Chào bố mẹ, con đã hoàn thành xong bài học <strong>${lessonTitle}</strong>!</p>
      <p style="font-size: 14px; color: #666;">Thời gian nộp bài: ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}</p>
      <p style="font-size: 14px; color: #666; font-style: italic;">Lưu ý: Bố mẹ vui lòng xem và tự chấm bài bên dưới. Hệ thống không chấm điểm tự động để giúp con tự tin trả lời.</p>
      
      <div style="margin-top: 25px;">
        ${answersListHtml}
      </div>
      
      <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #ccc; font-size: 12px; color: #999; text-align: center;">
        Tự động gửi từ ứng dụng Toán 2 Phiêu Lưu Ký. Bản lưu trữ trực tuyến có tại thư mục submissions/ của kho GitHub.
      </div>
    </div>
  `;

  // Submit to Web3Forms for each parent
  const sendPromises = emails.map(email => {
    return fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: web3formsKey,
        subject: `[Toán 2] Bài làm mới của con: ${lessonTitle}`,
        from_name: 'Toán 2 Phiêu Lưu Ký 🐸',
        to_email: email,
        email_content_type: 'html',
        message: emailHtmlBody
      })
    }).then(res => {
      if (!res.ok) {
        console.error(`Failed to send email to ${email}`);
      }
    }).catch(err => {
      console.error(`Error sending email to ${email}:`, err);
    });
  });

  await Promise.all(sendPromises);
}
