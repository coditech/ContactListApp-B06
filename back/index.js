import app from "./app";
import initializeDatabase from "./controller";
import multer from "multer";
const multerStorage = multer.diskStorage({
  destination: "public/images",
  filename: (req, file, cb) => {
    const { fieldname, originalname } = file;
    const date = Date.now();
    // filename will be: image-1345923023436343-filename.png
    const filename = `${fieldname}-${date}-${originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: multerStorage });
//db.test();
const start = async () => {
  const controller = await initializeDatabase();
  app.get("/", (req, res) => res.send("ok"));
  app.get("/contacts", async (req, res) => {
    const contacts = await controller.getContactsList();
    res.send({
      success: true,
      contacts,
    });
  });
  app.get("/contact/:id", async (req, res) => {
    const id = req.params.id;
    const contact = await controller.getContactByID(id);
    res.send({
      success: true,
      contact,
    });
  });
  app.post("/addcontact", upload.single("image"), async (req, res) => {
    const { name, email } = req.query;
    const image = req.file && req.file.filename;
    console.log(name, email);
    const result = await controller.createContact(name, email, image);
    res.send({
      success: true,
      result,
      image,
    });
  });
  app.get("/deletecontact/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const result = await controller.deleteContact(id);
    res.send({
      success: true,
      result,
    });
  });
  app.get("/updatecontact/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.query;
    const result = await controller.updateContact(id, { name, email });
    res.send({
      success: true,
      result,
    });
  });

  app.listen(8000, () => console.log("server listening on port 8000"));
};
start();
