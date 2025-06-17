const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Razorpay = require("Razorpay");
const serverless = require('serverless-http');
const UserModel = require("./Models/User");
const QuizModel = require("./Models/Quizzes");
const NoticeModel = require("./Models/Notice");
const ReportModel = require("./Models/Report");
const CoursesModel = require("./Models/Courses");
const AcademyDetailModel = require("./Models/AcademyDetail");
const AttendanceModel = require("./Models/Attendance");

const app = express();
app.use(express.json());

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

mongoose.connect('mongodb+srv://rishivishwa4877:rishiMongodb@cluster0.k16x7.mongodb.net/RCT-Classes?retryWrites=true&w=majority&appName=Cluster0');

app.get('/check-user', (req, res) => {
    const username = req.query.username;
    UserModel.findOne({ username: username })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.get('/show-user', (req, res) => {
    const username = req.query.username;
    UserModel.findOne({ username: username })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.post('/add-user', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    UserModel.create({ username: username, password: password })
        .then(result => res.json(result), "result add-user")
        .catch(err => res.json(err))
})

// ************* quizzes **************

app.get("/api/quiz", async (req, res) => {
    try {
        const questions = await QuizModel.find();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ************ notice *************

// app.get("/get-notice", async (req, res) => {
//     const standard = req.query.standard;
//     console.log(standard)
//     try {
//         if (!standard) {
//             return res.status(400).json({ message: "Standard is required" });
//         }

//         const notice = await NoticeModel.findOne({ standard: standard });

//         if (!notice) {
//             return res.status(404).json({ message: "No notices found for this standard" });
//         }

//         res.json(notice.notices);
//         console.log(notice.notices);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

app.get("/get-notice", async (req, res) => {
    const standard = parseInt(req.query.standard); // Convert to number

    if (isNaN(standard)) {
        return res.status(400).json({ message: "Invalid standard value" });
    }

    try {
        const notices = await NoticeModel.find({ standard }); // Fetch all notices for the given standard
        res.json(notices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ************ course *************

app.get("/get-course", async (req, res) => {
    const standard = req.query.standard;
    try {
        if (!standard) {
            return res.status(400).json({ message: "Standard is required" });
        }

        const course = await CoursesModel.findOne({ standard: standard });

        if (!course) {
            return res.status(404).json({ message: "No courses found for this standard" });
        }

        res.json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ***************** report *****************

app.post("/submit-report", async (req, res) => {
    try {
        const { username, standard, type, subject, description } = req.body;

        if (!username || !standard || !type || !subject || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        ReportModel.create({ username: username, standard: standard, type: type, subject: subject, description: description })
            .then(result => res.json(result))
            .catch(err => res.status(500).json({ message: err.message }));
    } catch (error) {
        res.status(500).json({ message: "Error submitting report", error: error.message });
    }
})

// ***************** payment *****************

const razorpay = new Razorpay({
    key_id: "rzp_test_LeMgfSZnEPxGUF", // Get from Razorpay Dashboard
    key_secret: "qlliEl4EnLB1s3pJrSSN8LH4",
});

app.post("/razorpay", async (req, res) => {
    try {
        const { amount } = req.body;

        const options = {
            amount: amount * 100, // Convert ₹ to paise
            currency: "INR",
            receipt: "receipt_order_12345",
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).send("Error creating Razorpay order");
    }
});

// ***************** add-quiz *****************

app.get("/get-quiz/:standard", async (req, res) => {
    const standard = parseInt(req.params.standard);
    try {
        const quiz = await QuizModel.findOne({ standard: standard });
        if (!quiz) {
            return res.status(404).json({ message: "No quiz found for this standard" });
        }
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/add-quiz", async (req, res) => {
    const { question, options, answer, standard } = req.body;
    if (!question || !options || !answer || !standard) {
        return res.status(400).json({ error: "Missing fields" });
    }

    try {
        // Fetch the existing quiz for the standard
        let quiz = await QuizModel.findOne({ standard });

        // If quiz doesn't exist, create a new one
        if (!quiz) {
            quiz = new QuizModel({ standard, questions: [] });
        }

        // Append the new question
        quiz.questions.push({ question, options, answer });

        // Save the updated quiz
        await quiz.save();

        res.json({ message: "Quiz updated successfully", quiz });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// ***************** add-notice *****************

app.post("/add-notice", async (req, res) => {
    const { standard, title, description } = req.body;

    NoticeModel.create({ standard: standard, title: title, description: description })
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ message: err.message }));
})

// ***************** attendance *****************

app.get("/get-students", async (req, res) => {
    const standard = req.query.standard;
    try {
        const allStudent = await UserModel.find({ "detail.standard": standard })
        res.json(allStudent)
    }
    catch {
        res.status(500).json({ message: error.message });
    }
});

app.post("/submit-attendance", async (req, res) => {
    const { date, standard, present, absent } = req.body;

    if (!date || !standard) {
        return res.status(400).json({ message: "Date and Standard are required" });
    }

    try {
        const newAttendance = new AttendanceModel({
            date,
            standard,
            present,
            absent,
        });

        await newAttendance.save();
        res.status(201).json({ message: "Attendance saved successfully" });
    } catch (error) {
        console.error("Error saving attendance:", error);
        res.status(500).json({ message: "Failed to save attendance" });
    }
});

app.get("/get-attendance-one", async (req, res) => {
    const { attendanceDate, standard } = req.query;

    try {
        const record = await AttendanceModel.findOne({
            date: attendanceDate,
            standard: standard,
        });

        if (record) {
            res.status(200).json(record);
        } else {
            res.status(200).json({}); // no match found
        }
    } catch (error) {
        console.error("Error checking attendance:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/get-attendance", async (req, res) => {
    const standard = req.query.standard;
    try {
        const attendance = await AttendanceModel.find({ "standard": standard })
        res.json(attendance)
        console.log(attendance)
    }
    catch {
        res.status(500).json({ message: error.message });
    }
});

// ***************** acecdy detail *****************

app.get("/academy-detail", async (req, res) => {
    try {
        const academy = await AcademyDetailModel.findOne(); // Fetch first academy record
        res.json(academy);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

module.exports = serverless(app);
