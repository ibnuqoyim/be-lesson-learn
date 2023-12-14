import { Elysia, t } from "elysia";
import { BooksDatabase } from "./db.js";
import { html } from '@elysiajs/html'
import { listen } from "bun";

new Elysia()
  .use(html())
  .decorate("db", new BooksDatabase())
  .get("/", () => Bun.file("index.html").text())
  .get("/script.js", () => Bun.file("script.js").text())
  .get("/books", ({ db }) => db.getBooks())
  .post(
    "/books",
    async ({ db, body }) => {
      const id = (await db.addBook(body))
      return { success: true, id };
    },
    {
      schema: {
        body: t.Object({
          name: t.String(),
          author: t.String(),
        }),
      },
    }
  )
  .put(
    "/books/:id",
    ({ db, params, body }) => {
      try {
        db.updateBook(parseInt(params.id), body) 
        return { success: true };
      } catch (e) {
        return { success: false };
      }
    },
    {
      schema: {
        body: t.Object({
          name: t.String(),
          author: t.String(),
        }),
      },
    }
  )
  .delete("/books/:id", ({ db, params }) => {
    try {
      db.deleteBook(parseInt(params.id))
      return { success: true };
    } catch (e) {
      return { success: false };
    }
  })
  .get("books/:id", ({db, params}) => {
      console.log(process.env.name)
      return db.getBook(parseInt(params.id))
  })
  .listen(3000);
