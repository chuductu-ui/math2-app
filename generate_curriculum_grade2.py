import json
import os

def get_options(correct, wrong1, wrong2, wrong3):
    options = [correct, wrong1, wrong2, wrong3]
    # Remove any duplicates by appending spaces if they ever happen
    seen = set()
    unique = []
    for opt in options:
        s = str(opt)
        if s in seen:
            while s in seen:
                s += " "
            unique.append(s)
            seen.add(s)
        else:
            unique.append(opt)
            seen.add(s)
    return unique

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
                                make_q("b1_e1", "Số 47 gồm mấy chục và mấy đơn vị?", "4 chục và 7 đơn vị", "7 chục và 4 đơn vị", "4 chục và 70 đơn vị", "40 chục và 7 đơn vị", "Chữ số 4 đứng trước là hàng chục, số 7 đứng sau là hàng đơn vị."),
                                make_q("b1_e2", "Số 35 gồm mấy chục và mấy đơn vị?", "3 chục và 5 đơn vị", "5 chục và 3 đơn vị", "3 chục và 50 đơn vị", "30 chục và 5 đơn vị", "Chữ số 3 đứng trước là hàng chục, số 5 đứng sau là hàng đơn vị."),
                                make_q("b1_e3", "Số 82 gồm mấy chục và mấy đơn vị?", "8 chục và 2 đơn vị", "2 chục và 8 đơn vị", "8 chục và 20 đơn vị", "80 chục và 2 đơn vị", "Chữ số 8 đứng trước là hàng chục, số 2 đứng sau là hàng đơn vị."),
                                make_q("b1_e4", "Số 50 gồm mấy chục và mấy đơn vị?", "5 chục và 0 đơn vị", "0 chục và 5 đơn vị", "5 chục và 50 đơn vị", "50 chục và 0 đơn vị", "Chữ số 5 đứng trước là hàng chục, số 0 đứng sau là hàng đơn vị."),
                                make_q("b1_e5", "Số 16 gồm mấy chục và mấy đơn vị?", "1 chục và 6 đơn vị", "6 chục và 1 đơn vị", "1 chục và 60 đơn vị", "10 chục và 6 đơn vị", "Chữ số 1 đứng trước là hàng chục, số 6 đứng sau là hàng đơn vị."),
                                make_q("b1_e6", "Số 99 gồm mấy chục và mấy đơn vị?", "9 chục và 9 đơn vị", "90 chục và 9 đơn vị", "9 chục và 90 đơn vị", "90 chục và 90 đơn vị", "Cả hai chữ số đều là 9, gồm 9 chục và 9 đơn vị."),
                                make_q("b1_e7", "Số 68 gồm mấy chục và mấy đơn vị?", "6 chục và 8 đơn vị", "8 chục và 6 đơn vị", "6 chục và 80 đơn vị", "60 chục và 8 đơn vị", "Chữ số 6 đứng trước là hàng chục, số 8 đứng sau là hàng đơn vị."),
                                make_q("b1_e8", "Số 73 gồm mấy chục và mấy đơn vị?", "7 chục và 3 đơn vị", "3 chục và 7 đơn vị", "7 chục và 30 đơn vị", "70 chục và 3 đơn vị", "Chữ số 7 đứng trước là hàng chục, số 3 đứng sau là hàng đơn vị."),
                                make_q("b1_e9", "Số 24 gồm mấy chục và mấy đơn vị?", "2 chục và 4 đơn vị", "4 chục và 2 đơn vị", "2 chục và 40 đơn vị", "20 chục và 4 đơn vị", "Chữ số 2 đứng trước là hàng chục, số 4 đứng sau là hàng đơn vị."),
                                make_q("b1_e10", "Số 91 gồm mấy chục và mấy đơn vị?", "9 chục và 1 đơn vị", "1 chục và 9 đơn vị", "9 chục và 10 đơn vị", "90 chục và 1 đơn vị", "Chữ số 9 đứng trước là hàng chục, số 1 đứng sau là hàng đơn vị.")
                            ],
                            "medium": [
                                make_q("b1_m1", "Tìm số bé nhất có hai chữ số giống nhau.", "11", "10", "22", "99", "Số bé nhất có hai chữ số là 10, nhưng hai chữ số giống nhau bé nhất là 11."),
                                make_q("b1_m2", "Tìm số bé nhất có hai chữ số.", "10", "11", "01", "20", "Số bé nhất có hai chữ số là 10."),
                                make_q("b1_m3", "Tìm số lớn nhất có hai chữ số.", "99", "100", "90", "98", "Số lớn nhất có hai chữ số là 99."),
                                make_q("b1_m4", "Tìm số lớn nhất có hai chữ số giống nhau.", "99", "88", "90", "100", "Số lớn nhất có hai chữ số giống nhau là 99."),
                                make_q("b1_m5", "Số tròn chục bé nhất có hai chữ số là số nào?", "10", "20", "00", "50", "Các số tròn chục có hai chữ số là 10, 20, ..., 90. Số bé nhất là 10."),
                                make_q("b1_m6", "Số tròn chục lớn nhất có hai chữ số là số nào?", "90", "99", "100", "80", "Các số tròn chục có hai chữ số kết thúc bằng 0. Số lớn nhất là 90."),
                                make_q("b1_m7", "Số gồm 8 chục và 5 đơn vị được viết là gì?", "85", "58", "805", "850", "Chữ số hàng chục đứng trước, đơn vị đứng sau: 85."),
                                make_q("b1_m8", "Số gồm 3 chục và 0 đơn vị được viết là gì?", "30", "3", "300", "33", "Chữ số hàng chục đứng trước, đơn vị đứng sau: 30."),
                                make_q("b1_m9", "Số liền trước của 100 là gì?", "99", "98", "90", "101", "Số liền trước 100 kém 100 là 1 đơn vị, tức 99."),
                                make_q("b1_m10", "Số liền sau của 9 là gì?", "10", "8", "11", "0", "Số liền sau của 9 hơn 9 là 1 đơn vị, tức 10.")
                            ],
                            "hard": [
                                make_q("b1_h1", "Viết được bao nhiêu số có hai chữ số từ hai chữ số 3 và 5?", "4 số", "2 số", "3 số", "1 số", "Các số viết được là 33, 35, 53, 55. Tổng cộng có 4 số."),
                                make_q("b1_h2", "Viết được bao nhiêu số có hai chữ số khác nhau từ hai chữ số 2 và 7?", "2 số", "4 số", "3 số", "1 số", "Các số có hai chữ số khác nhau viết từ 2 và 7 là 27 và 72. (22 và 77 có hai chữ số giống nhau nên loại)."),
                                make_q("b1_h3", "Có bao nhiêu số tròn chục có hai chữ số?", "9 số", "10 số", "8 số", "90 số", "Các số tròn chục có hai chữ số gồm: 10, 20, 30, 40, 50, 60, 70, 80, 90. Có 9 số."),
                                make_q("b1_h4", "Có bao nhiêu số có hai chữ số mà chữ số hàng chục là 5?", "10 số", "9 số", "5 số", "11 số", "Các số có hai chữ số bắt đầu bằng 5 là từ 50 đến 59. Có tất cả 10 số."),
                                make_q("b1_h5", "Có bao nhiêu số có hai chữ số mà chữ số hàng đơn vị là 0?", "9 số", "10 số", "90 số", "8 số", "Các số có hai chữ số kết thúc bằng 0 gồm: 10, 20, 30, 40, 50, 60, 70, 80, 90. Có 9 số."),
                                make_q("b1_h6", "Tìm số có hai chữ số, biết chữ số hàng chục là 7 và chữ số hàng đơn vị kém chữ số hàng chục 2 đơn vị.", "75", "79", "57", "72", "Hàng chục là 7. Hàng đơn vị kém hàng chục 2 đơn vị nên hàng đơn vị là 7 - 2 = 5. Vậy số đó là 75."),
                                make_q("b1_h7", "Tìm số có hai chữ số, biết chữ số hàng chục là 4 và chữ số hàng đơn vị gấp đôi chữ số hàng chục.", "48", "84", "42", "44", "Hàng chục là 4. Hàng đơn vị gấp đôi hàng chục nên hàng đơn vị là 4 x 2 = 8. Số đó là 48."),
                                make_q("b1_h8", "Tìm số có hai chữ số, biết tổng hai chữ số của số đó bằng 9 và chữ số hàng chục là 5.", "54", "59", "45", "55", "Hàng chục là 5. Tổng hai chữ số bằng 9 nên hàng đơn vị là 9 - 5 = 4. Số đó là 54."),
                                make_q("b1_h9", "Tìm số có hai chữ số, biết hiệu của chữ số hàng chục và hàng đơn vị bằng 0, và hàng chục là 6.", "66", "60", "69", "61", "Hiệu bằng 0 có nghĩa hai chữ số hàng chục và đơn vị giống nhau. Hàng chục là 6 thì hàng đơn vị cũng là 6. Số đó là 66."),
                                make_q("b1_h10", "Có bao nhiêu số có hai chữ số bé hơn 20?", "10 số", "9 số", "11 số", "20 số", "Các số có hai chữ số bé hơn 20 gồm: 10, 11, 12, 13, 14, 15, 16, 17, 18, 19. Có 10 số.")
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
                                make_q("b2_e1", "Số liền sau của số 79 là số nào?", "80", "78", "81", "70", "Số liền sau của 79 bằng 79 + 1 = 80."),
                                make_q("b2_e2", "Số liền trước của số 90 là số nào?", "89", "91", "88", "100", "Số liền trước của 90 bằng 90 - 1 = 89."),
                                make_q("b2_e3", "Số liền sau của số 45 là số nào?", "46", "44", "47", "50", "Số liền sau của 45 bằng 45 + 1 = 46."),
                                make_q("b2_e4", "Số liền trước của số 60 là số nào?", "59", "61", "58", "50", "Số liền trước của 60 bằng 60 - 1 = 59."),
                                make_q("b2_e5", "Số liền sau của số 12 là số nào?", "13", "11", "14", "10", "Số liền sau của 12 bằng 12 + 1 = 13."),
                                make_q("b2_e6", "Số liền trước của số 2 là số nào?", "1", "3", "0", "4", "Số liền trước của 2 bằng 2 - 1 = 1."),
                                make_q("b2_e7", "Số liền sau của số 99 là số nào?", "100", "98", "90", "101", "Số liền sau của 99 bằng 99 + 1 = 100."),
                                make_q("b2_e8", "Số liền trước của số 88 là số nào?", "87", "89", "86", "80", "Số liền trước của 88 bằng 88 - 1 = 87."),
                                make_q("b2_e9", "Số liền sau của số 34 là số nào?", "35", "33", "36", "40", "Số liền sau của 34 bằng 34 + 1 = 35."),
                                make_q("b2_e10", "Số liền trước của số 71 là số nào?", "70", "72", "69", "73", "Số liền trước của 71 bằng 71 - 1 = 70.")
                            ],
                            "medium": [
                                make_q("b2_m1", "Số liền trước của số liền trước 50 là số nào?", "48", "49", "51", "47", "Số liền trước số 50 là 49. Số liền trước của 49 là 48."),
                                make_q("b2_m2", "Số liền sau của số liền sau 20 là số nào?", "22", "21", "19", "23", "Số liền sau số 20 là 21. Số liền sau của 21 là 22."),
                                make_q("b2_m3", "Số nằm giữa 45 và 47 là số nào?", "46", "44", "48", "45", "Số ở giữa 45 và 47 là 46."),
                                make_q("b2_m4", "Hai số liền trước của số 15 là những số nào?", "13 và 14", "14 và 15", "15 và 16", "12 và 13", "Hai số liền trước của 15 là 14 (đứng ngay trước) và 13 (đứng trước 14)."),
                                make_q("b2_m5", "Hai số liền sau của số 28 là những số nào?", "29 và 30", "27 và 28", "28 và 29", "30 và 31", "Hai số liền sau của 28 là 29 (đứng ngay sau) và 30 (đứng sau 29)."),
                                make_q("b2_m6", "Số liền trước của số liền sau 70 là số nào?", "70", "69", "71", "68", "Số liền sau của 70 là 71. Số liền trước của 71 quay lại là 70."),
                                make_q("b2_m7", "Số liền sau của số liền trước 85 là số nào?", "85", "84", "86", "83", "Số liền trước của 85 là 84. Số liền sau của 84 quay lại là 85."),
                                make_q("b2_m8", "Trên tia số, số đứng ngay bên trái số 66 là số nào?", "65", "67", "66", "60", "Số đứng bên trái là số bé hơn 1 đơn vị, tức số liền trước: 65."),
                                make_q("b2_m9", "Trên tia số, số đứng ngay bên phải số 99 là số nào?", "100", "98", "99", "101", "Số đứng bên phải là số lớn hơn 1 đơn vị, tức số liền sau: 100."),
                                make_q("b2_m10", "Số liền trước của số bé nhất có hai chữ số là số nào?", "9", "10", "11", "8", "Số bé nhất có hai chữ số là 10. Số liền trước của 10 là 9.")
                            ],
                            "hard": [
                                make_q("b2_h1", "Tìm một số biết số liền sau của nó là 100.", "99", "100", "98", "101", "Số có số liền sau là 100 thì kém 100 là 1 đơn vị, tức 99."),
                                make_q("b2_h2", "Tìm một số biết số liền trước của nó là 9.", "10", "9", "8", "11", "Số có số liền trước là 9 thì lớn hơn 9 là 1 đơn vị, tức 10."),
                                make_q("b2_h3", "Tìm một số biết số liền trước của số liền trước nó là 35.", "37", "36", "34", "38", "Số liền trước của số đó là 35 + 1 = 36. Vậy số đó là 36 + 1 = 37."),
                                make_q("b2_h4", "Tìm một số biết số liền sau của số liền sau nó là 80.", "78", "79", "81", "82", "Số liền sau của số đó là 80 - 1 = 79. Vậy số đó là 79 - 1 = 78."),
                                make_q("b2_h5", "Tổng của số liền trước và số liền sau của số 10 là bao nhiêu?", "20", "19", "21", "18", "Số liền trước 10 là 9, số liền sau 10 là 11. Tổng: 9 + 11 = 20."),
                                make_q("b2_h6", "Hiệu của số liền sau và số liền trước của số 54 là bao nhiêu?", "2", "0", "1", "54", "Số liền sau là 55, số liền trước là 53. Hiệu: 55 - 53 = 2."),
                                make_q("b2_h7", "Số liền trước của số lớn nhất có hai chữ số giống nhau là số nào?", "98", "99", "97", "100", "Số lớn nhất có hai chữ số giống nhau là 99. Số liền trước của 99 là 98."),
                                make_q("b2_h8", "Số liền sau của số bé nhất có hai chữ số giống nhau là số nào?", "12", "11", "10", "13", "Số bé nhất có hai chữ số giống nhau là 11. Số liền sau of 11 là 12."),
                                make_q("b2_h9", "Nếu số liền trước của X là 15 thì số liền sau của X là bao nhiêu?", "17", "16", "15", "14", "Số liền trước X là 15 thì X = 16. Số liền sau of 16 là 17."),
                                make_q("b2_h10", "Nếu số liền sau của Y là 30 thì số liền trước của Y là bao nhiêu?", "28", "29", "30", "31", "Số liền sau Y là 30 thì Y = 29. Số liền trước của 29 là 28.")
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
                                make_q("b3_e1", "Trong phép cộng 12 + 5 = 17, số 17 được gọi là gì?", "Tổng", "Số hạng", "Hiệu", "Số bị trừ", "Kết quả của phép cộng được gọi là Tổng."),
                                make_q("b3_e2", "Trong phép cộng 12 + 5 = 17, số 12 được gọi là gì?", "Số hạng", "Tổng", "Số trừ", "Số bị trừ", "Các số cộng với nhau được gọi là Số hạng."),
                                make_q("b3_e3", "Trong phép trừ 25 - 5 = 20, số 25 được gọi là gì?", "Số bị trừ", "Số trừ", "Hiệu", "Tổng", "Số đứng trước dấu trừ gọi là Số bị trừ."),
                                make_q("b3_e4", "Trong phép trừ 25 - 5 = 20, số 5 được gọi là gì?", "Số trừ", "Số bị trừ", "Hiệu", "Tổng", "Số đứng sau dấu trừ gọi là Số trừ."),
                                make_q("b3_e5", "Trong phép trừ 25 - 5 = 20, số 20 được gọi là gì?", "Hiệu", "Số bị trừ", "Số trừ", "Tổng", "Kết quả của phép trừ được gọi là Hiệu."),
                                make_q("b3_e6", "Trong phép cộng 30 + 40 = 70, số 40 được gọi là gì?", "Số hạng", "Tổng", "Số trừ", "Hiệu", "Trong phép cộng, các số tham gia phép cộng đều là Số hạng."),
                                make_q("b3_e7", "Kết quả của phép trừ được gọi là gì?", "Hiệu", "Tổng", "Số bị trừ", "Số trừ", "Kết quả của phép trừ được gọi là Hiệu."),
                                make_q("b3_e8", "Kết quả của phép cộng được gọi là gì?", "Tổng", "Hiệu", "Số hạng", "Thừa số", "Kết quả của phép cộng được gọi là Tổng."),
                                make_q("b3_e9", "Trong phép tính 8 + 9 = 17, cả phép tính '8 + 9' cũng được gọi là gì?", "Tổng", "Số hạng", "Hiệu", "Số trừ", "Cả biểu thức phép cộng '8 + 9' cũng gọi là một Tổng."),
                                make_q("b3_e10", "Trong phép tính 15 - 3 = 12, cả phép tính '15 - 3' cũng được gọi là gì?", "Hiệu", "Số bị trừ", "Số trừ", "Tổng", "Cả biểu thức phép trừ '15 - 3' cũng gọi là một Hiệu.")
                            ],
                            "medium": [
                                make_q("b3_m1", "Tìm tổng của 20 và 30.", "50", "10", "60", "40", "Tổng = 20 + 30 = 50."),
                                make_q("b3_m2", "Tìm hiệu của 50 và 10.", "40", "60", "50", "30", "Hiệu = 50 - 10 = 40."),
                                make_q("b3_m3", "Tìm tổng của số lớn nhất có một chữ số và số bé nhất có hai chữ số.", "19", "18", "10", "11", "Số lớn nhất có 1 chữ số là 9. Số bé nhất có 2 chữ số là 10. Tổng: 9 + 10 = 19."),
                                make_q("b3_m4", "Tìm hiệu của số bé nhất có hai chữ số và số lớn nhất có một chữ số.", "1", "10", "9", "2", "Số bé nhất có 2 chữ số là 10. Số lớn nhất có 1 chữ số là 9. Hiệu: 10 - 9 = 1."),
                                make_q("b3_m5", "Biết số bị trừ là 15, số trừ là 5. Hiệu là bao nhiêu?", "10", "20", "5", "15", "Hiệu = Số bị trừ - Số trừ = 15 - 5 = 10."),
                                make_q("b3_m6", "Biết số hạng thứ nhất là 7, số hạng thứ hai là 8. Tổng là bao nhiêu?", "15", "14", "16", "13", "Tổng = 7 + 8 = 15."),
                                make_q("b3_m7", "Biết tổng là 50, một số hạng là 20. Số hạng còn lại là bao nhiêu?", "30", "70", "40", "20", "Số hạng còn lại = Tổng - Số hạng đã biết = 50 - 20 = 30."),
                                make_q("b3_m8", "Biết hiệu là 10, số trừ là 6. Số bị trừ là bao nhiêu?", "16", "4", "10", "20", "Số bị trừ = Hiệu + Số trừ = 10 + 6 = 16."),
                                make_q("b3_m9", "Biết số bị trừ là 20, hiệu là 15. Số trừ là bao nhiêu?", "5", "35", "15", "10", "Số trừ = Số bị trừ - Hiệu = 20 - 15 = 5."),
                                make_q("b3_m10", "Trong phép cộng, nếu tăng một số hạng thêm 4 đơn vị và giữ nguyên số hạng kia thì tổng thay đổi thế nào?", "Tổng tăng thêm 4 đơn vị", "Tổng giảm đi 4 đơn vị", "Tổng không thay đổi", "Tổng tăng thêm 8 đơn vị", "Vì Tổng = Số hạng + Số hạng, khi một số hạng tăng bao nhiêu thì Tổng tăng bấy nhiêu.")
                            ],
                            "hard": [
                                make_q("b3_h1", "Trong phép trừ, nếu tăng số bị trừ thêm 5 đơn vị và giữ nguyên số trừ thì hiệu thay đổi thế nào?", "Hiệu tăng thêm 5 đơn vị", "Hiệu giảm đi 5 đơn vị", "Hiệu không đổi", "Hiệu tăng thêm 10 đơn vị", "Số bị trừ tăng bao nhiêu thì hiệu tăng bấy nhiêu. Vậy hiệu tăng thêm 5 đơn vị."),
                                make_q("b3_h2", "Trong phép trừ, nếu giữ nguyên số bị trừ và tăng số trừ thêm 3 đơn vị thì hiệu thay đổi thế nào?", "Hiệu giảm đi 3 đơn vị", "Hiệu tăng thêm 3 đơn vị", "Hiệu không đổi", "Hiệu giảm đi 6 đơn vị", "Số trừ tăng bao nhiêu thì hiệu giảm bấy nhiêu. Vậy hiệu giảm đi 3 đơn vị."),
                                make_q("b3_h3", "Trong phép cộng, nếu số hạng thứ nhất tăng 5 đơn vị và số hạng thứ hai giảm 2 đơn vị thì tổng thay đổi thế nào?", "Tổng tăng thêm 3 đơn vị", "Tổng giảm đi 3 đơn vị", "Tổng tăng thêm 7 đơn vị", "Tổng không đổi", "Tổng mới thay đổi: +5 - 2 = +3 đơn vị. Vậy tổng tăng thêm 3 đơn vị."),
                                make_q("b3_h4", "Tìm tổng của số liền trước 20 và số liền sau 30.", "50", "49", "51", "48", "Số liền trước 20 là 19. Số liền sau 30 là 31. Tổng: 19 + 31 = 50."),
                                make_q("b3_h5", "Tìm hiệu của số liền sau 40 và số liền trước 10.", "32", "30", "31", "29", "Số liền sau 40 là 41. Số liền trước 10 là 9. Hiệu: 41 - 9 = 32."),
                                make_q("b3_h6", "Tổng của hai số là 15. Nếu ta thêm vào số hạng thứ nhất 5 đơn vị thì tổng mới là bao nhiêu?", "20", "15", "10", "25", "Tổng mới = 15 + 5 = 20."),
                                make_q("b3_h7", "Hiệu của hai số là 20. Nếu ta bớt ở số bị trừ 5 đơn vị thì hiệu mới là bao nhiêu?", "15", "20", "25", "10", "Hiệu mới = 20 - 5 = 15."),
                                make_q("b3_h8", "Hiệu của hai số là 12. Nếu ta thêm vào số trừ 2 đơn vị thì hiệu mới là bao nhiêu?", "10", "12", "14", "8", "Khi thêm vào số trừ thì hiệu giảm đi: 12 - 2 = 10."),
                                make_q("b3_h9", "Tìm số bị trừ biết hiệu là 8 và số trừ là số liền sau của 5.", "14", "13", "12", "15", "Số liền sau của 5 là 6, nên số trừ là 6. Số bị trừ = Hiệu + Số trừ = 8 + 6 = 14."),
                                make_q("b3_h10", "Tìm số hạng thứ hai biết tổng là số lớn nhất có hai chữ số tròn chục và số hạng thứ nhất là 30.", "60", "70", "50", "90", "Số lớn nhất có 2 chữ số tròn chục là 90. Số hạng thứ hai = 90 - 30 = 60.")
                            ]
                        }
                    },
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
                                make_q("b7_e1", "9 + 2 = ?", "11", "10", "12", "13", "Tách 2 = 1 + 1. Ta có: 9 + 1 = 10, rồi 10 + 1 = 11."),
                                make_q("b7_e2", "9 + 5 = ?", "14", "13", "15", "16", "Tách 5 = 1 + 4. Ta có: 9 + 1 = 10, rồi 10 + 4 = 14."),
                                make_q("b7_e3", "8 + 3 = ?", "11", "10", "12", "13", "Tách 3 = 2 + 1. Ta có: 8 + 2 = 10, rồi 10 + 1 = 11."),
                                make_q("b7_e4", "8 + 5 = ?", "13", "12", "14", "15", "Tách 5 = 2 + 3. Ta có: 8 + 2 = 10, rồi 10 + 3 = 13."),
                                make_q("b7_e5", "7 + 4 = ?", "11", "10", "12", "13", "Tách 4 = 3 + 1. Ta có: 7 + 3 = 10, rồi 10 + 1 = 11."),
                                make_q("b7_e6", "7 + 6 = ?", "13", "12", "14", "15", "Tách 6 = 3 + 3. Ta có: 7 + 3 = 10, rồi 10 + 3 = 13."),
                                make_q("b7_e7", "6 + 5 = ?", "11", "10", "12", "13", "Tách 5 = 4 + 1. Ta có: 6 + 4 = 10, rồi 10 + 1 = 11."),
                                make_q("b7_e8", "9 + 7 = ?", "16", "15", "17", "18", "Tách 7 = 1 + 6. Ta có: 9 + 1 = 10, rồi 10 + 6 = 16."),
                                make_q("b7_e9", "8 + 7 = ?", "15", "14", "16", "17", "Tách 7 = 2 + 5. Ta có: 8 + 2 = 10, rồi 10 + 5 = 15."),
                                make_q("b7_e10", "7 + 8 = ?", "15", "14", "16", "17", "Tách 8 = 3 + 5. Ta có: 7 + 3 = 10, rồi 10 + 5 = 15.")
                            ],
                            "medium": [
                                make_q("b7_m1", "Điền số thích hợp: 9 + ? = 13", "4", "3", "5", "6", "Ta có: 9 + 4 = 13."),
                                make_q("b7_m2", "Điền số thích hợp: 8 + ? = 12", "4", "3", "5", "6", "Ta có: 8 + 4 = 12."),
                                make_q("b7_m3", "Điền số thích hợp: 7 + ? = 15", "8", "7", "9", "6", "Ta có: 7 + 8 = 15."),
                                make_q("b7_m4", "Điền số thích hợp: 6 + ? = 12", "6", "5", "7", "8", "Ta có: 6 + 6 = 12."),
                                make_q("b7_m5", "So sánh: 9 + 4 ... 8 + 6", "<", ">", "=", "Không so sánh được", "9 + 4 = 13. 8 + 6 = 14. Vì 13 < 14 nên 9 + 4 < 8 + 6."),
                                make_q("b7_m6", "So sánh: 9 + 6 ... 8 + 7", "=", "<", ">", "Khác nhau", "9 + 6 = 15. 8 + 7 = 15. Hai phép tính có kết quả bằng nhau."),
                                make_q("b7_m7", "Tìm X biết: X - 5 = 9", "14", "13", "15", "4", "X = 9 + 5 = 14."),
                                make_q("b7_m8", "Tính nhanh: 9 + 1 + 5 = ?", "15", "14", "16", "10", "Gộp 9 + 1 = 10, rồi 10 + 5 = 15."),
                                make_q("b7_m9", "Tính nhanh: 8 + 2 + 7 = ?", "17", "16", "18", "10", "Gộp 8 + 2 = 10, rồi 10 + 7 = 17."),
                                make_q("b7_m10", "Tính nhanh: 7 + 3 + 4 = ?", "14", "13", "15", "10", "Gộp 7 + 3 = 10, rồi 10 + 4 = 14.")
                            ],
                            "hard": [
                                make_q("b7_h1", "Mẹ mua 9 bông hoa hồng và 7 bông hoa cúc. Hỏi mẹ mua tất cả bao nhiêu bông hoa?", "16 bông hoa", "15 bông hoa", "17 bông hoa", "14 bông hoa", "Phép tính: 9 + 7. Tách 7 = 1 + 6. Ta được 9 + 1 = 10; 10 + 6 = 16."),
                                make_q("b7_h2", "Lan có 8 cái nhãn vở, Mai có nhiều hơn Lan 5 cái. Hỏi Mai có bao nhiêu cái nhãn vở?", "13 cái", "12 cái", "14 cái", "3 cái", "Số nhãn vở của Mai là: 8 + 5 = 13 cái."),
                                make_q("b7_h3", "Trong vườn có 7 cây cam và 8 cây bưởi. Hỏi trong vườn có tất cả bao nhiêu cây cam và bưởi?", "15 cây", "14 cây", "16 cây", "13 cây", "Tổng số cây là: 7 + 8 = 15 cây."),
                                make_q("b7_h4", "Tổ Một trồng được 9 cây, tổ Hai trồng được nhiều hơn tổ Một 3 cây. Hỏi tổ Hai trồng được bao nhiêu cây?", "12 cây", "11 cây", "13 cây", "6 cây", "Số cây tổ Hai trồng được là: 9 + 3 = 12 cây."),
                                make_q("b7_h5", "Đàn vịt dưới ao có 8 con vịt trắng và 6 con vịt khoang. Hỏi đàn vịt có tất cả bao nhiêu con?", "14 con", "13 con", "15 con", "12 con", "Tổng số vịt là: 8 + 6 = 14 con."),
                                make_q("b7_h6", "Trên kệ sách có 9 quyển truyện tranh và 8 quyển sách giáo khoa. Hỏi có tất cả bao nhiêu quyển sách trên kệ?", "17 quyển", "16 quyển", "18 quyển", "15 quyển", "Tổng số sách là: 9 + 8 = 17 quyển."),
                                make_q("b7_h7", "Dũng có 9 viên bi, Hùng cho Dũng thêm 9 viên bi nữa. Hỏi Dũng có tất cả bao nhiêu viên bi?", "18 viên bi", "17 viên bi", "19 viên bi", "16 viên bi", "Tổng số bi của Dũng là: 9 + 9 = 18 viên bi."),
                                make_q("b7_h8", "Có hai bao gạo, bao thứ nhất nặng 8kg, bao thứ hai nặng hơn bao thứ nhất 4kg. Hỏi bao thứ hai nặng bao nhiêu ki-lô-gam?", "12 kg", "11 kg", "13 kg", "4 kg", "Khối lượng bao thứ hai là: 8 + 4 = 12 kg."),
                                make_q("b7_h9", "Minh cắt được 7 ngôi sao giấy, Hà cắt được nhiều hơn Minh 7 ngôi sao. Hỏi Hà cắt được bao nhiêu ngôi sao giấy?", "14 ngôi sao", "13 ngôi sao", "15 ngôi sao", "0 ngôi sao", "Số ngôi sao của Hà là: 7 + 7 = 14 ngôi sao."),
                                make_q("b7_h10", "Bác An nuôi 9 con gà mái và 8 con gà trống. Hỏi nhà bác An nuôi tất cả bao nhiêu con gà?", "17 con", "16 con", "18 con", "15 con", "Tổng số gà nhà bác An là: 9 + 8 = 17 con.")
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
                                make_q("b11_e1", "11 - 3 = ?", "8", "7", "9", "6", "Trừ đi 1 để được 10: 11 - 1 - 2 = 10 - 2 = 8."),
                                make_q("b11_e2", "11 - 2 = ?", "9", "8", "10", "7", "Trừ đi 1 để được 10: 11 - 1 - 1 = 9."),
                                make_q("b11_e3", "11 - 5 = ?", "6", "5", "7", "8", "Trừ đi 1 để được 10: 11 - 1 - 4 = 6."),
                                make_q("b11_e4", "12 - 3 = ?", "9", "8", "10", "7", "Trừ đi 2 để được 10: 12 - 2 - 1 = 9."),
                                make_q("b11_e5", "12 - 5 = ?", "7", "6", "8", "9", "Trừ đi 2 để được 10: 12 - 2 - 3 = 7."),
                                make_q("b11_e6", "13 - 4 = ?", "9", "8", "10", "7", "Trừ đi 3 để được 10: 13 - 3 - 1 = 9."),
                                make_q("b11_e7", "13 - 6 = ?", "7", "6", "8", "9", "Trừ đi 3 để được 10: 13 - 3 - 3 = 7."),
                                make_q("b11_e8", "14 - 5 = ?", "9", "8", "7", "10", "Trừ đi 4 để được 10: 14 - 4 - 1 = 9."),
                                make_q("b11_e9", "15 - 7 = ?", "8", "7", "9", "6", "Trừ đi 5 để được 10: 15 - 5 - 2 = 8."),
                                make_q("b11_e10", "16 - 8 = ?", "8", "7", "9", "6", "Trừ đi 6 để được 10: 16 - 6 - 2 = 8.")
                            ],
                            "medium": [
                                make_q("b11_m1", "Điền số thích hợp: 11 - ? = 8", "3", "2", "4", "5", "Ta có: 11 - 3 = 8."),
                                make_q("b11_m2", "Điền số thích hợp: 12 - ? = 6", "6", "5", "7", "8", "Ta có: 12 - 6 = 6."),
                                make_q("b11_m3", "Điền số thích hợp: 13 - ? = 8", "5", "4", "6", "7", "Ta có: 13 - 5 = 8."),
                                make_q("b11_m4", "Điền số thích hợp: 14 - ? = 7", "7", "6", "8", "9", "Ta có: 14 - 7 = 7."),
                                make_q("b11_m5", "So sánh: 13 - 5 ... 12 - 4", "=", "<", ">", "Không bằng nhau", "13 - 5 = 8. 12 - 4 = 8. Cả hai phép tính đều bằng 8."),
                                make_q("b11_m6", "So sánh: 15 - 7 ... 14 - 8", ">", "<", "=", "Nhỏ hơn hoặc bằng", "15 - 7 = 8. 14 - 8 = 6. Vì 8 > 6 nên 15 - 7 > 14 - 8."),
                                make_q("b11_m7", "Tìm X biết: 15 - X = 8", "7", "8", "9", "6", "X = 15 - 8 = 7."),
                                make_q("b11_m8", "Tính: 12 - 2 - 3 = ?", "7", "8", "6", "10", "Thực hiện lần lượt từ trái sang: 12 - 2 = 10; 10 - 3 = 7."),
                                make_q("b11_m9", "Tính: 15 - 5 - 4 = ?", "6", "7", "5", "10", "Thực hiện lần lượt từ trái sang: 15 - 5 = 10; 10 - 4 = 6."),
                                make_q("b11_m10", "Tính: 17 - 7 - 2 = ?", "8", "9", "7", "10", "Thực hiện lần lượt từ trái sang: 17 - 7 = 10; 10 - 2 = 8.")
                            ],
                            "hard": [
                                make_q("b11_h1", "Trên cây có 12 quả táo, gió thổi rụng mất 4 quả. Hỏi trên cây còn lại bao nhiêu quả?", "8 quả", "9 quả", "7 quả", "10 quả", "Phép tính: 12 - 4. Trừ đi 2 để được 10: 12 - 2 - 2 = 10 - 2 = 8."),
                                make_q("b11_h2", "Cửa hàng có 15 cái xe đạp, đã bán được 7 cái. Hỏi cửa hàng còn lại bao nhiêu cái xe đạp?", "8 cái", "7 cái", "9 cái", "6 cái", "Số xe đạp còn lại là: 15 - 7 = 8 cái."),
                                make_q("b11_h3", "An có 13 viên kẹo, An cho Bình 6 viên kẹo. Hỏi An còn lại bao nhiêu viên kẹo?", "7 viên", "6 viên", "8 viên", "9 viên", "Số kẹo còn lại của An là: 13 - 6 = 7 viên."),
                                make_q("b11_h4", "Lớp 2A có 14 học sinh tham gia học vẽ, trong đó có 8 bạn nữ. Hỏi có bao nhiêu bạn nam tham gia?", "6 bạn", "7 bạn", "8 bạn", "5 bạn", "Số bạn nam là: 14 - 8 = 6 bạn."),
                                make_q("b11_h5", "Đàn gà nhà Nam có 11 con, Nam đã bán đi 3 con. Hỏi nhà Nam còn lại bao nhiêu con gà?", "8 con", "7 con", "9 con", "10 con", "Số gà còn lại nhà Nam là: 11 - 3 = 8 con."),
                                make_q("b11_h6", "Hộp bút có 13 cây bút chì màu, Hà lấy ra dùng 5 cây. Hỏi trong hộp còn lại bao nhiêu cây bút?", "8 cây", "7 cây", "9 cây", "6 cây", "Số bút còn lại trong hộp là: 13 - 5 = 8 cây."),
                                make_q("b11_h7", "Bình có 16 tờ giấy màu, Bình đã dùng hết 8 tờ để gấp thuyền. Hỏi Bình còn lại bao nhiêu tờ?", "8 tờ", "7 tờ", "9 tờ", "10 tờ", "Số tờ giấy màu còn lại là: 16 - 8 = 8 tờ."),
                                make_q("b11_h8", "Trong rổ có 11 quả cam, mẹ lấy ra 4 quả để vắt nước. Hỏi trong rổ còn lại bao nhiêu quả cam?", "7 quả", "6 quả", "8 quả", "5 quả", "Số quả cam còn lại là: 11 - 4 = 7 quả cam."),
                                make_q("b11_h9", "Một đoạn dây dài 15cm, bé cắt đi một đoạn dài 6cm. Hỏi đoạn dây còn lại dài bao nhiêu xăng-ti-mét?", "9 cm", "8 cm", "10 cm", "7 cm", "Độ dài đoạn dây còn lại là: 15 - 6 = 9 cm."),
                                make_q("b11_h10", "Cuốn truyện có 18 trang, Nam đã đọc được 9 trang. Hỏi Nam còn phải đọc bao nhiêu trang nữa?", "9 trang", "8 trang", "10 trang", "7 trang", "Số trang Nam còn phải đọc là: 18 - 9 = 9 trang.")
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
                                make_q("b15_e1", "Đơn vị đo khối lượng viết tắt là gì?", "kg", "l", "cm", "m", "Ki-lô-gam viết tắt là kg."),
                                make_q("b15_e2", "Ki-lô-gam đọc là gì?", "Ki-lô-gam", "Lít", "Xăng-ti-mét", "Ki-lô-mét", "Từ kg được phát âm tiếng Việt là ki-lô-gam."),
                                make_q("b15_e3", "Dụng cụ nào dưới đây dùng để đo khối lượng?", "Cân", "Thước", "Ca đong", "Đồng hồ", "Chúng ta dùng Cân để cân đo khối lượng (nặng, nhẹ)."),
                                make_q("b15_e4", "Quả cân ghi '5 kg' nghĩa là gì?", "Quả cân nặng 5 ki-lô-gam", "Quả cân nặng 5 lít", "Quả cân dài 5 xăng-ti-mét", "Quả cân nặng 50 gam", "Chữ kg biểu thị đơn vị ki-lô-gam, vậy quả cân này nặng 5 ki-lô-gam."),
                                make_q("b15_e5", "Khi đĩa cân thăng bằng, kim ở giữa, đĩa bên trái có vật, đĩa bên phải có quả cân 2kg thì vật nặng bao nhiêu?", "2 kg", "1 kg", "3 kg", "4 kg", "Khi cân thăng bằng, khối lượng vật bằng khối lượng quả cân: 2kg."),
                                make_q("b15_e6", "Vật nào dưới đây thường nặng hơn 1kg?", "Bao gạo lớn nhà ăn", "Một chiếc nhãn vở", "Một cái bút chì", "Một chiếc lá cây", "Bao gạo lớn thường nặng 10kg, 20kg trở lên, nặng hơn nhiều so với 1kg."),
                                make_q("b15_e7", "So sánh: Vật nặng 3kg với vật nặng 5kg, vật nào nhẹ hơn?", "Vật nặng 3kg", "Vật nặng 5kg", "Bằng nhau", "Không so sánh được", "Vì 3 < 5 nên vật nặng 3kg nhẹ hơn vật nặng 5kg."),
                                make_q("b15_e8", "Quả đu đủ nặng 2kg, quả dưa hấu nặng 3kg. Quả nào nặng hơn?", "Quả dưa hấu", "Quả đu đủ", "Bằng nhau", "Không so sánh được", "Vì 3kg > 2kg nên quả dưa hấu nặng hơn."),
                                make_q("b15_e9", "Chọn nhận xét đúng về một quả táo nhỏ.", "Nhẹ hơn 1kg", "Nặng hơn 1kg", "Nặng đúng 10kg", "Nặng bằng 50kg", "Quả táo nhỏ rất nhẹ, thường nhẹ hơn nhiều so với 1kg."),
                                make_q("b15_e10", "Bao xi măng nặng 50kg, bao gạo nặng 10kg. Hỏi bao nào nhẹ hơn?", "Bao gạo", "Bao xi măng", "Bằng nhau", "Không so sánh được", "Vì 10kg < 50kg nên bao gạo nhẹ hơn.")
                            ],
                            "medium": [
                                make_q("b15_m1", "5kg + 8kg = ?", "13 kg", "12 kg", "14 kg", "15 kg", "Cộng số: 5 + 8 = 13, thêm đơn vị kg vào sau kết quả."),
                                make_q("b15_m2", "15kg - 7kg = ?", "8 kg", "9 kg", "7 kg", "10 kg", "Trừ số: 15 - 7 = 8, thêm đơn vị kg vào sau kết quả."),
                                make_q("b15_m3", "12kg + 6kg = ?", "18 kg", "17 kg", "19 kg", "16 kg", "12 + 6 = 18. Vậy kết quả là 18kg."),
                                make_q("b15_m4", "20kg - 8kg = ?", "12 kg", "11 kg", "13 kg", "10 kg", "20 - 8 = 12. Vậy kết quả là 12kg."),
                                make_q("b15_m5", "Đĩa cân bên trái có quả bí ngô, đĩa bên phải có 2 quả cân loại 2kg và 1 quả cân loại 1kg. Khi cân thăng bằng, quả bí ngô nặng bao nhiêu?", "5 kg", "3 kg", "4 kg", "2 kg", "Khối lượng quả bí ngô bằng tổng khối lượng các quả cân: 2kg + 2kg + 1kg = 5kg."),
                                make_q("b15_m6", "Để cân một con gà nặng 3kg bằng cân đĩa, người ta đặt lên đĩa cân bên kia những quả cân nào để thăng bằng?", "1 quả 2kg và 1 quả 1kg", "3 quả 2kg", "1 quả 5kg", "2 quả 1kg", "Tổng khối lượng quả cân phải bằng 3kg: 2kg + 1kg = 3kg."),
                                make_q("b15_m7", "So sánh: 9kg + 4kg ... 15kg - 2kg", "=", "<", ">", "Không so sánh được", "9kg + 4kg = 13kg. 15kg - 2kg = 13kg. Cả hai bằng nhau."),
                                make_q("b15_m8", "So sánh: 8kg + 7kg ... 12kg + 4kg", "<", ">", "=", "Khác nhau", "8kg + 7kg = 15kg. 12kg + 4kg = 16kg. Vì 15 < 16 nên phép thứ nhất nhỏ hơn."),
                                make_q("b15_m9", "Tìm X biết: X + 5kg = 12kg", "7 kg", "8 kg", "6 kg", "17 kg", "X = 12kg - 5kg = 7kg."),
                                make_q("b15_m10", "Tìm Y biết: Y - 6kg = 8kg", "14 kg", "2 kg", "12 kg", "8 kg", "Y = 8kg + 6kg = 14kg.")
                            ],
                            "hard": [
                                make_q("b15_h1", "Bao gạo nặng 15kg. Người ta lấy ra 7kg gạo. Hỏi bao gạo còn lại bao nhiêu ki-lô-gam?", "8 kg", "9 kg", "7 kg", "10 kg", "Phép tính: 15kg - 7kg = 8kg."),
                                make_q("b15_h2", "Bao ngô nặng 25kg, bao thóc nặng hơn bao ngô 5kg. Hỏi bao thóc nặng bao nhiêu ki-lô-gam?", "30 kg", "20 kg", "25 kg", "35 kg", "Bao thóc nặng hơn nên thực hiện phép cộng: 25kg + 5kg = 30kg."),
                                make_q("b15_h3", "Con ngỗng nặng 6kg, con gà nặng kém con ngỗng 4kg. Hỏi con gà nặng bao nhiêu ki-lô-gam?", "2 kg", "3 kg", "10 kg", "4 kg", "Con gà nặng kém hơn nên thực hiện phép trừ: 6kg - 4kg = 2kg."),
                                make_q("b15_h4", "Cả gà và vịt cân nặng 5kg. Biết con gà cân nặng 3kg. Hỏi con vịt cân nặng bao nhiêu ki-lô-gam?", "2 kg", "3 kg", "8 kg", "1 kg", "Cân nặng của con vịt là: 5kg - 3kg = 2kg."),
                                make_q("b15_h5", "Mẹ mua 5kg ổi và 8kg xoài. Hỏi mẹ đã mua tất cả bao nhiêu ki-lô-gam hoa quả?", "13 kg", "12 kg", "14 kg", "3 kg", "Tổng khối lượng hoa quả mẹ mua là: 5kg + 8kg = 13kg."),
                                make_q("b15_h6", "Con lợn nặng 50kg, con chó nặng kém con lợn 38kg. Hỏi con chó nặng bao nhiêu ki-lô-gam?", "12 kg", "18 kg", "22 kg", "88 kg", "Khối lượng con chó là: 50kg - 38kg = 12kg."),
                                make_q("b15_h7", "Cửa hàng có 35kg đường, đã bán đi 15kg. Hỏi cửa hàng còn lại bao nhiêu ki-lô-gam đường?", "20 kg", "15 kg", "25 kg", "50 kg", "Khối lượng đường còn lại là: 35kg - 15kg = 20kg."),
                                make_q("b15_h8", "Thùng thứ nhất đựng 12kg sơn, thùng thứ hai đựng nhiều hơn thùng thứ nhất 5kg sơn. Hỏi thùng thứ hai đựng bao nhiêu ki-lô-gam sơn?", "17 kg", "16 kg", "7 kg", "12 kg", "Khối lượng sơn thùng thứ hai đựng là: 12kg + 5kg = 17kg."),
                                make_q("b15_h9", "Có 3 quả cân loại 2kg, 5kg và 1kg. Tổng khối lượng của cả 3 quả cân này là bao nhiêu?", "8 kg", "7 kg", "9 kg", "10 kg", "Tổng khối lượng: 2kg + 5kg + 1kg = 8kg."),
                                make_q("b15_h10", "Bé Nam nặng 22kg, bé Bình nặng hơn bé Nam 3kg. Hỏi bé Bình nặng bao nhiêu ki-lô-gam?", "25 kg", "19 kg", "22 kg", "28 kg", "Cân nặng của bé Bình là: 22kg + 3kg = 25kg.")
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
                                make_q("b16_e1", "Chữ l trong toán đo lường viết tắt cho đơn vị nào?", "Lít", "Ki-lô-gam", "Xăng-ti-mét", "Đê-xi-mét", "Chữ l viết tắt cho đơn vị Lít."),
                                make_q("b16_e2", "Lít là đơn vị dùng để đo gì?", "Dung tích hoặc sức chứa chất lỏng", "Chiều dài của bàn học", "Cân nặng của em bé", "Thời gian làm bài tập", "Lít dùng để đo sức chứa chất lỏng (nước, dầu, sữa,...)."),
                                make_q("b16_e3", "Vật nào dưới đây thường chứa được nhiều nước nhất?", "Cái bể chứa nước lớn", "Cái ca đong 1 lít", "Cái cốc thủy tinh nhỏ", "Cái bát ăn cơm", "Bể chứa nước lớn chứa hàng trăm lít nước, nhiều nhất."),
                                make_q("b16_e4", "Ca đong nước ghi '1 l' nghĩa là ca đong chứa được bao nhiêu nước?", "1 lít nước", "10 lít nước", "1 ki-lô-gam nước", "100 lít nước", "Ghi '1 l' tức là dung tích ca đong chứa tối đa 1 lít."),
                                make_q("b16_e5", "So sánh: Ca 2 lít và ca 5 lít, ca nào chứa được nhiều nước hơn?", "Ca 5 lít", "Ca 2 lít", "Bằng nhau", "Không so sánh được", "Vì 5 > 2 nên ca 5 lít chứa được nhiều hơn."),
                                make_q("b16_e6", "Dụng cụ nào dưới đây thường dùng để đong nước theo đơn vị Lít?", "Ca đong có chia vạch", "Thước dây", "Cân bàn", "Nhiệt kế", "Chúng ta dùng các loại ca đong, chai hoặc can có vạch chia lít để đong chất lỏng."),
                                make_q("b16_e7", "Chất nào dưới đây thường được đo bằng đơn vị Lít?", "Nước ngọt", "Gạo tẻ", "Sách giáo khoa", "Quả bí ngô", "Nước ngọt là chất lỏng, được đo bằng lít. Gạo, quả bí đo bằng kg, sách đo bằng quyển."),
                                make_q("b16_e8", "Bình nước lọc lớn đặt ở văn phòng lớp học thường chứa khoảng bao nhiêu lít?", "20 lít", "1 lít", "1000 lít", "500 lít", "Bình nước lọc lớn dùng chung thường chứa khoảng 19 hoặc 20 lít."),
                                make_q("b16_e9", "Hộp sữa giấy bé uống hàng ngày ở trường thường có dung tích thế nào?", "Ít hơn 1 lít", "Nhiều hơn 1 lít", "Đúng bằng 10 lít", "Đúng bằng 100 lít", "Hộp sữa giấy học đường rất nhỏ (khoảng 180ml), ít hơn nhiều so với 1 lít."),
                                make_q("b16_e10", "So sánh: Can 10 lít đựng đầy nước với can 5 lít đựng đầy nước, can nào nặng hơn?", "Can 10 lít", "Can 5 lít", "Bằng nhau", "Không so sánh được", "Can chứa nhiều nước hơn (10l > 5l) sẽ nặng hơn.")
                            ],
                            "medium": [
                                make_q("b16_m1", "5l + 8l = ?", "13 lít", "12 lít", "14 lít", "15 lít", "Cộng số: 5 + 8 = 13, thêm đơn vị lít vào sau."),
                                make_q("b16_m2", "15l - 7l = ?", "8 lít", "9 lít", "7 lít", "10 lít", "Trừ số: 15 - 7 = 8, thêm đơn vị lít vào sau."),
                                make_q("b16_m3", "12l + 6l = ?", "18 lít", "17 lít", "19 lít", "16 lít", "12 + 6 = 18. Vậy kết quả là 18 lít."),
                                make_q("b16_m4", "20l - 8l = ?", "12 lít", "11 lít", "13 lít", "10 lít", "20 - 8 = 12. Vậy kết quả là 12 lít."),
                                make_q("b16_m5", "Rót đầy 1 ca 5 lít and 1 ca 2 lít nước rồi đổ chung vào một xô. Hỏi trong xô có tất cả bao nhiêu lít nước?", "7 lít", "6 lít", "8 lít", "5 lít", "Tổng số nước đổ vào xô là: 5 + 2 = 7 lít."),
                                make_q("b16_m6", "Đổ đầy 10 lít nước từ một bình lớn vào các chai 2 lít. Hỏi đổ đầy được bao nhiêu chai?", "5 chai", "4 chai", "6 chai", "2 chai", "Ta có: 10 : 2 = 5 chai."),
                                make_q("b16_m7", "So sánh: 9l + 4l ... 15l - 2l", "=", "<", ">", "Không so sánh được", "9l + 4l = 13l. 15l - 2l = 13l. Hai kết quả bằng nhau."),
                                make_q("b16_m8", "So sánh: 8l + 7l ... 12l + 4l", "<", ">", "=", "Khác nhau", "8l + 7l = 15l. 12l + 4l = 16l. Vì 15 < 16 nên dấu cần điền là <."),
                                make_q("b16_m9", "Tìm X biết: X + 5l = 12l", "7 lít", "8 lít", "6 lít", "17 lít", "X = 12l - 5l = 7 lít."),
                                make_q("b16_m10", "Tìm Y biết: Y - 6l = 8l", "14 lít", "2 lít", "12 lít", "8 lít", "Y = 8l + 6l = 14 lít.")
                            ],
                            "hard": [
                                make_q("b16_h1", "Một can chứa 10 lít nước. Người ta rót sang ca đong 3 lít đầy nước. Hỏi trong can còn lại bao nhiêu lít nước?", "7 lít", "6 lít", "8 lít", "5 lít", "Số lít nước còn lại trong can là: 10 - 3 = 7 lít."),
                                make_q("b16_h2", "Thùng thứ nhất đựng 18 lít dầu, thùng thứ hai đựng ít hơn thùng thứ nhất 5 lít dầu. Hỏi thùng thứ hai đựng bao nhiêu lít dầu?", "13 lít", "12 lít", "23 lít", "5 lít", "Số lít dầu thùng thứ hai đựng là: 18 - 5 = 13 lít."),
                                make_q("b16_h3", "Nhà Nam một ngày dùng hết 15 lít sữa, nhà Bình dùng nhiều hơn nhà Nam 7 lít sữa. Hỏi nhà Bình dùng hết bao nhiêu lít sữa?", "22 lít", "8 lít", "12 lít", "20 lít", "Số lít sữa nhà Bình dùng là: 15 + 7 = 22 lít."),
                                make_q("b16_h4", "Bể nước có 50 lít nước, bố bơm thêm vào bể 30 lít nữa. Hỏi lúc này bể có bao nhiêu lít nước?", "80 lít", "20 lít", "70 lít", "90 lít", "Tổng số lít nước trong bể là: 50 + 30 = 80 lít."),
                                make_q("b16_h5", "Một xô nước đựng được 12 lít nước, một can nước đựng được ít hơn xô nước 4 lít. Hỏi can nước đựng được bao nhiêu lít nước?", "8 lít", "16 lít", "6 lít", "4 lít", "Số lít nước can đựng được là: 12 - 4 = 8 lít."),
                                make_q("b16_h6", "Can A đựng 8 lít nước ngọt, can B đựng 12 lít nước ngọt. Người ta đổ chung cả hai can vào một thùng. Hỏi thùng có bao nhiêu lít?", "20 lít", "4 lít", "18 lít", "22 lít", "Tổng số nước ngọt là: 8 + 12 = 20 lít."),
                                make_q("b16_h7", "Một chai dầu ăn có 2 lít dầu. Mẹ dùng hết 1 lít để chiên bánh. Hỏi trong chai còn lại bao nhiêu lít dầu?", "1 lít", "0 lít", "2 lít", "3 lít", "Số dầu ăn còn lại là: 2 - 1 = 1 lít."),
                                make_q("b16_h8", "Bình xăng xe máy chứa được 4 lít xăng. Bố đổ thêm 3 lít xăng thì đầy bình. Hỏi trước khi đổ, trong bình có bao nhiêu lít xăng?", "1 lít", "2 lít", "3 lít", "0 lít", "Số lít xăng có sẵn trong bình là: 4 - 3 = 1 lít."),
                                make_q("b16_h9", "Có hai cái can, can thứ nhất đựng 9 lít nước, can thứ hai đựng 6 lít nước. Hỏi can thứ nhất đựng nhiều hơn can thứ hai bao nhiêu lít?", "3 lít", "15 lít", "2 lít", "4 lít", "Hiệu thể hiện can thứ nhất nhiều hơn: 9 - 6 = 3 lít."),
                                make_q("b16_h10", "Một thùng đựng dầu có 45 lít dầu, người ta đã bán đi 20 lít dầu. Hỏi trong thùng còn lại bao nhiêu lít dầu?", "25 lít", "20 lít", "15 lít", "30 lít", "Số lít dầu còn lại trong thùng là: 45 - 20 = 25 lít.")
                            ]
                        }
                    },
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
                                make_q("b21_e1", "Hình tam giác có mấy cạnh?", "3 cạnh", "4 cạnh", "5 cạnh", "2 cạnh", "Hình tam giác gồm có 3 cạnh nối các đỉnh với nhau."),
                                make_q("b21_e2", "Hình tam giác có mấy đỉnh?", "3 đỉnh", "4 đỉnh", "2 đỉnh", "5 đỉnh", "Hình tam giác gồm có 3 góc và 3 đỉnh."),
                                make_q("b21_e3", "Hình tứ giác có mấy cạnh?", "4 cạnh", "3 cạnh", "5 cạnh", "2 cạnh", "Chữ 'tứ' nghĩa là bốn. Hình tứ giác có 4 cạnh."),
                                make_q("b21_e4", "Hình tứ giác có mấy đỉnh?", "4 đỉnh", "3 đỉnh", "5 đỉnh", "2 đỉnh", "Hình tứ giác có 4 đỉnh nối liền các cạnh."),
                                make_q("b21_e5", "Hình tam giác có bao nhiêu góc?", "3 góc", "4 góc", "5 góc", "2 góc", "Hình tam giác có 3 đỉnh, tương ứng với 3 góc."),
                                make_q("b21_e6", "Hình tứ giác có bao nhiêu góc?", "4 góc", "3 góc", "5 góc", "2 góc", "Hình tứ giác có 4 đỉnh, tương ứng với 4 góc."),
                                make_q("b21_e7", "Hình vuông là một hình có mấy cạnh?", "4 cạnh", "3 cạnh", "5 cạnh", "6 cạnh", "Hình vuông là một trường hợp đặc biệt của hình tứ giác, nên nó có 4 cạnh bằng nhau."),
                                make_q("b21_e8", "Hình chữ nhật là một hình có mấy cạnh?", "4 cạnh", "3 cạnh", "5 cạnh", "6 cạnh", "Hình chữ nhật là một loại hình tứ giác, do đó có 4 cạnh."),
                                make_q("b21_e9", "Hình phẳng nào dưới đây có ít cạnh nhất?", "Hình tam giác", "Hình tứ giác", "Hình ngũ giác", "Hình vuông", "Hình tam giác có 3 cạnh (ít nhất), hình tứ giác và vuông có 4 cạnh, ngũ giác có 5 cạnh."),
                                make_q("b21_e10", "Bánh chưng ngày Tết thường có hình dạng phẳng giống hình gì?", "Hình tứ giác", "Hình tam giác", "Hình tròn", "Hình bầu dục", "Bánh chưng vuông vắn có 4 cạnh, tương ứng với hình tứ giác (hình vuông).")
                            ],
                            "medium": [
                                make_q("b21_m1", "Hình vuông và hình chữ nhật đều thuộc loại hình nào?", "Hình tứ giác", "Hình tam giác", "Hình tròn", "Hình đa giác 5 cạnh", "Cả hai hình đều có 4 cạnh và 4 đỉnh, nên đều thuộc hình tứ giác."),
                                make_q("b21_m2", "Hình nào dưới đây có 4 cạnh?", "Hình tứ giác", "Hình tam giác", "Hình tròn", "Hình năm cạnh", "Hình tứ giác là hình phẳng khép kín có đúng 4 cạnh thẳng."),
                                make_q("b21_m3", "Một hình có 3 đỉnh và 3 cạnh thẳng là hình gì?", "Hình tam giác", "Hình tứ giác", "Hình vuông", "Hình tròn", "Hình có 3 đỉnh và 3 cạnh thẳng là hình tam giác."),
                                make_q("b21_m4", "Một hình có 4 đỉnh và 4 cạnh thẳng là hình gì?", "Hình tứ giác", "Hình tam giác", "Hình tròn", "Hình ngôi sao", "Hình có 4 đỉnh và 4 cạnh thẳng là hình tứ giác."),
                                make_q("b21_m5", "Hình tam giác ABC có các cạnh AB, BC, CA. Có tất cả bao nhiêu cạnh?", "3 cạnh", "4 cạnh", "2 cạnh", "6 cạnh", "Tên cạnh tương ứng với 3 đoạn thẳng AB, BC, CA. Vậy có 3 cạnh."),
                                make_q("b21_m6", "Hình tứ giác MNPQ có các đỉnh M, N, P, Q. Có tất cả bao nhiêu đỉnh?", "4 đỉnh", "3 đỉnh", "8 đỉnh", "5 đỉnh", "Các đỉnh của tứ giác là M, N, P, Q. Có tất cả 4 đỉnh."),
                                make_q("b21_m7", "Để ghép một hình tứ giác từ các đoạn thẳng nhỏ, ta cần ít nhất bao nhiêu đoạn thẳng?", "4 đoạn thẳng", "3 đoạn thẳng", "5 đoạn thẳng", "2 đoạn thẳng", "Tứ giác cần có 4 cạnh, nên cần ít nhất 4 đoạn thẳng."),
                                make_q("b21_m8", "Nếu ta cắt một góc của hình tam giác bằng một đường thẳng, phần hình còn lại có thể là hình gì?", "Hình tứ giác", "Hình tròn", "Hình tam giác đều", "Đoạn thẳng", "Khi cắt đi một đỉnh, hình tam giác cũ sẽ bị thêm một cạnh mới, trở thành hình có 4 cạnh (hình tứ giác)."),
                                make_q("b21_m9", "Cánh buồm của con thuyền thường có hình dạng giống hình phẳng nào?", "Hình tam giác", "Hình tứ giác", "Hình tròn", "Hình vuông", "Cánh buồm đón gió thường có cấu trúc 3 góc, trông giống hình tam giác."),
                                make_q("b21_m10", "Khung ảnh hình chữ nhật có bao nhiêu góc vuông?", "4 góc vuông", "3 góc vuông", "2 góc vuông", "0 góc vuông", "Hình chữ nhật có đặc điểm là có đúng 4 góc vuông ở 4 đỉnh.")
                            ],
                            "hard": [
                                make_q("b21_h1", "Một hình tam giác có độ dài các cạnh lần lượt là 3cm, 4cm, 5cm. Chu vi của hình tam giác đó là bao nhiêu?", "12 cm", "10 cm", "11 cm", "14 cm", "Chu vi hình tam giác bằng tổng độ dài 3 cạnh: 3 + 4 + 5 = 12 cm."),
                                make_q("b21_h2", "Một hình tứ giác có độ dài các cạnh lần lượt là 2cm, 3cm, 4cm, 5cm. Chu vi của hình tứ giác đó là bao nhiêu?", "14 cm", "12 cm", "10 cm", "15 cm", "Chu vi hình tứ giác bằng tổng độ dài 4 cạnh: 2 + 3 + 4 + 5 = 14 cm."),
                                make_q("b21_h3", "Một hình tam giác có 3 cạnh bằng nhau, mỗi cạnh dài 4cm. Chu vi hình tam giác đó là bao nhiêu?", "12 cm", "8 cm", "16 cm", "10 cm", "Chu vi tam giác là: 4 + 4 + 4 = 12 cm (hoặc 4 x 3 = 12 cm)."),
                                make_q("b21_h4", "Một hình tứ giác có 4 cạnh bằng nhau (hình vuông), mỗi cạnh dài 3cm. Chu vi hình tứ giác đó là bao nhiêu?", "12 cm", "9 cm", "6 cm", "15 cm", "Chu vi hình vuông đó là: 3 + 3 + 3 + 3 = 12 cm (hoặc 3 x 4 = 12 cm)."),
                                make_q("b21_h5", "Chu vi của một hình tam giác là 15cm. Biết tổng độ dài hai cạnh đầu là 10cm. Cạnh thứ ba dài bao nhiêu xăng-ti-mét?", "5 cm", "6 cm", "4 cm", "7 cm", "Độ dài cạnh thứ ba = Chu vi - Tổng hai cạnh còn lại = 15 - 10 = 5 cm."),
                                make_q("b21_h6", "Một hình chữ nhật có chiều dài 5cm, chiều rộng 3cm. Chu vi hình chữ nhật đó là bao nhiêu?", "16 cm", "8 cm", "15 cm", "10 cm", "Chu vi hình chữ nhật bằng tổng độ dài 4 cạnh: 5 + 3 + 5 + 3 = 16 cm."),
                                make_q("b21_h7", "Có bao nhiêu hình tam giác trong hình vẽ gồm hai hình tam giác nhỏ ghép sát nhau tạo thành một hình tam giác lớn?", "3 hình", "2 hình", "4 hình", "1 hình", "Có 2 hình tam giác nhỏ và 1 hình tam giác lớn bao ngoài. Tổng cộng có 3 hình tam giác."),
                                make_q("b21_h8", "Có bao nhiêu hình tứ giác trong hình vẽ gồm hai hình chữ nhật nhỏ ghép sát nhau tạo thành một hình chữ nhật lớn?", "3 hình", "2 hình", "4 hình", "1 hình", "Có 2 hình chữ nhật nhỏ và 1 hình chữ nhật lớn bao ngoài. Tổng cộng có 3 hình tứ giác."),
                                make_q("b21_h9", "Chu vi hình tam giác ABC là 18cm. Biết cạnh AB = 5cm, BC = 6cm. Độ dài cạnh AC là bao nhiêu xăng-ti-mét?", "7 cm", "8 cm", "9 cm", "11 cm", "Độ dài cạnh AC = 18 - 5 - 6 = 7 cm."),
                                make_q("b21_h10", "Một sợi dây đồng uốn thành hình vuông có cạnh dài 5cm. Hỏi sợi dây đồng đó dài bao nhiêu xăng-ti-mét?", "20 cm", "10 cm", "15 cm", "25 cm", "Sợi dây đồng dài bằng chu vi hình vuông đó: 5 x 4 = 20 cm.")
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
                                make_q("b22_e1", "Quả bóng đá có hình dạng khối gì?", "Khối cầu", "Khối trụ", "Khối lập phương", "Khối chữ nhật", "Quả bóng đá tròn đều nên có hình dạng khối cầu."),
                                make_q("b22_e2", "Hộp sữa đặc có hình dạng khối gì?", "Khối trụ", "Khối cầu", "Khối vuông", "Khối tam giác", "Hộp sữa đặc có hai mặt phẳng tròn và một mặt cong bao quanh nên có hình dạng khối trụ."),
                                make_q("b22_e3", "Lon nước ngọt Coca-Cola có hình dạng khối gì?", "Khối trụ", "Khối cầu", "Khối lập phương", "Khối chữ nhật", "Lon nước ngọt có hình ống tròn dài, hai đầu là vòng tròn phẳng, đây là khối trụ."),
                                make_q("b22_e4", "Viên bi thủy tinh có hình dạng khối gì?", "Khối cầu", "Khối trụ", "Khối lập phương", "Khối chữ nhật", "Viên bi tròn đều về mọi phía nên có hình dạng khối cầu."),
                                make_q("b22_e5", "Trái Đất của chúng ta có hình dạng gần giống khối gì?", "Khối cầu", "Khối trụ", "Khối lập phương", "Khối nón", "Trái Đất tròn đều, lơ lửng ngoài không gian, gần giống khối cầu."),
                                make_q("b22_e6", "Cuộn băng dính tròn dày có hình dạng khối gì?", "Khối trụ", "Khối cầu", "Khối chữ nhật", "Khối tam giác", "Cuộn băng dính tròn có hình ống trụ ngắn, thuộc dạng khối trụ."),
                                make_q("b22_e7", "Quả bóng bàn có hình dạng khối gì?", "Khối cầu", "Khối trụ", "Khối hộp", "Khối chóp", "Quả bóng bàn tròn xoe, lăn được mọi hướng nên có hình dạng khối cầu."),
                                make_q("b22_e8", "Cột đình hình ống tròn thẳng đứng có hình dạng khối gì?", "Khối trụ", "Khối cầu", "Khối vuông", "Khối lập phương", "Cột đình thẳng đứng, tròn đều từ trên xuống dưới là khối trụ."),
                                make_q("b22_e9", "Hộp chè hình ống tròn có hình dạng khối gì?", "Khối trụ", "Khối cầu", "Khối chữ nhật", "Khối lập phương", "Hộp chè ống tròn có hai mặt phẳng tròn ở nắp và đáy, đó là khối trụ."),
                                make_q("b22_e10", "Quả địa cầu mô hình trong lớp học có hình dạng khối gì?", "Khối cầu", "Khối trụ", "Khối chóp", "Khối lập phương", "Quả địa cầu tròn mô phỏng Trái Đất có hình dạng khối cầu.")
                            ],
                            "medium": [
                                make_q("b22_m1", "Đồ vật nào dưới đây không có hình dạng khối trụ?", "Quả bóng bàn", "Lon nước ngọt", "Hộp bút hình ống tròn", "Cuộn băng dính tròn", "Quả bóng bàn có hình dạng khối cầu, không phải khối trụ."),
                                make_q("b22_m2", "Đồ vật nào dưới đây không có hình dạng khối cầu?", "Lon nước ngọt", "Quả bóng đá", "Viên bi thủy tinh", "Quả địa cầu", "Lon nước ngọt có hình dạng khối trụ, các đồ vật khác đều tròn xoe dạng khối cầu."),
                                make_q("b22_m3", "Khối nào dưới đây có thể lăn được về mọi phía (trước, sau, trái, phải)?", "Khối cầu", "Khối trụ", "Khối lập phương", "Khối hộp chữ nhật", "Khối cầu tròn đều nên lăn được mọi phía dễ dàng."),
                                make_q("b22_m4", "Khối trụ đứng thẳng có bao nhiêu mặt phẳng tròn ở hai đầu?", "2 mặt", "1 mặt", "3 mặt", "0 mặt", "Khối trụ có hai mặt phẳng hình tròn ở phần nắp trên và đáy dưới."),
                                make_q("b22_m5", "Đặc điểm nào dưới đây là của khối cầu?", "Tròn đều và không có mặt phẳng nào", "Có hai mặt phẳng tròn", "Có 6 mặt vuông bằng nhau", "Có 4 đỉnh nhọn", "Khối cầu hoàn toàn cong tròn, không có mặt phẳng hay đỉnh nào cả."),
                                make_q("b22_m6", "Nếu ta đặt nằm ngang một khối trụ trên mặt bàn phẳng, ta có thể làm gì?", "Lăn khối trụ đi", "Chồng khối hình khác lên mặt cong", "Làm nó đứng yên mãi", "Cắt nó thành hình tam giác", "Khi đặt nằm ngang, khối trụ sẽ tiếp xúc mặt bàn bằng mặt cong nên có thể lăn đi được."),
                                make_q("b22_m7", "Nếu ta đặt đứng thẳng một khối trụ trên mặt bàn phẳng, ta có thể làm gì?", "Xếp chồng khối khác vững chãi lên trên nắp nó", "Lăn nó về mọi phía dễ dàng", "Đặt nó trên mặt cong", "Biến nó thành khối cầu", "Mặt trên của khối trụ đứng là mặt phẳng, giúp ta xếp chồng vật khác lên vững vàng."),
                                make_q("b22_m8", "Điểm giống nhau giữa khối trụ và khối cầu là gì?", "Đều có mặt cong và có thể lăn được", "Đều có mặt phẳng tròn", "Đều có 8 đỉnh", "Đều tròn xoe về mọi phía", "Cả hai đều có bề mặt cong giúp chúng có thể lăn được (khối trụ lăn khi nằm ngang, khối cầu lăn tự do)."),
                                make_q("b22_m9", "Hộp bút hình ống tròn có hình dạng khối gì?", "Khối trụ", "Khối cầu", "Khối hộp chữ nhật", "Khối tam giác", "Hộp bút hình ống tròn thẳng dài là khối trụ."),
                                make_q("b22_m10", "Quả cam tròn trịa có hình dạng giống khối gì?", "Khối cầu", "Khối trụ", "Khối lập phương", "Khối chữ nhật", "Quả cam tròn đều giống khối cầu.")
                            ],
                            "hard": [
                                make_q("b22_h1", "Có bao nhiêu khối trụ trong hình vẽ gồm 3 lon nước chồng lên nhau và 2 quả bóng bên cạnh?", "3 khối trụ", "2 khối trụ", "5 khối trụ", "1 khối trụ", "Chỉ có 3 lon nước là khối trụ. 2 quả bóng là khối cầu."),
                                make_q("b22_h2", "Có bao nhiêu khối cầu trong hình vẽ gồm 4 viên bi và 2 hộp sữa đặc?", "4 khối cầu", "2 khối cầu", "6 khối cầu", "0 khối cầu", "Chỉ có 4 viên bi là khối cầu. 2 hộp sữa là khối trụ."),
                                make_q("b22_h3", "Bé xếp chồng 5 khối lập phương và 2 khối trụ đứng thẳng lên nhau. Hỏi bé có tất cả bao nhiêu khối hình?", "7 khối hình", "5 khối hình", "2 khối hình", "10 khối hình", "Tổng số khối hình bé xếp là: 5 + 2 = 7 khối."),
                                make_q("b22_h4", "Trong các hình sau: Hộp diêm, Quả bóng rổ, Lon sữa, Bao diêm. Có bao nhiêu đồ vật có hình dạng khối cầu?", "1 đồ vật", "2 đồ vật", "3 đồ vật", "4 đồ vật", "Chỉ có Quả bóng rổ là khối cầu. Hộp diêm, bao diêm là khối hộp chữ nhật, lon sữa là khối trụ."),
                                make_q("b22_h5", "Trong các hình sau: Hộp chè ống tròn, Quả dưa hấu tròn, Lon bia, Hộp sữa ống tròn. Có bao nhiêu đồ vật có hình dạng khối trụ?", "3 đồ vật", "2 đồ vật", "4 đồ vật", "1 đồ vật", "Có 3 đồ vật khối trụ: Hộp chè, lon bia, hộp sữa ống tròn. Quả dưa hấu tròn là khối cầu."),
                                make_q("b22_h6", "Người ta xếp 4 khối trụ nằm ngang nối đuôi nhau. Mỗi khối trụ dài 5cm. Hỏi cả hàng dài bao nhiêu xăng-ti-mét?", "20 cm", "15 cm", "16 cm", "25 cm", "Tổng độ dài là: 5 + 5 + 5 + 5 = 20 cm (hoặc 5 x 4 = 20 cm)."),
                                make_q("b22_h7", "Hình khối nào có thể vừa đứng vững (không lăn) vừa lăn được tùy thuộc cách ta đặt nó?", "Khối trụ", "Khối cầu", "Khối lập phương", "Khối hộp chữ nhật", "Khối trụ đặt đứng thì đứng vững, đặt nằm ngang thì lăn được. Khối cầu luôn lăn, khối lập phương luôn đứng vững."),
                                make_q("b22_h8", "Nếu ta cắt đôi quả bóng bàn tròn đều, mặt cắt ở chỗ chia đôi sẽ có hình gì?", "Hình tròn", "Hình vuông", "Hình tam giác", "Hình chữ nhật", "Mặt cắt của khối cầu luôn là hình tròn."),
                                make_q("b22_h9", "Bé có 3 viên bi khối cầu và 5 lon sữa khối trụ. Hỏi bé có tất cả bao nhiêu đồ vật?", "8 đồ vật", "15 đồ vật", "2 đồ vật", "5 đồ vật", "Tổng số đồ vật của bé: 3 + 5 = 8 đồ vật."),
                                make_q("b22_h10", "Khối nào dưới đây giúp xếp chồng lên nhau cao nhất mà vẫn vững vàng theo chiều thẳng đứng?", "Khối trụ", "Khối cầu", "Khối nón", "Khối lăng trụ nghiêng", "Khối trụ có mặt phẳng tròn ở hai đầu giúp giữ thăng bằng tốt khi xếp thẳng đứng. Khối cầu không xếp chồng lên nhau được.")
                            ]
                        }
                    },
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
                                make_q("b25_e1", "Một ngày có bao nhiêu giờ?", "24 giờ", "12 giờ", "60 giờ", "20 giờ", "Theo quy ước quốc tế, một ngày đêm kéo dài đúng 24 giờ."),
                                make_q("b25_e2", "Một giờ có bao nhiêu phút?", "60 phút", "24 phút", "12 phút", "100 phút", "Theo đơn vị đo thời gian, cứ 1 giờ bằng 60 phút."),
                                make_q("b25_e3", "Kim ngắn của đồng hồ dùng để chỉ gì?", "Chỉ giờ", "Chỉ phút", "Chỉ giây", "Chỉ ngày", "Kim ngắn chạy chậm nhất dùng để chỉ giờ."),
                                make_q("b25_e4", "Kim dài của đồng hồ dùng để chỉ gì?", "Chỉ phút", "Chỉ giờ", "Chỉ giây", "Chỉ năm", "Kim dài chạy nhanh hơn kim ngắn dùng để chỉ phút."),
                                make_q("b25_e5", "Khi kim dài chỉ số 12, kim ngắn chỉ số 3 thì đồng hồ chỉ mấy giờ?", "3 giờ đúng", "12 giờ đúng", "3 giờ 12 phút", "12 giờ 3 phút", "Kim dài chỉ số 12 là giờ đúng, kim ngắn chỉ số 3 là 3 giờ. Vậy đồng hồ chỉ 3 giờ đúng."),
                                make_q("b25_e6", "Một tuần lễ có bao nhiêu ngày?", "7 ngày", "5 ngày", "10 ngày", "24 ngày", "Một tuần lễ gồm 7 ngày: từ thứ Hai đến Chủ nhật."),
                                make_q("b25_e7", "Sau ngày thứ Bảy là ngày nào trong tuần?", "Chủ nhật", "Thứ Hai", "Thứ Sáu", "Thứ Năm", "Theo trình tự các ngày trong tuần, sau thứ Bảy là Chủ nhật."),
                                make_q("b25_e8", "Nếu hôm nay là thứ Hai thì ngày mai là thứ mấy?", "Thứ Ba", "Thứ Tư", "Chủ nhật", "Thứ Hai tuần sau", "Ngày mai là ngày tiếp theo của thứ Hai, tức là thứ Ba."),
                                make_q("b25_e9", "Nếu hôm nay là thứ Năm thì ngày hôm qua là thứ mấy?", "Thứ Tư", "Thứ Sáu", "Thứ Ba", "Thứ Bảy", "Ngày hôm qua là ngày đứng trước thứ Năm, tức là thứ Tư."),
                                make_q("b25_e10", "Thời gian từ 12 giờ trưa đến 1 giờ chiều là bao nhiêu phút?", "60 phút", "30 phút", "12 phút", "24 phút", "Khoảng cách giữa hai giờ liên tiếp là 1 tiếng, tương đương 60 phút.")
                            ],
                            "medium": [
                                make_q("b25_m1", "Khi kim ngắn chỉ số 9, kim dài chỉ số 6 thì đồng hồ chỉ mấy giờ?", "9 giờ 30 phút", "9 giờ 6 phút", "9 giờ 15 phút", "10 giờ", "Kim dài chỉ số 6 tương ứng với 30 phút. Vậy đồng hồ chỉ 9 giờ 30 phút (hay 9 giờ rưỡi)."),
                                make_q("b25_m2", "Khi kim ngắn chỉ số 4, kim dài chỉ số 3 thì đồng hồ chỉ mấy giờ?", "4 giờ 15 phút", "4 giờ 30 phút", "4 giờ đúng", "3 giờ 20 phút", "Kim dài chỉ số 3 tương ứng với 15 phút. Vậy đồng hồ chỉ 4 giờ 15 phút."),
                                make_q("b25_m3", "Đồng hồ chỉ 8 giờ rưỡi tức là mấy giờ mấy phút?", "8 giờ 30 phút", "8 giờ 15 phút", "8 giờ 50 phút", "8 giờ 6 phút", "Khái niệm 'giờ rưỡi' tương đương với 30 phút. Vậy là 8 giờ 30 phút."),
                                make_q("b25_m4", "Mẹ đi làm lúc 7 giờ sáng và về nhà lúc 5 giờ chiều (tức 17 giờ). Hỏi mẹ vắng nhà bao lâu?", "10 tiếng", "8 tiếng", "12 tiếng", "9 tiếng", "Từ 7 giờ sáng đến 12 giờ trưa là 5 tiếng. Từ 12 giờ trưa đến 5 giờ chiều là 5 tiếng. Tổng cộng: 5 + 5 = 10 tiếng."),
                                make_q("b25_m5", "Buổi học bắt đầu lúc 8 giờ sáng và kết thúc lúc 11 giờ sáng. Hỏi buổi học kéo dài bao lâu?", "3 giờ", "4 giờ", "2 giờ", "11 giờ", "Thời gian học kéo dài là: 11 - 8 = 3 giờ."),
                                make_q("b25_m6", "Bé xem phim hoạt hình từ 7 giờ tối đến 7 giờ 30 phút tối. Hỏi bé xem phim trong bao lâu?", "30 phút", "15 phút", "70 phút", "1 giờ", "Từ 7 giờ đến 7 giờ 30 phút cách nhau đúng 30 phút."),
                                make_q("b25_m7", "Kim dài đồng hồ chạy từ số 12 đến số 3 mất bao nhiêu phút?", "15 phút", "3 phút", "30 phút", "5 phút", "Mỗi khoảng số trên mặt đồng hồ ứng với 5 phút. Từ 12 đến 3 có 3 khoảng: 3 x 5 = 15 phút."),
                                make_q("b25_m8", "Kim dài đồng hồ chạy từ số 12 đến số 6 mất bao nhiêu phút?", "30 phút", "6 phút", "15 phút", "60 phút", "Từ 12 đến 6 là nửa vòng tròn đồng hồ, tương ứng 30 phút."),
                                make_q("b25_m9", "Đồng hồ điện tử hiển thị 14:00. Đây là mấy giờ chiều?", "2 giờ chiều", "4 giờ chiều", "12 giờ trưa", "10 giờ đêm", "Giờ chiều bằng giờ hiển thị trừ 12: 14 - 12 = 2 giờ chiều."),
                                make_q("b25_m10", "Đồng hồ điện tử hiển thị 20:30. Đây là mấy giờ tối?", "8 giờ 30 phút tối", "10 giờ 30 phút tối", "7 giờ 30 phút tối", "9 giờ tối", "Giờ tối bằng giờ hiển thị trừ 12: 20 - 12 = 8 giờ tối. Vậy là 8 giờ 30 phút tối.")
                            ],
                            "hard": [
                                make_q("b25_h1", "Bé đi ngủ lúc 9 giờ tối (21 giờ) và thức dậy lúc 6 giờ sáng hôm sau. Hỏi bé đã ngủ bao nhiêu tiếng?", "9 tiếng", "8 tiếng", "10 tiếng", "7 tiếng", "Từ 9 giờ tối đến 12 giờ đêm là 3 tiếng. Từ 12 giờ đêm đến 6 giờ sáng là 6 tiếng. Tổng cộng bé ngủ: 3 + 6 = 9 tiếng."),
                                make_q("b25_h2", "Một trận bóng đá bắt đầu lúc 15 giờ 15 phút và kết thúc lúc 17 giờ. Hỏi trận đấu kéo dài bao lâu?", "1 giờ 45 phút", "1 giờ 15 phút", "2 giờ", "1 giờ 30 phút", "Từ 15 giờ 15 phút đến 16 giờ là 45 phút. Từ 16 giờ đến 17 giờ là 1 giờ. Tổng cộng là 1 giờ 45 phút."),
                                make_q("b25_h3", "Xe ô tô khởi hành từ Hà Nội lúc 6 giờ sáng và đến Hải Phòng sau 2 tiếng 30 phút. Hỏi xe đến lúc mấy giờ?", "8 giờ 30 phút sáng", "8 giờ sáng", "9 giờ sáng", "7 giờ 30 phút sáng", "Thời điểm đến nơi là: 6 giờ + 2 giờ 30 phút = 8 giờ 30 phút sáng."),
                                make_q("b25_h4", "Mỗi ngày Nam học ở trường 8 giờ. Một tuần Nam học ở trường 5 ngày. Hỏi mỗi tuần Nam học bao nhiêu giờ ở trường?", "40 giờ", "35 giờ", "30 giờ", "45 giờ", "Tổng số giờ học ở trường của Nam trong tuần là: 8 x 5 = 40 giờ."),
                                make_q("b25_h5", "Hôm nay là thứ Ba ngày 15. Hỏi thứ Ba tuần sau là ngày mùng mấy?", "Ngày 22", "Ngày 16", "Ngày 20", "Ngày 21", "Một tuần có 7 ngày. Ngày thứ Ba tuần sau là: 15 + 7 = ngày 22."),
                                make_q("b25_h6", "Hôm nay là thứ Sáu ngày 20. Hỏi thứ Sáu tuần trước là ngày mùng mấy?", "Ngày 13", "Ngày 14", "Ngày 12", "Ngày 27", "Thứ Sáu tuần trước cách đây 7 ngày: 20 - 7 = ngày 13."),
                                make_q("b25_h7", "Bố đi công tác 1 tuần và 3 ngày. Hỏi bố đi công tác tất cả bao nhiêu ngày?", "10 ngày", "8 ngày", "9 ngày", "11 ngày", "Một tuần có 7 ngày. Tổng số ngày bố đi công tác là: 7 + 3 = 10 ngày."),
                                make_q("b25_h8", "Hà giúp mẹ quét dọn nhà từ 16 giờ đến 16 giờ 45 phút. Hỏi Hà đã làm trong bao nhiêu phút?", "45 phút", "40 phút", "50 phút", "15 phút", "Thời gian Hà làm là: 45 - 0 = 45 phút."),
                                make_q("b25_h9", "Lan làm bài tập về nhà mất 30 phút. Lan bắt đầu làm lúc 19 giờ 15 phút. Hỏi Lan làm xong lúc mấy giờ?", "19 giờ 45 phút", "19 giờ 30 phút", "20 giờ", "19 giờ 50 phút", "Thời gian hoàn thành bài tập là: 19 giờ 15 phút + 30 phút = 19 giờ 45 phút."),
                                make_q("b25_h10", "Một ngày có 24 giờ. Hỏi kim giờ quay được bao nhiêu vòng quanh mặt đồng hồ tròn 12 số?", "2 vòng", "1 vòng", "24 vòng", "12 vòng", "Mặt đồng hồ có 12 số. Kim giờ đi hết 1 vòng mất 12 giờ. Trong 24 giờ (một ngày), kim giờ quay: 24 : 12 = 2 vòng.")
                            ]
                        }
                    },
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
                                make_q("b28_e1", "Phép cộng 2 + 2 + 2 được chuyển thành phép nhân nào?", "2 x 3", "2 x 2", "3 x 3", "2 + 3", "Có 3 số hạng 2 cộng lại với nhau, ta viết thành 2 x 3."),
                                make_q("b28_e2", "Phép cộng 5 + 5 + 5 + 5 được chuyển thành phép nhân nào?", "5 x 4", "5 x 3", "4 x 5", "5 + 4", "Có 4 số hạng 5 cộng lại với nhau, ta viết thành 5 x 4."),
                                make_q("b28_e3", "Phép nhân 2 x 5 có nghĩa là gì?", "2 được lấy 5 lần", "5 được lấy 2 lần", "2 cộng với 5", "5 nhân với 5", "Theo định nghĩa, A x B có nghĩa là số A xuất hiện B lần trong phép cộng."),
                                make_q("b28_e4", "Phép cộng 10 + 10 được viết dưới dạng phép nhân là gì?", "10 x 2", "10 x 10", "2 x 10", "10 + 2", "Có 2 số hạng 10 cộng lại với nhau, viết thành 10 x 2."),
                                make_q("b28_e5", "Phép nhân 5 x 3 bằng bao nhiêu?", "15", "10", "8", "20", "5 x 3 = 5 + 5 + 5 = 15."),
                                make_q("b28_e6", "Trong phép tính 2 x 6 = 12, số 2 được gọi là gì?", "Thừa số", "Tích", "Số hạng", "Thương", "Các số tham gia phép nhân đều được gọi là Thừa số."),
                                make_q("b28_e7", "Trong phép tính 2 x 6 = 12, số 12 được gọi là gì?", "Tích", "Thừa số", "Số bị chia", "Hiệu", "Kết quả của phép nhân được gọi là Tích."),
                                make_q("b28_e8", "Trong phép nhân, kết quả của phép tính gọi là gì?", "Tích", "Hiệu", "Thừa số", "Thương", "Kết quả của phép nhân được gọi là Tích."),
                                make_q("b28_e9", "Tìm tích của 2 và 7.", "14", "9", "5", "16", "Tích của 2 và 7 bằng: 2 x 7 = 14."),
                                make_q("b28_e10", "Tìm tích của 5 và 6.", "30", "11", "25", "35", "Tích của 5 và 6 bằng: 5 x 6 = 30.")
                            ],
                            "medium": [
                                make_q("b28_m1", "Trong phép tính 5 x 4 = 20, các số 5 và 4 được gọi là gì?", "Thừa số", "Tích", "Số hạng", "Thương", "Hai số nhân với nhau được gọi là các Thừa số."),
                                make_q("b28_m2", "Nhẩm nhanh kết quả: 2 x 8 = ?", "16", "14", "18", "10", "Ta có: 2 x 8 = 16."),
                                make_q("b28_m3", "Nhẩm nhanh kết quả: 5 x 9 = ?", "45", "40", "50", "35", "Ta có: 5 x 9 = 45."),
                                make_q("b28_m4", "Điền số thích hợp vào chỗ trống: 2 x ? = 10", "5", "4", "6", "3", "Vì 2 x 5 = 10 nên số cần điền là 5."),
                                make_q("b28_m5", "Điền số thích hợp vào chỗ trống: 5 x ? = 35", "7", "6", "8", "5", "Vì 5 x 7 = 35 nên số cần điền là 7."),
                                make_q("b28_m6", "Tìm X biết: X : 2 = 6", "12", "8", "3", "4", "X = 6 x 2 = 12."),
                                make_q("b28_m7", "So sánh: 2 x 5 ... 5 x 2", "=", "<", ">", "Không so sánh được", "2 x 5 = 10. 5 x 2 = 10. Phép nhân có tính chất giao hoán nên bằng nhau."),
                                make_q("b28_m8", "So sánh: 2 x 8 ... 5 x 3", ">", "<", "=", "Khác nhau", "2 x 8 = 16. 5 x 3 = 15. Vì 16 > 15 nên điền dấu >."),
                                make_q("b28_m9", "Tính: 2 x 3 + 5 = ?", "11", "10", "16", "13", "Thực hiện nhân trước: 2 x 3 = 6. Sau đó cộng: 6 + 5 = 11."),
                                make_q("b28_m10", "Tính: 5 x 4 - 10 = ?", "10", "20", "30", "15", "Thực hiện nhân trước: 5 x 4 = 20. Sau đó trừ: 20 - 10 = 10.")
                            ],
                            "hard": [
                                make_q("b28_h1", "Mỗi phòng học có 4 cái quạt trần. Hỏi 5 phòng học như vậy có bao nhiêu cái quạt trần?", "20 cái", "18 cái", "25 cái", "15 cái", "Phép tính nhân số quạt: 4 x 5 = 20 cái quạt trần."),
                                make_q("b28_h2", "Mỗi con thỏ có 4 cái chân. Hỏi 6 con thỏ có bao nhiêu cái chân?", "24 cái chân", "20 cái chân", "28 cái chân", "10 cái chân", "Phép tính: 4 x 6 = 24 cái chân."),
                                make_q("b28_h3", "Mỗi tuần Lan học 5 tiết Toán. Hỏi trong 4 tuần Lan học bao nhiêu tiết Toán?", "20 tiết", "15 tiết", "25 tiết", "9 tiết", "Tổng số tiết Toán Lan học là: 5 x 4 = 20 tiết."),
                                make_q("b28_h4", "Có 5 học sinh, mỗi học sinh được tặng 3 quyển vở. Hỏi cả nhóm được tặng bao nhiêu quyển vở?", "15 quyển", "12 quyển", "18 quyển", "8 quyển", "Tổng số vở được tặng là: 3 x 5 = 15 quyển."),
                                make_q("b28_h5", "Mỗi xe ô tô có 4 bánh xe. Hỏi 8 xe ô tô như vậy có bao nhiêu bánh xe?", "32 bánh xe", "28 bánh xe", "36 bánh xe", "12 bánh xe", "Tổng số bánh xe của 8 ô tô là: 4 x 8 = 32 bánh xe."),
                                make_q("b28_h6", "Nhà Minh có 5 chuồng gà, mỗi chuồng có 8 con gà. Hỏi nhà Minh có tất cả bao nhiêu con gà?", "40 con gà", "35 con gà", "45 con gà", "13 con gà", "Tổng số con gà nhà Minh là: 8 x 5 = 40 con gà."),
                                make_q("b28_h7", "Mỗi lọ hoa cắm 5 bông hoa. Hỏi 7 lọ hoa như vậy cắm được bao nhiêu bông hoa?", "35 bông hoa", "30 bông hoa", "40 bông hoa", "12 bông hoa", "Tổng số bông hoa cắm được là: 5 x 7 = 35 bông hoa."),
                                make_q("b28_h8", "Hùng đi bộ mỗi giờ được 5km. Hỏi Hùng đi bộ trong 3 giờ được bao nhiêu ki-lô-mét?", "15 km", "10 km", "20 km", "8 km", "Quãng đường Hùng đi được là: 5 x 3 = 15 km."),
                                make_q("b28_h9", "Một lớp học xếp thành 4 hàng, mỗi hàng có 5 học sinh. Hỏi lớp học đó có bao nhiêu học sinh?", "20 học sinh", "18 học sinh", "24 học sinh", "9 học sinh", "Tổng số học sinh lớp đó là: 5 x 4 = 20 học sinh."),
                                make_q("b28_h10", "Mỗi bàn học ngồi được 2 học sinh. Hỏi 10 bàn học như vậy ngồi được bao nhiêu học sinh?", "20 học sinh", "12 học sinh", "18 học sinh", "8 học sinh", "Tổng số học sinh ngồi bàn học là: 2 x 10 = 20 học sinh.")
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
                                make_q("b30_e1", "Trong phép chia 10 : 2 = 5, số 10 được gọi là gì?", "Số bị chia", "Số chia", "Thương", "Tích", "Số đứng trước dấu chia gọi là Số bị chia."),
                                make_q("b30_e2", "Trong phép chia 10 : 2 = 5, số 2 được gọi là gì?", "Số chia", "Số bị chia", "Thương", "Tích", "Số đứng sau dấu chia gọi là Số chia."),
                                make_q("b30_e3", "Trong phép chia 10 : 2 = 5, số 5 được gọi là gì?", "Thương", "Số bị chia", "Số chia", "Tích", "Kết quả của phép chia được gọi là Thương."),
                                make_q("b30_e4", "Trong phép chia, kết quả của phép tính gọi là gì?", "Thương", "Hiệu", "Thừa số", "Tích", "Kết quả của phép chia được gọi là Thương."),
                                make_q("b30_e5", "Nếu có 6 quả cam chia đều cho 2 bạn, mỗi bạn được mấy quả cam?", "3 quả", "2 quả", "4 quả", "1 quả", "Mỗi bạn được: 6 : 2 = 3 quả cam."),
                                make_q("b30_e6", "Chia đều 8 cái kẹo cho 4 bạn, mỗi bạn được mấy cái kẹo?", "2 cái kẹo", "3 cái kẹo", "4 cái kẹo", "1 cái kẹo", "Mỗi bạn được: 8 : 4 = 2 cái kẹo."),
                                make_q("b30_e7", "Từ phép nhân 2 x 5 = 10, ta viết được phép chia 10 : 2 bằng bao nhiêu?", "5", "2", "10", "7", "10 chia cho thừa số này bằng thừa số kia: 10 : 2 = 5."),
                                make_q("b30_e8", "Từ phép nhân 5 x 3 = 15, ta viết được phép chia 15 : 5 bằng bao nhiêu?", "3", "5", "15", "8", "15 chia cho thừa số này bằng thừa số kia: 15 : 5 = 3."),
                                make_q("b30_e9", "Trong phép chia A : B = C, cả biểu thức 'A : B' cũng được gọi là gì?", "Thương", "Số bị chia", "Số chia", "Tổng", "Cả biểu thức phép chia 'A : B' cũng gọi là một Thương."),
                                make_q("b30_e10", "Trong phép tính 20 : 5 = 4, số 5 gọi là gì?", "Số chia", "Số bị chia", "Thương", "Tích", "Số đứng sau dấu chia là Số chia.")
                            ],
                            "medium": [
                                make_q("b30_m1", "Chia đều 12 cái kẹo cho 3 bạn. Hỏi mỗi bạn được mấy cái kẹo?", "4 cái kẹo", "3 cái kẹo", "5 cái kẹo", "6 cái kẹo", "Phép tính chia đều: 12 : 3 = 4 cái kẹo."),
                                make_q("b30_m2", "Tính nhẩm: 10 : 2 = ?", "5", "4", "6", "2", "Nhẩm bảng chia 2: 10 : 2 = 5."),
                                make_q("b30_m3", "Tính nhẩm: 25 : 5 = ?", "5", "6", "4", "7", "Nhẩm bảng chia 5: 25 : 5 = 5."),
                                make_q("b30_m4", "Điền số thích hợp: 14 : ? = 7", "2", "3", "4", "5", "Vì 14 : 2 = 7 nên số điền là 2."),
                                make_q("b30_m5", "Điền số thích hợp: 30 : ? = 6", "5", "4", "6", "7", "Vì 30 : 5 = 6 nên số điền là 5."),
                                make_q("b30_m6", "Tìm X biết: X x 2 = 18", "9", "8", "10", "16", "X = 18 : 2 = 9."),
                                make_q("b30_m7", "So sánh: 20 : 5 ... 10 : 2", "<", ">", "=", "Khác nhau", "20 : 5 = 4. 10 : 2 = 5. Vì 4 < 5 nên điền <."),
                                make_q("b30_m8", "So sánh: 15 : 5 ... 12 : 4", "=", "<", ">", "Khác nhau", "15 : 5 = 3. 12 : 4 = 3. Cả hai phép chia bằng nhau."),
                                make_q("b30_m9", "Tính: 10 : 2 + 8 = ?", "13", "12", "14", "15", "Thực hiện phép chia trước: 10 : 2 = 5. Tiếp tục: 5 + 8 = 13."),
                                make_q("b30_m10", "Tính: 35 : 5 - 3 = ?", "4", "5", "3", "7", "Thực hiện phép chia trước: 35 : 5 = 7. Tiếp tục: 7 - 3 = 4.")
                            ],
                            "hard": [
                                make_q("b30_h1", "Có 15 quả táo chia vào các rổ, mỗi rổ có 5 quả táo. Hỏi chia được bao nhiêu rổ táo?", "3 rổ", "4 rổ", "2 rổ", "5 rổ", "Phép tính chia theo nhóm: 15 : 5 = 3 rổ táo."),
                                make_q("b30_h2", "Lớp 2A có 20 bạn học sinh xếp đều thành 5 hàng. Hỏi mỗi hàng có bao nhiêu học sinh?", "4 học sinh", "5 học sinh", "6 học sinh", "3 học sinh", "Số học sinh mỗi hàng là: 20 : 5 = 4 học sinh."),
                                make_q("b30_h3", "Có 30 bông hoa cắm đều vào 5 lọ hoa. Hỏi mỗi lọ hoa có bao nhiêu bông hoa?", "6 bông hoa", "5 bông hoa", "7 bông hoa", "4 bông hoa", "Số bông hoa mỗi lọ là: 30 : 5 = 6 bông hoa."),
                                make_q("b30_h4", "Một sợi dây dài 14dm được cắt thành 2 đoạn bằng nhau. Hỏi mỗi đoạn dài bao nhiêu đề-xi-mét?", "7 dm", "6 dm", "8 dm", "12 dm", "Độ dài mỗi đoạn dây là: 14 : 2 = 7 dm."),
                                make_q("b30_h5", "Có 40 chiếc bánh trung thu chia đều vào các hộp, mỗi hộp 5 chiếc. Hỏi chia được bao nhiêu hộp bánh?", "8 hộp", "7 hộp", "9 hộp", "10 hộp", "Số hộp bánh chia được là: 40 : 5 = 8 hộp."),
                                make_q("b30_h6", "Mẹ chia đều 18 quả cam vào 2 đĩa. Hỏi mỗi đĩa có bao nhiêu quả cam?", "9 quả", "8 quả", "10 quả", "7 quả", "Số cam ở mỗi đĩa là: 18 : 2 = 9 quả cam."),
                                make_q("b30_h7", "Có 45 quyển vở chia đều cho 5 bạn học sinh giỏi. Hỏi mỗi bạn được bao nhiêu quyển vở?", "9 quyển", "8 quyển", "7 quyển", "10 quyển", "Số vở mỗi bạn học sinh giỏi nhận được là: 45 : 5 = 9 quyển."),
                                make_q("b30_h8", "Có 16 lít nước ngọt rót đều vào 2 can nước. Hỏi mỗi can đựng bao nhiêu lít nước?", "8 lít", "7 lít", "9 lít", "6 lít", "Dung tích mỗi can đựng nước ngọt là: 16 : 2 = 8 lít."),
                                make_q("b30_h9", "Một đoàn khách có 10 người đi xe taxi, mỗi xe taxi chở được tối đa 5 người. Hỏi cần thuê bao nhiêu xe taxi?", "2 xe", "3 xe", "4 xe", "1 xe", "Số taxi cần thuê là: 10 : 5 = 2 xe taxi."),
                                make_q("b30_h10", "Có 25kg gạo chia đều vào 5 túi gạo nhỏ. Hỏi mỗi túi đựng bao nhiêu ki-lô-gam gạo?", "5 kg", "4 kg", "6 kg", "3 kg", "Khối lượng gạo trong mỗi túi nhỏ là: 25 : 5 = 5 kg gạo.")
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