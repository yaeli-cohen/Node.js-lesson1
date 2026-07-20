const authenticateApiKey = (req, res, next) => {
    // הדפסה לטרמינל כדי לוודא שהמידלוור אכן רץ בכל קריאה שנכנסת לשרת
    console.log(`[שומר סף] בקשה חדשה התקבלה בנתיב: ${req.method} ${req.url}`);

    // שליפת ה-Header שנקרא auth-key
    // הערה: Express הופך אוטומטית את כל שמות הכותרות לאותיות קטנות (Lowercase)
    const authKey = req.headers['auth-key']; 
    
    // נקבע ערך סודי לדוגמה (במציאות זה יישמר בקובץ סביבה .env)
    const SECRET_KEY = "mySuperSecretToken123";

    // בדיקה: אם ה-Header לא נשלח, או שהערך שלו אינו תואם למפתח הסודי
    if (!authKey || authKey !== SECRET_KEY) {
        console.log(`[שומר סף] התחברות נכשלה: מפתח שגוי או חסר.`);
        return res.status(401).json({ 
            error: "Unauthorized", 
            message: "גישה נדחתה: נא לספק מפתח אימות תקין בכותרות הבקשה." 
        });
    }

    // אם המפתח תקין, קוראים ל-next והקריאה ממשיכה כרגיל לנתיבים
    next();
};

module.exports = { authenticateApiKey };