# Durable Handoff Summary: Toán 2 Phiêu Lưu Ký

This document serves as a blueprint and handoff guide for the Grade 2 Math companion app based on the textbook **"SGK Toán 2 Kết nối tri thức tập 1"** (NXBGD Vietnam).

---

## 1. Application Architecture

The application is built as a lightweight, static **React + Vite** Single Page Application (SPA). It runs entirely client-side, making it free to host on platforms like GitHub Pages, Vercel, or Netlify.

### Key Pillars:
*   **Data-Driven Design**: The entire learning map, chapters, lesson titles, descriptions, theoretical texts, sandbox configs, and quizzes are defined in a single database: `public/lessons.json`.
*   **Local State & History**: User progress (stars and hearts) and attempt records are stored in the browser's `localStorage` (via `src/utils/storage.js`).
*   **Visual Sandboxes (Theory)**: Interactive mathematical widgets are mounted dynamically in the theory view based on the lesson's config.
*   **Sequential Gamification**: Lessons lock/unlock sequentially (requires completing Easy, Medium, and Hard of the previous lesson). Within a lesson, levels unlock sequentially (Easy → Medium → Hard).
*   **Child-Friendly Design**: Bright colors, large touch targets, playful 🐸 frog mascot, Google Fonts (Baloo 2 + Nunito).

---

## 2. Curriculum Coverage (SGK Toán 2 Kết nối tri thức tập 1)

| Chapter | Title | Lessons |
|---------|-------|---------|
| 1 | Ôn tập và bổ sung | 3 lessons: Numbers to 100, Addition/Subtraction review, Addend/Sum |
| 2 | Phép cộng, phép trừ trong phạm vi 20 | 3 lessons: Addition within 20, Subtraction within 20, Addition/Subtraction tables |
| 3 | Phép cộng, phép trừ trong phạm vi 100 | 3 lessons: Addition (no carry), Subtraction (no borrow), Mixed practice |
| 4 | Hình học và Đo lường | 3 lessons: Lines/Curves/Zigzags, Quadrilaterals/Rectangles, Length measurement (cm) |
| 5 | Phép cộng, phép trừ có nhớ trong phạm vi 100 | 3 lessons: Addition (carry), Subtraction (borrow), Mixed carry practice |

**Total: 5 chapters, 15 lessons, 90 quiz questions** (6 per lesson × 3 difficulty levels)

---

## 3. Curriculum Data Schema (`lessons.json`)

```json
{
  "chapters": [
    {
      "id": "chapter-unique-id",
      "title": "Chương X: [Tên Chương]",
      "lessons": [
        {
          "id": "bai-id",
          "title": "Bài X: [Tên Bài]",
          "description": "[Mô tả ngắn]",
          "theory": {
            "explanation": "[Lời giảng chi tiết bằng tiếng Việt]",
            "visualizerType": "NumberLine100",
            "visualizerConfig": { }
          },
          "exercises": {
            "easy": [
              {
                "id": "q1_1",
                "type": "multiple-choice",
                "question": "[Câu hỏi]",
                "options": ["A", "B", "C", "D"],
                "correctAnswer": "B",
                "explanation": "[Giải thích đáp án]"
              }
            ],
            "medium": [],
            "hard": []
          }
        }
      ]
    }
  ]
}
```

---

## 4. Core Component Roles

*   **App.jsx**: Holds global state (stars count, hearts, active lesson, active view). Handles `localStorage` reads/writes and coordinates modal triggers.
*   **QuestMap.jsx**: Renders the vertical visual map path. Computes linear unlocks and assigns element `id={`node-${lesson.id}`}` for scroll targeting. Zigzag layout with chapter headers.
*   **TableOfContentsModal.jsx**: Renders the textbook structure in a modal. Lists chapters, tracks completion levels using colorful badges.
*   **LessonDrawer.jsx**: Bottom-sheet dialog sliding up showing selected lesson information, links to Theory, and difficulty levels (Easy/Medium/Hard with sequential unlock).
*   **TheorySection.jsx**: Main theory shell. Recovers 2 hearts when reviewed (capped at 5) and dynamically mounts one of the visual sandboxes via lazy loading.
*   **QuizSection.jsx**: Quiz runner. Shuffles options programmatically, manages live heart deductions (fails if hearts reach 0), and triggers result copying and Zalo sharing.

---

## 5. Visual Sandbox Directory

All interactive sandbox visualizers are stored under `src/components/visualizers/`:

1.  **NumberLine100.jsx**: Horizontal scrollable number line from 0-100 with clickable markers.
2.  **AddSubVisualizer.jsx**: Interactive addition/subtraction with visual block representation.
3.  **TenFrameVisualizer.jsx**: Ten-frame tool for "bridge to 10" strategy in addition/subtraction within 20.
4.  **AdditionTableVisualizer.jsx**: Interactive addition table grid (2-9) with color-coded sums.
5.  **ColumnAddition.jsx**: Step-by-step column addition/subtraction with carry/borrow visualization.
6.  **ShapeExplorer.jsx**: SVG-based 2D shape explorer with Vietnamese labels for geometry concepts.
7.  **RulerVisualizer.jsx**: Virtual ruler for measuring in centimeters with dm conversion.

---

## 6. Design System

The CSS uses a comprehensive design token system:

- **Primary**: Green (#4CAF50) — frog/nature theme
- **Accent Gold**: #FFD700 — stars, achievements
- **Accent Pink**: #FF6B9D — hearts
- **Background**: Cream (#FFF8E1) — warm, inviting
- **Fonts**: Baloo 2 (headings), Nunito (body)
- **Animations**: bounce, pulse, slideUp, fadeIn, correctFlash, wrongFlash, starPop

---

## 7. How to Rebuild/Adapt for a New Textbook

1.  **Replace the Database**: Rewrite `public/lessons.json` with the new book's content.
2.  **Define Sandbox Mappings**: Add new `visualizerType` entries and create components under `src/components/visualizers/`.
3.  **Register in TheorySection**: Update the `visualizerMap` in `TheorySection.jsx`.
4.  **Build and Deploy**:
    ```bash
    npm run build
    ```
