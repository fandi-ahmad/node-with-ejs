const express = require("express")
const mysql = require("mysql")
const BodyParser = require("body-parser")

const app = express()

app.use(BodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', 'views')

const db = mysql.createConnection({
    host: "localhost",
    database: "sekolah-test",
    user: "root",
    password: "",
})

db.connect((err) => {
    if (err) throw err
    console.log('database connected')

    
    // get data
    app.get('/', (req, res) => {
        const sql = "SELECT * FROM siswa"
        db.query(sql, (err, result) => {
            const students = JSON.parse(JSON.stringify(result))
            // res.send(students)
            res.render('index', {students: students, title: 'Daftar siswa'})
        })
    })

    // create data
    app.post('/create', (req, res) => {
        const insertSql = `INSERT INTO siswa (nama, kelas) VALUES ('${req.body.nama}', '${req.body.kelas}');`
        db.query(insertSql, (err, result) => {
            if (err) throw err
            res.redirect('/')
        })
    })

    // Update data
    app.post('/update/:id', (req, res) => {
        const id = req.params.id;
        const updateSql = `UPDATE siswa SET nama = '${req.body.nama}', kelas = '${req.body.kelas}' WHERE id = ${id};`;
        
        db.query(updateSql, (err, result) => {
            if (err) throw err;
            res.redirect('/');
        });
    });

    // Delete data
    app.post('/delete/:id', (req, res) => {
        const id = req.params.id;
        const deleteSql = `DELETE FROM siswa WHERE id = ${id};`;
      
        db.query(deleteSql, (err, result) => {
          if (err) throw err;
          res.redirect('/');
        });
    });
  

})


app.listen(8000, () => {
    console.log('server siapp')
})
