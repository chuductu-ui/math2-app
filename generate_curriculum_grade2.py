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