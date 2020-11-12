import app from "./app";
import initializeDatabase from "./controller";
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
  app.get("/addcontact", async (req, res) => {
    const { name, email } = req.query;
    console.log(name, email);
    const result = await controller.createContact(name, email);
    res.send({
      success: true,
      result,
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
