# 📝 CRUD Demo - ATC Online Shop (Supabase)

ระบบจัดการข้อมูลแบบ CRUD (Create, Read, Update, Delete) โดยใช้ Supabase เป็นฐานข้อมูล

---

## 👨‍💻 ข้อมูลผู้พัฒนา

- **ชื่อ**: ณรงค์ศักดิ์ เพ็งงาน
- **เลขที่**: 2
- **ชั้น**: ปวส. 2/24
- **โปรเจค**: ATC Next Gen - Online Shop Management System

---

## 📋 รายละเอียดโปรเจค

โปรเจคนี้เป็นส่วนหนึ่งของการพัฒนาระบบจัดการร้านค้าออนไลน์ โดยใช้:
- **Backend**: Node.js + Express.js
- **Database**: Supabase (PostgreSQL)
- **Frontend**: HTML + Vanilla JavaScript
- **Authentication**: Row Level Security (RLS) บน Supabase

---

## 🚀 เทคโนโลยีที่ใช้

### Backend
- **Node.js** - JavaScript Runtime
- **Express.js** - Web Framework
- **@supabase/supabase-js** - Supabase Client
- **dotenv** - Environment Variables
- **cors** - Cross-Origin Resource Sharing

### Frontend
- **HTML5** - โครงสร้างหน้าเว็บ
- **CSS3** - การออกแบบและตกแต่ง
- **Vanilla JavaScript** - การทำงานแบบ Dynamic

### Database
- **Supabase** - Backend as a Service (PostgreSQL)
- **Row Level Security (RLS)** - การจัดการสิทธิ์การเข้าถึง

---

## 📦 โครงสร้างโปรเจค

```
atc-online-shop-supabase-api/
├── public/
│   ├── index.html      # หน้าเว็บหลัก
│   └── app.js          # JavaScript สำหรับเรียก API
├── .env                # ตัวแปร Environment (ห้าม commit)
├── .gitignore          # ไฟล์ที่ไม่ต้องการ commit
├── package.json        # Dependencies และ Scripts
├── server.js           # Express Server
└── README.md           # เอกสารนี้
```

---

## 🛠️ การติดตั้งและรันโปรเจค

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. ตั้งค่า Environment Variables
แก้ไขไฟล์ `.env`:
```env
PORT=3000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

### 3. รันเซิร์ฟเวอร์
```bash
npm start
```

เซิร์ฟเวอร์จะรันที่: **http://localhost:3000**

### 4. รันแบบ Development (Auto-reload)
```bash
npm run dev
```

---

## 🗄️ การตั้งค่า Supabase

### 1. สร้างโปรเจค Supabase
1. ไปที่ https://supabase.com
2. สร้างโปรเจคใหม่
3. เลือก Region: **Southeast Asia (Singapore)**

### 2. สร้างตาราง `items`
```sql
CREATE TABLE items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    detail TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3. ตั้งค่า Row Level Security (RLS)
```sql
-- เปิด RLS
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- Policy สำหรับ SELECT
CREATE POLICY "Allow public select" ON items
FOR SELECT TO public USING (true);

-- Policy สำหรับ INSERT
CREATE POLICY "Allow public insert" ON items
FOR INSERT TO public WITH CHECK (true);

-- Policy สำหรับ UPDATE
CREATE POLICY "Allow public update" ON items
FOR UPDATE TO public USING (true) WITH CHECK (true);

-- Policy สำหรับ DELETE
CREATE POLICY "Allow public delete" ON items
FOR DELETE TO public USING (true);
```

### 4. ดึง API Keys
1. ไปที่ **Settings** → **API**
2. คัดลอก:
   - **Project URL**
   - **anon/public key**
3. นำไปใส่ในไฟล์ `.env`

---

## 📡 API Endpoints

### 1. Health Check
```
GET /health
```
**Response:**
```json
{
    "status": "ok",
    "message": "Server is running"
}
```

### 2. ดึงข้อมูลทั้งหมด
```
GET /api/items
```
**Response:**
```json
[
    {
        "id": "uuid",
        "title": "Item Title",
        "detail": "Item Detail",
        "created_at": "2025-11-16T10:00:00Z",
        "updated_at": "2025-11-16T10:00:00Z"
    }
]
```

### 3. เพิ่มรายการใหม่
```
POST /api/items
Content-Type: application/json

{
    "title": "New Item",
    "detail": "Item description"
}
```

### 4. แก้ไขรายการ
```
PUT /api/items/:id
Content-Type: application/json

{
    "title": "Updated Title",
    "detail": "Updated detail"
}
```

### 5. ลบรายการ
```
DELETE /api/items/:id
```

---

## 🌐 การใช้งานหน้าเว็บ

### 1. เปิดหน้าเว็บ
```
http://localhost:3000
```

### 2. ฟีเจอร์ที่มี
- ✅ **เพิ่มรายการ**: กรอก Title และ Detail แล้วกด "Add Item"
- ✅ **แสดงรายการ**: แสดงข้อมูลทั้งหมดพร้อมเวลาที่สร้าง
- ✅ **แก้ไขรายการ**: กดปุ่ม "Edit" แล้วกรอกชื่อใหม่
- ✅ **ลบรายการ**: กดปุ่ม "Delete" พร้อมยืนยัน
- ✅ **สถิติ**: แสดงจำนวนรายการทั้งหมด

### 3. คุณสมบัติพิเศษ
- 🎨 **UI สวยงาม**: ออกแบบด้วย CSS Gradient และ Animation
- 📊 **Real-time Update**: ข้อมูลอัพเดททันทีหลังแก้ไข
- ⚡ **Fast Response**: ใช้ Supabase ที่มีความเร็วสูง
- 🔒 **Security**: ป้องกัน XSS ด้วย HTML Escaping

---

## 🧪 การทดสอบด้วย Postman

### 1. ทดสอบ GET
```
GET http://localhost:3000/api/items
```

### 2. ทดสอบ POST
```
POST http://localhost:3000/api/items
Content-Type: application/json

{
    "title": "Test Item",
    "detail": "This is a test"
}
```

### 3. ทดสอบ PUT
```
PUT http://localhost:3000/api/items/{id}
Content-Type: application/json

{
    "title": "Updated Title"
}
```

### 4. ทดสอบ DELETE
```
DELETE http://localhost:3000/api/items/{id}
```

---

## ⚠️ Troubleshooting (แก้ปัญหา)

### ปัญหา: RLS Policy Error (42501)
```
Error: new row violates row-level security policy
```
**วิธีแก้**: ตรวจสอบว่าได้สร้าง RLS Policies ครบ 4 ตัวแล้ว (SELECT, INSERT, UPDATE, DELETE)

### ปัญหา: Cannot find module
```
Error: Cannot find module '@supabase/supabase-js'
```
**วิธีแก้**: รัน `npm install`

### ปัญหา: Port already in use
```
Error: listen EADDRINUSE: address already in use :::3000
```
**วิธีแก้**: เปลี่ยน PORT ใน `.env` หรือปิดโปรแกรมที่ใช้ port 3000 อยู่

### ปัญหา: Supabase connection failed
**วิธีแก้**: 
1. ตรวจสอบ `SUPABASE_URL` และ `SUPABASE_ANON_KEY` ใน `.env`
2. ตรวจสอบว่า Supabase project ยังทำงานอยู่

---

## 📚 เอกสารเพิ่มเติม

- [Supabase Documentation](https://supabase.com/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/docs/)

---

## 🎓 สรุปการเรียนรู้

โปรเจคนี้ช่วยให้เรียนรู้:
- ✅ การสร้าง RESTful API ด้วย Express.js
- ✅ การใช้งาน Supabase เป็นฐานข้อมูล
- ✅ การจัดการ CRUD Operations
- ✅ การตั้งค่า Row Level Security (RLS)
- ✅ การเชื่อมต่อ Frontend กับ Backend
- ✅ การใช้งาน Environment Variables
- ✅ การจัดการ Error Handling
- ✅ การทำ Git Version Control

---

## 📝 License

ISC

---

## 🙏 ขอบคุณ

- **อาจารย์ผู้สอน**: อ.ธาดา พินไชโย
- **ATC Next Gen Co., Ltd.**: สำหรับโจทย์และโอกาสในการเรียนรู้
- **Supabase**: สำหรับ Backend as a Service ที่ใช้งานง่าย

---

**พัฒนาโดย**: ณรงค์ศักดิ์ เพ็งงาน | เลขที่ 2 | ปวส. 2/24  
**วันที่**: พฤศจิกายน 2025  
**Version**: 1.0.0

---

⭐ ถ้าชอบโปรเจคนี้ อย่าลืมกด Star บน GitHub นะครับ!