const router = require("express").Router(),
  Stream = require("../models/Stream"),
  fs = require("fs");
router.post("/", (req, res) => {
  //codigo para metodo CREATE
  Stream.create({
    //crea un nuevo documento en la coleción de mongoDB
    title: req.body.title,
    filename: req.files.files.name,
    description: req.body.description,
    imageURL: req.body.imageURL,
    category: req.body.category
  })
    .then(e => {
      var file = req.files.files, //toma nombre de archivo
        filename = file.name;
      file.mv("./upload/" + filename, err => {
        if (err) res.json("error occured");
        else res.json("done"); //retorna mensaje de terminado
      });
    })
    .catch(e => res.json({ message: e }));
});
router.get("/", (req, res) => {
  //codigo para metodo READ
  Stream.find()
    .then(e => {
      res.json(e);
    })
    .catch(e => res.json({ message: e }));
});
router.delete("/", (req, res) => {
  //codigo para DELETE
  Stream.findByIdAndDelete(req.body.id)
    .then(e => res.json({ message: "element deleted" }))
    .catch(e => res.json({ message: e }));
});
router.get("/stream/:filename", (req, res) => {
  //codigo para realizar streaming
  console.log(req.body);
  const path = "upload/" + req.params.filename;
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4"
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4"
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
});
module.exports = router;
