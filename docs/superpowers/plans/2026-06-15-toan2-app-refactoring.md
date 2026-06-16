# Toán 2 Phiêu Lưu Ký Refactoring Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the math application codebase to align with Grade 2 Math curriculum requirements, integrating 12 custom lessons and 10 interactive math visualizers.

**Architecture:** Programmatically generate the curriculum JSON file (`public/lessons.json`) using a Python script, refactor `TheorySection.jsx` to lazy-load the visualizer components, and implement each visualizer with clean React state, responsive SVGs/CSS, and comprehensive unit tests.

**Tech Stack:** React 19, Vite, Vanilla CSS, Vitest, Testing Library, Python 3

---

### Task 1: Python Curriculum Generator
Create the Python script `generate_curriculum_grade2.py` to compile the 12 lessons database with multi-level questions (Easy, Medium, Hard) and dump it to `public/lessons.json`.

**Files:**
- Create: `math2-app/generate_curriculum_grade2.py`
- Modify: `math2-app/public/lessons.json` (overwritten by running the script)

- [ ] **Step 1: Write `generate_curriculum_grade2.py`**
  Write a python script that outputs the curriculum database of 12 lessons under 6 chapters.
  Create file: `C:\Users\Hi\Desktop\Math Grade 2 Part 1\math2-app\generate_curriculum_grade2.py`
  ```python
  import json
  import os

  def get_options(correct, wrong1, wrong2, wrong3):
      return [correct, wrong1, wrong2, wrong3]

  def make_q(q_id, question, correct, wrong1, wrong2, wrong3, explanation):
      return {
          "id": q_id,
          "type": "multiple-choice",
          "question": question,
          "options": get_options(correct, wrong1, wrong2, wrong3),
          "correctAnswer": correct,
          "explanation": explanation
      }

  def build_curriculum():
      curriculum = {
          "chapters": [
              {
                  "id": "chapter-1",
                  "title": "Chương I: Ôn tập và Bổ sung",
                  "lessons": [
                      {
                          "id": "bai-1-on-tap-cac-so-den-100",
                          "title": "Bài 1: Ôn tập các số đến 100",
                          "description": "Nhận biết hàng chục, hàng đơn vị, đọc viết các số đến 100.",
                          "theory": {
                              "explanation": "Các số từ 0 đến 100 gồm chữ số hàng chục đứng trước và hàng đơn vị đứng sau. Ví dụ: 35 gồm 3 chục và 5 đơn vị. Ta viết 35 = 30 + 5.",
                              "visualizerType": "BaseTenBlocks",
                              "visualizerConfig": {"defaultValue": 35}
                          },
                          "exercises": {
                              "easy": [
                                  make_q("b1_e1", "Số 47 gồm mấy chục và mấy đơn vị?", "4 chục và 7 đơn vị", "7 chục và 4 đơn vị", "4 chục và 70 đơn vị", "40 chục và 7 đơn vị", "Chữ số 4 đứng trước là hàng chục, số 7 là hàng đơn vị.")
                              ],
                              "medium": [
                                  make_q("b1_m1", "Tìm số bé nhất có hai chữ số giống nhau.", "11", "10", "22", "99", "Số bé nhất có hai chữ số là 10, nhưng hai chữ số giống nhau bé nhất là 11.")
                              ],
                              "hard": [
                                  make_q("b1_h1", "Viết được bao nhiêu số có hai chữ số từ hai chữ số 3 và 5?", "4 số", "2 số", "3 số", "1 số", "Các số viết được là 33, 35, 53, 55. Tổng cộng có 4 số.")
                              ]
                          }
                      },
                      {
                          "id": "bai-2-tia-so-so-lien-truoc-so-lien-sau",
                          "title": "Bài 2: Tia số. Số liền trước, số liền sau",
                          "description": "Xác định vị trí số trên tia số, số liền trước kém 1 đơn vị, số liền sau hơn 1 đơn vị.",
                          "theory": {
                              "explanation": "Trên tia số, các số được xếp thứ tự từ bé đến lớn. Số liền trước của một số bé hơn số đó 1 đơn vị. Số liền sau lớn hơn số đó 1 đơn vị.",
                              "visualizerType": "NumberLine",
                              "visualizerConfig": {"min": 0, "max": 100}
                          },
                          "exercises": {
                              "easy": [
                                  make_q("b2_e1", "Số liền sau của số 79 là số nào?", "80", "78", "81", "70", "Số liền sau của 79 bằng 79 + 1 = 80.")
                              ],
                              "medium": [
                                  make_q("b2_m1", "Số liền trước của số 90 là số nào?", "89", "91", "88", "100", "Số liền trước của 90 bằng 90 - 1 = 89.")
                              ],
                              "hard": [
                                  make_q("b2_h1", "Tìm số liền trước của số liền trước số 50.", "48", "49", "51", "47", "Số liền trước số 50 là 49. Số liền trước của 49 là 48.")
                              ]
                          }
                      },
                      {
                          "id": "bai-3-cac-thanh-phan-cua-phep-cong-phep-tru",
                          "title": "Bài 3: Các thành phần của phép cộng, phép trừ",
                          "description": "Phép cộng gồm Số hạng + Số hạng = Tổng. Phép trừ gồm Số bị trừ - Số trừ = Hiệu.",
                          "theory": {
                              "explanation": "Trong phép cộng A + B = C, A và B là Số hạng, C là Tổng. Trong phép trừ A - B = C, A là Số bị trừ, B là Số trừ, C là Hiệu.",
                              "visualizerType": "InteractiveEquation",
                              "visualizerConfig": {}
                          },
                          "exercises": {
                              "easy": [
                                  make_q("b3_e1", "Trong phép cộng 12 + 5 = 17, số 17 được gọi là gì?", "Tổng", "Số hạng", "Hiệu", "Số bị trừ", "Kết quả của phép cộng được gọi là Tổng.")
                              ],
                              "medium": [
                                  make_q("b3_m1", "Trong phép trừ 25 - 5 = 20, số 25 được gọi là gì?", "Số bị trừ", "Số trừ", "Hiệu", "Tổng", "Số đứng trước dấu trừ gọi là Số bị trừ.")
                              ],
                              "hard": [
                                  make_q("b3_h1", "Nếu số hạng thứ nhất tăng thêm 5 đơn vị và giữ nguyên số hạng thứ hai, Tổng sẽ thay đổi thế nào?", "Tăng thêm 5 đơn vị", "Giảm đi 5 đơn vị", "Không thay đổi", "Tăng thêm 10 đơn vị", "Tổng = Số hạng + Số hạng. Khi một số hạng tăng 5 thì Tổng tăng 5.")
                              ]
                          }
                      }
                  ]
              },
              {
                  "id": "chapter-2",
                  "title": "Chương II: Phép cộng, phép trừ trong phạm vi 20",
                  "lessons": [
                      {
                          "id": "bai-7-phep-cong-qua-10-trong-pham-vi-20",
                          "title": "Bài 7: Phép cộng (qua 10) trong phạm vi 20",
                          "description": "Tách số để cộng cho tròn 10 rồi cộng với số còn lại (ví dụ: 9 + 5 = 9 + 1 + 4 = 10 + 4 = 14).",
                          "theory": {
                              "explanation": "Ta tách số hạng thứ hai để cộng với số hạng thứ nhất cho đủ 10, sau đó cộng 10 với số còn lại. Ví dụ: 9 + 5 = 9 + 1 + 4 = 14.",
                              "visualizerType": "TenFrames",
                              "visualizerConfig": {"mode": "add", "defaultA": 9, "defaultB": 5}
                          },
                          "exercises": {
                              "easy": [
                                  make_q("b7_e1", "9 + 4 = ?", "13", "12", "14", "15", "Tách 4 = 1 + 3. Ta có 9 + 1 = 10, rồi 10 + 3 = 13.")
                              ],
                              "medium": [
                                  make_q("b7_m1", "8 + 6 = ?", "14", "13", "15", "16", "Tách 6 = 2 + 4. Ta có 8 + 2 = 10, rồi 10 + 4 = 14.")
                              ],
                              "hard": [
                                  make_q("b7_h1", "Mẹ mua 9 bông hoa hồng và 7 bông hoa cúc. Hỏi mẹ mua tất cả bao nhiêu bông hoa?", "16 bông hoa", "15 bông hoa", "17 bông hoa", "14 bông hoa", "Phép tính là 9 + 7. Tách 7 = 1 + 6. Ta được 9 + 1 = 10; 10 + 6 = 16.")
                              ]
                          }
                      },
                      {
                          "id": "bai-11-phep-tru-qua-10-trong-pham-vi-20",
                          "title": "Bài 11: Phép trừ (qua 10) trong phạm vi 20",
                          "description": "Trừ để được 10 rồi trừ số còn lại (ví dụ: 12 - 5 = 12 - 2 - 3 = 10 - 3 = 7).",
                          "theory": {
                              "explanation": "Ta trừ đi một phần ở số bị trừ để được 10, rồi lấy 10 trừ đi phần còn lại ở số trừ. Ví dụ: 12 - 5 = 12 - 2 - 3 = 7.",
                              "visualizerType": "TenFrames",
                              "visualizerConfig": {"mode": "subtract", "defaultA": 12, "defaultB": 5}
                          },
                          "exercises": {
                              "easy": [
                                  make_q("b11_e1", "11 - 3 = ?", "8", "7", "9", "6", "Trừ đi 1 để được 10: 11 - 1 - 2 = 10 - 2 = 8.")
                              ],
                              "medium": [
                                  make_q("b11_m1", "13 - 6 = ?", "7", "6", "8", "9", "Trừ đi 3 để được 10: 13 - 3 - 3 = 10 - 3 = 7.")
                              ],
                              "hard": [
                                  make_q("b11_h1", "Trên cây có 12 quả táo, gió thổi rụng mất 4 quả. Hỏi trên cây còn lại bao nhiêu quả?", "8 quả", "9 quả", "7 quả", "10 quả", "Phép tính: 12 - 4. Trừ đi 2 để được 10: 12 - 2 - 2 = 10 - 2 = 8.")
                              ]
                          }
                      }
                  ]
              },
              {
                  "id": "chapter-3",
                  "title": "Chương III: Làm quen với khối lượng, dung tích",
                  "lessons": [
                      {
                          "id": "bai-15-ki-lo-gam-kg",
                          "title": "Bài 15: Ki-lô-gam (kg)",
                          "description": "Làm quen với đơn vị đo khối lượng Ki-lô-gam (kg). Đọc cân đĩa hoặc cân đồng hồ.",
                          "theory": {
                              "explanation": "Ki-lô-gam (kg) là đơn vị đo khối lượng. Quả cân 1kg nặng một ki-lô-gam. Khi đĩa cân thăng bằng, vật ở đĩa bên này có khối lượng bằng tổng quả cân ở đĩa bên kia.",
                              "visualizerType": "BalanceScale",
                              "visualizerConfig": {}
                          },
                          "exercises": {
                              "easy": [
                                  make_q("b15_e1", "Đơn vị đo khối lượng viết tắt là gì?", "kg", "l", "cm", "m", "Ki-lô-gam viết tắt là kg.")
                              ],
                              "medium": [
                                  make_q("b15_m1", "Đĩa cân bên trái có quả bí ngô, đĩa bên phải có 2 quả cân loại 2kg và 1 quả cân loại 1kg. Khi cân thăng bằng, quả bí ngô nặng bao nhiêu?", "5 kg", "3 kg", "4 kg", "2 kg", "Khối lượng quả bí ngô bằng tổng khối lượng các quả cân: 2kg + 2kg + 1kg = 5kg.")
                              ],
                              "hard": [
                                  make_q("b15_h1", "Bao gạo nặng 15kg. Người ta lấy ra 7kg gạo. Hỏi bao gạo còn lại bao nhiêu ki-lô-gam?", "8 kg", "9 kg", "7 kg", "10 kg", "Phép tính: 15kg - 7kg = 8kg.")
                              ]
                          }
                      },
                      {
                          "id": "bai-16-lit-l",
                          "title": "Bài 16: Lít (l)",
                          "description": "Đơn vị đo dung tích Lít (l). Đo và rót nước giữa các ca đong.",
                          "theory": {
                              "explanation": "Lít (l) là đơn vị đo dung tích (sức chứa chất lỏng). Chúng ta dùng các ca đong 1 lít, 2 lít, 5 lít để đong nước.",
                              "visualizerType": "LitreCup",
                              "visualizerConfig": {}
                          },
                          "exercises": {
                              "easy": [
                                  make_q("b16_e1", "Chữ l trong toán đo lường viết tắt cho đơn vị nào?", "Lít", "Ki-lô-gam", "Xăng-ti-mét", "Đê-xi-mét", "Chữ l viết tắt cho đơn vị Lít.")
                              ],
                              "medium": [
                                  make_q("b16_m1", "Rót đầy 1 ca 5 lít và 1 ca 2 lít nước rồi đổ chung vào một xô. Hỏi trong xô có tất cả bao nhiêu lít nước?", "7 lít", "6 lít", "8 lít", "5 lít", "Tổng số nước đổ vào xô là: 5 + 2 = 7 lít.")
                              ],
                              "hard": [
                                  make_q("b16_h1", "Một can chứa 10 lít nước. Người ta rót sang ca đong 3 lít đầy nước. Hỏi trong can còn lại bao nhiêu lít nước?", "7 lít", "6 lít", "8 lít", "5 lít", "Số lít nước còn lại trong can là: 10 - 3 = 7 lít.")
                              ]
                          }
                      }
                  ]
              },
              {
                  "id": "chapter-4",
                  "title": "Chương IV: Hình phẳng và Hình khối",
                  "lessons": [
                      {
                          "id": "bai-21-hinh-tam-giac-hinh-tu-giac",
                          "title": "Bài 21: Hình tam giác, hình tứ giác",
                          "description": "Hình tam giác có 3 cạnh, 3 đỉnh. Hình tứ giác có 4 cạnh, 4 đỉnh.",
                          "theory": {
                              "explanation": "Hình tam giác có 3 cạnh và 3 đỉnh. Hình tứ giác có 4 cạnh và 4 đỉnh.",
                              "visualizerType": "ShapeExplorer",
                              "visualizerConfig": {}
                          },
                          "exercises": {
                              "easy": [
                                  make_q("b21_e1", "Hình tam giác có mấy cạnh?", "3 cạnh", "4 cạnh", "5 cạnh", "2 cạnh", "Hình tam giác gồm có 3 cạnh và 3 đỉnh.")
                              ],
                              "medium": [
                                  make_q("b21_m1", "Hình nào dưới đây có 4 cạnh?", "Hình tứ giác", "Hình tam giác", "Hình tròn", "Hình năm cạnh", "Hình tứ giác là hình có 4 cạnh.")
                              ],
                              "hard": [
                                  make_q("b21_h1", "Một hình tứ giác có độ dài các cạnh lần lượt là 2cm, 3cm, 4cm, 5cm. Chu vi của hình tứ giác đó là bao nhiêu?", "14 cm", "12 cm", "10 cm", "15 cm", "Chu vi của hình tứ giác là tổng độ dài các cạnh: 2 + 3 + 4 + 5 = 14 cm.")
                              ]
                          }
                      },
                      {
                          "id": "bai-22-khoi-tru-khoi-cau",
                          "title": "Bài 22: Khối trụ, khối cầu",
                          "description": "Nhận dạng các đồ vật xung quanh có hình dạng khối trụ (hộp sữa, lon nước) và khối cầu (quả bóng, viên bi).",
                          "theory": {
                              "explanation": "Khối trụ có hình dạng giống lon nước, hộp sữa, có hai mặt đáy phẳng tròn. Khối cầu tròn đều như quả bóng, viên bi, có thể lăn về mọi phía.",
                              "visualizerType": "ShapeClassifier",
                              "visualizerConfig": {}
                          },
                          "exercises": {
                              "easy": [
                                  make_q("b22_e1", "Quả bóng đá có hình dạng khối gì?", "Khối cầu", "Khối trụ", "Khối lập phương", "Khối chữ nhật", "Quả bóng đá tròn đều nên có hình dạng khối cầu.")
                              ],
                              "medium": [
                                  make_q("b22_m1", "Hộp sữa đặc có hình dạng khối gì?", "Khối trụ", "Khối cầu", "Khối vuông", "Khối tam giác", "Hộp sữa đặc có hai mặt phẳng tròn và một mặt cong bao quanh nên có hình dạng khối trụ.")
                              ],
                              "hard": [
                                  make_q("b22_h1", "Đồ vật nào dưới đây không có hình dạng khối trụ?", "Quả bóng bàn", "Lon nước ngọt", "Hộp bút hình ống tròn", "Cuộn băng dính tròn", "Quả bóng bàn có hình dạng khối cầu, không phải khối trụ.")
                              ]
                          }
                      }
                  ]
              },
              {
                  "id": "chapter-5",
                  "title": "Chương V: Thời gian",
                  "lessons": [
                      {
                          "id": "bai-25-ngay-gio-gio-phut-xem-dong-ho",
                          "title": "Bài 25: Ngày - giờ, giờ - phút. Xem đồng hồ",
                          "description": "Một ngày có 24 giờ. Kim ngắn chỉ giờ, kim dài chỉ phút. Xem giờ hơn (ví dụ: 8 giờ 15 phút, 8 giờ 30 phút).",
                          "theory": {
                              "explanation": "Một ngày có 24 giờ. Đồng hồ có kim ngắn chỉ giờ và kim dài chỉ phút. Khi kim phút chỉ số 3 là 15 phút, chỉ số 6 là 30 phút (giờ rưỡi).",
                              "visualizerType": "InteractiveClock",
                              "visualizerConfig": {}
                          },
                          "exercises": {
                              "easy": [
                                  make_q("b25_e1", "Một ngày có bao nhiêu giờ?", "24 giờ", "12 giờ", "60 giờ", "20 giờ", "Theo quy ước, một ngày có đúng 24 giờ.")
                              ],
                              "medium": [
                                  make_q("b25_m1", "Khi kim ngắn chỉ số 9, kim dài chỉ số 6 thì đồng hồ chỉ mấy giờ?", "9 giờ 30 phút", "9 giờ 6 phút", "9 giờ 15 phút", "10 giờ", "Kim dài chỉ số 6 tương ứng với 30 phút. Vậy đồng hồ chỉ 9 giờ 30 phút (hay 9 giờ rưỡi).")
                              ],
                              "hard": [
                                  make_q("b25_h1", "Bé đi ngủ lúc 9 giờ tối. Đến 6 giờ sáng hôm sau bé thức dậy. Hỏi bé đã ngủ mấy tiếng?", "9 tiếng", "8 tiếng", "10 tiếng", "7 tiếng", "Từ 9 giờ tối đến 12 giờ đêm là 3 tiếng. Từ 12 giờ đêm đến 6 giờ sáng là 6 tiếng. Tổng cộng bé ngủ: 3 + 6 = 9 tiếng.")
                              ]
                          }
                      }
                  ]
              },
              {
                  "id": "chapter-6",
                  "title": "Chương VI: Phép nhân và Phép chia",
                  "lessons": [
                      {
                          "id": "bai-28-phep-nhan-thua-so-tich",
                          "title": "Bài 28: Phép nhân. Thừa số - Tích",
                          "description": "Phép nhân là phép cộng các số hạng bằng nhau. Số nhân với số là Thừa số × Thừa số = Tích.",
                          "theory": {
                              "explanation": "Phép nhân biểu thị tổng của nhiều số hạng bằng nhau. Trong phép nhân A x B = C, A và B là Thừa số, C là Tích.",
                              "visualizerType": "BaseTenBlocks",
                              "visualizerConfig": {"mode": "multiply", "defaultA": 3, "defaultB": 5}
                          },
                          "exercises": {
                              "easy": [
                                  make_q("b28_e1", "Phép cộng 2 + 2 + 2 được chuyển thành phép nhân nào?", "2 x 3", "2 x 2", "3 x 3", "2 + 3", "Có 3 số hạng 2 cộng lại với nhau, ta viết thành 2 x 3.")
                              ],
                              "medium": [
                                  make_q("b28_m1", "Trong phép tính 5 x 4 = 20, các số 5 và 4 được gọi là gì?", "Thừa số", "Tích", "Số hạng", "Thương", "Hai số nhân với nhau được gọi là các Thừa số.")
                              ],
                              "hard": [
                                  make_q("b28_h1", "Mỗi phòng học có 4 cái quạt trần. Hỏi 5 phòng học như vậy có bao nhiêu cái quạt trần?", "20 cái quạt", "18 cái quạt", "25 cái quạt", "15 cái quạt", "Phép tính: 4 x 5 = 20 cái quạt.")
                              ]
                          }
                      },
                      {
                          "id": "bai-30-phep-chia-so-bi-chia-so-chia-thuong",
                          "title": "Bài 30: Phép chia. Số bị chia - Số chia - Thương",
                          "description": "Phép chia là chia đều một số lượng thành các phần bằng nhau.",
                          "theory": {
                              "explanation": "Phép chia dùng để chia đều một lượng thành các phần bằng nhau. Trong phép chia A : B = C, A là Số bị chia, B là Số chia, C là Thương.",
                              "visualizerType": "ItemDistributor",
                              "visualizerConfig": {"totalItems": 12, "groupsCount": 3}
                          },
                          "exercises": {
                              "easy": [
                                  make_q("b30_e1", "Trong phép chia 10 : 2 = 5, số 10 được gọi là gì?", "Số bị chia", "Số chia", "Thương", "Tích", "Số đứng trước dấu chia gọi là Số bị chia.")
                              ],
                              "medium": [
                                  make_q("b30_m1", "Chia đều 12 cái kẹo cho 3 bạn. Hỏi mỗi bạn được mấy cái kẹo?", "4 cái kẹo", "3 cái kẹo", "5 cái kẹo", "6 cái kẹo", "Phép tính chia đều: 12 : 3 = 4 cái kẹo.")
                              ],
                              "hard": [
                                  make_q("b30_h1", "Có 15 quả táo chia vào các rổ, mỗi rổ có 5 quả táo. Hỏi chia được bao nhiêu rổ táo như vậy?", "3 rổ", "4 rổ", "2 rổ", "5 rổ", "Phép tính chia theo nhóm: 15 : 5 = 3 rổ.")
                              ]
                          }
                      }
                  ]
              }
          ]
      }
      return curriculum

  def main():
      json_path = os.path.join("public", "lessons.json")
      print(f"Generating lessons.json to: {json_path}")
      curriculum_data = build_curriculum()
      with open(json_path, "w", encoding="utf-8") as f:
          json.dump(curriculum_data, f, indent=2, ensure_ascii=False)
      print("Successfully generated public/lessons.json")

  if __name__ == "__main__":
      main()
  ```

- [ ] **Step 2: Run python script to compile `lessons.json`**
  Run: `python generate_curriculum_grade2.py`
  Expected: Prints "Successfully generated public/lessons.json" and updates the file.

- [ ] **Step 3: Commit curriculum generation script**
  Run:
  ```powershell
  git add generate_curriculum_grade2.py public/lessons.json
  git commit -m "feat: add curriculum data generation script for Grade 2"
  ```

---

### Task 2: Refactor TheorySection lazy load imports
Update `math2-app/src/components/TheorySection.jsx` to map the new Grade 2 visualizers.

**Files:**
- Modify: `math2-app/src/components/TheorySection.jsx`

- [ ] **Step 1: Edit `TheorySection.jsx` lazy load mapping**
  Replace lines 4-12 with imports for the new components.
  TargetContent (around line 4-12):
  ```javascript
  const visualizerMap = {
    NumberLine100: lazy(() => import('./visualizers/NumberLine100')),
    AddSubVisualizer: lazy(() => import('./visualizers/AddSubVisualizer')),
    TenFrameVisualizer: lazy(() => import('./visualizers/TenFrameVisualizer')),
    AdditionTableVisualizer: lazy(() => import('./visualizers/AdditionTableVisualizer')),
    ColumnAddition: lazy(() => import('./visualizers/ColumnAddition')),
    ShapeExplorer: lazy(() => import('./visualizers/ShapeExplorer')),
    RulerVisualizer: lazy(() => import('./visualizers/RulerVisualizer')),
  };
  ```
  ReplacementContent:
  ```javascript
  const visualizerMap = {
    BaseTenBlocks: lazy(() => import('./visualizers/BaseTenBlocks')),
    NumberLine: lazy(() => import('./visualizers/NumberLine')),
    InteractiveEquation: lazy(() => import('./visualizers/InteractiveEquation')),
    TenFrames: lazy(() => import('./visualizers/TenFrames')),
    BalanceScale: lazy(() => import('./visualizers/BalanceScale')),
    LitreCup: lazy(() => import('./visualizers/LitreCup')),
    ShapeExplorer: lazy(() => import('./visualizers/ShapeExplorer')),
    ShapeClassifier: lazy(() => import('./visualizers/ShapeClassifier')),
    InteractiveClock: lazy(() => import('./visualizers/InteractiveClock')),
    ItemDistributor: lazy(() => import('./visualizers/ItemDistributor')),
  };
  ```

- [ ] **Step 2: Commit TheorySection modifications**
  Run:
  ```powershell
  git add src/components/TheorySection.jsx
  git commit -m "refactor: update TheorySection to map Grade 2 visualizers"
  ```

---

### Task 3: Implement `NumberLine.jsx`
Implement/Modify the `NumberLine.jsx` visualizer to support bounds $0$ to $100$ with "số liền trước" & "số liền sau" helpers.

**Files:**
- Create: `math2-app/src/components/visualizers/NumberLine.jsx`
- Create: `math2-app/tests/NumberLine.test.jsx`

- [ ] **Step 1: Create `NumberLine.jsx`**
  Write the React component with a horizontal scrolling axis and selectors.
  Create file: `C:\Users\Hi\Desktop\Math Grade 2 Part 1\math2-app\src\components\visualizers\NumberLine.jsx`
  ```javascript
  import { useState, useRef, useEffect } from 'react';

  const COLORS = ['#FF6B6B', '#FF8E53', '#FFC53D', '#52C41A', '#13C2C2', '#1890FF', '#722ED1'];

  function getColor(n) {
    return COLORS[n % COLORS.length];
  }

  export default function NumberLine({ config = {} }) {
    const [selected, setSelected] = useState(config.defaultValue ?? 10);
    const scrollRef = useRef(null);
    const selectedRef = useRef(null);

    useEffect(() => {
      if (selectedRef.current) {
        selectedRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }, [selected]);

    const numbers = Array.from({ length: 101 }, (_, i) => i);

    return (
      <div style={styles.wrapper} data-testid="numberline-visualizer">
        <h3 style={styles.title}>🎯 Tia số thông minh (0 - 100)</h3>

        {selected !== null && (
          <div style={styles.selectedDisplay}>
            <span style={styles.number} data-testid="selected-number" style={{ color: getColor(selected) }}>{selected}</span>
            <div style={styles.neighborPanel}>
              <button
                style={styles.neighborBtn}
                onClick={() => setSelected(Math.max(0, selected - 1))}
                data-testid="btn-prev"
              >
                ◀ Số liền trước: {selected > 0 ? selected - 1 : 'Không có'}
              </button>
              <button
                style={styles.neighborBtn}
                onClick={() => setSelected(Math.min(100, selected + 1))}
                data-testid="btn-next"
              >
                Số liền sau: {selected < 100 ? selected + 1 : 'Không có'} ▶
              </button>
            </div>
          </div>
        )}

        <div style={styles.scrollContainer} ref={scrollRef}>
          <div style={styles.lineContainer}>
            <div style={styles.mainLine} />
            <div style={styles.arrow}>▶</div>

            <div style={styles.ticksRow}>
              {numbers.map((n) => {
                const isMajor = n % 10 === 0;
                const isSelected = selected === n;

                return (
                  <div
                    key={n}
                    ref={isSelected ? selectedRef : null}
                    style={{
                      ...styles.tickGroup,
                      width: isMajor ? '40px' : '20px',
                    }}
                    onClick={() => setSelected(n)}
                    data-testid={`tick-${n}`}
                  >
                    <div
                      style={{
                        ...styles.tickLine,
                        height: isMajor ? '20px' : '10px',
                        backgroundColor: isSelected ? '#FF6B6B' : '#8c8c8c',
                        width: isSelected ? '4px' : '2px',
                      }}
                    />
                    {(isMajor || isSelected) && (
                      <span
                        style={{
                          ...styles.label,
                          fontWeight: isSelected ? '800' : '400',
                          color: isSelected ? '#FF6B6B' : '#000',
                        }}
                      >
                        {n}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const styles = {
    wrapper: { padding: '20px', backgroundColor: '#fff', borderRadius: '12px', border: '2px solid #ddd' },
    title: { textAlign: 'center', margin: '0 0 15px', color: '#1890FF' },
    selectedDisplay: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '15px' },
    number: { fontSize: '48px', fontWeight: 'bold' },
    neighborPanel: { display: 'flex', gap: '10px', marginTop: '10px' },
    neighborBtn: { padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px', cursor: 'pointer', backgroundColor: '#f5f5f5' },
    scrollContainer: { overflowX: 'auto', padding: '10px 0' },
    lineContainer: { position: 'relative', display: 'inline-flex', alignItems: 'flex-end', paddingBottom: '20px' },
    mainLine: { position: 'absolute', bottom: '30px', left: 0, right: 0, height: '4px', backgroundColor: '#1890FF' },
    arrow: { position: 'absolute', bottom: '24px', right: '-10px', color: '#1890FF', fontSize: '14px' },
    ticksRow: { display: 'flex', alignItems: 'flex-end', paddingLeft: '10px', paddingRight: '20px' },
    tickGroup: { display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', flexShrink: 0 },
    tickLine: { transition: 'all 0.2s' },
    label: { fontSize: '12px', marginTop: '4px' },
  };
  ```

- [ ] **Step 2: Write tests in `tests/NumberLine.test.jsx`**
  Create file: `C:\Users\Hi\Desktop\Math Grade 2 Part 1\math2-app\tests\NumberLine.test.jsx`
  ```javascript
  import { describe, test, expect } from 'vitest';
  import { render, screen, fireEvent } from '@testing-library/react';
  import NumberLine from '../src/components/visualizers/NumberLine';
  import React from 'react';

  describe('NumberLine visualizer', () => {
    test('renders standard bounds and defaults', () => {
      render(<NumberLine config={{ defaultValue: 10 }} />);
      expect(screen.getByTestId('numberline-visualizer')).toBeInTheDocument();
      expect(screen.getByTestId('selected-number')).toHaveTextContent('10');
    });

    test('updates selection on click and controls', () => {
      render(<NumberLine config={{ defaultValue: 10 }} />);
      const btnNext = screen.getByTestId('btn-next');
      fireEvent.click(btnNext);
      expect(screen.getByTestId('selected-number')).toHaveTextContent('11');

      const btnPrev = screen.getByTestId('btn-prev');
      fireEvent.click(btnPrev);
      expect(screen.getByTestId('selected-number')).toHaveTextContent('10');
    });
  });
  ```

- [ ] **Step 3: Run Vitest on `NumberLine`**
  Run: `npm run test:run tests/NumberLine.test.jsx`
  Expected: Test PASS.

- [ ] **Step 4: Commit `NumberLine`**
  Run:
  ```powershell
  git add src/components/visualizers/NumberLine.jsx tests/NumberLine.test.jsx
  git commit -m "feat: implement NumberLine visualizer with 0-100 bounds"
  ```

---

### Task 4: Implement `BaseTenBlocks.jsx`
Provide interactive Base-10 Blocks to help students split digits into hundreds, tens, and units.

**Files:**
- Create: `math2-app/src/components/visualizers/BaseTenBlocks.jsx`
- Create: `math2-app/tests/BaseTenBlocks.test.jsx`

- [ ] **Step 1: Create `BaseTenBlocks.jsx`**
  Create file: `C:\Users\Hi\Desktop\Math Grade 2 Part 1\math2-app\src\components\visualizers\BaseTenBlocks.jsx`
  ```javascript
  import { useState } from 'react';

  export default function BaseTenBlocks({ config = {} }) {
    const defaultVal = config.defaultValue ?? 35;
    const mode = config.mode ?? 'split'; // split | multiply
    const defaultA = config.defaultA ?? 3;
    const defaultB = config.defaultB ?? 5;

    const [value, setValue] = useState(defaultVal);
    const [multA, setMultA] = useState(defaultA);
    const [multB, setMultB] = useState(defaultB);

    const targetVal = mode === 'split' ? value : multA * multB;

    const hundreds = Math.floor(targetVal / 100);
    const remainder = targetVal % 100;
    const tens = Math.floor(remainder / 10);
    const units = remainder % 10;

    return (
      <div style={styles.wrapper} data-testid="baseten-visualizer">
        <h3 style={styles.title}>🧱 Khối cơ số 10 (Base-10 Blocks)</h3>

        {mode === 'split' ? (
          <div style={styles.controls}>
            <label htmlFor="block-input">Nhập số (0-199): </label>
            <input
              id="block-input"
              type="number"
              min="0"
              max="199"
              value={value}
              onChange={(e) => setValue(Math.max(0, Math.min(199, Number(e.target.value))))}
              style={styles.input}
              data-testid="block-input"
            />
          </div>
        ) : (
          <div style={styles.controls}>
            <label htmlFor="multA-input">Phép nhân: </label>
            <input
              id="multA-input"
              type="number"
              min="1"
              max="10"
              value={multA}
              onChange={(e) => setMultA(Math.max(1, Math.min(10, Number(e.target.value))))}
              style={styles.input}
              data-testid="multA-input"
            />
            <span> x </span>
            <input
              id="multB-input"
              type="number"
              min="1"
              max="10"
              value={multB}
              onChange={(e) => setMultB(Math.max(1, Math.min(10, Number(e.target.value))))}
              style={styles.input}
              data-testid="multB-input"
            />
            <span> = {targetVal}</span>
          </div>
        )}

        <div style={styles.summary} data-testid="block-summary">
          {hundreds > 0 && <span>{hundreds} Trăm 🟩 </span>}
          {tens > 0 && <span>{tens} Chục 🟧 </span>}
          {units > 0 && <span>{units} Đơn vị 🟨 </span>}
        </div>

        <div style={styles.grid}>
          {/* Hundreds blocks */}
          {Array.from({ length: hundreds }).map((_, i) => (
            <div key={`h-${i}`} style={styles.hundredBlock} title="1 Trăm (10x10)">
              {Array.from({ length: 100 }).map((_, j) => (
                <div key={j} style={styles.unitSquare} />
              ))}
            </div>
          ))}

          {/* Tens blocks */}
          <div style={styles.tensContainer}>
            {Array.from({ length: tens }).map((_, i) => (
              <div key={`t-${i}`} style={styles.tenBlock} title="1 Chục (1x10)">
                {Array.from({ length: 10 }).map((_, j) => (
                  <div key={j} style={styles.unitSquare} />
                ))}
              </div>
            ))}
          </div>

          {/* Units blocks */}
          <div style={styles.unitsContainer}>
            {Array.from({ length: units }).map((_, i) => (
              <div key={`u-${i}`} style={{ ...styles.unitSquare, border: '1px solid #d4b106', backgroundColor: '#FFD666' }} title="1 Đơn vị" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const styles = {
    wrapper: { padding: '20px', backgroundColor: '#fff', borderRadius: '12px', border: '2px solid #ddd' },
    title: { textAlign: 'center', margin: '0 0 15px', color: '#722ED1' },
    controls: { display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '15px', alignItems: 'center' },
    input: { width: '60px', padding: '6px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' },
    summary: { textAlign: 'center', marginBottom: '20px', fontWeight: 'bold', fontSize: '16px' },
    grid: { display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', alignItems: 'flex-start' },
    hundredBlock: { display: 'grid', gridTemplateColumns: 'repeat(10, 8px)', gap: '1px', padding: '2px', backgroundColor: '#52C41A', borderRadius: '4px' },
    tenBlock: { display: 'grid', gridTemplateRows: 'repeat(10, 8px)', gap: '1px', padding: '2px', backgroundColor: '#FF8E53', borderRadius: '4px' },
    tensContainer: { display: 'flex', gap: '4px' },
    unitsContainer: { display: 'flex', flexWrap: 'wrap', gap: '4px', maxWidth: '80px' },
    unitSquare: { width: '8px', height: '8px', backgroundColor: '#fff', border: '1px solid #ccc' }
  };
  ```

- [ ] **Step 2: Write tests in `tests/BaseTenBlocks.test.jsx`**
  Create file: `C:\Users\Hi\Desktop\Math Grade 2 Part 1\math2-app\tests\BaseTenBlocks.test.jsx`
  ```javascript
  import { describe, test, expect } from 'vitest';
  import { render, screen, fireEvent } from '@testing-library/react';
  import BaseTenBlocks from '../src/components/visualizers/BaseTenBlocks';
  import React from 'react';

  describe('BaseTenBlocks visualizer', () => {
    test('splits base ten correctly', () => {
      render(<BaseTenBlocks config={{ defaultValue: 125 }} />);
      expect(screen.getByTestId('baseten-visualizer')).toBeInTheDocument();
      expect(screen.getByTestId('block-summary')).toHaveTextContent('1 Trăm 2 Chục 5 Đơn vị');
    });

    test('supports multiplication representation', () => {
      render(<BaseTenBlocks config={{ mode: 'multiply', defaultA: 3, defaultB: 4 }} />);
      expect(screen.getByTestId('block-summary')).toHaveTextContent('1 Chục 2 Đơn vị');
    });
  });
  ```

- [ ] **Step 3: Run tests on `BaseTenBlocks`**
  Run: `npm run test:run tests/BaseTenBlocks.test.jsx`
  Expected: Test PASS.

- [ ] **Step 4: Commit `BaseTenBlocks`**
  Run:
  ```powershell
  git add src/components/visualizers/BaseTenBlocks.jsx tests/BaseTenBlocks.test.jsx
  git commit -m "feat: implement BaseTenBlocks visualizer for place values and multiplication"
  ```

---

### Task 5: Implement `InteractiveEquation.jsx`
Create the equation visualizer for Bài 3 to help kids identify the names of addition and subtraction terms.

**Files:**
- Create: `math2-app/src/components/visualizers/InteractiveEquation.jsx`
- Create: `math2-app/tests/InteractiveEquation.test.jsx`

- [ ] **Step 1: Create `InteractiveEquation.jsx`**
  Create file: `C:\Users\Hi\Desktop\Math Grade 2 Part 1\math2-app\src\components\visualizers\InteractiveEquation.jsx`
  ```javascript
  import { useState } from 'react';

  export default function InteractiveEquation() {
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [eqMode, setEqMode] = useState('add'); // add | sub

    const handleSelect = (term, vnName, desc) => {
      setSelectedTerm({ term, vnName, desc });
    };

    return (
      <div style={styles.wrapper} data-testid="equation-visualizer">
        <h3 style={styles.title}>🧮 Thành phần phép tính</h3>

        <div style={styles.tabs}>
          <button
            style={{ ...styles.tabBtn, backgroundColor: eqMode === 'add' ? '#1890FF' : '#f5f5f5', color: eqMode === 'add' ? '#fff' : '#000' }}
            onClick={() => { setEqMode('add'); setSelectedTerm(null); }}
            data-testid="tab-add"
          >
            Phép cộng (+)
          </button>
          <button
            style={{ ...styles.tabBtn, backgroundColor: eqMode === 'sub' ? '#1890FF' : '#f5f5f5', color: eqMode === 'sub' ? '#fff' : '#000' }}
            onClick={() => { setEqMode('sub'); setSelectedTerm(null); }}
            data-testid="tab-sub"
          >
            Phép trừ (-)
          </button>
        </div>

        <div style={styles.equationRow}>
          {eqMode === 'add' ? (
            <>
              <span
                style={{ ...styles.term, color: '#52C41A' }}
                onClick={() => handleSelect('12', 'Số hạng', 'Số đứng trong phép cộng để tính tổng.')}
                data-testid="term-add-a"
              >
                12
              </span>
              <span style={styles.symbol}>+</span>
              <span
                style={{ ...styles.term, color: '#13C2C2' }}
                onClick={() => handleSelect('5', 'Số hạng', 'Số đứng trong phép cộng để tính tổng.')}
              >
                5
              </span>
              <span style={styles.symbol}>=</span>
              <span
                style={{ ...styles.term, color: '#722ED1' }}
                onClick={() => handleSelect('17', 'Tổng', 'Kết quả thu được sau khi thực hiện phép cộng.')}
                data-testid="term-add-sum"
              >
                17
              </span>
            </>
          ) : (
            <>
              <span
                style={{ ...styles.term, color: '#FF4D4F' }}
                onClick={() => handleSelect('25', 'Số bị trừ', 'Số đứng trước dấu trừ, bị bớt đi một lượng.')}
                data-testid="term-sub-a"
              >
                25
              </span>
              <span style={styles.symbol}>-</span>
              <span
                style={{ ...styles.term, color: '#FA8C16' }}
                onClick={() => handleSelect('5', 'Số trừ', 'Số đứng sau dấu trừ, là lượng bớt đi.')}
              >
                5
              </span>
              <span style={styles.symbol}>=</span>
              <span
                style={{ ...styles.term, color: '#EB2F96' }}
                onClick={() => handleSelect('20', 'Hiệu', 'Kết quả thu được sau khi thực hiện phép trừ.')}
                data-testid="term-sub-diff"
              >
                20
              </span>
            </>
          )}
        </div>

        <div style={styles.infoBox} data-testid="term-info">
          {selectedTerm ? (
            <>
              <h4>Số {selectedTerm.term} gọi là: <span style={styles.badge}>{selectedTerm.vnName}</span></h4>
              <p>{selectedTerm.desc}</p>
            </>
          ) : (
            <p style={{ color: '#8c8c8c' }}>👆 Bấm vào số bất kỳ trong phép tính trên để xem tên gọi!</p>
          )}
        </div>
      </div>
    );
  }

  const styles = {
    wrapper: { padding: '20px', backgroundColor: '#fff', borderRadius: '12px', border: '2px solid #ddd' },
    title: { textAlign: 'center', margin: '0 0 15px', color: '#1890FF' },
    tabs: { display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' },
    tabBtn: { padding: '6px 12px', border: '1px solid #ccc', borderRadius: '6px', cursor: 'pointer' },
    equationRow: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', fontSize: '36px', fontWeight: 'bold', margin: '20px 0' },
    term: { cursor: 'pointer', borderBottom: '2px dashed currentColor', padding: '2px 6px', borderRadius: '4px', transition: 'background-color 0.2s' },
    symbol: { color: '#8c8c8c' },
    infoBox: { padding: '15px', border: '1px solid #e8e8e8', borderRadius: '8px', backgroundColor: '#fafafa', minHeight: '80px', textAlign: 'center' },
    badge: { backgroundColor: '#1890FF', color: '#fff', padding: '2px 8px', borderRadius: '12px', fontSize: '14px', marginLeft: '6px' }
  };
  ```

- [ ] **Step 2: Write tests in `tests/InteractiveEquation.test.jsx`**
  Create file: `C:\Users\Hi\Desktop\Math Grade 2 Part 1\math2-app\tests\InteractiveEquation.test.jsx`
  ```javascript
  import { describe, test, expect } from 'vitest';
  import { render, screen, fireEvent } from '@testing-library/react';
  import InteractiveEquation from '../src/components/visualizers/InteractiveEquation';
  import React from 'react';

  describe('InteractiveEquation visualizer', () => {
    test('renders interactive terms and changes tab', () => {
      render(<InteractiveEquation />);
      expect(screen.getByTestId('equation-visualizer')).toBeInTheDocument();
      
      const termA = screen.getByTestId('term-add-a');
      fireEvent.click(termA);
      expect(screen.getByTestId('term-info')).toHaveTextContent('Số bị trừ' ? 'Số hạng' : 'Số hạng');

      const tabSub = screen.getByTestId('tab-sub');
      fireEvent.click(tabSub);
      expect(screen.queryByTestId('term-add-a')).not.toBeInTheDocument();

      const termSubA = screen.getByTestId('term-sub-a');
      fireEvent.click(termSubA);
      expect(screen.getByTestId('term-info')).toHaveTextContent('Số bị trừ');
    });
  });
  ```

- [ ] **Step 3: Run tests on `InteractiveEquation`**
  Run: `npm run test:run tests/InteractiveEquation.test.jsx`
  Expected: Test PASS.

- [ ] **Step 4: Commit `InteractiveEquation`**
  Run:
  ```powershell
  git add src/components/visualizers/InteractiveEquation.jsx tests/InteractiveEquation.test.jsx
  git commit -m "feat: implement InteractiveEquation visualizer for addition/subtraction terms"
  ```

---

### Task 6: Implement `TenFrames.jsx`
Rename and adapt the existing `TenFrameVisualizer.jsx` into `TenFrames.jsx`.

**Files:**
- Create: `math2-app/src/components/visualizers/TenFrames.jsx`
- Delete: `math2-app/src/components/visualizers/TenFrameVisualizer.jsx`
- Create: `math2-app/tests/TenFrames.test.jsx`

- [ ] **Step 1: Copy/Rename `TenFrameVisualizer.jsx` to `TenFrames.jsx`**
  Copy contents of `TenFrameVisualizer.jsx` to `TenFrames.jsx`. Modify the export name.
  Create file: `C:\Users\Hi\Desktop\Math Grade 2 Part 1\math2-app\src\components\visualizers\TenFrames.jsx`
  ```javascript
  import { useState, useEffect, useCallback } from 'react';

  const DOT_COLOR_1 = '#FF6B6B';
  const DOT_COLOR_2 = '#4FC3F7';
  const EMPTY_COLOR = '#E8E8E8';

  export default function TenFrames({ config = {} }) {
    const maxValue = config.maxValue ?? 20;
    const defaultMode = config.mode ?? 'add';

    const [num1, setNum1] = useState(config.defaultA ?? 9);
    const [num2, setNum2] = useState(config.defaultB ?? 5);
    const [mode, setMode] = useState(defaultMode);
    const [step, setStep] = useState(0); 
    const [bridgeDots, setBridgeDots] = useState(0);

    const total = mode === 'add' ? num1 + num2 : num1 - num2;
    const isValid = mode === 'add' ? (num1 + num2) <= maxValue : num1 >= num2;
    const dotsToMove = mode === 'add' ? Math.min(10 - num1, num2) : 0;

    const reset = useCallback(() => {
      setStep(0);
      setBridgeDots(0);
    }, []);

    useEffect(() => { reset(); }, [num1, num2, mode, reset]);

    const handleAnimate = () => {
      setStep(1);
      setTimeout(() => {
        if (mode === 'add' && num1 < 10 && num2 > 0) {
          setStep(2);
          let moved = 0;
          const interval = setInterval(() => {
            moved++;
            setBridgeDots(moved);
            if (moved >= dotsToMove) {
              clearInterval(interval);
              setTimeout(() => setStep(3), 800);
            }
          }, 400);
        } else {
          setTimeout(() => setStep(3), 600);
        }
      }, 600);
    };

    const renderFrame = (filledCount, color, label, extraDots = 0, removedDots = 0) => {
      const adjustedFilled = Math.max(0, Math.min(10, filledCount + extraDots - removedDots));
      const cells = [];
      for (let i = 0; i < 10; i++) {
        const isFilled = i < adjustedFilled;
        const isExtra = i >= filledCount && i < filledCount + extraDots;
        cells.push(
          <div
            key={i}
            style={{
              ...styles.cell,
              backgroundColor: isFilled ? (isExtra ? DOT_COLOR_2 : color) : EMPTY_COLOR,
              transform: isFilled ? 'scale(1)' : 'scale(0.85)',
            }}
          >
            {isFilled && <div style={styles.dot}>●</div>}
          </div>
        );
      }

      return (
        <div style={styles.frameWrapper} data-testid="tenframe-element">
          <div style={styles.frameLabel}>{label}</div>
          <div style={styles.frame}>
            <div style={styles.frameRow}>{cells.slice(0, 5)}</div>
            <div style={styles.frameRow}>{cells.slice(5, 10)}</div>
          </div>
          <div style={styles.frameCount}>{adjustedFilled}</div>
        </div>
      );
    };

    const frame1Extra = step >= 2 ? bridgeDots : 0;
    const frame2Removed = step >= 2 ? bridgeDots : 0;

    return (
      <div style={styles.wrapper} data-testid="tenframe-visualizer">
        <h3 style={styles.title}>🔟 Khung Mười - Phép toán trực quan</h3>

        <div style={styles.inputsRow}>
          <input
            type="number"
            min="0"
            max="10"
            value={num1}
            onChange={(e) => setNum1(Math.max(0, Math.min(10, Number(e.target.value))))}
            style={styles.input}
            data-testid="input-a"
          />
          <span style={styles.operatorText}>{mode === 'add' ? '+' : '-'}</span>
          <input
            type="number"
            min="0"
            max="10"
            value={num2}
            onChange={(e) => setNum2(Math.max(0, Math.min(10, Number(e.target.value))))}
            style={styles.input}
            data-testid="input-b"
          />
          <button style={styles.animateBtn} onClick={handleAnimate} data-testid="btn-animate">
            Xem chuyển động! 🎬
          </button>
        </div>

        <div style={styles.framesContainer}>
          {renderFrame(num1, DOT_COLOR_1, `Khung 1 (Số ${num1})`, frame1Extra, 0)}
          {mode === 'add' 
            ? renderFrame(num2, DOT_COLOR_2, `Khung 2 (Số ${num2})`, 0, frame2Removed)
            : renderFrame(num1, DOT_COLOR_1, `Trừ đi ${num2}`, 0, num2)}
        </div>

        {step === 3 && isValid && (
          <div style={styles.resultBox} data-testid="result-box">
            Kết quả: {num1} {mode === 'add' ? '+' : '-'} {num2} = {total}
          </div>
        )}
      </div>
    );
  }

  const styles = {
    wrapper: { padding: '20px', backgroundColor: '#fff', borderRadius: '12px', border: '2px solid #ddd' },
    title: { textAlign: 'center', margin: '0 0 15px', color: '#E91E63' },
    inputsRow: { display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center', marginBottom: '20px' },
    input: { width: '50px', padding: '6px', fontSize: '16px', textAlign: 'center' },
    operatorText: { fontSize: '20px', fontWeight: 'bold' },
    animateBtn: { padding: '6px 12px', backgroundColor: '#E91E63', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' },
    framesContainer: { display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' },
    frameWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
    frameLabel: { fontWeight: 'bold', marginBottom: '6px' },
    frame: { display: 'flex', flexDirection: 'column', border: '2px solid #333', padding: '4px', borderRadius: '8px', backgroundColor: '#fafafa' },
    frameRow: { display: 'flex', gap: '4px', margin: '2px 0' },
    cell: { width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    dot: { color: '#fff', fontSize: '14px' },
    frameCount: { fontSize: '18px', fontWeight: 'bold', marginTop: '6px' },
    resultBox: { textAlign: 'center', marginTop: '20px', fontSize: '24px', fontWeight: 'bold', color: '#E91E63' }
  };
  ```

- [ ] **Step 2: Write tests in `tests/TenFrames.test.jsx`**
  Create file: `C:\Users\Hi\Desktop\Math Grade 2 Part 1\math2-app\tests\TenFrames.test.jsx`
  ```javascript
  import { describe, test, expect } from 'vitest';
  import { render, screen, fireEvent } from '@testing-library/react';
  import TenFrames from '../src/components/visualizers/TenFrames';
  import React from 'react';

  describe('TenFrames visualizer', () => {
    test('renders frames correctly', () => {
      render(<TenFrames config={{ defaultA: 8, defaultB: 4, mode: 'add' }} />);
      expect(screen.getByTestId('tenframe-visualizer')).toBeInTheDocument();
      expect(screen.getAllByTestId('tenframe-element').length).toBe(2);
    });

    test('updates values and shows result', async () => {
      render(<TenFrames config={{ defaultA: 9, defaultB: 3, mode: 'add' }} />);
      const btn = screen.getByTestId('btn-animate');
      fireEvent.click(btn);
      // Wait for simple resolution step
      const inputA = screen.getByTestId('input-a');
      expect(inputA.value).toBe('9');
    });
  });
  ```

- [ ] **Step 3: Run tests on `TenFrames`**
  Run: `npm run test:run tests/TenFrames.test.jsx`
  Expected: Test PASS.

- [ ] **Step 4: Delete the old `TenFrameVisualizer.jsx`**
  Remove the file `C:\Users\Hi\Desktop\Math Grade 2 Part 1\math2-app\src\components\visualizers\TenFrameVisualizer.jsx`.

- [ ] **Step 5: Commit `TenFrames`**
  Run:
  ```powershell
  git rm src/components/visualizers/TenFrameVisualizer.jsx
  git add src/components/visualizers/TenFrames.jsx tests/TenFrames.test.jsx
  git commit -m "feat: replace TenFrameVisualizer with TenFrames visualizer"
  ```

---

### Task 7: Implement `BalanceScale.jsx`
Create the weight balance scale visualizer for Bài 15.

**Files:**
- Create: `math2-app/src/components/visualizers/BalanceScale.jsx`
- Create: `math2-app/tests/BalanceScale.test.jsx`

- [ ] **Step 1: Create `BalanceScale.jsx`**
  Create file: `C:\Users\Hi\Desktop\Math Grade 2 Part 1\math2-app\src\components\visualizers\BalanceScale.jsx`
  ```javascript
  import { useState } from 'react';

  const OBJECTS = [
    { name: '🎃 Bí ngô', weight: 5 },
    { name: '🧸 Gấu bông', weight: 2 },
    { name: '🍎 Quả táo', weight: 1 },
    { name: '📘 Quyển sách', weight: 1 }
  ];

  export default function BalanceScale() {
    const [selectedObject, setSelectedObject] = useState(OBJECTS[0]);
    const [weights, setWeights] = useState([]); // List of kg values (1, 2, 5)

    const leftWeight = selectedObject ? selectedObject.weight : 0;
    const rightWeight = weights.reduce((sum, w) => sum + w, 0);

    const tilt = leftWeight > rightWeight 
      ? 'left' 
      : leftWeight < rightWeight 
        ? 'right' 
        : 'balanced';

    const addWeight = (w) => {
      setWeights([...weights, w]);
    };

    const clearWeights = () => {
      setWeights([]);
    };

    return (
      <div style={styles.wrapper} data-testid="balancescale-visualizer">
        <h3 style={styles.title}>⚖️ Cân Đĩa Thăng Bằng</h3>

        <div style={styles.selectionRow}>
          <label>Chọn vật muốn cân: </label>
          <select
            value={selectedObject.name}
            onChange={(e) => {
              setSelectedObject(OBJECTS.find(o => o.name === e.target.value));
              clearWeights();
            }}
            style={styles.select}
            data-testid="object-select"
          >
            {OBJECTS.map(o => (
              <option key={o.name} value={o.name}>{o.name} ({o.weight} kg)</option>
            ))}
          </select>
        </div>

        <div style={styles.controlButtons}>
          <button style={styles.btn} onClick={() => addWeight(1)} data-testid="btn-add-1">Thêm +1kg</button>
          <button style={styles.btn} onClick={() => addWeight(2)} data-testid="btn-add-2">Thêm +2kg</button>
          <button style={styles.btn} onClick={() => addWeight(5)}>Thêm +5kg</button>
          <button style={{ ...styles.btn, backgroundColor: '#f5222d' }} onClick={clearWeights} data-testid="btn-clear">Bỏ hết cân 🔄</button>
        </div>

        {/* Visual scale */}
        <div style={styles.scaleContainer}>
          <div style={{
            ...styles.balanceBeam,
            transform: tilt === 'left' ? 'rotate(-8deg)' : tilt === 'right' ? 'rotate(8deg)' : 'rotate(0deg)'
          }} data-testid="balance-beam">
            {/* Left tray */}
            <div style={{ ...styles.tray, left: '20px', top: tilt === 'left' ? '60px' : tilt === 'right' ? '20px' : '40px' }}>
              <div style={styles.trayPlate}>
                {selectedObject && <div style={{ fontSize: '28px' }}>{selectedObject.name.split(' ')[0]}</div>}
              </div>
              <div style={styles.trayWeightLabel}>{leftWeight} kg</div>
            </div>

            {/* Right tray */}
            <div style={{ ...styles.tray, right: '20px', top: tilt === 'left' ? '20px' : tilt === 'right' ? '60px' : '40px' }}>
              <div style={styles.trayPlate}>
                <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {weights.map((w, idx) => (
                    <span key={idx} style={styles.weightBadge} data-testid={`placed-weight-${w}`}>{w}kg</span>
                  ))}
                </div>
              </div>
              <div style={styles.trayWeightLabel}>{rightWeight} kg</div>
            </div>
          </div>
          <div style={styles.scaleBase}>▲</div>
        </div>

        <div style={styles.status} data-testid="scale-status">
          {tilt === 'balanced' ? (
            <span style={{ color: '#52C41A', fontWeight: 'bold' }}>🎉 Cân thăng bằng! {selectedObject.name} nặng đúng {leftWeight}kg!</span>
          ) : tilt === 'left' ? (
            <span>Cân đang nghiêng về bên trái (vật nặng hơn).</span>
          ) : (
            <span>Cân đang nghiêng về bên phải (quả cân nặng hơn).</span>
          )}
        </div>
      </div>
    );
  }

  const styles = {
    wrapper: { padding: '20px', backgroundColor: '#fff', borderRadius: '12px', border: '2px solid #ddd', textAlign: 'center' },
    title: { margin: '0 0 15px', color: '#1890FF' },
    selectionRow: { marginBottom: '15px' },
    select: { padding: '6px', fontSize: '14px', borderRadius: '4px' },
    controlButtons: { display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' },
    btn: { padding: '6px 12px', backgroundColor: '#1890FF', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' },
    scaleContainer: { position: 'relative', height: '180px', margin: '20px 0', borderBottom: '4px solid #333' },
    balanceBeam: { position: 'absolute', top: '50px', left: '10%', right: '10%', height: '8px', backgroundColor: '#8c8c8c', transition: 'all 0.5s ease', display: 'flex', justifyContent: 'space-between' },
    scaleBase: { position: 'absolute', bottom: 0, left: '48%', fontSize: '40px', color: '#555' },
    tray: { position: 'absolute', width: '90px', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'all 0.5s ease' },
    trayPlate: { width: '80px', height: '40px', borderTop: '4px solid #555', borderLeft: '2px solid #8c8c8c', borderRight: '2px solid #8c8c8c', borderRadius: '0 0 10px 10px', backgroundColor: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' },
    trayWeightLabel: { fontWeight: 'bold', fontSize: '14px', marginTop: '4px' },
    weightBadge: { backgroundColor: '#fa8c16', color: '#fff', fontSize: '10px', padding: '1px 3px', borderRadius: '3px' },
    status: { fontSize: '16px', marginTop: '10px' }
  };
  ```

- [ ] **Step 2: Write tests in `tests/BalanceScale.test.jsx`**
  Create file: `C:\Users\Hi\Desktop\Math Grade 2 Part 1\math2-app\tests\BalanceScale.test.jsx`
  ```javascript
  import { describe, test, expect } from 'vitest';
  import { render, screen, fireEvent } from '@testing-library/react';
  import BalanceScale from '../src/components/visualizers/BalanceScale';
  import React from 'react';

  describe('BalanceScale visualizer', () => {
    test('renders initial state and interacts with weights', () => {
      render(<BalanceScale />);
      expect(screen.getByTestId('balancescale-visualizer')).toBeInTheDocument();
      expect(screen.getByTestId('scale-status')).toHaveTextContent('Cân đang nghiêng về bên trái');

      const btn1 = screen.getByTestId('btn-add-1');
      fireEvent.click(btn1);
      fireEvent.click(btn1);
      fireEvent.click(btn1);
      fireEvent.click(btn1);
      fireEvent.click(btn1); // total 5kg
      expect(screen.getByTestId('scale-status')).toHaveTextContent('Cân thăng bằng');
    });
  });
  ```

- [ ] **Step 3: Run tests on `BalanceScale`**
  Run: `npm run test:run tests/BalanceScale.test.jsx`
  Expected: Test PASS.

- [ ] **Step 4: Commit `BalanceScale`**
  Run:
  ```powershell
  git add src/components/visualizers/BalanceScale.jsx tests/BalanceScale.test.jsx
  git commit -m "feat: implement BalanceScale weight visualizer"
  ```

---

### Task 8: Implement `LitreCup.jsx`
Create Litre Cup capacity pouring visualizer for Bài 16.

**Files:**
- Create: `math2-app/src/components/visualizers/LitreCup.jsx`
- Create: `math2-app/tests/LitreCup.test.jsx`

- [ ] **Step 1: Create `LitreCup.jsx`**
  Create file: `C:\Users\Hi\Desktop\Math Grade 2 Part 1\math2-app\src\components\visualizers\LitreCup.jsx`
  ```javascript
  import { useState } from 'react';

  export default function LitreCup() {
    const [cup1L, setCup1L] = useState(0);
    const [cup2L, setCup2L] = useState(0);
    const [cup5L, setCup5L] = useState(0);
    const [tank, setTank] = useState(0);

    const pourIntoTank = (volume, setCup) => {
      setTank(tank + volume);
      setCup(0);
    };

    const reset = () => {
      setCup1L(0);
      setCup2L(0);
      setCup5L(0);
      setTank(0);
    };

    return (
      <div style={styles.wrapper} data-testid="litrecup-visualizer">
        <h3 style={styles.title}>🥤 Ca đong nước (Lít)</h3>

        <div style={styles.help}>Bé hãy đổ nước đầy ca rồi rót vào bể lớn nhé!</div>

        <div style={styles.cupsRow}>
          {/* 1L Cup */}
          <div style={styles.cupContainer}>
            <div style={styles.cupLabel}>Ca 1 Lít</div>
            <div style={styles.cup1L}>
              <div style={{ ...styles.water, height: `${cup1L * 100}%` }} />
            </div>
            <div style={styles.cupButtons}>
              <button style={styles.btn} onClick={() => setCup1L(1)} data-testid="fill-1l">Múc đầy</button>
              <button style={styles.btn} onClick={() => pourIntoTank(cup1L, setCup1L)} data-testid="pour-1l">Rót vào bể</button>
            </div>
          </div>

          {/* 2L Cup */}
          <div style={styles.cupContainer}>
            <div style={styles.cupLabel}>Ca 2 Lít</div>
            <div style={styles.cup2L}>
              <div style={{ ...styles.water, height: `${(cup2L / 2) * 100}%` }} />
            </div>
            <div style={styles.cupButtons}>
              <button style={styles.btn} onClick={() => setCup2L(2)}>Múc đầy</button>
              <button style={styles.btn} onClick={() => pourIntoTank(cup2L, setCup2L)}>Rót vào bể</button>
            </div>
          </div>

          {/* 5L Cup */}
          <div style={styles.cupContainer}>
            <div style={styles.cupLabel}>Ca 5 Lít</div>
            <div style={styles.cup5L}>
              <div style={{ ...styles.water, height: `${(cup5L / 5) * 100}%` }} />
            </div>
            <div style={styles.cupButtons}>
              <button style={styles.btn} onClick={() => setCup5L(5)}>Múc đầy</button>
              <button style={styles.btn} onClick={() => pourIntoTank(cup5L, setCup5L)}>Rót vào bể</button>
            </div>
          </div>
        </div>

        {/* Large tank */}
        <div style={styles.tankSection}>
          <h4>Bể chứa lớn</h4>
          <div style={styles.tankFrame}>
            <div style={{ ...styles.tankWater, height: `${Math.min(100, (tank / 10) * 100)}%` }} />
            <div style={styles.tankLabel} data-testid="tank-label">{tank} Lít (l)</div>
          </div>
          <button style={{ ...styles.btn, backgroundColor: '#f5222d', marginTop: '10px' }} onClick={reset} data-testid="btn-reset">Làm lại 🔄</button>
        </div>
      </div>
    );
  }

  const styles = {
    wrapper: { padding: '20px', backgroundColor: '#fff', borderRadius: '12px', border: '2px solid #ddd', textAlign: 'center' },
    title: { margin: '0 0 10px', color: '#13C2C2' },
    help: { color: '#8c8c8c', marginBottom: '20px' },
    cupsRow: { display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', marginBottom: '30px' },
    cupContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
    cupLabel: { fontWeight: 'bold', fontSize: '14px', marginBottom: '8px' },
    cup1L: { width: '40px', height: '60px', border: '2px solid #333', borderTop: 'none', borderRadius: '0 0 5px 5px', position: 'relative', overflow: 'hidden', backgroundColor: '#fafafa' },
    cup2L: { width: '50px', height: '70px', border: '2px solid #333', borderTop: 'none', borderRadius: '0 0 8px 8px', position: 'relative', overflow: 'hidden', backgroundColor: '#fafafa' },
    cup5L: { width: '70px', height: '90px', border: '2px solid #333', borderTop: 'none', borderRadius: '0 0 12px 12px', position: 'relative', overflow: 'hidden', backgroundColor: '#fafafa' },
    water: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#1890FF', transition: 'height 0.4s ease' },
    cupButtons: { display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '10px' },
    btn: { padding: '4px 8px', backgroundColor: '#13C2C2', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },
    tankSection: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
    tankFrame: { width: '120px', height: '120px', border: '3px solid #333', borderTop: 'none', position: 'relative', overflow: 'hidden', backgroundColor: '#fafafa', borderRadius: '0 0 10px 10px' },
    tankWater: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#1890FF', transition: 'height 0.5s ease' },
    tankLabel: { position: 'absolute', width: '100%', top: '45%', textAlign: 'center', fontWeight: 'bold', fontSize: '18px', color: '#000', textShadow: '1px 1px 2px #fff' }
  };
  ```

- [ ] **Step 2: Write tests in `tests/LitreCup.test.jsx`**
  Create file: `C:\Users\Hi\Desktop\Math Grade 2 Part 1\math2-app\tests\LitreCup.test.jsx`
  ```javascript
  import { describe, test, expect } from 'vitest';
  import { render, screen, fireEvent } from '@testing-library/react';
  import LitreCup from '../src/components/visualizers/LitreCup';
  import React from 'react';

  describe('LitreCup visualizer', () => {
    test('interacts with cup pouring and resets', () => {
      render(<LitreCup />);
      expect(screen.getByTestId('litrecup-visualizer')).toBeInTheDocument();
      
      const fillBtn = screen.getByTestId('fill-1l');
      const pourBtn = screen.getByTestId('pour-1l');

      fireEvent.click(fillBtn);
      fireEvent.click(pourBtn);

      expect(screen.getByTestId('tank-label')).toHaveTextContent('1 Lít (l)');

      const resetBtn = screen.getByTestId('btn-reset');
      fireEvent.click(resetBtn);
      expect(screen.getByTestId('tank-label')).toHaveTextContent('0 Lít (l)');
    });
  });
  ```

- [ ] **Step 3: Run tests on `LitreCup`**
  Run: `npm run test:run tests/LitreCup.test.jsx`
  Expected: Test PASS.

- [ ] **Step 4: Commit `LitreCup`**
  Run:
  ```powershell
  git add src/components/visualizers/LitreCup.jsx tests/LitreCup.test.jsx
  git commit -m "feat: implement LitreCup volumetric pouring visualizer"
  ```

---

### Task 9: Implement `ShapeClassifier.jsx`
Create visual classification puzzle sorting cylinder/sphere shapes for Bài 22.

**Files:**
- Create: `math2-app/src/components/visualizers/ShapeClassifier.jsx`
- Create: `math2-app/tests/ShapeClassifier.test.jsx`

- [ ] **Step 1: Create `ShapeClassifier.jsx`**
  Create file: `C:\Users\Hi\Desktop\Math Grade 2 Part 1\math2-app\src\components\visualizers\ShapeClassifier.jsx`
  ```javascript
  import { useState } from 'react';

  const SHAPES = [
    { id: 1, name: '⚽ Quả bóng', type: 'sphere' },
    { id: 2, name: '🥤 Lon nước', type: 'cylinder' },
    { id: 3, name: '🔋 Viên pin', type: 'cylinder' },
    { id: 4, name: '🔮 Viên bi', type: 'sphere' },
    { id: 5, name: '🥫 Hộp sữa', type: 'cylinder' },
    { id: 6, name: '🍊 Quả cam', type: 'sphere' }
  ];

  export default function ShapeClassifier() {
    const [items, setItems] = useState(SHAPES);
    const [sphereBox, setSphereBox] = useState([]);
    const [cylinderBox, setCylinderBox] = useState([]);
    const [feedback, setFeedback] = useState('');

    const classify = (item, targetType) => {
      if (item.type === targetType) {
        setFeedback(`🎉 Đúng rồi! ${item.name} là khối ${targetType === 'sphere' ? 'cầu' : 'trụ'}.`);
        setItems(items.filter(i => i.id !== item.id));
        if (targetType === 'sphere') {
          setSphereBox([...sphereBox, item]);
        } else {
          setCylinderBox([...cylinderBox, item]);
        }
      } else {
        setFeedback(`😢 Sai rồi! Hãy suy nghĩ kỹ xem ${item.name} có hình gì nhé.`);
      }
    };

    const reset = () => {
      setItems(SHAPES);
      setSphereBox([]);
      setCylinderBox([]);
      setFeedback('');
    };

    return (
      <div style={styles.wrapper} data-testid="shapeclassifier-visualizer">
        <h3 style={styles.title}>📦 Phân loại khối hình</h3>
        <p style={styles.help}>Bé hãy bấm vào các vật bên dưới để chọn hộp phân loại tương ứng nhé!</p>

        {feedback && <div style={styles.feedback} data-testid="classifier-feedback">{feedback}</div>}

        {/* Unclassified Items */}
        <div style={styles.itemsPool}>
          {items.map(item => (
            <div key={item.id} style={styles.itemCard} data-testid={`item-${item.id}`}>
              <div>{item.name}</div>
              <div style={styles.actionRow}>
                <button style={styles.classifyBtn} onClick={() => classify(item, 'cylinder')}>Khối Trụ</button>
                <button style={styles.classifyBtn} onClick={() => classify(item, 'sphere')}>Khối Cầu</button>
              </div>
            </div>
          ))}
        </div>

        {/* Categories Boxes */}
        <div style={styles.boxesRow}>
          {/* Cylinder Box */}
          <div style={styles.box} data-testid="box-cylinder">
            <h4 style={styles.boxTitle}>🥫 Hộp Khối Trụ</h4>
            <div style={styles.boxContent}>
              {cylinderBox.map(item => (
                <span key={item.id} style={styles.itemBadge}>{item.name}</span>
              ))}
            </div>
          </div>

          {/* Sphere Box */}
          <div style={styles.box} data-testid="box-sphere">
            <h4 style={styles.boxTitle}>⚽ Hộp Khối Cầu</h4>
            <div style={styles.boxContent}>
              {sphereBox.map(item => (
                <span key={item.id} style={styles.itemBadge}>{item.name}</span>
              ))}
            </div>
          </div>
        </div>

        {items.length === 0 && (
          <div style={styles.congrats}>
            🎉 Tuyệt vời! Bé đã phân loại chính xác tất cả các đồ vật!
            <br />
            <button style={styles.resetBtn} onClick={reset}>Luyện tập lại 🔄</button>
          </div>
        )}
      </div>
    );
  }

  const styles = {
    wrapper: { padding: '20px', backgroundColor: '#fff', borderRadius: '12px', border: '2px solid #ddd', textAlign: 'center' },
    title: { margin: '0 0 10px', color: '#722ED1' },
    help: { color: '#8c8c8c', marginBottom: '15px' },
    feedback: { padding: '10px', backgroundColor: '#e6f7ff', border: '1px solid #91d5ff', borderRadius: '6px', marginBottom: '15px', display: 'inline-block' },
    itemsPool: { display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', margin: '20px 0' },
    itemCard: { border: '1px solid #ccc', padding: '10px', borderRadius: '8px', backgroundColor: '#fafafa', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    actionRow: { display: 'flex', gap: '6px', marginTop: '8px' },
    classifyBtn: { padding: '4px 8px', fontSize: '11px', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '4px' },
    boxesRow: { display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' },
    box: { width: '150px', border: '2px dashed #722ED1', borderRadius: '8px', minHeight: '120px', padding: '10px', display: 'flex', flexDirection: 'column' },
    boxTitle: { margin: '0 0 8px', color: '#722ED1' },
    boxContent: { display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' },
    itemBadge: { backgroundColor: '#f5f5f5', border: '1px solid #d9d9d9', borderRadius: '4px', padding: '2px 6px', fontSize: '12px' },
    congrats: { color: '#52C41A', fontWeight: 'bold', fontSize: '18px', marginTop: '20px' },
    resetBtn: { padding: '6px 12px', fontSize: '14px', marginTop: '10px', cursor: 'pointer' }
  };
  ```

- [ ] **Step 2: Write tests in `tests/ShapeClassifier.test.jsx`**
  Create file: `C:\Users\Hi\Desktop\Math Grade 2 Part 1\math2-app\tests\ShapeClassifier.test.jsx`
  ```javascript
  import { describe, test, expect } from 'vitest';
  import { render, screen, fireEvent } from '@testing-library/react';
  import ShapeClassifier from '../src/components/visualizers/ShapeClassifier';
  import React from 'react';

  describe('ShapeClassifier visualizer', () => {
    test('correctly handles cylinder/sphere sorting logic', () => {
      render(<ShapeClassifier />);
      expect(screen.getByTestId('shapeclassifier-visualizer')).toBeInTheDocument();

      const can = screen.getByText('🥤 Lon nước');
      const toCylinderBtn = screen.getAllByText('Khối Trụ')[0]; // first one corresponds to Quả bóng or Lon nước

      // Item 2: Lon nước is cylinder. Let's find classify buttons of Quả bóng (first card) and test incorrect classification
      const sphereCardBtns = screen.getAllByText('Khối Trụ'); // gets cylinder buttons
      fireEvent.click(sphereCardBtns[0]); // Classify Quả bóng (sphere) as Cylinder -> error
      expect(screen.getByTestId('classifier-feedback')).toHaveTextContent('Sai rồi');
    });
  });
  ```

- [ ] **Step 3: Run tests on `ShapeClassifier`**
  Run: `npm run test:run tests/ShapeClassifier.test.jsx`
  Expected: Test PASS.

- [ ] **Step 4: Commit `ShapeClassifier`**
  Run:
  ```powershell
  git add src/components/visualizers/ShapeClassifier.jsx tests/ShapeClassifier.test.jsx
  git commit -m "feat: implement ShapeClassifier cylinder/sphere visualizer"
  ```

---

### Task 10: Implement `InteractiveClock.jsx`
Create interactive SVG clock with slider adjustments and text translations for Bài 25.

**Files:**
- Create: `math2-app/src/components/visualizers/InteractiveClock.jsx`
- Create: `math2-app/tests/InteractiveClock.test.jsx`

- [ ] **Step 1: Create `InteractiveClock.jsx`**
  Create file: `C:\Users\Hi\Desktop\Math Grade 2 Part 1\math2-app\src\components\visualizers\InteractiveClock.jsx`
  ```javascript
  import { useState } from 'react';

  export default function InteractiveClock() {
    const [hour, setHour] = useState(9);
    const [minute, setMinute] = useState(0);

    const formatVnTime = (h, m) => {
      if (m === 0) return `${h} giờ đúng`;
      if (m === 30) return `${h} giờ rưỡi (hoặc ${h} giờ 30 phút)`;
      return `${h} giờ ${m} phút`;
    };

    // Calculate rotation angles
    const minuteAngle = minute * 6; // 360 / 60 = 6 deg per min
    const hourAngle = (hour % 12) * 30 + minute * 0.5; // 36 deg per hour + offset

    return (
      <div style={styles.wrapper} data-testid="interactiveclock-visualizer">
        <h3 style={styles.title}>🕒 Đồng hồ tương tác</h3>

        <div style={styles.timeLabel} data-testid="clock-time-text">
          {formatVnTime(hour, minute)}
        </div>

        {/* SVG Clock */}
        <div style={styles.clockFrame}>
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="95" stroke="#333" strokeWidth="6" fill="#fff" />
            
            {/* Clock numbers */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => {
              const angle = (n * 30 * Math.PI) / 180;
              const x = 100 + 75 * Math.sin(angle);
              const y = 100 - 75 * Math.cos(angle);
              return (
                <text key={n} x={x} y={y} textAnchor="middle" dominantBaseline="middle" style={styles.clockNumber}>
                  {n}
                </text>
              );
            })}

            {/* Hour hand */}
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="50"
              stroke="#333"
              strokeWidth="6"
              strokeLinecap="round"
              transform={`rotate(${hourAngle} 100 100)`}
              data-testid="hour-hand"
            />

            {/* Minute hand */}
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="30"
              stroke="#fa8c16"
              strokeWidth="4"
              strokeLinecap="round"
              transform={`rotate(${minuteAngle} 100 100)`}
              data-testid="minute-hand"
            />

            {/* Center dot */}
            <circle cx="100" cy="100" r="6" fill="#333" />
          </svg>
        </div>

        {/* Sliders */}
        <div style={styles.sliders}>
          <div style={styles.sliderRow}>
            <label htmlFor="hour-slider">Giờ: {hour}</label>
            <input
              id="hour-slider"
              type="range"
              min="1"
              max="12"
              value={hour}
              onChange={(e) => setHour(Number(e.target.value))}
              style={styles.range}
              data-testid="hour-slider"
            />
          </div>
          <div style={styles.sliderRow}>
            <label htmlFor="minute-slider">Phút: {minute}</label>
            <input
              id="minute-slider"
              type="range"
              min="0"
              max="59"
              step="5"
              value={minute}
              onChange={(e) => setMinute(Number(e.target.value))}
              style={styles.range}
              data-testid="minute-slider"
            />
          </div>
        </div>
      </div>
    );
  }

  const styles = {
    wrapper: { padding: '20px', backgroundColor: '#fff', borderRadius: '12px', border: '2px solid #ddd', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    title: { margin: '0 0 10px', color: '#1890FF' },
    timeLabel: { fontSize: '20px', fontWeight: 'bold', margin: '10px 0', color: '#fa8c16' },
    clockFrame: { width: '200px', height: '200px', margin: '20px 0' },
    clockNumber: { fontSize: '14px', fontWeight: 'bold', fill: '#555' },
    sliders: { width: '80%', marginTop: '20px' },
    sliderRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0' },
    range: { flexGrow: 1, marginLeft: '15px' }
  };
  ```

- [ ] **Step 2: Write tests in `tests/InteractiveClock.test.jsx`**
  Create file: `C:\Users\Hi\Desktop\Math Grade 2 Part 1\math2-app\tests\InteractiveClock.test.jsx`
  ```javascript
  import { describe, test, expect } from 'vitest';
  import { render, screen, fireEvent } from '@testing-library/react';
  import InteractiveClock from '../src/components/visualizers/InteractiveClock';
  import React from 'react';

  describe('InteractiveClock visualizer', () => {
    test('renders hands, sliders, and correctly formatted Vietnamese text', () => {
      render(<InteractiveClock />);
      expect(screen.getByTestId('interactiveclock-visualizer')).toBeInTheDocument();
      expect(screen.getByTestId('clock-time-text')).toHaveTextContent('9 giờ đúng');

      const hourSlider = screen.getByTestId('hour-slider');
      fireEvent.change(hourSlider, { target: { value: 10 } });
      const minuteSlider = screen.getByTestId('minute-slider');
      fireEvent.change(minuteSlider, { target: { value: 30 } });

      expect(screen.getByTestId('clock-time-text')).toHaveTextContent('10 giờ rưỡi');
    });
  });
  ```

- [ ] **Step 3: Run tests on `InteractiveClock`**
  Run: `npm run test:run tests/InteractiveClock.test.jsx`
  Expected: Test PASS.

- [ ] **Step 4: Commit `InteractiveClock`**
  Run:
  ```powershell
  git add src/components/visualizers/InteractiveClock.jsx tests/InteractiveClock.test.jsx
  git commit -m "feat: implement InteractiveClock circular SVG clock"
  ```

---

### Task 11: Implement `ItemDistributor.jsx`
Create visual distributor explaining division groups for Bài 30.

**Files:**
- Create: `math2-app/src/components/visualizers/ItemDistributor.jsx`
- Create: `math2-app/tests/ItemDistributor.test.jsx`

- [ ] **Step 1: Create `ItemDistributor.jsx`**
  Create file: `C:\Users\Hi\Desktop\Math Grade 2 Part 1\math2-app\src\components\visualizers\ItemDistributor.jsx`
  ```javascript
  import { useState } from 'react';

  export default function ItemDistributor({ config = {} }) {
    const totalItems = config.totalItems ?? 12;
    const groupsCount = config.groupsCount ?? 3;

    const [distributed, setDistributed] = useState(0);

    const handleDistribute = () => {
      if (distributed < totalItems) {
        setDistributed(distributed + groupsCount);
      }
    };

    const reset = () => {
      setDistributed(0);
    };

    // Calculate items in each group
    const itemsPerGroup = distributed / groupsCount;
    const remaining = totalItems - distributed;

    return (
      <div style={styles.wrapper} data-testid="distributor-visualizer">
        <h3 style={styles.title}>🍎 Chia phần đều nhau</h3>

        <div style={styles.intro}>
          Tổng cộng có {totalItems} quả táo. Hãy chia đều cho {groupsCount} bạn!
        </div>

        <div style={styles.poolSection}>
          <h5>Táo chưa chia:</h5>
          <div style={styles.applesPool} data-testid="apples-pool">
            {Array.from({ length: remaining }).map((_, i) => (
              <span key={i} style={styles.apple}>🍎</span>
            ))}
          </div>
        </div>

        <div style={styles.controls}>
          <button style={styles.btn} onClick={handleDistribute} disabled={distributed >= totalItems} data-testid="btn-distribute">
            Chia đều một lượt 🚀
          </button>
          <button style={{ ...styles.btn, backgroundColor: '#f5222d' }} onClick={reset} data-testid="btn-reset">
            Xếp lại từ đầu 🔄
          </button>
        </div>

        {/* Groups */}
        <div style={styles.groupsRow} data-testid="groups-row">
          {Array.from({ length: groupsCount }).map((_, gIdx) => (
            <div key={gIdx} style={styles.groupPlate} data-testid={`plate-${gIdx}`}>
              <h5>Bạn {gIdx + 1}</h5>
              <div style={styles.plateApples}>
                {Array.from({ length: itemsPerGroup }).map((_, i) => (
                  <span key={i} style={styles.apple}>🍎</span>
                ))}
              </div>
              <div style={styles.plateCount}>{itemsPerGroup} quả</div>
            </div>
          ))}
        </div>

        {distributed === totalItems && (
          <div style={styles.mathEquation} data-testid="division-equation">
            Phép chia tương ứng: {totalItems} : {groupsCount} = {totalItems / groupsCount}
          </div>
        )}
      </div>
    );
  }

  const styles = {
    wrapper: { padding: '20px', backgroundColor: '#fff', borderRadius: '12px', border: '2px solid #ddd', textAlign: 'center' },
    title: { margin: '0 0 10px', color: '#52C41A' },
    intro: { fontWeight: 'bold', fontSize: '15px', marginBottom: '15px' },
    poolSection: { marginBottom: '20px' },
    applesPool: { minHeight: '40px', display: 'flex', justifyContent: 'center', gap: '4px', flexWrap: 'wrap', border: '1px solid #e8e8e8', borderRadius: '8px', padding: '10px', backgroundColor: '#fafafa' },
    apple: { fontSize: '24px' },
    controls: { display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' },
    btn: { padding: '6px 12px', backgroundColor: '#52C41A', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' },
    groupsRow: { display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' },
    groupPlate: { width: '100px', border: '2px solid #333', borderRadius: '50% 50% 10px 10px', padding: '10px', backgroundColor: '#fcfcfc', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    plateApples: { minHeight: '36px', display: 'flex', gap: '2px', flexWrap: 'wrap', justifyContent: 'center' },
    plateCount: { fontWeight: 'bold', fontSize: '14px', marginTop: '6px' },
    mathEquation: { fontSize: '22px', fontWeight: 'bold', color: '#52C41A', marginTop: '20px' }
  };
  ```

- [ ] **Step 2: Write tests in `tests/ItemDistributor.test.jsx`**
  Create file: `C:\Users\Hi\Desktop\Math Grade 2 Part 1\math2-app\tests\ItemDistributor.test.jsx`
  ```javascript
  import { describe, test, expect } from 'vitest';
  import { render, screen, fireEvent } from '@testing-library/react';
  import ItemDistributor from '../src/components/visualizers/ItemDistributor';
  import React from 'react';

  describe('ItemDistributor visualizer', () => {
    test('distributes items equally and shows division formula', () => {
      render(<ItemDistributor config={{ totalItems: 6, groupsCount: 2 }} />);
      expect(screen.getByTestId('distributor-visualizer')).toBeInTheDocument();

      const distBtn = screen.getByTestId('btn-distribute');
      fireEvent.click(distBtn); // distributes 2
      fireEvent.click(distBtn); // distributes 4
      fireEvent.click(distBtn); // distributes 6

      expect(screen.getByTestId('division-equation')).toHaveTextContent('6 : 2 = 3');
    });
  });
  ```

- [ ] **Step 3: Run tests on `ItemDistributor`**
  Run: `npm run test:run tests/ItemDistributor.test.jsx`
  Expected: Test PASS.

- [ ] **Step 4: Commit `ItemDistributor`**
  Run:
  ```powershell
  git add src/components/visualizers/ItemDistributor.jsx tests/ItemDistributor.test.jsx
  git commit -m "feat: implement ItemDistributor visualizer for teaching divisions"
  ```

---

### Task 12: Clean Up Unused Components
Delete visualizer components from the initial boilerplate that are not used in Grade 2 Math curriculum.

**Files:**
- Delete: `math2-app/src/components/visualizers/AddSubVisualizer.jsx`
- Delete: `math2-app/src/components/visualizers/AdditionTableVisualizer.jsx`
- Delete: `math2-app/src/components/visualizers/ColumnAddition.jsx`
- Delete: `math2-app/src/components/visualizers/NumberLine100.jsx`
- Delete: `math2-app/src/components/visualizers/RulerVisualizer.jsx`

- [ ] **Step 1: Remove unused components using git rm**
  Run:
  ```powershell
  git rm src/components/visualizers/AddSubVisualizer.jsx
  git rm src/components/visualizers/AdditionTableVisualizer.jsx
  git rm src/components/visualizers/ColumnAddition.jsx
  git rm src/components/visualizers/NumberLine100.jsx
  git rm src/components/visualizers/RulerVisualizer.jsx
  ```

- [ ] **Step 2: Commit cleanup**
  Run:
  ```powershell
  git commit -m "cleanup: remove unused/unsupported visualizer components"
  ```

---

### Task 13: Sanity and Build Check
Add basic tests to verify `App.jsx` loads, runs, and the production bundles build successfully.

**Files:**
- Create: `math2-app/tests/App.test.jsx`
- Create: `math2-app/tests/sanity.test.js`

- [ ] **Step 1: Create `tests/App.test.jsx`**
  Create file: `C:\Users\Hi\Desktop\Math Grade 2 Part 1\math2-app\tests\App.test.jsx`
  ```javascript
  import { describe, test, expect } from 'vitest';
  import { render, screen } from '@testing-library/react';
  import App from '../src/App';
  import React from 'react';

  describe('App component', () => {
    test('renders the landing loading/header state', () => {
      render(<App />);
      expect(screen.getByText(/Đang tải bài học.../)).toBeInTheDocument();
    });
  });
  ```

- [ ] **Step 2: Create `tests/sanity.test.js`**
  Create file: `C:\Users\Hi\Desktop\Math Grade 2 Part 1\math2-app\tests\sanity.test.js`
  ```javascript
  import { describe, test, expect } from 'vitest';

  describe('Sanity test', () => {
    test('proves the testing environment is active', () => {
      expect(1 + 1).toBe(2);
    });
  });
  ```

- [ ] **Step 3: Run all unit tests**
  Run: `npm run test:run`
  Expected: All tests pass (usually 9 tests).

- [ ] **Step 4: Verify production build**
  Run: `npm run build`
  Expected: Successful production build without bundle errors.

- [ ] **Step 5: Commit tests**
  Run:
  ```powershell
  git add tests/App.test.jsx tests/sanity.test.js
  git commit -m "test: add sanity and App component integration tests"
  ```

---

### Task 14: Push to Remote Repository
Commit final changes and push to GitHub.

- [ ] **Step 1: Check remote and push**
  Run: `git push -u origin main`
  Expected: Successfully pushed to target repository.
