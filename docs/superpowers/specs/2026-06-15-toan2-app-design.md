# Spec: Toán 2 Phiêu Lưu Ký App Refactoring

This document details the architecture, data schema, and custom components design for transforming the Grade 6 Math application template into the Grade 2 Math application ("Toán 2 Phiêu Lưu Ký").

---

## 📌 Project Overview
* **Target App**: `math2-app` ("Toán 2 Phiêu Lưu Ký")
* **Target Repository**: `chuductu-ui/math2-app`
* **Tech Stack**: React 19, Vite, Vanilla CSS, Vitest (for unit testing), Local Storage for state preservation.

---

## 🏗️ Core Architecture & Components

### 1. Curriculum Data Schema (`public/lessons.json`)
The application requires a structured JSON database defining chapters, lessons, explanations, and quiz questions. 

To maintain and scale this data cleanly, we will implement `generate_curriculum_grade2.py` inside `math2-app/` to generate `lessons.json` programmatically. 

Each lesson will map to one of 10 visualizers:
* **Bài 1**: `BaseTenBlocks`
* **Bài 2**: `NumberLine`
* **Bài 3**: `InteractiveEquation`
* **Bài 7**: `TenFrames`
* **Bài 11**: `TenFrames`
* **Bài 15**: `BalanceScale`
* **Bài 16**: `LitreCup`
* **Bài 21**: `ShapeExplorer`
* **Bài 22**: `ShapeClassifier`
* **Bài 25**: `InteractiveClock`
* **Bài 28**: `BaseTenBlocks`
* **Bài 30**: `ItemDistributor`

---

## 🎨 Visualizer Details

### 1. `BaseTenBlocks.jsx`
* **Purpose**: Teach place value (hundreds, tens, ones) for Bài 1 and Bài 28 (multiplication groups).
* **Interactions**:
  * Slider/buttons to set a number (e.g. 0 to 199).
  * Dynamic grid layout:
    * Hundreds = 10x10 green grid block.
    * Tens = 1x10 orange rod blocks.
    * Units = 1x1 yellow single blocks.
  * Hovering/clicking blocks highlights their decomposition.

### 2. `NumberLine.jsx`
* **Purpose**: Teach ordering, number relations, and finding "số liền trước / số liền sau".
* **Interactions**:
  * Horizontal line from 0 to 100 with tick marks every 1 unit, major labels every 10 units.
  * Click on a tick mark to select/reveal the number.
  * Controls to jump to "Số liền trước" (Selected - 1) and "Số liền sau" (Selected + 1).

### 3. `InteractiveEquation.jsx`
* **Purpose**: Teach parts of addition (Số hạng, Tổng) and subtraction (Số bị trừ, Số trừ, Hiệu).
* **Interactions**:
  * Renders active equations like $5 + 3 = 8$ or $9 - 4 = 5$.
  * Clicking on individual numbers highlights them in distinctive colors and shows their Vietnamese math term with a definition.

### 4. `TenFrames.jsx`
* **Purpose**: Teach addition/subtraction across 10 in range 20 using frames of 10.
* **Interactions**:
  * Shows two 10-frames.
  * Input two numbers (e.g., 9 + 5).
  * Animate moving dots from the second frame to the first to complete "10", then showing the final sum (10 + 4 = 14).
  * For subtraction, shows removing/crossing out dots.

### 5. `BalanceScale.jsx`
* **Purpose**: Visual weight comparison in kilograms.
* **Interactions**:
  * Renders a balance scale.
  * Left side has selectable objects (Pumpkin: 5kg, Apple: 1kg, Teddy: 2kg, Book: 1kg).
  * Right side allows placing weights (1kg, 2kg, 5kg).
  * Balance beam tilts based on the weight difference. When equal, shows a "Thăng bằng!" congratulatory badge.

### 6. `LitreCup.jsx`
* **Purpose**: Teach capacity in liters.
* **Interactions**:
  * Standard cups of 1L, 2L, 5L and a main target tank.
  * Buttons to fill or empty cups and pour them into the target tank.
  * Dynamic water level animation showing current capacity overlay.

### 7. `ShapeExplorer.jsx`
* **Purpose**: Teach geometry properties (sides, vertices) of triangles and quadrilaterals.
* **Interactions**:
  * Interactive canvas/SVG drawing predefined shapes (Tam giác, Tứ giác).
  * Clicking on sides highlights them and counts them.
  * Clicking on vertices reveals labels.

### 8. `ShapeClassifier.jsx`
* **Purpose**: Identify cylinder (khối trụ) and sphere (khối cầu).
* **Interactions**:
  * Renders shapes: soda can, soccer ball, battery, marble, orange.
  * Renders two boxes: "Khối trụ" and "Khối cầu".
  * Click or drag items into correct boxes with success indicators.

### 9. `InteractiveClock.jsx`
* **Purpose**: Teach reading clocks (hours and minutes).
* **Interactions**:
  * Circular SVG clock with hour and minute hands.
  * Hour and minute sliders to rotate hands.
  * Displays text description of the time in Vietnamese (e.g., "10 giờ rưỡi").
  * "Đố vui" (Quiz) mode: prompts student to set clock to a specific time.

### 10. `ItemDistributor.jsx`
* **Purpose**: Visual division teaching equal sharing.
* **Interactions**:
  * Renders $N$ items (candies/apples) and $K$ plates/kids.
  * Clicking "Chia kẹo" distributes items equally one by one with animated movements.
  * Displays division statement (e.g., $12 : 3 = 4$).

---

## 🧪 Testing Plan
We will implement component tests using Vitest and `@testing-library/react` inside the `math2-app/tests/` folder.
* **`App.test.jsx`**: Verify basic headers and loading screen text.
* **`NumberLine.test.jsx`**: Verify number line bounds (0 to 100) and click events.
* **`BaseTenBlocks.test.jsx`**: Verify hundred/ten/unit splits.
* **`InteractiveClock.test.jsx`**: Verify slider adjustments and clock rendering.
* **`LitreCup.test.jsx`**: Verify filling cups and capacity math.
* **`BalanceScale.test.jsx`**: Verify balance calculations.
* **`ShapeClassifier.test.jsx`**: Verify classification categorization logic.
